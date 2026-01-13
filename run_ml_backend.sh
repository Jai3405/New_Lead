#!/bin/bash

# Navigate to backend directory
cd backend

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "🐍 Creating Python Virtual Environment..."
    python3 -m venv venv
    
    echo "📦 Installing Dependencies (Scikit-Learn, Pandas, NumPy)..."
    source venv/bin/activate
    pip install -r requirements.txt
    
    # Download textblob corpora (needed for NLP)
    python -m textblob.download_corpora
else
    echo "✅ Virtual Environment found. Activating..."
    source venv/bin/activate
fi

# Run the Server
echo "🚀 Starting ML Engine on http://localhost:8000"
uvicorn main:app --reload
