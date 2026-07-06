from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="IDBI Innovate Python Backend",
    description="Microservice API assisting the SmartLead credit scoring and analytics orchestration",
    version="1.0.0"
)

# Set up CORS middleware to allow requests from the React frontend running on port 3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UnderwritingRequest(BaseModel):
    name: str
    role: str
    age: int
    location: str
    transactions_count: int

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "IDBI SmartLead Analytics Engine",
        "framework": "FastAPI (Python 3.11)",
        "message": "Welcome to IDBI Innovate Hackathon 2026 Microservice API."
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "python-fastapi", "port": 8000}

@app.post("/api/underwrite/simulate")
def simulate_underwriting(payload: UnderwritingRequest):
    """
    Simulates high-performance credit modeling calculations
    """
    score_modifier = 0
    if payload.role == "Salaried":
        score_modifier = 150
    elif payload.role == "Freelancer":
        score_modifier = 100
    elif payload.role == "Gig Worker":
        score_modifier = 75
    elif payload.role == "Farmer":
        score_modifier = 60
    else:
        score_modifier = 40

    base_score = 550 + (payload.transactions_count * 5) + score_modifier
    final_score = min(max(base_score, 300), 900)
    
    risk_tier = "High"
    if final_score >= 750:
        risk_tier = "Excellent"
    elif final_score >= 680:
        risk_tier = "Good"
    elif final_score >= 580:
        risk_tier = "Moderate"

    return {
        "score": final_score,
        "risk_tier": risk_tier,
        "modifier_applied": score_modifier,
        "verdict": "Approved" if final_score >= 580 else "Re-verify",
        "engine_logs": f"Processed active profile {payload.name} ({payload.role}) from {payload.location}."
    }
