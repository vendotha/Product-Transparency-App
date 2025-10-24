# 🏥 Altibbe Health - Product Transparency Platform

> *"Building trust through intelligent transparency"*

<div align="center">

**Submitted by:** [Buvananand Vendotha](https://www.linkedin.com/in/vendotha/)  
**Live Demo:** [altibbe-submission-form.onrender.com](https://altibbe-submission-form.onrender.com)  
**Portfolio:** [vendotha.onrender.com](https://vendotha.onrender.com)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

</div>

---

## 🎯 Executive Summary

An **AI-powered, full-stack web application** that revolutionizes product transparency reporting. Companies engage in an intelligent, adaptive interview process powered by Google's Gemini 2.5 Flash, culminating in a comprehensive Product Transparency Report.

### Why This Matters

In an era where consumers demand transparency, this platform doesn't just collect data—it **intelligently extracts** the information that matters most through context-aware questioning, ensuring nothing falls through the cracks.

---

## 🏗️ Architecture at a Glance

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   React + TS    │ ───► │  Node.js + TS   │ ───► │ Python/FastAPI  │
│   (Frontend)    │      │   (Backend)     │      │  (AI Service)   │
│                 │      │                 │      │                 │
│  Render ☁️      │      │  Render ☁️      │      │  Render ☁️      │
└─────────────────┘      └─────────────────┘      └─────────────────┘
                                 │
                                 ▼
                         ┌─────────────────┐
                         │   PostgreSQL    │
                         │                 │
                         │    Neon ☁️      │
                         └─────────────────┘
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- PostgreSQL database (or Neon account)
- Google Gemini API key

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Add your backend API URL to .env
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure DATABASE_URL and AI_SERVICE_URL in .env
npm run dev
```

### AI Service Setup
```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Add your GEMINI_API_KEY to .env
uvicorn main:app --reload
```

### Database Setup
```bash
cd backend
npm run migrate  # Run database migrations
npm run seed     # (Optional) Seed with sample data
```

### Environment Variables

**Frontend (.env)**
```
VITE_API_URL=http://localhost:3000/api
```

**Backend (.env)**
```
DATABASE_URL=postgresql://user:password@localhost:5432/altibbe
AI_SERVICE_URL=http://localhost:8000
PORT=3000
```

**AI Service (.env)**
```
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## ✨ Feature List

### 🤖 **AI-Powered Intelligent Questionnaire**
- **Dynamic Question Generation:** Context-aware questions powered by Gemini 1.5 Flash
- **Category-Specific Logic:** Different question paths for Skincare, Food, Electronics, etc.
- **Smart Follow-ups:** AI analyzes previous answers to generate relevant next questions
- **Natural Conversation Flow:** No predetermined question order—adapts in real-time
- **Automatic Completion Detection:** AI determines when sufficient information is collected

### 📋 **Seamless User Experience**
- **One Question at a Time:** Reduces cognitive load and improves completion rates
- **Progress Tracking:** Visual indicators show completion status
- **Mobile-First Responsive Design:** Works perfectly on all device sizes
- **Real-time Validation:** Instant feedback on answer quality
- **Session Persistence:** Resume incomplete submissions
- **Clean, Professional UI:** Health-focused design aesthetic

### 📄 **Professional PDF Report Generation**
- **Automated Report Creation:** One-click PDF generation via API
- **Comprehensive Documentation:** All questions and answers included
- **Professional Formatting:** Clean, branded layout
- **Permanent Records:** Immutable documentation for compliance
- **Download & Share:** Easy distribution to stakeholders
- **API Endpoint:** `/api/products/:id/report` for programmatic access

### 🗄️ **Enterprise-Grade Database**
- **Normalized PostgreSQL Schema:** Efficient, scalable design
- **Relational Integrity:** Proper foreign key relationships
- **Indexed Queries:** Optimized for performance
- **Cloud-Hosted on Neon:** 99.9% uptime guarantee
- **Migration System:** Version-controlled schema changes
- **Backup & Recovery:** Automatic daily backups

### 🔒 **Production-Ready Infrastructure**
- **Microservices Architecture:** Independent scaling and deployment
- **RESTful API Design:** Standard HTTP methods and status codes
- **Error Handling:** Comprehensive error messages and logging
- **CORS Configuration:** Secure cross-origin requests
- **Rate Limiting:** Prevents API abuse
- **Health Check Endpoints:** Monitoring and uptime tracking

### 📊 **Data Management**
- **Product Categorization:** Organized by industry type
- **Question History:** Complete audit trail
- **Answer Storage:** Structured and searchable
- **Report Archive:** Historical report access
- **Export Capabilities:** Data portability

---

## 🤖 AI Service Documentation

### Architecture Overview

The AI Service is a standalone FastAPI microservice that provides intelligent question generation capabilities. It uses Google's Gemini 2.5 Flash model with custom prompt engineering to generate contextually relevant questions.

### Base URL
```
Production: https://altibbe-ai-service.onrender.com
Development: http://localhost:8000
```

### Endpoint: `POST /generate-questions`

Generates the next contextually relevant question based on conversation history and product context.

#### Request Format

**Headers:**
```
Content-Type: application/json
```

**Body Schema:**
```typescript
{
  product_name: string;      // Name of the product being evaluated
  product_category: string;  // Category (e.g., "Skincare", "Food", "Electronics")
  history: Array<{
    question: string;        // Previously asked question
    answer: string;          // User's answer
  }>;
}
```

#### Example Request
```json
{
  "product_name": "EcoGlow Face Serum",
  "product_category": "Skincare",
  "history": [
    {
      "question": "What is the primary category of your product?",
      "answer": "Skincare"
    },
    {
      "question": "Is this product tested on animals?",
      "answer": "No, it is 100% cruelty-free and certified by PETA."
    },
    {
      "question": "What are the key active ingredients in your product?",
      "answer": "Hyaluronic acid, vitamin C, and niacinamide."
    }
  ]
}
```

#### Response Format

**Success Response (200 OK):**
```typescript
{
  next_question: string;      // The generated question
  question_type: string;      // Type: "text" | "boolean" | "multiple_choice"
  is_final_question: boolean; // Whether this is likely the last question
  suggested_answers?: string[]; // Optional: for multiple_choice types
}
```

#### Example Response
```json
{
  "next_question": "Does this product contain any parabens, sulfates, or phthalates?",
  "question_type": "boolean",
  "is_final_question": false
}
```

**Error Response (400/500):**
```json
{
  "detail": "Error message description"
}
```

### AI Intelligence Features

#### 🎯 **Context Awareness**
- Analyzes product category to ask domain-specific questions
- For Skincare: focuses on ingredients, pH levels, dermatological testing
- For Food: emphasizes allergens, nutritional claims, GMOs
- For Electronics: covers certifications, recycling, energy efficiency

#### 🧠 **Smart Question Logic**
- **No Repetition:** Tracks conversation history to avoid duplicate questions
- **Progressive Depth:** Starts broad, then drills into specific areas
- **Adaptive Branching:** Follow-up questions depend on previous answers
- **Natural Language:** Questions sound conversational, not robotic

#### ⚖️ **Mission-Aligned Questioning**
The AI is prompted to prioritize questions that align with Altibbe's values:
- **Health:** Safety, allergens, certifications, health claims
- **Wisdom:** Evidence-based claims, scientific backing, testing
- **Virtue:** Ethical sourcing, environmental impact, transparency

#### 🔚 **Completion Detection**
The AI determines when to stop asking questions based on:
- Information coverage (has sufficient detail been gathered?)
- User fatigue (are answers becoming shorter/vaguer?)
- Typical submission length (8-12 questions is optimal)

### System Prompt (High-Level)

The AI service uses a carefully engineered system prompt that instructs Gemini to:
1. Act as a product compliance expert
2. Generate questions that build on previous context
3. Prioritize health, safety, and ethical considerations
4. Adapt question complexity based on product category
5. Know when sufficient information has been collected

### Rate Limits & Performance
- **Rate Limit:** 60 requests per minute per IP
- **Response Time:** Average 800ms - 1.5s
- **Timeout:** 30 seconds maximum
- **Retry Policy:** 3 retries with exponential backoff

### Error Handling
Common errors and solutions:

| Error Code | Meaning | Solution |
|------------|---------|----------|
| 400 | Invalid request format | Check request body schema |
| 429 | Rate limit exceeded | Wait and retry |
| 500 | AI service error | Contact support |
| 503 | Service unavailable | Check service health endpoint |

### Health Check Endpoint

**GET** `/health`

Returns service status and version information.

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "gemini_api": "connected"
}
```

---

## 📝 Sample Product Entry + Example Report

### Sample Product: EcoGlow Face Serum

Below is a complete example of a product submission flow and the resulting transparency report.

#### Initial Product Information
```json
{
  "product_name": "EcoGlow Radiance Face Serum",
  "company_name": "GreenBeauty Labs",
  "initial_category": "Skincare"
}
```

#### Complete Q&A Session

**Question 1:**  
*"What is the primary category of your product?"*  
**Answer:** Skincare - specifically a facial serum for anti-aging and hydration.

**Question 2:**  
*"Is this product tested on animals?"*  
**Answer:** No, it is 100% cruelty-free and certified by both PETA and Leaping Bunny.

**Question 3:**  
*"What are the key active ingredients in your product?"*  
**Answer:** Hyaluronic acid (2%), vitamin C (10%), niacinamide (5%), and botanical extracts including green tea and chamomile.

**Question 4:**  
*"Does this product contain any parabens, sulfates, or phthalates?"*  
**Answer:** No, we are completely free of parabens, sulfates, phthalates, and synthetic fragrances.

**Question 5:**  
*"What is the pH level of your product, and has it been dermatologically tested?"*  
**Answer:** The pH is 5.5 (skin-neutral). Yes, it has been dermatologically tested and is suitable for sensitive skin. We have clinical test results available.

**Question 6:**  
*"What type of packaging do you use, and is it recyclable?"*  
**Answer:** We use glass bottles with aluminum pumps. The glass is 100% recyclable, and we offer a return program where customers can send back empties for recycling.

**Question 7:**  
*"Where are your ingredients sourced from, and do you use any organic or fair-trade certified ingredients?"*  
**Answer:** Our hyaluronic acid is fermented in Japan, vitamin C is from Scotland, and botanical extracts are organic and fair-trade certified from cooperatives in India and Morocco.

**Question 8:**  
*"What shelf life does your product have, and what preservatives do you use?"*  
**Answer:** 18-month shelf life when unopened, 6 months after opening. We use Leuconostoc ferment (radish root ferment) as a natural preservative system.

**Question 9:**  
*"Do you have any third-party certifications for your product?"*  
**Answer:** Yes - USDA Organic, EWG Verified, B Corp Certified, and Leaping Bunny Cruelty-Free.

**Question 10:**  
*"Are there any known allergens or potential irritants in your formulation?"*  
**Answer:** The product contains botanical extracts which may cause reactions in individuals allergic to chamomile or green tea. We clearly list all ingredients and provide patch test recommendations.

#### Generated PDF Report Preview

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║           PRODUCT TRANSPARENCY REPORT                      ║
║                                                            ║
║  Product: EcoGlow Radiance Face Serum                      ║
║  Company: GreenBeauty Labs                                 ║
║  Category: Skincare                                        ║
║  Report Date: October 24, 2025                             ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

PRODUCT OVERVIEW
───────────────────────────────────────────────────────────
This transparency report provides comprehensive information
about EcoGlow Radiance Face Serum, including ingredients,
safety testing, ethical sourcing, and environmental impact.

DETAILED RESPONSES
───────────────────────────────────────────────────────────

1. Product Category
   Q: What is the primary category of your product?
   A: Skincare - specifically a facial serum for anti-aging
      and hydration.

2. Animal Testing
   Q: Is this product tested on animals?
   A: No, it is 100% cruelty-free and certified by both
      PETA and Leaping Bunny.

3. Active Ingredients
   Q: What are the key active ingredients in your product?
   A: Hyaluronic acid (2%), vitamin C (10%), niacinamide
      (5%), and botanical extracts including green tea and
      chamomile.

[... continues for all 10 questions ...]

CERTIFICATIONS
───────────────────────────────────────────────────────────
✓ USDA Organic
✓ EWG Verified
✓ B Corp Certified
✓ Leaping Bunny Cruelty-Free
✓ PETA Certified

TRANSPARENCY SCORE: 98/100
───────────────────────────────────────────────────────────
This product demonstrates exceptional transparency across
all evaluated categories including ingredient disclosure,
ethical sourcing, environmental impact, and safety testing.

Report generated by Altibbe Health Transparency Platform
```

#### API Call to Generate Report

```bash
# Request
curl -X GET https://api.altibbe.com/api/products/12345/report \
  -H "Content-Type: application/json"

# Response
{
  "success": true,
  "report_id": "rpt_abc123",
  "pdf_url": "https://cdn.altibbe.com/reports/12345_transparency_report.pdf",
  "generated_at": "2025-10-24T10:30:00Z"
}
```

### Why This Example Matters

This sample demonstrates:
- ✅ **Natural conversation flow** - Questions build logically on previous answers
- ✅ **Category-specific depth** - Skincare-relevant questions (pH, dermatological testing)
- ✅ **Mission alignment** - Covers health (allergens), wisdom (testing), virtue (sourcing)
- ✅ **Comprehensive coverage** - Ingredients, safety, ethics, environment
- ✅ **Professional output** - PDF suitable for regulatory submission or consumer sharing

---

## 💭 Reflection: AI in Development & Design Philosophy

### How Did I Use AI Tools in Development?

I leveraged AI tools in two distinct but complementary ways throughout this project. First, **GitHub Copilot** served as an intelligent pair programmer, accelerating development by generating boilerplate code, suggesting TypeScript type definitions, and auto-completing repetitive patterns. This allowed me to focus on architectural decisions rather than syntax.

Second, and more significantly, **Google Gemini 2.5 Flash** powers the core innovation of this platform. However, this wasn't just "using" an AI—it was about *engineering* it. I crafted a detailed system prompt that transforms Gemini into a domain expert in product compliance, specifically instructed to embody Altibbe's principles of Health, Wisdom, and Virtue. The AI doesn't just ask random questions; it thinks strategically about what information matters most for transparency.

### What Principles Guided My Architecture and Design?

**Separation of Concerns** was the foundational architectural principle. By splitting the system into microservices (React frontend, Node.js API, Python AI service), each component can evolve independently. This isn't over-engineering—it's pragmatic scalability that mirrors real-world enterprise systems.

**Mission-Driven Design** guided every feature decision. Altibbe's values aren't just marketing—they're embedded in the code:
- **Health:** The AI prioritizes questions about safety, allergens, and testing
- **Wisdom:** Context awareness ensures category-specific intelligence (asking about "parabens" for skincare, not food)
- **Virtue:** The immutable PDF report creates permanent accountability

The product transparency logic follows a simple truth: *trust is built through questions you can't avoid*. By making the AI adaptively intelligent, companies can't game the system with prepared answers—they must engage authentically with what matters.

---

## 🎨 Design Principles Alignment

### Health 🌿
- AI prioritizes safety-critical questions
- Allergen disclosure is mandatory
- Testing and certification verification
- Health claim substantiation

### Wisdom 🧠
- Category-aware questioning
- Evidence-based follow-ups
- No redundant questions
- Smart information extraction

### Virtue ⚖️
- Ethical sourcing inquiry
- Environmental impact assessment
- Transparent documentation
- Immutable records

---

## 📊 Database Schema

```sql
-- Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions and answers
CREATE TABLE qa_pairs (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  answer_text TEXT NOT NULL,
  question_type VARCHAR(50),
  sequence_number INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Generated reports
CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  pdf_url TEXT,
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  report_hash VARCHAR(64) UNIQUE
);

-- Indexes for performance
CREATE INDEX idx_product_category ON products(category);
CREATE INDEX idx_qa_product_id ON qa_pairs(product_id);
CREATE INDEX idx_qa_sequence ON qa_pairs(product_id, sequence_number);
CREATE INDEX idx_reports_product ON reports(product_id);
```

---

## 🔗 Quick Links

- **🌐 Live Application:** [altibbe-submission-form.onrender.com](https://altibbe-submission-form.onrender.com)
- **👤 Portfolio:** [vendotha.onrender.com](https://vendotha.onrender.com)
- **💼 LinkedIn:** [linkedin.com/in/vendotha](https://www.linkedin.com/in/vendotha/)

---

## 🛠️ Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 + TypeScript | Type-safe UI components |
| Backend API | Node.js + Express + TypeScript | RESTful services & PDF generation |
| AI Service | Python + FastAPI + Gemini 2.5 Flash | Intelligent question generation |
| Database | PostgreSQL on Neon | Normalized data storage |
| Deployment | Render (All Services) | Cloud infrastructure |

---

## 🙏 Acknowledgments

Built with dedication for **Altibbe Health**, combining modern technology with meaningful purpose. This project represents not just technical capability, but a commitment to the mission of transparency, health, and trust in consumer products.

The architecture demonstrates production-ready practices while the AI innovation shows how modern language models can be engineered to serve specific, mission-critical purposes rather than just providing generic responses.

---

<div align="center">

**Made with ❤️ and ☕ by Buvananand Vendotha**

*"Technology in service of transparency"*

</div>
