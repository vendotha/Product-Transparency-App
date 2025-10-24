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
│  Vercel ☁️      │      │  Vercel ☁️      │      │  Render ☁️      │
└─────────────────┘      └─────────────────┘      └─────────────────┘
                                 │
                                 ▼
                         ┌─────────────────┐
                         │   PostgreSQL    │
                         │                 │
                         │    Neon ☁️      │
                         └─────────────────┘
```

**Design Philosophy:** Microservices architecture enabling independent scaling, deployment, and maintenance of each component while maintaining seamless integration.

---

## ✨ Key Features

### 🤖 **Intelligent Question Generation**
- **Dynamic Context Awareness:** AI adapts questions based on product category and previous answers
- **Smart Follow-ups:** Gemini 2.5 Flash generates relevant, non-repetitive questions
- **Category-Specific Intelligence:** Different question paths for Skincare vs. Food vs. Electronics

### 📋 **Seamless User Experience**
- **One Question at a Time:** Reduces cognitive load and improves completion rates
- **Progress Tracking:** Visual indicators keep users informed
- **Mobile-First Design:** Responsive across all devices
- **Instant Feedback:** Real-time validation and guidance

### 📄 **Professional Reporting**
- **PDF Generation:** Automated, professional transparency reports
- **Permanent Records:** Immutable documentation for compliance
- **Accessible via API:** `/api/products/:id/report` endpoint

### 🗄️ **Enterprise-Grade Database**
- **Normalized Schema:** Efficient, scalable PostgreSQL design
- **Relationship Mapping:** Products, questions, and answers properly linked
- **Cloud-Hosted:** Reliable Neon infrastructure

---

## 🚀 Technical Deep Dive

### Frontend Stack
- **React 18** with TypeScript for type safety
- **Modern CSS** with mobile-first approach
- **Form Management** with intelligent state handling
- **Deployed on Vercel** for optimal performance

### Backend Stack
- **Node.js + Express** with TypeScript
- **RESTful API** design principles
- **PDF Generation** using industry-standard libraries
- **Deployed on Vercel** with serverless functions

### AI Service Stack
- **FastAPI** for high-performance Python APIs
- **Google Gemini 2.5 Flash** for intelligent question generation
- **Context Management** with conversation history
- **Deployed on Render** with auto-scaling

### Database
- **PostgreSQL 14+** on Neon
- **Normalized Schema** for data integrity
- **Indexed Queries** for performance

---

## 🤖 AI Service API Documentation

### Endpoint: `POST /generate-questions`

Generates contextually relevant next question based on conversation history.

**Request:**
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
      "answer": "No, it is 100% cruelty-free."
    }
  ]
}
```

**Response:**
```json
{
  "next_question": "Does this product contain any parabens, sulfates, or phthalates?",
  "question_type": "boolean",
  "is_final_question": false
}
```

**Intelligence Features:**
- ✅ Category-aware questioning
- ✅ Avoids repetition
- ✅ Adapts complexity based on answers
- ✅ Determines conversation completion naturally

---

## 🎨 Design Principles

### Aligned with Altibbe's Mission

#### 🌿 **Health**
The AI prioritizes questions about:
- Safety certifications
- Allergen information
- Ingredient transparency
- Health claims verification

#### 🧠 **Wisdom**
Smart context utilization:
- Category detection from early responses
- Intelligent branching logic
- Domain-specific question sets
- No redundant questions

#### ⚖️ **Virtue**
Building trust through:
- Transparent process
- Immutable PDF reports
- Ethical sourcing questions
- Environmental impact assessment

---

## 💡 Development Philosophy

### AI-Assisted Development
**GitHub Copilot** served as a development accelerator:
- Boilerplate code generation
- TypeScript type suggestions
- Pattern completion
- Documentation assistance

### AI-Powered Innovation
**Google Gemini 2.5 Flash** powers the core feature:
- Custom system prompt engineering
- Expert-level product compliance knowledge
- Mission-aligned questioning strategy
- Natural conversation flow

### Architectural Decisions

**Why Microservices?**
- 🔄 **Independent Scaling:** AI service can scale separately during high load
- 🔧 **Maintainability:** Update AI logic without touching main application
- 🎯 **Separation of Concerns:** Each service has a single responsibility
- 🌐 **Technology Freedom:** Best tool for each job (Python for AI, Node for API)

**Why This Tech Stack?**
- **TypeScript:** Type safety reduces bugs in production
- **React:** Component reusability and maintainability
- **FastAPI:** Python's fastest framework for AI services
- **PostgreSQL:** ACID compliance for data integrity

---

## 📊 Database Schema Highlights

```sql
products
├── id (PK)
├── name
├── category
└── created_at

questions
├── id (PK)
├── product_id (FK)
├── question_text
├── answer_text
├── question_type
└── sequence_number

reports
├── id (PK)
├── product_id (FK)
├── generated_at
└── pdf_url
```

*Normalized design ensures data integrity and efficient querying*

---

## 🎯 What Makes This Special

1. **Beyond Basic Forms:** This isn't just a questionnaire—it's an intelligent conversation
2. **Mission-Driven AI:** The system prompt embodies Altibbe's core values
3. **Production-Ready:** Fully deployed, tested, and scalable architecture
4. **Future-Proof:** Microservices enable easy feature additions
5. **Enterprise Quality:** Professional code, documentation, and deployment practices

---

## 🔗 Quick Links

- **🌐 Live Application:** [altibbe-submission-form.onrender.com](https://altibbe-submission-form.onrender.com)
- **👤 Portfolio:** [vendotha.onrender.com](https://vendotha.onrender.com)
- **💼 LinkedIn:** [linkedin.com/in/vendotha](https://www.linkedin.com/in/vendotha/)

---

## 🙏 Acknowledgments

Built with dedication for **Altibbe Health**, combining modern technology with meaningful purpose. This project represents not just technical capability, but a commitment to the mission of transparency, health, and trust.

---

<div align="center">

**Made with ❤️ and ☕ by Buvananand Vendotha**

*"Technology in service of transparency"*

</div>
