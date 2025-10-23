from pydantic import BaseModel
from typing import List

class Answer(BaseModel):
    question: str
    answer: str

class QuestionRequest(BaseModel):
    product_name: str
    product_category: str
    history: List[Answer]

class GeneratedQuestion(BaseModel):
    next_question: str
    question_type: str  # e.g., 'text', 'boolean', 'multiple_choice'
    is_final_question: bool