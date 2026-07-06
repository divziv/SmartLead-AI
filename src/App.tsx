import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import CustomerGrid from './components/CustomerGrid.tsx';
import FinancialAnalysis from './components/FinancialAnalysis.tsx';
import BehavioralProfile from './components/BehavioralProfile.tsx';
import DecisionAI from './components/DecisionAI.tsx';
import VoiceBotAssistant from './components/VoiceBotAssistant.tsx';
import { CustomerProfile, LeadAnalysisResponse, Transaction } from './types.ts';
import { INITIAL_CUSTOMERS } from './data.ts';
import { ShieldCheck, Plus, Sparkles, HelpCircle, Edit3, Trash2, ArrowRight, CheckCircle, Landmark, TableProperties } from 'lucide-react';

export default function App() {
  const [customers, setCustomers] = useState<CustomerProfile[]>(INITIAL_CUSTOMERS);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>('cust_rajesh_student');
  const [analysis, setAnalysis] = useState<LeadAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Global Accessibility Controls
  const [accessibleMode, setAccessibleMode] = useState(false);
  const [lowLiteracyMode, setLowLiteracyMode] = useState(false);
  const [audioSpeechEnabled, setAudioSpeechEnabled] = useState(false);

  // Dialog forms for inline transaction additions
  const [showAddTxInput, setShowAddTxInput] = useState(false);
  const [txDesc, setTxDesc] = useState('');
  const [txCategory, setTxCategory] = useState('Groceries');
  const [txAmount, setTxAmount] = useState(1500);
  const [txType, setTxType] = useState<'credit' | 'debit'>('debit');
  const [txMode, setTxMode] = useState<'UPI' | 'NetBanking' | 'Cash' | 'Card'>('UPI');

  // Load customer profiles from backend database on mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('/api/customers');
        const data = await res.json();
        if (data.success && data.customers) {
          setCustomers(data.customers);
        }
      } catch (e) {
        console.warn("Client: Database connection delayed, using static datasets.", e);
      }
    };
    fetchCustomers();
  }, []);

  // Recalculate or Fetch Detailed AI Profiling whenever selected client changes
  const fetchAnalysis = async (cId: string, currentProfilesList = customers) => {
    const activeCust = currentProfilesList.find(c => c.id === cId);
    if (!activeCust) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: cId })
      });

      const data = await response.json();
      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
      } else {
        throw new Error(data.error || "Appraisal response parsing mismatch");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("An error occurred fetching smart lead analysis. Re-connecting sandbox pipelines.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCustomerId) {
      fetchAnalysis(selectedCustomerId);
    }
  }, [selectedCustomerId]);

  const activeCustomer = customers.find(c => c.id === selectedCustomerId) || null;

  // Handler to register a new Customer profile (Wildcards)
  const handleAddNewCustomer = async (newCust: CustomerProfile) => {
    try {
      // Sync with the backend database
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCust)
      });
      const data = await response.json();
      
      const updatedList = [...customers, newCust];
      setCustomers(updatedList);
      setSelectedCustomerId(newCust.id); // auto select
    } catch (e) {
      // Local fallback
      const updatedList = [...customers, newCust];
      setCustomers(updatedList);
      setSelectedCustomerId(newCust.id);
    }
  };

  // Add customized transactions in real-time, instantly updating calculations and re-appraising on Express
  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCustomer || !txDesc.trim()) return;

    const newTx: Transaction = {
      id: `man_tx_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      description: txDesc,
      category: txCategory,
      amount: Number(txAmount),
      type: txType,
      mode: txMode
    };

    const updatedTxns = [...activeCustomer.transactions, newTx];
    
    // Update active memory
    const updatedCustomers = customers.map(c => {
      if (c.id === activeCustomer.id) {
        return { ...c, transactions: updatedTxns };
      }
      return c;
    });

    setCustomers(updatedCustomers);
    setShowAddTxInput(false);
    setTxDesc('');

    // Trigger instant recalculation fetch
    fetchAnalysis(activeCustomer.id, updatedCustomers);

    if (audioSpeechEnabled && window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance(`Added transaction for ${txDesc}. Re-appraising credit limit...`);
      window.speechSynthesis.speak(u);
    }
  };

  // Delete transaction handler
  const handleDeleteTransaction = (txId: string) => {
    if (!activeCustomer) return;

    const filtered = activeCustomer.transactions.filter(t => t.id !== txId);
    const updatedCustomers = customers.map(c => {
      if (c.id === activeCustomer.id) {
        return { ...c, transactions: filtered };
      }
      return c;
    });

    setCustomers(updatedCustomers);
    fetchAnalysis(activeCustomer.id, updatedCustomers);
  };

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800 font-sans selection:bg-indigo-100 flex flex-col" id="idbi_app_root">
      
      {/* GLOBAL BRAND HEADER WITH ACCESSIBILITY SYSTEM */}
      <Header
        accessibleMode={accessibleMode}
        setAccessibleMode={setAccessibleMode}
        lowLiteracyMode={lowLiteracyMode}
        setLowLiteracyMode={setLowLiteracyMode}
        audioSpeechEnabled={audioSpeechEnabled}
        setAudioSpeechEnabled={setAudioSpeechEnabled}
      />

      {/* BODY CONTENT WRAPPER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 grid grid-cols-1 gap-8" id="idbi_main_container">
        
        {/* LEADERBOARD/SUMMARY HERO BLOCK */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between shadow-xl relative overflow-hidden" id="hero_pitch_board">
          <div className="relative z-10">
            <h2 className="text-xl sm:text-2xl font-display font-extrabold tracking-tight">
              IDBI SmartLead AI Platform
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-xl font-sans">
              Appraising Indian micro-segments (Gig Workers, Farmers, Freelancers &amp; Students) with AI-powered behavioral credit scores derived directly from UPI transaction cache streams.
            </p>
            <div className="flex flex-wrap gap-2 mt-4 text-xs font-mono">
              <span className="bg-slate-800 hover:bg-slate-700 transition hover:text-white px-3 py-1 rounded-full text-emerald-400 border border-slate-700/50">
                🚀 30%+ Conversion Match
              </span>
              <span className="bg-slate-800 hover:bg-slate-700 transition hover:text-white px-3 py-1 rounded-full text-indigo-400 border border-slate-700/50">
                ⚖️ Audit-Ready Explainability
              </span>
              <span className="bg-slate-800 hover:bg-slate-700 transition hover:text-white px-3 py-1 rounded-full text-purple-400 border border-slate-700/50">
                💎 Inclusive Credit Scoring
              </span>
            </div>
          </div>

          <div className="mt-6 md:mt-0 relative z-10 text-center md:text-right">
            <div className="inline-block bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-inner">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">Active Segment</span>
              <div className="text-xl font-display font-semibold text-white mt-1 border-b border-slate-700 pb-1.5" id="active_profile_label">
                {activeCustomer ? activeCustomer.name : 'No Selected Profile'}
              </div>
              <span className="text-xs font-mono text-emerald-400 block mt-1.5 uppercase tracking-wider font-semibold">
                {activeCustomer ? activeCustomer.role : ''}
              </span>
            </div>
          </div>
        </div>

        {/* STEP 1: SELECT CUSTOMER PROFILE AND RUN APPRAISALS */}
        <CustomerGrid
          customers={customers}
          selectedCustomerId={selectedCustomerId}
          onSelectCustomer={setSelectedCustomerId}
          onAddNewCustomer={handleAddNewCustomer}
          audioSpeechEnabled={audioSpeechEnabled}
        />

        {/* ERROR WARNING FALLBACKS */}
        {errorMsg && (
          <div className="bg-orange-50 border border-orange-200 text-orange-850 p-4 rounded-xl text-xs flex items-center space-x-2 animate-pulse font-sans">
            <HelpCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* LOADING SHIMMER STATE */}
        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-xs">
            <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-xs text-slate-500 font-mono">Running transaction analytics &amp; compiling behavioral credit scoring models...</p>
          </div>
        ) : (
          <>
            {/* TWIN ARCHITECTURE: COLUMN 1 ANALYTICS AND COLUMN 2 VOICE Chat BOT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* PRIMARY FINANCIAL MODULES: SPANS 8 COLS */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* MODULE 1: INCOME VELOCITY */}
                <FinancialAnalysis
                  analysis={analysis}
                  transactions={activeCustomer ? activeCustomer.transactions : []}
                  accessibleMode={accessibleMode}
                  lowLiteracyMode={lowLiteracyMode}
                />

                {/* MODULE 2: CHARACTER & DISCIPLINE CHARACTERISTICS */}
                <BehavioralProfile
                  analysis={analysis}
                  accessibleMode={accessibleMode}
                  lowLiteracyMode={lowLiteracyMode}
                />

                {/* MODULE 3: CREDIT DECISIONS & EXPLAINABILITY */}
                <DecisionAI
                  analysis={analysis}
                  accessibleMode={accessibleMode}
                  lowLiteracyMode={lowLiteracyMode}
                />
              </div>

              {/* SIDEBAR: ASSISTANT CHAT & PLAYGROUND TOOLBOX: SPANS 4 COLS */}
              <div className="lg:col-span-4 space-y-8 h-full sticky top-24">
                
                {/* MODULE 4: MULTILINGUAL VOICE COMPANION */}
                <VoiceBotAssistant
                  customerId={selectedCustomerId || ''}
                  customerName={activeCustomer ? activeCustomer.name : 'User'}
                  audioSpeechEnabled={audioSpeechEnabled}
                  setAudioSpeechEnabled={setAudioSpeechEnabled}
                />

                {/* SANDBOX INTERACTIVE PLAYGROUND TOOLBOX */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6" id="sandbox_playground_toolbox">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 font-display">
                    <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-widest flex items-center space-x-1.5">
                      <TableProperties className="h-4 w-4 text-emerald-500" />
                      <span>Sandbox Playbook: Edit Live Streams</span>
                    </h3>
                  </div>

                  <p className="text-[11px] text-slate-500 mb-4 font-sans leading-relaxed">
                    Instantly simulate new credits (income/stipends) or debits (purchases/EMI payments) to watch metrics and scores recalibrate in real-time.
                  </p>

                  {!showAddTxInput ? (
                    <button
                      onClick={() => setShowAddTxInput(true)}
                      aria-label="Simulate New UPI Transaction"
                      className="w-full bg-slate-50 border border-slate-200/80 text-slate-700 hover:bg-slate-100 text-xs font-semibold p-2.5 rounded-lg flex items-center justify-center space-x-2 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Simulate New UPI Transaction</span>
                    </button>
                  ) : (
                    <form onSubmit={handleAddTransaction} className="space-y-3 bg-slate-50 border border-slate-200/55 rounded-xl p-4 animate-fade-in text-xs" aria-label="Simulate new transaction entry form">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-0.5" htmlFor="tx_desc_input">Description Narrative</label>
                        <input
                          id="tx_desc_input"
                          type="text"
                          required
                          value={txDesc}
                          onChange={e => setTxDesc(e.target.value)}
                          placeholder="e.g. Swiggy Weekly Settlement"
                          aria-label="Transaction description narrative"
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-0.5" htmlFor="tx_flow_select">Flow Type</label>
                          <select
                            id="tx_flow_select"
                            value={txType}
                            onChange={e => setTxType(e.target.value as any)}
                            aria-label="Transaction flow type, credit or debit"
                            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                          >
                            <option value="debit">(-) Debit Expense</option>
                            <option value="credit">(+) Credit Income</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-0.5" htmlFor="tx_amount_input">Amount (₹)</label>
                          <input
                            id="tx_amount_input"
                            type="number"
                            required
                            min="1"
                            value={txAmount}
                            onChange={e => setTxAmount(Number(e.target.value))}
                            aria-label="Transaction amount in Rupees"
                            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-0.5" htmlFor="tx_category_select">Category</label>
                          <select
                            id="tx_category_select"
                            value={txCategory}
                            onChange={e => setTxCategory(e.target.value)}
                            aria-label="Transaction category"
                            className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                          >
                            <option value="Gig Settlement">Gig Settlement</option>
                            <option value="Salary">Salary Credit</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Rent">PG rent/Housing</option>
                            <option value="Education">Education Fee</option>
                            <option value="Lifestyle">Discretionary/Lifestyle</option>
                            <option value="SIP Investment">SIP Investment</option>
                            <option value="Agri Expenses">Agri Expenses</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-0.5" htmlFor="tx_mode_select">Mode</label>
                          <select
                            id="tx_mode_select"
                            value={txMode}
                            onChange={e => setTxMode(e.target.value as any)}
                            aria-label="Transaction payment mode"
                            className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                          >
                            <option value="UPI">UPI</option>
                            <option value="NetBanking">NetBanking</option>
                            <option value="Cash">Cash ATM</option>
                            <option value="Card">Card</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-1.5 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddTxInput(false)}
                          aria-label="Cancel simulating transaction"
                          className="px-3 py-1.5 text-slate-500 hover:text-slate-800 font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          aria-label="Submit simulated transaction"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1.5 rounded-lg select-none duration-75 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                        >
                          Register Flow
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Micro transaction manager listing */}
                  {activeCustomer && (
                    <div className="mt-4 pt-3 border-t border-slate-200/60 max-h-40 overflow-y-auto space-y-2" id="playground_tx_list">
                      {activeCustomer.transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between text-[11px] bg-slate-50/60 hover:bg-slate-50 p-2 rounded-lg border border-slate-200/30">
                          <div className="truncate pr-2">
                            <span className="font-semibold text-slate-700 block truncate">{tx.description}</span>
                            <span className="text-[9px] text-slate-400 capitalize font-mono block mt-0.5">{tx.category} • {tx.mode}</span>
                          </div>
                          <div className="flex items-center space-x-2 shrink-0">
                            <span className={`font-mono font-bold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-500'}`}>
                              {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                            </span>
                            <button
                              onClick={() => handleDeleteTransaction(tx.id)}
                              className="text-slate-300 hover:text-rose-500 transition cursor-pointer p-1 rounded hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-500"
                              title={`Delete simulated transaction ${tx.description}`}
                              aria-label={`Delete simulated transaction ${tx.description}`}
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

              </div>

            </div>
          </>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-450 border-t border-slate-800 py-6 text-center text-xs mt-12 shrink-0 select-none" id="idbi_footer_wrap">
        <p className="font-sans">IDBI SmartLead AI Platform • Designed for IDBI Innovate Hackathon 2026</p>
        <p className="font-mono text-[10px] text-slate-500 mt-1">Audit Log ID: IDE-RUN-MUMBAI-ACTIVE-2026</p>
      </footer>

    </div>
  );
}
