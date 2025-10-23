import os
import google.generativeai as genai
from typing import List, Tuple
from .models import Answer

# ---
# WARNING: Hardcoding keys is a major security risk.
# This is for testing only. Do not commit this file to GitHub.
# ---
try:
    # 1. REPLACE THE PLACEHOLDER WITH YOUR ACTUAL KEY
    genai.configure(api_key="AIzaSyCxpdhDNx9MMnDKqPUIRCVA05pcu2DXzrg")
except Exception as e:
    print(f"Error configuring Gemini API: {e}")


# This prompt is engineered to match the assignment's mission
SYSTEM_INSTRUCTION = """
You are an expert in product transparency for Altibbe Health.
Your personality is guided by 3 principles:
1.  **Health:** You prioritize questions about safety, ingredients, allergens, and side effects.
2.  **Wisdom:** You apply knowledge intelligently, asking logical follow-ups based on answers.
3.  **Virtue:** You are ethical, asking about sourcing, labor practices, and environmental impact.

You will be given a product name, category, and conversation history.
Your job is to return **one single follow-up question**.

-   If the category is 'Food', ask about GMOs, allergens, sourcing.
-   If 'Skincare', ask about parabens, animal testing, allergens.
-   If 'Electronics', ask about conflict minerals, battery safety.

-   Return ONLY the question.
-   If you have enough information (after 4-6 good questions), return the exact text: `FINAL_QUESTION`.
"""

model = genai.GenerativeModel('gemini-2.5-flash', system_instruction=SYSTEM_INSTRUCTION)
def generate_follow_up(product_name: str, category: str, history: List[Answer]) -> Tuple[str, str, bool]:

    chat_history = []
    for item in history:
        chat_history.append({"role": "model", "parts": [item.question]})
        chat_history.append({"role": "user", "parts": [item.answer]})

    chat = model.start_chat(history=chat_history)

    prompt = f"""
    Product: "{product_name}"
    Category: "{category}"
    Based on our conversation, what is the single next most important question?
    Remember: (Health, Wisdom, Virtue). Return ONLY the question or `FINAL_QUESTION`.
    """

    try:
        response = chat.send_message(prompt)
        next_question = response.text.strip()

        if "FINAL_QUESTION" in next_question or len(history) >= 5: # Set a max limit
            return "Thank you. We are now generating your report.", 'text', True

        # Determine question type for the frontend
        q_lower = next_question.lower()
        q_type = 'boolean' if q_lower.startswith(("is ", "are ", "does ", "do ")) else 'text'

        return next_question, q_type, False

    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return "An error occurred. Please try again.", 'text', True # End on error