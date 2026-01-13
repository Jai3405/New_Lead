import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from scipy.stats import entropy, chisquare
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from textblob import TextBlob
import math

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ML MODEL STATE ---
price_model = None
scaler = None

# --- TRAINING SIMULATION (Run on Startup) ---
def train_price_model():
    """
    Trains a real Linear Regression model using scikit-learn on a synthetic dataset.
    This replaces hardcoded pricing formulas with a learned statistical model.
    """
    global price_model, scaler
    
    # Create a synthetic dataset of 1,000 influencers
    # Features: Reach, Engagement Rate, Niche Factor (encoded), Fraud Score
    np.random.seed(42)
    n_samples = 1000
    
    reach = np.random.randint(1000, 1000000, n_samples)
    eng_rate = np.random.uniform(0.5, 10.0, n_samples)
    fraud_score = np.random.uniform(0, 100, n_samples)
    
    # Target Variable: Price
    # We define a "ground truth" formula with noise to simulate market conditions
    # Price ~= (Reach * 0.01) * (EngRate * 0.5) * (1 - Fraud/100)
    price = (reach * 0.015) * (1 + eng_rate/5) * (1 - (fraud_score/150)) + np.random.normal(0, 50, n_samples)
    price = np.maximum(price, 50) # Minimum price $50
    
    # Prepare Data Frame
    df = pd.DataFrame({
        'reach': reach,
        'eng_rate': eng_rate,
        'fraud_score': fraud_score
    })
    
    # Train Model
    scaler = StandardScaler()
    X = scaler.fit_transform(df)
    y = price
    
    model = LinearRegression()
    model.fit(X, y)
    
    price_model = model
    print(f"ML Model Trained. Coeffs: {model.coef_}, Intercept: {model.intercept_}")

@app.on_event("startup")
async def startup_event():
    train_price_model()

# --- DATA STRUCTURES ---

class ForensicRequest(BaseModel):
    metrics: List[int] # Like counts per post
    comments: List[str] # Recent comments

class PriceRequest(BaseModel):
    reach: int
    engagement_rate: float
    fraud_score: float
    niche: str

class BrandFitRequest(BaseModel):
    influencer_bio: str
    recent_captions: List[str]
    brand_keywords: List[str]

# --- ENDPOINTS ---

@app.post("/analyze/forensics")
def analyze_forensics(request: ForensicRequest):
    """
    Uses SciPy and NumPy to detect statistical anomalies.
    """
    metrics = np.array(request.metrics)
    comments = request.comments
    
    # 1. BENFORD'S LAW (Chi-Square Test)
    # Extract first digits
    first_digits = [int(str(n)[0]) for n in metrics if n > 0]
    observed_counts = np.zeros(9)
    for d in first_digits:
        if 1 <= d <= 9:
            observed_counts[d-1] += 1
            
    total = sum(observed_counts)
    if total == 0:
        return {"benford_score": 0, "is_suspicious": False}

    # Expected Benford Frequencies (1 to 9)
    BENFORD_PROBS = np.array([0.301, 0.176, 0.125, 0.097, 0.079, 0.067, 0.058, 0.051, 0.046])
    expected_counts = BENFORD_PROBS * total
    
    # Run Chi-Square calculation
    # We manually calculate the sum of squared differences normalized by expected
    # to avoid scipy strict errors on low counts, but using standard stats approach.
    chi_square_stat = np.sum(((observed_counts - expected_counts) ** 2) / expected_counts)
    
    # Critical value for 8 degrees of freedom at p=0.05 is ~15.5
    is_suspicious_benford = chi_square_stat > 15.5
    
    # Format for chart
    benford_chart = []
    for i in range(9):
        benford_chart.append({
            "digit": i+1, 
            "observed": (observed_counts[i] / total) * 100,
            "expected": BENFORD_PROBS[i] * 100
        })

    # 2. SHANNON ENTROPY (Language Complexity)
    # We compute entropy of the character distribution across all comments
    full_text = " ".join(comments).lower()
    
    if not full_text:
        entropy_score = 0
    else:
        # Calculate character frequencies
        _, counts = np.unique(list(full_text), return_counts=True)
        probs = counts / len(full_text)
        # Calculate standard Shannon entropy
        ent = entropy(probs, base=2) 
        # Normalize to 0-10 scale (English text usually around 4.0-4.5 bits)
        entropy_score = min(10, (ent / 4.5) * 10)

    verdict = "Organic"
    if entropy_score < 6.0: verdict = "Bot-Like"
    elif entropy_score < 7.5: verdict = "Suspicious"

    return {
        "benford": {
            "chi_square": float(chi_square_stat),
            "is_suspicious": bool(is_suspicious_benford),
            "chart_data": benford_chart
        },
        "entropy": {
            "score": float(entropy_score),
            "verdict": verdict
        }
    }

@app.post("/predict/price")
def predict_price(request: PriceRequest):
    """
    Uses the pre-trained Scikit-Learn Linear Regression model to predict fair value.
    """
    if price_model is None:
        raise HTTPException(status_code=503, detail="Model not trained yet")
        
    # Prepare input vector
    # 'reach', 'eng_rate', 'fraud_score'
    X_new = pd.DataFrame({
        'reach': [request.reach],
        'eng_rate': [request.engagement_rate],
        'fraud_score': [request.fraud_score]
    })
    
    # Scale input using the same scaler from training
    X_scaled = scaler.transform(X_new)
    
    # Predict
    predicted_price = float(price_model.predict(X_scaled)[0])
    predicted_price = max(50, predicted_price) # Floor at $50
    
    # Calculate "Market Rate" (Vanity metric baseline)
    # Usually $10 per 1,000 followers regardless of quality
    market_rate = (request.reach / 1000) * 10
    
    ratio = market_rate / predicted_price
    valuation = "Fair"
    if ratio < 0.8: valuation = "Undervalued"
    elif ratio > 1.5: valuation = "Overpriced"
    
    return {
        "estimated_price": int(predicted_price),
        "market_rate": int(market_rate),
        "valuation": valuation,
        "model_version": "sklearn_lr_v1"
    }

@app.post("/analyze/brand-fit")
def analyze_brand_fit(request: BrandFitRequest):
    """
    Uses NLP (TextBlob) to extract Noun Phrases and compute Jaccard Similarity.
    """
    # Combine bio and captions
    corpus = request.influencer_bio + " " + " ".join(request.recent_captions)
    blob = TextBlob(corpus.lower())
    
    # Extract noun phrases (simple topic extraction)
    # Filter for words > 2 chars to remove noise
    extracted_topics = list(set([w.lower() for w in blob.noun_phrases if len(w) > 2]))
    
    # Calculate overlap with brand keywords
    brand_set = set([k.lower() for k in request.brand_keywords])
    influencer_set = set(extracted_topics)
    
    intersection = brand_set.intersection(influencer_set)
    union = brand_set.union(influencer_set)
    
    if len(union) == 0:
        jaccard_score = 0
    else:
        jaccard_score = len(intersection) / len(brand_set) # Modified Jaccard (Recall-focused)
        
    score_percent = min(100, int(jaccard_score * 100))
    
    return {
        "score": score_percent,
        "matches": list(intersection),
        "extracted_topics": list(influencer_set)[:10] # Return top 10 topics found
    }
