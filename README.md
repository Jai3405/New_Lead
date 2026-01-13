# Prove It: The Influencer Operating System

**Current Version:** 1.0.0 (Production Alpha)
**Architecture:** Hybrid (Next.js Frontend + Python ML Microservice)

---

## 1. Executive Summary

**The Problem:** Influencer marketing is a $30B industry plagued by a "Pay First, Pray Second" workflow. Brands spend billions based on vanity metrics (followers), often losing 40%+ of their budget to fraud (bots) or inefficient pricing, with no way to verify ROI until after the campaign concludes.

**The Solution:** Prove It is a forensic intelligence platform that answers two critical questions:
1.  **Before:** Is this person real, and what is their true market value?
2.  **After:** Did this campaign actually generate revenue?

We replace "gut feeling" with **Statistical Forensics** and **Financial Optimization**.

---

## 2. System Architecture

The platform operates as a decoupled monolith, leveraging the best tools for UI and Data Science respectively.

### Frontend Layer (The Command Center)
-   **Framework:** Next.js 16 (React 19)
-   **Styling:** Tailwind CSS + Radix UI
-   **Visualization:** Recharts (D3-based)
-   **State Management:** React Context API (Campaign Persistence)

### Intelligence Layer (The ML Engine)
-   **Runtime:** Python 3.11 (FastAPI)
-   **Processing:** NumPy (Vector Math), Pandas (Data Frames)
-   **Machine Learning:** Scikit-Learn (Linear Regression), SciPy (Statistical Tests)
-   **NLP:** TextBlob + NLTK (Linguistic Analysis)

---

## 3. Core Technologies & Algorithms

Prove It is not a dashboard wrapper; it is a computational engine. Below are the specific algorithms implemented in the backend.

### A. Forensic Fraud Detection (Defense)
We do not rely on third-party "credibility scores". We calculate raw statistical probability.

1.  **Benford's Law Analysis (Chi-Square Test)**
    *   *Theory:* In organic datasets (e.g., like counts across 100 posts), the leading digit '1' appears ~30.1% of the time.
    *   *Implementation:* We extract leading digits from engagement metrics and perform a goodness-of-fit test against the Benford distribution.
    *   *Output:* A deviation score. Significant deviation (>15.0) indicates manufactured numbers (bot farms purchasing fixed-count likes).

2.  **Shannon Entropy (Linguistic Complexity)**
    *   *Theory:* Human language is chaotic (high entropy). Bot scripts are repetitive (low entropy).
    *   *Implementation:* We compute the Shannon entropy (bits per character) of the comment section.
    *   *Threshold:* Scores below 6.0 bits indicate low-complexity automated scripts.

### B. Strategic Valuation (Offense)
We prevent overpayment by calculating the "Intrinsic Value" of media.

1.  **Fair Price Predictor (Linear Regression)**
    *   *Method:* A Scikit-Learn `LinearRegression` model trained on a synthetic dataset of 1,000 market transactions.
    *   *Features:* Reach, Engagement Rate, Niche Premium, Fraud Discount.
    *   *Output:* Predicts the *True Market Value* vs. the Influencer's *Asking Price*.

2.  **Brand Fit Analysis (Jaccard Similarity)**
    *   *Method:* Natural Language Processing (TextBlob) extracts Noun Phrases from the influencer's bio and recent captions.
    *   *Math:* Computes the Jaccard Similarity Index between the Brand's semantic DNA and the Influencer's content topics.

### C. Portfolio Optimization (Financial Engineering)
We treat influencers as asset classes to maximize efficiency.

1.  **Efficient Frontier (Monte Carlo Simulation)**
    *   *Method:* We generate vector embeddings for influencer audiences based on "Niche Archetypes" (Tech, Beauty, Business).
    *   *Calculation:* We compute a Cosine Similarity Matrix to determine audience overlap.
    *   *Optimization:* The engine runs 2,000 Monte Carlo simulations to find the combination of creators that maximizes *Unique Reach* for a given budget, plotting the Efficient Frontier curve.

---

## 4. Operational Guide

### Prerequisites
-   Node.js 18+
-   Python 3.9+
-   pip

### Quick Start (Development)

**1. Launch the ML Engine (Backend)**
We have provided a unified startup script that handles virtual environment creation and dependency installation.

```bash
# From project root
./run_ml_backend.sh
```
*Output: server running on http://localhost:8000*

**2. Launch the Application (Frontend)**
Open a new terminal window.

```bash
cd prove-it
npm install
npm run dev
```
*Output: ready on http://localhost:3000*

---

## 5. API Reference (Internal Microservice)

The Python backend exposes the following endpoints for the frontend application.

| Endpoint | Method | Payload | Description |
| :--- | :--- | :--- | :--- |
| `/analyze/forensics` | POST | `{ metrics: int[], comments: str[] }` | Runs Chi-Square and Entropy tests on raw data. |
| `/predict/price` | POST | `{ reach: int, eng_rate: float, ... }` | Returns predicted fair price using the LR model. |
| `/analyze/brand-fit` | POST | `{ bio: str, captions: str[], tags: str[] }` | Returns semantic match score (0-100). |
| `/optimize-portfolio` | POST | `{ budget: int, candidates: [] }` | Returns optimal mix and Efficient Frontier coordinates. |

---

## 6. Project Structure

```
prove-it/
├── app/                    # Next.js App Router
│   ├── dashboard/          # Protected Application Routes
│   │   ├── ai-lab/         # Portfolio Optimization UI
│   │   ├── vetting/        # Forensic Analysis UI
│   │   └── campaigns/      # ROI Tracking & Contracts
│   └── page.tsx            # Landing Page (Lead Gen)
├── backend/                # Python Microservice
│   ├── main.py             # FastAPI Application & Algorithms
│   ├── requirements.txt    # ML Dependencies
│   └── venv/               # Isolated Python Environment
├── context/                # React State (Campaign Data)
└── public/                 # Static Assets
```

---

## 7. Scaling Roadmap

1.  **Data Ingestion:** Replace simulated inputs with live Instagram Graph API / TikTok API connections.
2.  **Computer Vision:** Implement OpenCV in the backend to analyze image content for "Visual DNA" matching.
3.  **Payment Rails:** Integrate Stripe Connect to handle influencer payouts directly, governed by the smart contracts.

---

**Prove It Analytics.**
*Vet Before. Prove After.*