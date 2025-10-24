from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import QuestionRequest, GeneratedQuestion
from .logic import generate_follow_up
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

# CORS middleware to allow our frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://altibbe-backend-2wzh.onrender.com"], # In production, lock this to your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "Altibbe AI Service is running"}

@app.post("/generate-questions", response_model=GeneratedQuestion)
async def generate_questions_endpoint(req: QuestionRequest):

    question, q_type, is_final = generate_follow_up(
        req.product_name,
        req.product_category,
        req.history
    )

    return GeneratedQuestion(
        next_question=question,
        question_type=q_type,
        is_final_question=is_final
    )

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)