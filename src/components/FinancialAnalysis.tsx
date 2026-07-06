import React, { useState } from 'react';
import { LeadAnalysisResponse, Transaction } from '../types.ts';
import { CirclePercent, ArrowUpRight, ArrowDownRight, IndianRupee, TrendingUp, Calendar, Wallet, ShoppingBag } from 'lucide-react';

interface FinancialAnalysisProps {
  analysis: LeadAnalysisResponse | null;
  transactions: Transaction[];
  accessibleMode: boolean;
  lowLiteracyMode: boolean;
}

export default function FinancialAnalysis({
  analysis,
  transactions,
  accessibleMode,
  lowLiteracyMode
}: FinancialAnalysisProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  if (!analysis) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-100 rounded w-1/3 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-24 bg-slate-100 rounded-xl"></div>
            <div className="h-24 bg-slate-100 rounded-xl"></div>
            <div className="h-24 bg-slate-100 rounded-xl"></div>
          </div>
          <div className="h-40 bg-slate-100 rounded-xl"></div>
        </div>
      </div>
    );
  }

  // Categories list
  const uniqueCategories = ['all', ...Array.from(new Set(transactions.map(t => t.category)))];

  // Filtered transactions
  const filteredTx = filterCategory === 'all'
    ? transactions
    : transactions.filter(t => t.category === filterCategory);

  // Group transaction categories for SVG rendering
  const categorySums = transactions.reduce((acc: { [key: string]: number }, t) => {
    if (t.type === 'debit') {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
    }
    return acc;
  }, {});

  const totalExpense = Object.values(categorySums).reduce((sum, v) => sum + v, 0) || 1;
  const categoryData = Object.entries(categorySums).map(([cx, sum]) => ({
    name: cx,
    value: sum,
    percentage: Math.round((sum / totalExpense) * 100)
  })).sort((a, b) => b.value - a.value);

  // Rephrased terms for low literacy mode
  const labelIncome = lowLiteracyMode ? 'Estimated Monthly Earnings' : 'Estimated Monthly Income';
  const labelStability = lowLiteracyMode ? 'Earnings Growth Pattern' : 'Income Stability Score';
  const labelCashConsistency = lowLiteracyMode ? 'Money Cushion Consistency' : 'Cash Flow Consistency';

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6" id="financial_analytics_card">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div>
          <h2 className="text-lg font-display font-semibold text-slate-800 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            <span>Module 1: Income Analytics &amp; Flow Dynamics</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">Real-time metrics tracking actual monthly cashflow velocity and stability.</p>
        </div>
      </div>

      {/* Core values row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Monthly Income Estimate */}
        <div className="bg-gradient-to-br from-indigo-50/20 to-slate-50 border border-slate-100 p-5 rounded-2xl relative shadow-sm hover:shadow transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{labelIncome}</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <IndianRupee className="h-4 w-4" />
            </div>
          </div>
          <h3 className="text-2xl font-mono font-bold text-slate-800">
            {formatCurrency(analysis.incomeAnalysis.estimatedMonthlyIncome)}
          </h3>
          <p className="text-xs text-slate-500 mt-2 flex items-center">
            {accessibleMode ? (
              <span className="text-blue-600 font-bold mr-1">📈 Strong Inflow</span>
            ) : (
              <span className="text-emerald-600 font-semibold mr-1">📈 Outperforming</span>
            )}
            <span>UPI-receipt benchmark limits</span>
          </p>
        </div>

        {/* Income Stability Rating */}
        <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow transition-all" id="stability_score_container">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{labelStability}</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <CirclePercent className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-mono font-bold text-slate-800">{analysis.incomeAnalysis.incomeStabilityScore}%</span>
            <span className="text-xs font-sans text-slate-400">stability ratio</span>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                accessibleMode ? 'bg-blue-500' : 'bg-indigo-600'
              }`}
              style={{ width: `${analysis.incomeAnalysis.incomeStabilityScore}%` }}
            ></div>
          </div>
        </div>

        {/* Cashflow Consistency */}
        <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{labelCashConsistency}</span>
            <div className="p-2 bg-violet-50 text-violet-600 rounded-xl">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-mono font-bold text-slate-800">{analysis.incomeAnalysis.cashFlowConsistency}%</span>
            <span className="text-xs font-sans text-slate-400">consistency</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                accessibleMode ? 'bg-indigo-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${analysis.incomeAnalysis.cashFlowConsistency}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* SVG Category Bar chart & Transactions panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xs font-display font-semibold text-slate-700 uppercase tracking-wider mb-4">
            Behavioral Expenditure Allocation
          </h3>
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100" id="behavioral_spending_chart">
            {categoryData.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-10">No debit transactions recorded yet.</p>
            ) : (
              <div className="space-y-4">
                {categoryData.map((cat, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                      <span className="font-medium">{cat.name}</span>
                      <span className="font-mono text-[11px] font-semibold">
                        {formatCurrency(cat.value)} ({cat.percentage}%)
                      </span>
                    </div>
                    {/* Multi-cue SVG Bar chart */}
                    <div className="w-full bg-slate-200/60 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          idx === 0 ? 'bg-indigo-600' :
                          idx === 1 ? 'bg-sky-500' :
                          idx === 2 ? 'bg-amber-500' : 'bg-slate-400'
                        }`}
                        style={{ width: `${cat.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-indigo-600 mr-1.5"></span> Primary Factor
              </span>
              <span className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-sky-500 mr-1.5"></span> Secondary Factor
              </span>
              <span className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-amber-500 mr-1.5"></span> Auxiliary Factor
              </span>
            </div>
          </div>
        </div>

        {/* Ledger logs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-display font-semibold text-slate-700 uppercase tracking-wider">
              Sandbox Transaction Log
            </h3>
            
            {/* Filter */}
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              aria-label="Filter transaction logs by category"
              className="bg-slate-50 border border-slate-200 rounded-lg text-[10px] p-1 focus:ring-2 focus:ring-indigo-500 outline-none font-sans font-medium focus:outline-none"
            >
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-xl overflow-hidden max-h-68 overflow-y-auto" id="transactions_scroll_wrapper">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100 text-[10px] text-slate-500 uppercase font-mono tracking-wider sticky top-0">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 font-sans">
                {filteredTx.map(tx => (
                  <tr key={tx.id} className="hover:bg-white transition-all">
                    <td className="p-3 text-slate-500 whitespace-nowrap font-mono text-[10px]">
                      {tx.date}
                    </td>
                    <td className="p-3 text-slate-700">
                      <div className="font-semibold text-slate-800">{tx.description}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 flex items-center">
                        <span className="bg-slate-200/50 text-slate-500 px-1.5 py-0.2 rounded mr-1.5 uppercase font-mono text-[8px] tracking-wider">
                          {tx.mode}
                        </span>
                        <span>{tx.category}</span>
                      </div>
                    </td>
                    <td className="p-3 text-right whitespace-nowrap font-mono font-bold">
                      <div className={tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-700'}>
                        {tx.type === 'credit' ? '+' : '-'} {formatCurrency(tx.amount)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
