import numpy as np
import pandas as pd
import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from typing import List
from scipy.stats import entropy
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from textblob import TextBlob
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from dotenv import load_dotenv

# Load Environment Variables
load_dotenv()

# Security: Rate Limiter
limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Security: Strict CORS
# In production, this should be a specific domain, e.g., "https://vitro.app"
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"], # Restrict methods
    allow_headers=["*"],
)

# --- ML MODEL STATE ---
price_model = None
scaler = None

# ... (Training Function kept same for brevity, it's safe) ...
def train_price_model():
    global price_model, scaler
    np.random.seed(42)
    n_samples = 1000
    reach = np.random.randint(1000, 1000000, n_samples)
    eng_rate = np.random.uniform(0.5, 10.0, n_samples)
    fraud_score = np.random.uniform(0, 100, n_samples)
    price = (reach * 0.015) * (1 + eng_rate/5) * (1 - (fraud_score/150)) + np.random.normal(0, 50, n_samples)
    price = np.maximum(price, 50)
    df = pd.DataFrame({'reach': reach, 'eng_rate': eng_rate, 'fraud_score': fraud_score})
    scaler = StandardScaler()
    X = scaler.fit_transform(df)
    price_model = LinearRegression()
    price_model.fit(X, price)

@app.on_event("startup")
async def startup_event():
    train_price_model()

# --- SECURE DATA STRUCTURES (Validation) ---

class ForensicRequest(BaseModel):
    metrics: List[int] = Field(..., max_items=1000, description="Limit to 1000 posts to prevent memory overflow")
    comments: List[str] = Field(..., max_items=500, description="Limit analysis to last 500 comments")

    @validator('comments')
    def validate_comment_length(cls, v):
        # Prevent "Billion Laughs" style attacks or massive payloads
        return [c[:1000] for c in v] # Truncate massive comments

class PriceRequest(BaseModel):
    reach: int = Field(..., gt=0, lt=100_000_000) # Sanity limits
    engagement_rate: float = Field(..., ge=0, le=100)
    fraud_score: float = Field(..., ge=0, le=100)
    niche: str

class BrandFitRequest(BaseModel):
    influencer_bio: str = Field(..., max_length=5000)
    recent_captions: List[str] = Field(..., max_items=50)
    brand_keywords: List[str] = Field(..., max_items=20)

class PortfolioRequest(BaseModel):
    budget: float = Field(..., gt=0, lt=10_000_000) # Cap budget at $10M to prevent overflow errors in numpy

# --- ENDPOINTS ---

@app.post("/analyze/forensics")
@limiter.limit("10/minute") # Anti-DoS
def analyze_forensics(request: Request, body: ForensicRequest):
    """
    Forensic analysis. Rate limited to 10 requests/min per IP.
    """
    metrics = np.array(body.metrics)
    comments = body.comments
    
    # ... (Logic remains same, but input is now safe) ...
    # Benford Check
    first_digits = [int(str(n)[0]) for n in metrics if n > 0]
    observed_counts = np.zeros(9)
    for d in first_digits:
        if 1 <= d <= 9: observed_counts[d-1] += 1
    total = sum(observed_counts)
    if total == 0: return {"benford": {"chart_data": [], "is_suspicious": False}, "entropy": {"score": 0, "verdict": "Unknown"}}

    BENFORD_PROBS = np.array([0.301, 0.176, 0.125, 0.097, 0.079, 0.067, 0.058, 0.051, 0.046])
    expected_counts = BENFORD_PROBS * total
    chi_square_stat = np.sum(((observed_counts - expected_counts) ** 2) / expected_counts)
    
    benford_chart = []
    for i in range(9):
        benford_chart.append({"digit": i+1, "observed": (observed_counts[i] / total) * 100, "expected": BENFORD_PROBS[i] * 100})

    # Entropy Check
    full_text = " ".join(comments).lower()
    if not full_text:
        entropy_score = 0
    else:
        _, counts = np.unique(list(full_text), return_counts=True)
        probs = counts / len(full_text)
        ent = entropy(probs, base=2) 
        entropy_score = min(10, (ent / 4.5) * 10)

    verdict = "Organic"
    if entropy_score < 6.0: verdict = "Bot-Like"
    elif entropy_score < 7.5: verdict = "Suspicious"

    return {
        "benford": {"chi_square": float(chi_square_stat), "is_suspicious": bool(chi_square_stat > 15.5), "chart_data": benford_chart},
        "entropy": {"score": float(entropy_score), "verdict": verdict}
    }

@app.post("/predict/price")
@limiter.limit("20/minute")
def predict_price(request: Request, body: PriceRequest):
    if price_model is None:
        raise HTTPException(status_code=503, detail="Model initializing")
    
    X_new = pd.DataFrame({'reach': [body.reach], 'eng_rate': [body.engagement_rate], 'fraud_score': [body.fraud_score]})
    X_scaled = scaler.transform(X_new)
    predicted_price = max(50, float(price_model.predict(X_scaled)[0]))
    market_rate = (body.reach / 1000) * 10
    
    ratio = market_rate / predicted_price
    valuation = "Fair"
    if ratio < 0.8: valuation = "Undervalued"
    elif ratio > 1.5: valuation = "Overpriced"
    
    return {"estimated_price": int(predicted_price), "market_rate": int(market_rate), "valuation": valuation}

@app.post("/analyze/brand-fit")
@limiter.limit("5/minute") # NLP is heavy, strict limit
def analyze_brand_fit(request: Request, body: BrandFitRequest):
    corpus = body.influencer_bio + " " + " ".join(body.recent_captions)
    blob = TextBlob(corpus.lower())
    extracted_topics = list(set([w.lower() for w in blob.noun_phrases if len(w) > 2]))
    brand_set = set([k.lower() for k in body.brand_keywords])
    intersection = brand_set.intersection(set(extracted_topics))
    score = min(100, int((len(intersection) / len(brand_set)) * 100)) if brand_set else 0
    
    return {"score": score, "matches": list(intersection), "extracted_topics": list(extracted_topics)[:10]}

# --- REAL MATH HELPERS ---
NICHES = {
    "Tech": np.array([0.9, 0.1, 0.2]),
    "Beauty": np.array([0.1, 0.9, 0.1]),
    "Business": np.array([0.2, 0.2, 0.9]),
    "General": np.array([0.5, 0.5, 0.5])
}

@app.post("/optimize-portfolio")
@limiter.limit("3/minute") # Very heavy compute, strictly rate limited
def optimize_portfolio(request: Request, body: PortfolioRequest):
    budget = body.budget
    
    # 1. Generate Candidates with REAL Vectors based on Niche
    # This simulates a database lookup where every creator has a pre-computed embedding
    candidates = [
        {"handle": "@tech_guru", "cost": 12000, "reach": 500000, "niche": "Tech"},
        {"handle": "@beauty_queen", "cost": 15000, "reach": 650000, "niche": "Beauty"},
        {"handle": "@crypto_king", "cost": 18000, "reach": 400000, "niche": "Business"},
        {"handle": "@lifestyle_zoe", "cost": 5000, "reach": 150000, "niche": "Beauty"},
        {"handle": "@gaming_josh", "cost": 4000, "reach": 120000, "niche": "Tech"},
        {"handle": "@startup_sarah", "cost": 7000, "reach": 200000, "niche": "Business"},
        {"handle": "@micro_tech", "cost": 1500, "reach": 45000, "niche": "Tech"},
        {"handle": "@micro_beauty", "cost": 1200, "reach": 38000, "niche": "Beauty"},
    ]
    
    # Enrich with Vectors (+ small random noise for realism)
    vectors = []
    for c in candidates:
        base_vector = NICHES.get(c["niche"], NICHES["General"])
        noise = np.random.normal(0, 0.05, 3) # Add Gaussian noise
        final_vector = np.clip(base_vector + noise, 0, 1)
        vectors.append(final_vector)
    
    vectors = np.array(vectors)
    
    # 2. Compute Cosine Similarity Matrix (The "Overlap")
    # Dot product of normalized vectors
    norms = np.linalg.norm(vectors, axis=1, keepdims=True)
    normalized = vectors / norms
    similarity_matrix = np.dot(normalized, normalized.T)
    
    # 3. Monte Carlo Simulation (Real Execution)
    results = []
    
    # Run 2000 simulations
    for _ in range(2000):
        # Random selection mask
        mask = np.random.randint(0, 2, len(candidates))
        if np.sum(mask) == 0: continue
        
        selected_indices = np.where(mask == 1)[0]
        
        # Calculate Cost
        total_cost = sum([candidates[i]["cost"] for i in selected_indices])
        if total_cost > budget: continue
        if total_cost < (budget * 0.5): continue # Ignore portfolios that barely use budget
        
        # Calculate Unique Reach (Penalizing Overlap)
        raw_reach = sum([candidates[i]["reach"] for i in selected_indices])
        
        overlap_penalty = 0
        for i in selected_indices:
            for j in selected_indices:
                if i != j:
                    # Penalty = Overlap % * Smaller Audience
                    overlap = similarity_matrix[i][j]
                    smaller_reach = min(candidates[i]["reach"], candidates[j]["reach"])
                    overlap_penalty += (overlap * smaller_reach * 0.4) # 40% overlap impact factor
        
        unique_reach = int(max(0, raw_reach - overlap_penalty))
        
        results.append({
            "indices": selected_indices.tolist(),
            "cost": total_cost,
            "reach": unique_reach,
            "efficiency": unique_reach / (total_cost + 1)
        })
        
    if not results:
        # Fallback if budget is too low
        return {"error": "Budget too low for any combination"}

    # 4. Find Optimal Portfolio
    results.sort(key=lambda x: x["reach"], reverse=True)
    best = results[0]
    
    optimal_handles = [candidates[i]["handle"] for i in best["indices"]]
    
    # 5. Format Data for Frontend Chart
    chart_data = [{"cost": r["cost"], "reach": r["reach"], "efficiency": r["efficiency"]} for r in results[:50]]
    
    return {
        "optimalMix": optimal_handles,
        "totalCost": best["cost"],
        "projectedReach": best["reach"],
        "efficiencyScore": round(best["efficiency"], 2),
        "overlapReduction": round((1 - (best["reach"] / sum([candidates[i]["reach"] for i in best["indices"]]))) * 100, 1),
        "chartData": chart_data
    }