import React from 'react';
import { LeadAnalysisResponse } from '../types.ts';
import { ShieldCheck, HeartPulse, Sparkles, Scale, TrendingUp, AlertTriangle } from 'lucide-react';

interface BehavioralProfileProps {
  analysis: LeadAnalysisResponse | null;
  accessibleMode: boolean;
  lowLiteracyMode: boolean;
}

export default function BehavioralProfile({
  analysis,
  accessibleMode,
  lowLiteracyMode
}: BehavioralProfileProps) {
  if (!analysis) return null;

  const metrics = analysis.behavioralMetrics;
  
  // Rephrase labels
  const labelSpending = lowLiteracyMode ? 'Smart Spending Score' : 'Behavioral Spending Assessment';
  const labelSavings = lowLiteracyMode ? 'Monthly Savings Share' : 'Savings Rate Ratio';
  const labelEMI = lowLiteracyMode ? 'Loan Repayment Trust Rate' : 'EMI Discipline Matrix';
  const labelLuxury = lowLiteracyMode ? 'Fun Spending Ratio' : 'Discretionary Luxury Ratio';
  const labelSavingsHealth = lowLiteracyMode ? 'Emergency Cash Reserve Rating' : 'Investment Portfolio Maturity';

  // Quality check for Color-Blind Friendly Custom icons & borders
  const getQualityStyle = (score: number) => {
    if (score >= 80) {
      return {
        bgColor: 'bg-indigo-50/20',
        textColor: accessibleMode ? 'text-blue-600' : 'text-indigo-600',
        borderColor: 'border-indigo-100',
        badgeColor: accessibleMode ? 'bg-blue-100 text-blue-800' : 'bg-indigo-100 text-indigo-800',
        badgeText: '✓ Genuinely Consistent'
      };
    } else if (score >= 60) {
      return {
        bgColor: 'bg-amber-50/10',
        textColor: accessibleMode ? 'text-amber-600' : 'text-amber-700',
        borderColor: 'border-amber-100',
        badgeColor: 'bg-amber-100 text-amber-800',
        badgeText: '⚠ Satisfactory Average'
      };
    } else {
      return {
        bgColor: 'bg-orange-50/10',
        textColor: 'text-orange-600',
        borderColor: 'border-orange-100',
        badgeColor: 'bg-orange-100 text-orange-800',
        badgeText: '! Attention Advised'
      };
    }
  };

  const spendingStyle = getQualityStyle(metrics.spendingScore);
  const emiStyle = getQualityStyle(metrics.emiDiscipline);
  const investmentStyle = getQualityStyle(metrics.investmentMaturity);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6" id="behavioral_profile_card">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6 font-display">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 flex items-center space-x-2">
            <HeartPulse className="h-5 w-5 text-indigo-500" />
            <span>Module 2: Behavioral Lending Scorecard</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">Estimating character and capacity via granular transaction behavior patterns instead of collateral.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Spending indicator card */}
        <div className={`border rounded-2xl p-5 ${spendingStyle.bgColor} ${spendingStyle.borderColor} transition-all`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{labelSpending}</h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${spendingStyle.badgeColor}`}>
              {spendingStyle.badgeText}
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-mono font-bold text-slate-800">{metrics.spendingScore}</span>
            <span className="text-xs font-sans text-slate-400">/ 100 points</span>
          </div>

          <p className="text-xs text-slate-500 mt-3 font-sans leading-relaxed">
            Measures balance conservation post-spend transactions. High scores demonstrate a controlled debit frequency.
          </p>
        </div>

        {/* EMI Discipline Indicator */}
        <div className={`border rounded-2xl p-5 ${emiStyle.bgColor} ${emiStyle.borderColor} transition-all`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{labelEMI}</h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${emiStyle.badgeColor}`}>
              {emiStyle.badgeText}
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-mono font-bold text-slate-800">{metrics.emiDiscipline}</span>
            <span className="text-xs text-slate-400">stability index</span>
          </div>

          <p className="text-xs text-slate-500 mt-3 leading-relaxed">
            Tracks regularity of repayments. Zero instances of payment failures or non-sufficient-fund returns.
          </p>
        </div>

        {/* Investment Maturity indicators */}
        <div className={`border rounded-2xl p-5 ${investmentStyle.bgColor} ${investmentStyle.borderColor} transition-all`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{labelSavingsHealth}</h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${investmentStyle.badgeColor}`}>
              {investmentStyle.badgeText}
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-mono font-bold text-slate-800">{metrics.investmentMaturity}</span>
            <span className="text-xs text-slate-400">maturity depth</span>
          </div>

          <p className="text-xs text-slate-500 mt-3 leading-relaxed">
            Identifies savings SIPs, insurance premiums, and deposits mapping active financial forward-planning signals.
          </p>
        </div>
      </div>

      {/* Auxiliary Ratios section */}
      <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 rounded-2xl p-5">
        <div>
          <h4 className="text-xs font-display font-semibold text-slate-700 uppercase tracking-wide mb-3">
            {labelSavings} vs {labelLuxury} Balance
          </h4>
          <div className="flex items-center space-x-4">
            {/* Savings Rate progress indicator */}
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span>Savings Retention Rate</span>
                <span className="font-mono font-bold text-emerald-600">{metrics.savingsRate}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all"
                  style={{ width: `${Math.max(3, metrics.savingsRate)}%` }}
                ></div>
              </div>
            </div>

            {/* Luxury / Impulse Ratio progress indicator */}
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span>Lifestyle Consumption Load</span>
                <span className={`font-mono font-bold ${metrics.luxuryRatio > 35 ? 'text-amber-600' : 'text-slate-600'}`}>{metrics.luxuryRatio}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all"
                  style={{ width: `${Math.max(3, metrics.luxuryRatio)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3.5 text-slate-600 text-xs">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
            <Scale className="h-4 w-4" />
          </div>
          <p className="leading-relaxed">
            {lowLiteracyMode ? (
              <span>Your savings represent the portion of income left untouched after expenses. Keeping this rate above 15% boosts borrow trust.</span>
            ) : (
              <span>Calculated from transaction credit sums minus debits, estimating true income retention capacity. Optimal margins range between 15% to 30%.</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
