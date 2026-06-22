export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  mode: 'UPI' | 'NetBanking' | 'Cash' | 'Card' | 'IMPS';
}

export interface CustomerProfile {
  id: string;
  name: string;
  role: 'Student' | 'Gig Worker' | 'Freelancer' | 'Farmer' | 'Small Retailer' | 'Salaried';
  age: number;
  location: string;
  gender: string;
  phone: string;
  email: string;
  creditHistory: boolean;
  transactions: Transaction[];
}

export interface IncomeAnalysis {
  estimatedMonthlyIncome: number;
  incomeStabilityScore: number; // 0 to 100
  incomeSources: { source: string; amount: number; frequency: string }[];
  cashFlowConsistency: number; // 0 to 100
}

export interface BehavioralMetrics {
  spendingScore: number; // 0 to 100
  savingsRate: number; // percentage
  emiDiscipline: number; // 0 to 100
  luxuryRatio: number; // percentage
  investmentMaturity: number; // 0 to 100
}

export interface IntentPrediction {
  loanType: 'Personal Loan' | 'Home Loan' | 'Auto Loan' | 'Business Loan' | 'Education Loan' | 'None';
  intentProbability: number; // 0 to 100
  triggerSignals: string[];
  suggestedAction: string;
}

export interface StudentMetrics {
  studentCreditPotentialScore: number; // 0 to 100
  paymentConsistency: number; // 0 to 100
  digitalMaturity: number; // 0 to 100
  achievements: string[];
}

export interface ExplanationFeature {
  feature: string;
  impact: number; // positive or negative value
  description: string;
}

export interface BiasAudit {
  status: 'passed' | 'warning';
  demographicsChecked: string[];
  fairnessDetails: string;
}

export interface LeadAnalysisResponse {
  customerId: string;
  customerName: string;
  incomeAnalysis: IncomeAnalysis;
  behavioralMetrics: BehavioralMetrics;
  intentPrediction: IntentPrediction;
  studentMetrics?: StudentMetrics;
  explainableAI: {
    overallEligibilityScore: number; // 0 to 100
    shapValues: ExplanationFeature[];
    topFactors: string[];
    riskFlags: string[];
    suggestedEMI: number;
    recommendedMaxLoanAmount: number;
  };
  biasAudit: BiasAudit;
}

export interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isAudio?: boolean;
}
