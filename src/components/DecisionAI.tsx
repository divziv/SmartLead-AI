import React from 'react';
import { LeadAnalysisResponse } from '../types.ts';
import { ShieldCheck, Sparkles, HelpCircle, ArrowUpRight, Scale, Award, Info, Landmark, Share2, MessageSquare } from 'lucide-react';

interface DecisionAIProps {
  analysis: LeadAnalysisResponse | null;
  accessibleMode: boolean;
  lowLiteracyMode: boolean;
}

export default function DecisionAI({
  analysis,
  accessibleMode,
  lowLiteracyMode
}: DecisionAIProps) {
  if (!analysis) return null;

  const explainable = analysis.explainableAI;
  const intent = analysis.intentPrediction;
  const student = analysis.studentMetrics;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Safe color codes
  const getEligibilityColor = (score: number) => {
    if (score >= 80) return accessibleMode ? 'text-blue-600 bg-blue-50/50 border-blue-200' : 'text-emerald-600 bg-emerald-50/50 border-emerald-200';
    if (score >= 65) return 'text-indigo-600 bg-indigo-50/50 border-indigo-200';
    return 'text-amber-600 bg-amber-50/50 border-amber-200';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6" id="decision_intelligence_widget">
      
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6 font-display">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 flex items-center space-x-2">
            <Landmark className="h-5 w-5 text-indigo-500" />
            <span>Module 3: Decision Intelligence &amp; Credit Appraisal</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">Audit-ready explainable AI attributing credit variables transparently without black-box biases.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* SCORE GAUGE */}
        <div className="flex flex-col items-center justify-center p-6 border border-slate-100 rounded-2xl bg-slate-50 relative">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">Overall Eligibility Rating</h3>
          
          <div className="relative flex items-center justify-center">
            {/* Custom high-contrast eligibility dial */}
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="64"
                className="stroke-slate-200"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="72"
                cy="72"
                r="64"
                className={accessibleMode ? 'stroke-blue-600' : 'stroke-indigo-600'}
                strokeWidth="10"
                fill="none"
                strokeDasharray={402}
                strokeDashoffset={402 - (402 * explainable.overallEligibilityScore) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-mono font-extrabold text-slate-800">{explainable.overallEligibilityScore}</span>
              <span className="text-[10px] text-slate-400 font-sans uppercase">Credit Index</span>
            </div>
          </div>

          <div className={`mt-6 text-xs text-center font-sans font-medium px-4 py-1.5 rounded-full border ${getEligibilityColor(explainable.overallEligibilityScore)}`}>
            {explainable.overallEligibilityScore >= 85 ? '✓ Highly Recommended Approval' :
             explainable.overallEligibilityScore >= 70 ? '✓ Ready For Underwriting Audit' : '⚠ Requires Secondary Appraisal Reviews'}
          </div>
        </div>

        {/* REPAYMENT AND EMI CEILING LIMITS */}
        <div className="border border-slate-100 rounded-2xl p-6 bg-slate-50 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Underwriting Recommendation</h3>
            
            {/* Sugested Monthly EMI */}
            <div className="mb-5">
              <div className="text-xs text-slate-400 mb-0.5">Maximum Safe Monthly Repayment</div>
              <div className="text-2xl font-mono font-bold text-slate-800">
                {formatCurrency(explainable.suggestedEMI)}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Calculated at 35% monthly cash-flow threshold</div>
            </div>

            {/* Suggested Max Loan limits */}
            <div>
              <div className="text-xs text-slate-400 mb-0.5">Recommended Retail Credit Offer Limit</div>
              <div className="text-2xl font-mono font-bold text-slate-800" id="recommended_loan_amount_val">
                {formatCurrency(explainable.recommendedMaxLoanAmount)}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Tailored for Personal/Agri micro-tenure</div>
            </div>
          </div>

          {/* Inclusive highlight */}
          <div className="mt-5 pt-3.5 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-amber-500 animate-pulse shrink-0" />
            <span>IDBI Sandbox API generated offers instantly available.</span>
          </div>
        </div>

        {/* INTENT PROPENSITY PREDICTION */}
        <div className="border border-slate-100 rounded-2xl p-6 bg-slate-50 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 font-sans">Behavioral Propensity</span>
            <h3 className="text-sm font-display font-bold text-slate-700 mt-1">Retail Lending Intent Signals</h3>

            <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200/50">
              <div className="flex items-center justify-between text-xs mb-1 font-sans">
                <span className="font-semibold text-slate-700 uppercase tracking-wide">Target Lead Match</span>
                <span className="font-mono text-indigo-600 font-bold">{intent.loanType}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Conversion Probability</span>
                <span className="font-mono font-bold text-slate-700">{intent.intentProbability}%</span>
              </div>
              
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all"
                  style={{ width: `${intent.intentProbability}%` }}
                ></div>
              </div>
            </div>

            {/* Trigger insights */}
            <div className="mt-4 space-y-2">
              <div className="text-xs font-semibold text-slate-500">Behavioral Triggers Detected:</div>
              {intent.triggerSignals.map((sig, idx) => (
                <div key={idx} className="text-[11px] text-slate-600 flex items-start space-x-1.5">
                  <span className="text-indigo-500 shrink-0 font-bold">•</span>
                  <span>{sig}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] font-mono text-slate-400 mt-5 pt-3 border-t border-slate-200/60">
            Action: {intent.suggestedAction}
          </p>
        </div>
      </div>

      {/* SHAP EXPLAINABLE AI ATTRIBUTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-display font-semibold text-slate-700 uppercase tracking-wider">
              SHAP Attribution: Why is this customer selected?
            </h3>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-100 font-semibold font-sans">
              Explainable AI (XAI)
            </span>
          </div>

          <div className="space-y-4">
            {explainable.shapValues.map((shp, idx) => {
              const isPositive = shp.impact > 0;
              const barPercentage = Math.min(100, Math.abs(shp.impact) * 4); // weight scaling
              return (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 hover:shadow-xs transition-all flex items-center justify-between">
                  {/* Left detail */}
                  <div className="flex-1 pr-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-xs font-semibold text-slate-800 font-sans">{shp.feature}</span>
                      <span className={`text-[10px] font-bold ${isPositive ? 'text-emerald-600' : 'text-orange-500'}`}>
                        {isPositive ? '+' : ''}{shp.impact}% contribution
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{shp.description}</p>
                  </div>
                  
                  {/* Right horizontal micro Bar */}
                  <div className="w-24 shrink-0">
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isPositive ? 'bg-emerald-500' : 'bg-orange-500'
                        }`}
                        style={{ width: `${barPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BIAS AUDIT / DISCRIMINATION AUDITING & ETHICAL CHECK */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-display font-semibold text-slate-700 uppercase tracking-wider">
                Ethical Lending AI Bias-Audit Report
              </h3>
              <span className="flex items-center text-xs text-blue-600 font-bold bg-blue-50 border border-blue-100 px-3 py-0.5 rounded-full font-sans">
                <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                Passed Audit
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-5 font-sans" id="bias_audit_content">
              <p className="text-xs text-slate-500 leading-relaxed font-mono">
                {analysis.biasAudit.fairnessDetails}
              </p>
              
              <div className="mt-4 pt-3 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                {analysis.biasAudit.demographicsChecked.map((chk, idx) => (
                  <div key={idx} className="flex items-center text-slate-600">
                    <span className="text-emerald-500 font-bold mr-1.5">✓</span>
                    <span>{chk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Student/Rural Inclusion panel */}
          {student && (
            <div className="bg-gradient-to-br from-indigo-50/20 to-indigo-50/5 border border-indigo-100 rounded-2xl p-5" id="inclusion_matrix_panel">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-display font-semibold text-indigo-800 flex items-center space-x-1.5">
                  <Award className="h-4 w-4 text-indigo-500" />
                  <span>Student Credit Potential Score™</span>
                </h4>
                <span className="font-mono text-xs font-extrabold text-indigo-600">
                  {student.studentCreditPotentialScore} / 100
                </span>
              </div>
              <div className="space-y-2 text-[11px] text-indigo-900/85">
                {student.achievements.map((ac, idx) => (
                  <div key={idx} className="flex items-start space-x-1.5">
                    <span className="text-indigo-500 text-xs shadow-xs">🏅</span>
                    <span>{ac}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
