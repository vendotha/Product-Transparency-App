# Altibbe Health - Product Transparency Assignment

**Submitted by:** Buvananand Vendotha
**Render App Link:** https://altibbe-submission-form.onrender.com
**Portfolio:** https://vendotha.onrender.com
**LinkedIn:** https://www.linkedin.com/in/vendotha/

---

## 1. Project Overview

This is a full-stack, AI-powered web application built to fulfill the Altibbe Health assignment. It allows companies to submit product information through an intelligent, dynamic interview process. The platform then generates a "Product Transparency Report" based on the submission.

The architecture is built on a modern microservice pattern:
* **Frontend (React+TS):** A clean, responsive UI. (Deployed on Vercel)
* **Backend (Node.js+TS):** A robust API for data and PDF generation. (Deployed on Vercel)
* **AI Service (Python/FastAPI):** An intelligent microservice using Google's Gemini 1.5 Flash to power the dynamic questionnaire. (Deployed on Render)
* **Database (PostgreSQL):** A normalized SQL database. (Hosted on Neon)

## 2. Feature List

* ✅ **Full-Stack Application:** Complete, functional, and deployed.
* ✅ **Dynamic Multi-Step Form:** A React frontend that intelligently displays one question at a time.
* ✅ **AI-Powered Question Engine:** A Python/FastAPI service using Gemini 1.5 Flash to generate context-aware, relevant follow-up questions.
* ✅ **PDF Report Generation:** A Node.js endpoint (`/api/products/:id/report`) that generates a professional PDF report of all questions and answers.
* ✅ **Robust DB Schema:** A normalized PostgreSQL schema to store products, questions, and their relationships.
* ✅ **Clean & Responsive UI:** A professional, mobile-first design that aligns with a health-first mission.

## 3. AI Service Documentation (`/ai-service`)

The AI service is a FastAPI microservice with one primary endpoint:

**`POST /generate-questions`**
This endpoint generates the next logical question based on the conversation history.

**Request Body:**
```json
{
  "product_name": "EcoGlow Face Serum",
  "product_category": "Skincare",
  "history": [
    { "question": "What is the primary category...", "answer": "Skincare" },
    { "question": "Is this product tested on animals?", "answer": "No, it is 100% cruelty-free." }
  ]
}
```

**Response Body:**
```json
{
  "next_question": "Does this product contain any parabens, sulfates, or phthalates?",
  "question_type": "boolean",
  "is_final_question": false
}
```

---

## (Bonus) Reflection

**How did you use AI tools in development?**
I used AI tools in two capacities. First, **GitHub Copilot** was used as a pair programmer to accelerate development, write boilerplate code (like getters/setters or initial file setups), and suggest TypeScript types. Second, the core "AI Innovation" feature is powered by **Google's Gemini 2.5 Flash API**. This LLM was not just *used*, but *instructed* via a system prompt to act as an expert in product compliance, embodying the specific principles of Health, Wisdom, and Virtue.

**What principles guided your architecture, design, and product transparency logic?**
My architecture was guided by the principle of **separation of concerns**. A microservice architecture (React frontend, Node API, Python AI) was chosen for scalability, maintainability, and to demonstrate "cross-role" collaboration. This ensures that the AI logic can be updated independently of the main application.

My design and logic were guided directly by **Altibbe's Mission**:
* **Health:** The AI system prompt is explicitly instructed to prioritize questions about safety, allergens, and ingredients.
* **Wisdom:** The system applies knowledge intelligently. The backend identifies the product "category" from an early answer and feeds this context back to the AI, which allows it to ask *wiser*, more specific follow-up questions (e.g., asking about "parabens" for "Skincare" vs. "GMOs" for "Food").
* **Virtue:** The entire platform is an exercise in building trust. The AI is prompted to ask about ethical sourcing and environmental impact. The final, uneditable PDF report serves as a permanent, transparent record, which is the very definition of virtue in this context.
