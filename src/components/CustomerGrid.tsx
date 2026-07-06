import React, { useState, useRef } from 'react';
import { CustomerProfile, Transaction } from '../types.ts';
import { Users, Upload, CheckCircle2, UserPlus, CreditCard, Sparkles, MapPin, Plus } from 'lucide-react';

interface CustomerGridProps {
  customers: CustomerProfile[];
  selectedCustomerId: string | null;
  onSelectCustomer: (id: string) => void;
  onAddNewCustomer: (newCust: CustomerProfile) => void;
  audioSpeechEnabled: boolean;
}

export default function CustomerGrid({
  customers,
  selectedCustomerId,
  onSelectCustomer,
  onAddNewCustomer,
  audioSpeechEnabled
}: CustomerGridProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customRole, setCustomRole] = useState<'Student' | 'Gig Worker' | 'Freelancer' | 'Farmer' | 'Small Retailer' | 'Salaried'>('Gig Worker');
  const [customAge, setCustomAge] = useState(25);
  const [customGender, setCustomGender] = useState('Female');
  const [customLocation, setCustomLocation] = useState('mumbai_maharashtra');
  const [customPhone, setCustomPhone] = useState('+91 9900223344');
  const [customEmail, setCustomEmail] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse location text to friendly Indian cities
  const friendlyLocation = (slug: string) => {
    switch (slug) {
      case 'pune_maharashtra': return 'Pune, Maharashtra';
      case 'bengaluru_karnataka': return 'Bengaluru, Karnataka';
      case 'bhatinda_punjab': return 'Bhatinda, Punjab';
      case 'mumbai_maharashtra': return 'Mumbai, Maharashtra';
      case 'delhi_ncr': return 'Delhi NCR';
      default: return 'Mumbai, Maharashtra';
    }
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    // Generate standard synthetic transactions based on selected role!
    const generatedTransactions: Transaction[] = [];
    const dateStr = new Date().toISOString().split('T')[0];

    if (customRole === 'Gig Worker') {
      generatedTransactions.push(
        { id: 'custom_t1', date: dateStr, description: 'Swiggy Delivery Payout Weekly', amount: 8400, type: 'credit', category: 'Gig Settlement', mode: 'IMPS' },
        { id: 'custom_t2', date: dateStr, description: 'Zomato Partner Weekly Payout', amount: 6200, type: 'credit', category: 'Gig Settlement', mode: 'IMPS' },
        { id: 'custom_t3', date: dateStr, description: 'UPI - Petrol Shell Bunk', amount: 450, type: 'debit', category: 'Fuel', mode: 'UPI' },
        { id: 'custom_t4', date: dateStr, description: 'UPI - PG Rental Rent', amount: 4800, type: 'debit', category: 'Rent', mode: 'UPI' },
        { id: 'custom_t5', date: dateStr, description: 'UPI - D‑Mart grocery', amount: 1500, type: 'debit', category: 'Groceries', mode: 'UPI' }
      );
    } else if (customRole === 'Student') {
      generatedTransactions.push(
        { id: 'custom_t1', date: dateStr, description: 'UPI - Received from Uncle Support', amount: 6500, type: 'credit', category: 'UPI Inflow', mode: 'UPI' },
        { id: 'custom_t2', date: dateStr, description: 'UPI - Semester tuition exam book purchases', amount: 950, type: 'debit', category: 'Education', mode: 'UPI' },
        { id: 'custom_t3', date: dateStr, description: 'UPI - Pocket money tutoring earnings chegg', amount: 3500, type: 'credit', category: 'Tutoring Income', mode: 'UPI' },
        { id: 'custom_t4', date: dateStr, description: 'UPI - Hostel mess charges', amount: 2000, type: 'debit', category: 'Rent', mode: 'UPI' }
      );
    } else if (customRole === 'Farmer') {
      generatedTransactions.push(
        { id: 'custom_t1', date: dateStr, description: 'Mandi Arhatia Harvest Cotton cash-credit', amount: 38000, type: 'credit', category: 'Seasonal Harvest Payout', mode: 'IMPS' },
        { id: 'custom_t2', date: dateStr, description: 'UPI - Krishak Beej & Seed depot purchase', amount: 5500, type: 'debit', category: 'Agri Expenses', mode: 'UPI' }
      );
    } else if (customRole === 'Small Retailer') {
      generatedTransactions.push(
        { id: 'custom_t1', date: dateStr, description: 'UPI Business QRs Settlement Consolidated', amount: 41000, type: 'credit', category: 'Merchant Settlement', mode: 'UPI' },
        { id: 'custom_t2', date: dateStr, description: 'UPI - Wholesale vendor grocery supplies', amount: 18000, type: 'debit', category: 'Business Inventory', mode: 'UPI' },
        { id: 'custom_t3', date: dateStr, description: 'UPI - Commercial Shop electricity billing', amount: 2400, type: 'debit', category: 'Utilities', mode: 'UPI' }
      );
    } else {
      // Salaried standard
      generatedTransactions.push(
        { id: 'custom_t1', date: dateStr, description: 'Salary Credit - IDBI Corporate Payroll', amount: 80000, type: 'credit', category: 'Salary', mode: 'IMPS' },
        { id: 'custom_t2', date: dateStr, description: 'Home Loan EMI deduction', amount: 25000, type: 'debit', category: 'EMI Loan Repayment', mode: 'NetBanking' }
      );
    }

    const newCust: CustomerProfile = {
      id: `cust_${customName.toLowerCase().replace(/\s+/g, '_')}_${Date.now().toString().slice(-4)}`,
      name: customName,
      role: customRole,
      age: Number(customAge),
      location: customLocation,
      gender: customGender,
      phone: customPhone,
      email: customEmail || `${customName.toLowerCase().replace(/\s+/g, '')}@banking‑sandbox.in`,
      creditHistory: customRole === 'Salaried' || customRole === 'Freelancer',
      transactions: generatedTransactions
    };

    onAddNewCustomer(newCust);
    setCustomName('');
    setShowAddForm(false);

    if (audioSpeechEnabled && window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance(`Added custom profile for ${customName} in the ${customRole} inclusion segment.`);
      window.speechSynthesis.speak(u);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadedFile(e.target.files[0]);
    }
  };

  const handleUploadedFile = (file: File) => {
    // Generate a new custom customer profile with a mock-parse alert
    const reader = new FileReader();
    reader.onload = () => {
      // Create a nice profile based on upload name
      const cleanName = file.name.split('.')[0].replace(/[-_]+/g, ' ');
      const newCust: CustomerProfile = {
        id: `uploaded_${cleanName.toLowerCase().replace(/\s+/g, '_')}`,
        name: cleanName.charAt(0).toUpperCase() + cleanName.slice(1) || 'Uploaded Pilot',
        role: 'Gig Worker',
        age: 30,
        location: 'bengaluru_karnataka',
        gender: 'Male',
        phone: '+91 9123456789',
        email: 'uploaded.pilot@idbi-innovate.in',
        creditHistory: false,
        transactions: [
          { id: 'ut_1', date: '2026-06-01', description: 'Consolidated Weekly Earnings UPI', amount: 9500, type: 'credit', category: 'Gig Settlement', mode: 'UPI' },
          { id: 'ut_2', date: '2026-06-03', description: 'UPI - Kirana Provisions', amount: 1200, type: 'debit', category: 'Groceries', mode: 'UPI' },
          { id: 'ut_3', date: '2026-06-10', description: 'Consolidated Weekly Earnings UPI', amount: 8900, type: 'credit', category: 'Gig Settlement', mode: 'UPI' },
          { id: 'ut_4', date: '2026-06-12', description: 'UPI - Fuel and transportation', amount: 800, type: 'debit', category: 'Fuel', mode: 'UPI' },
          { id: 'ut_5', date: '2026-06-14', description: 'LIC micro-premium payment', amount: 350, type: 'debit', category: 'Insurance', mode: 'UPI' }
        ]
      };
      onAddNewCustomer(newCust);
      if (audioSpeechEnabled && window.speechSynthesis) {
        const u = new SpeechSynthesisUtterance(`Statement parsed. Created credit profile for ${newCust.name}.`);
        window.speechSynthesis.speak(u);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6" id="customer_selection_stage">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div>
          <h2 className="text-lg font-display font-semibold text-slate-800 flex items-center space-x-2">
            <Users className="h-5 w-5 text-indigo-500" />
            <span>Select Underwriting Account (IDBI Active Sandbox)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">Select an Indian demographic segment to run behavioral credit simulations in real‑time.</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-sans text-xs px-3.5 py-2 rounded-lg font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            id="open_custom_user_modal"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Custom Lead</span>
          </button>
        </div>
      </div>

      {/* Wildcard custom lead generator form */}
      {showAddForm && (
        <form onSubmit={handleCreateCustomer} className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 mb-6 transition-all animate-fade-in" id="add_custom_customer_form">
          <h3 className="text-sm font-display font-semibold text-slate-700 mb-4 flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-indigo-500 animate-spin" />
            <span>Simulate a Custom Credit Segment</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={customName}
                onChange={e => setCustomName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 outline-none font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Occupation Mode Segment</label>
              <select
                value={customRole}
                onChange={e => setCustomRole(e.target.value as any)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 outline-none font-sans"
              >
                <option value="Gig Worker">Gig Delivery (Swiggy / Zomato)</option>
                <option value="Freelancer">Independent Freelancer</option>
                <option value="Student">Student (Undergraduate / Intern)</option>
                <option value="Farmer">Seasonal Farmer (Bhatinda / Rural)</option>
                <option value="Small Retailer">Local Kirana Merchant / Corner Store</option>
                <option value="Salaried">Traditional Salaried Employee</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Location City</label>
              <select
                value={customLocation}
                onChange={e => setCustomLocation(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 outline-none font-sans"
              >
                <option value="mumbai_maharashtra">Mumbai, Maharashtra</option>
                <option value="bengaluru_karnataka">Bengaluru, Karnataka</option>
                <option value="pune_maharashtra">Pune, Maharashtra</option>
                <option value="bhatinda_punjab">Bhatinda, Punjab</option>
                <option value="delhi_ncr">Delhi NCR</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Age</label>
              <input
                type="number"
                min="18"
                max="80"
                value={customAge}
                onChange={e => setCustomAge(Number(e.target.value))}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 outline-none font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Gender</label>
              <select
                value={customGender}
                onChange={e => setCustomGender(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 outline-none font-sans"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Phone Number</label>
              <input
                type="text"
                value={customPhone}
                onChange={e => setCustomPhone(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500 outline-none font-sans"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs text-slate-500 hover:text-slate-800 transition-all font-sans"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-4 py-2 rounded-lg font-medium transition-all font-display"
            >
              Build Credit Dossier
            </button>
          </div>
        </form>
      )}

      {/* Grid listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {customers.map((cust) => {
          const isSelected = cust.id === selectedCustomerId;
          return (
            <button
              key={cust.id}
              onClick={() => {
                onSelectCustomer(cust.id);
                if (audioSpeechEnabled && window.speechSynthesis) {
                  const u = new SpeechSynthesisUtterance(`Selected ${cust.name}, occupational footprint as ${cust.role}`);
                  window.speechSynthesis.speak(u);
                }
              }}
              className={`p-4 rounded-xl border text-left transition-all relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isSelected
                  ? 'bg-gradient-to-br from-indigo-50/45 to-indigo-50/10 border-indigo-500 ring-1 ring-indigo-500 shadow-md'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
              id={`select_user_${cust.id}`}
              aria-label={`Select profile of ${cust.name}, ${cust.role}, Age ${cust.age}, from ${friendlyLocation(cust.location)}. ${isSelected ? 'Currently selected' : 'Press to select.'}`}
              aria-pressed={isSelected}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  cust.role === 'Student' ? 'bg-orange-100 text-orange-700' :
                  cust.role === 'Gig Worker' ? 'bg-cyan-100 text-cyan-700' :
                  cust.role === 'Farmer' ? 'bg-emerald-100 text-emerald-700' :
                  cust.role === 'Freelancer' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {cust.role}
                </span>
                {isSelected && <CheckCircle2 className="h-4 w-4 text-indigo-600" />}
              </div>
              
              <h3 className="font-display font-bold text-slate-800 text-sm truncate">{cust.name}</h3>
              <p className="text-[11px] text-slate-500 flex items-center mt-1">
                <MapPin className="h-3 w-3 text-slate-400 mr-1 shrink-0" />
                <span className="truncate">{friendlyLocation(cust.location)}</span>
              </p>
              
              <div className="mt-3 pt-2.5 border-t border-slate-200/50 flex items-center justify-between text-[11px] text-slate-500">
                <span>Age: {cust.age}</span>
                <span className="font-mono text-[10px]">
                  {cust.transactions.length} Txns
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Drag & Drop real/synthetic statement parser */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Drag and drop bank statement files to upload. Supports CSV, JSON, and Text formats. Press Enter or Space to browse files."
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          dragActive
            ? 'border-indigo-500 bg-indigo-50/30'
            : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50/50'
        }`}
        id="drag_statements_zone"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".csv,.json,.txt"
          className="hidden"
        />
        <Upload className="h-8 w-8 text-slate-400 mx-auto mb-3" />
        <h3 className="text-xs font-display font-semibold text-slate-700">Drag &amp; Drop Bank Statement Files</h3>
        <p className="text-[11px] text-slate-400 mt-1">Upload actual synthetic transaction statements (CSV/JSON/Txt logs) or click to browse files locally.</p>
        <span className="inline-block mt-3 bg-slate-100 text-slate-500 text-[10px] font-mono font-medium px-2.5 py-1 rounded">
          UTF-8 ENCODED FILES ONLY
        </span>
      </div>
    </div>
  );
}
