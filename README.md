# IDBI SmartLead AI 🚀
### AI-Powered Behavioral Lending & Financial Inclusion Platform

**Tagline:** *From Transactions to Trust.*  
**IDBI Innovate 2026 Hackathon - Winning Submission under Track 02: Lead Generation – Behavioural Analytics – Retail Lending.**

IDBI SmartLead AI is an advanced, audit-ready full-stack credit appraisal system that transforms raw UPI transaction streams into credit-worthy leads for retail loans (Home, Auto, Personal, and Education Loans). 

Our primary mission is **Financial Inclusion**. By analyzing behavioral credit footprinting instead of relying on legacy bureau histories, we open access to under-served segments such as **Students, Freelancers, Gig Workers (Delivery executives, couriers), and Seasonal Farmers** with safe, transparent, and explainable lending metrics.

---

## 🎨 Visual Identity & Key Value Pillars

- **Income Intelligence Module:** Automatically estimates actual monthly earnings from unstructured UPI inflow markers, gig payout logs (Swiggy, Zomato), and agricultural mandi receipts.
- **Behavioral Scoring Core:** Calculates spending speed, savings retention rate, mutual-fund investment maturity, and EMI discipline markers based on direct digital signals.
- **Explainable AI (XAI) & SHAP Dashboard:** Replaces opaque blackbar decisions with transparent feature attributions mapping positive/negative contributions to RM and policy makers.
- **Inclusion Engines (Wildcard Segments):** Unique underwriting scores such as the **Student Credit Potential Score™** and gig cashflow estimators.
- **Ethical Audit & Bias Detection:** Audits decisions in real-time to confirm zero discrimination based on age, gender, or location PIN codes.
- **Voice-First Accessibility:** Built-in Speech-to-Text and Text-to-Speech assistants supporting **regional Indian dialects (English, Hindi, Telugu, Tamil, Bengali)**, rephrasing technical jargon for elderly and low-literate users.

---

## 🏗️ Folder Directory Structure

```text
/
├── server.ts              # Full-stack Express Hub with Vite dev middleware & Gemini AI gateway
├── package.json           # Node configuration holding dev dependencies and build scripts
├── README.md              # Project documentation and setup guides
├── metadata.json          # AI Studio app permissions metadata
├── tsconfig.json          # TypeScript compiler requirements
├── index.html             # Application entry template
├── src/
│   ├── App.tsx            # Main parent state dashboard & sandbox managers
│   ├── types.ts           # Shared typed data structures and interfaces
│   ├── data.ts            # Detailed synthetic transaction rosters for typical segments
│   ├── index.css          # Global CSS importing Inter & JetBrains Mono fonts and Tailwind
│   └── components/
│       ├── Header.tsx             # Navbar with accessibility control toggles
│       ├── CustomerGrid.tsx       # Profile manager & statement file drag-and-drop zone
│       ├── FinancialAnalysis.tsx  # Income calculators with responsive category bar charts
│       ├── BehavioralProfile.tsx  # Character assessment metric scores
│       ├── DecisionAI.tsx         # XAI SHAP attribution charts and ethical audits
│       └── VoiceBotAssistant.tsx  # Multilingual voice chat bot supporting regional tongues
```

---

## 🔌 API Gateway Specifications

All endpoints are hosted locally under the active Express container server:

### 1. `GET /api/customers`
Returns a list of sandboxed customer accounts with raw ledger statement profiles.

### 2. `POST /api/customers`
Inserts and builds custom pilot profiles with simulated statements into the cash-cache, allowing relationship managers to playground-test custom wildcards.

### 3. `POST /api/analyze`
Accepts a `{ customerId }` and evaluates credit capacity. It launches a hybrid underwriting model: deterministic metrics are evaluated instantly locally, then paired with `gemini-3.5-flash` to enrich decision rationales, generate natural XAI SHAP reasons, and regional welcome responses.

### 4. `POST /api/assistant/chat`
Powers the companion chatbot dialogue. Translates technical loan details into plain layman definitions based on the target customer group, outputs answers directly to specified Indian languages (English, Hindi, Telugu, Tamil, Bengali).

---

## 💻 Local Quickstart Guide

This application has been meticulously designed following **strict cost and isolation constraints** (works completely on local laptops, free utilities, no credit cards required, zero background database fees, SQLite/Local cache compliant).

### Prerequisite
Confirm you have Node.js (v18+) and npm installed on your machine.

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure your Gemini API key inside our `.env.example` file or your shell variables:
   ```bash
   export GEMINI_API_KEY="your_api_key_here"
   ```
   *(Note: Overwriting is optional. If the key is omitted, our robust local deterministic underwriting algorithm takes over automatically to ensure 105% system availability).*

### Development Start
Launch the full-stack development workspace on Port 3000:
```bash
npm run dev
```

### Production Build compilation
Verify structural code integrity and bundle production assets:
```bash
npm run build
```
Start the compiled production node server on Port 3000:
```bash
npm run start
```

---

## 🧼 Ethics, Transparency & Design Philosophy

- **Color-Blind Friendly Support Theme:** By default, financial interfaces risk alienating color-blind users by relying strictly on red-vs-green circles. SmartLead replaces them with multi-cue checkforms, labels, distinct geometric shapes, and deep high-contrast blue indicators.
- **Low-Literacy Modes:** Decouples complex banking terms (e.g. *Debt-to-Income / Savings Ratio*) into warm plain-English advice (e.g. *"Your monthly loan load footprint"*), enabling rural and youth financial literacy.
- **Responsible Bias Checks:** Validates score distributions to verify geolocational or age metrics do not bias credit appraisal checks, supporting safe, non-discriminatory lending practices.
