# IDBI SmartLead AI Platform
> **Where Banking Meets The Future Of FinTech • Inclusive Credit Scoring for Indian Demographics**

---

## 🏆 Hackathon Track Selected
### **Alternative Credit Appraisal Engine (UPI-Powered Behavioral Underwriting)**
This platform acts as an alternative credit underwriting engine designed to assess the creditworthiness of unbanked and under-banked Indian demographics (Gig workers, farmers, independent freelancers, and students) who lack traditional credit histories. By analyzing alternative digital footprints—specifically raw UPI transaction streams—it builds robust, audit-ready behavioral scores alongside real-time explainable AI appraisal summaries.

---

## 📌 Project Overview & Tagline
**"Unlocking Credit for the Next Billion: UPI-Powered Behavioral Underwriting & Accessible Voice-Enabled Banking."**

**IDBI SmartLead AI** is a state-of-the-art fintech credit decisioning platform engineered for the **IDBI Innovate Hackathon 2026**. It appraises underserved micro-segments (including Gig Workers, Farmers, Independent Freelancers, and Students) by parsing live or synthetic UPI transaction streams to build robust alternative credit profiles. It uses Gemini AI for explainable decisioning, paired with high-performance Python microservices and accessible frontends.

---

## 🚀 Key Platform Features

### 1. Alternative Credit & Behavioral Scoring Engine
* **UPI Stream Assessment**: Parses real-time transaction narratives to identify gig wages, seasonal agri-yields, and steady stipends versus debt or high-risk spending.
* **Psychometric Risk Modeling**: Grades customers on income stability, financial discipline, digital tech adoption, and seasonal consistency.

### 2. Interactive Sandbox Playbook & Simulation Toolkit
* **Live Stream Simulation**: Instantly introduce new credits (such as gig bonuses, regional stipends) or debits (such as PG rent, EMIs) to view real-time score recalculation.
* **Multi-Selection Checkboxes**: Fully interactive stream table with custom multi-selection controls.
* **Streamlined Batch Operations**: Delete multiple selected transaction entries simultaneously with single-click batch delete actions.
* **Monthly Velocity Sparklines**: Integrated beautiful inline visual sparklines powered by `recharts` tracking monthly transaction velocity trends for the active profile.
* **Underwriting Data Portability**: Added an instant **Download Report** feature to download complete simulated transaction arrays, alternative credit metrics, and AI explainability reports as standard portable JSON documents.

### 3. Voice Companion & Assistant Voice BOT
* **Speech Recognition Commands**: Interactive microphone Speech-to-Text allowing users to request credit analysis, verify parameters, or run updates.
* **Interactive Multilingual Voice Playback**: Integrated regional Text-to-Speech narration supporting Hindi, Tamil, Telugu, and English, giving clear audio cues for Indian demographics.

---

## 🏗️ System Architecture
The platform is designed following strict separation of concerns to guarantee high scalability, performance, and audit-ready credit appraisal.

```
                  ┌──────────────────────────────────────────┐
                  │          Standard Web Client /           │
                  │        Assistive Screen Readers          │
                  └─────────────────────┬────────────────────┘
                                        │ (Port 3000)
                                        ▼
                  ┌──────────────────────────────────────────┐
                  │     Node.js Fullstack Service            │
                  │   - Vite Static Frontend Files           │
                  │   - Express API Route Controllers        │
                  └──────┬────────────────────────────┬──────┘
                         │                            │
      (Proxy Credit API) │ (Port 8000)                │ (Gemini API Call)
                         ▼                            ▼
  ┌──────────────────────────────┐            ┌──────────────┐
  │   FastAPI Python Backend     │            │  Gemini AI   │
  │  - Numerical Credit Engine   │            │  Model API   │
  │  - Predictive Modeling       │            │  (Explain)   │
  └──────────────────────────────┘            └──────────────┘
```

1. **Frontend Presentation Layer (React + Vite)**:
   - Clean, lightweight, ultra-responsive single-screen application styled with **Tailwind CSS**.
   - Accessible UI with keyboard nav states, Speech-to-Text inputs, and dynamic multi-language visual themes.
   
2. **Gateway Server & Controller (Express + Node)**:
   - Routes requests, manages security/API keys (such as `GEMINI_API_KEY`), and handles transaction ingestion.
   - Compiles down to an optimized production-grade single CJS executable (`dist/server.cjs`).

3. **Analytics Microservice Backend (Python + FastAPI)**:
   - High-speed calculations of financial metrics and alternative underwriting.
   - Provides REST APIs for simulation data and credit model evaluations.

4. **Transient Database (Mock Ledger Memory Store)**:
   - Live transaction histories and customer states are retained locally or persist inside standard structured in-memory lists, allowing safe credit modification simulations in real-time.

---

## 🛠️ Tech Stack Summary

| Layer | Technology | Key Capabilities |
| :--- | :--- | :--- |
| **Frontend UI** | **React 19 & Vite 6** | Modern hooks, swift bundles, and fully accessible component lifecycle. |
| **Styling** | **Tailwind CSS v4** | Fluid grid layouts, typography pairs, and custom dark mode accents. |
| **Microserver** | **Express (Node.js)** | Dynamic static file servers and API key proxies. |
| **Calculations** | **FastAPI (Python 3.11)** | High-speed risk tier evaluations and score modifications. |
| **AI Processing** | **Google GenAI SDK** | Model selection, multi-language prompt guides, and automated report building. |
| **Containerization** | **Docker & Docker Compose** | Isolated execution environments and cross-service configurations. |

---

## 🐳 Running the Platform with Docker

Follow these simple steps to orchestrate the multi-container setup:

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed.
- [Docker Compose](https://docs.docker.com/compose/install/) installed.

### 1. Configure Secrets
Create a `.env` file in the root directory (or use standard environment injects):
```env
GEMINI_API_KEY="your_actual_gemini_api_key_here"
```

### 2. Launch the Orchestrated Containers
From the root directory, run:
```bash
docker-compose up --build
```

This command automatically:
- Builds the **Node.js/Vite full-stack application** and starts it on port `3000`.
- Builds the **Python FastAPI microservice container** and starts it on port `8000`.

### 3. Verify Container Status
| Service | Endpoint | Purpose |
| :--- | :--- | :--- |
| **Frontend / Web Console** | [http://localhost:3000](http://localhost:3000) | Live interactive dashboard and simulation sandbox. |
| **Python API Service** | [http://localhost:8000/docs](http://localhost:8000/docs) | Interactive Swagger documentation for credit microservices. |

---

## ♿ Accessibility & Inclusion Features (WCAG 2.1 Compliant)
We have engineered **Inclusion First** into our UI, allowing individuals with diverse abilities to safely browse, understand, and simulate alternative credit streams:

1. **Robust Heading Hierarchy**: Strict structural progression from `h1` through `h3` tags to assist screen reader anchors.
2. **Keyboard-Navigable Focus States**: Explicit `focus:ring-2 focus:ring-indigo-500` outline loops on all interactive grid components, select toggles, input boxes, and dropdown menus.
3. **Descriptive ARIA Labels**: Complete annotations (`aria-label`, `aria-pressed`, `aria-selected`, `htmlFor` association tags) on all buttons, forms, and custom state changers.
4. **Custom Voice Guidance Switch**: Built-in Text-to-Speech (TTS) narrating real-time score modifications and active selections aloud.
5. **Color-Blind Protective Contrast mode**: Replaces Red-vs-Green alerts with high-contrast indicator blues and safe descriptive flags.
6. **Simplified Explanatory Mode (Low Literacy Support)**: Rephrases specialized terms like "debt-to-income ratios" into simple, actionable language.
7. **Speech-to-Text Voice Commands**: Complete microphone SpeechRecognition allowing users to ask questions using their natural voice.
