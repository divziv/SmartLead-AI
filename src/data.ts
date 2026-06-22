import { CustomerProfile } from './types.ts';

export const INITIAL_CUSTOMERS: CustomerProfile[] = [
  {
    id: 'cust_rajesh_student',
    name: 'Rajesh Shinde',
    role: 'Student',
    age: 21,
    location: 'pune_maharashtra',
    gender: 'Male',
    phone: '+91 9823055412',
    email: 'rajesh.shinde@puneuni.edu.in',
    creditHistory: false, // New to credit
    transactions: [
      { id: 'tx_r1', date: '2026-06-01', description: 'UPI - Received from Uncle Pocket Money', amount: 8000, type: 'credit', category: 'UPI Inflow', mode: 'UPI' },
      { id: 'tx_r2', date: '2026-06-03', description: 'UPI - Chegg Technical Tutoring Payout', amount: 4500, type: 'credit', category: 'Tutoring Income', mode: 'UPI' },
      { id: 'tx_r3', date: '2026-06-05', description: 'Debit - Pune University Semester Fee', amount: 5000, type: 'debit', category: 'Education', mode: 'NetBanking' },
      { id: 'tx_r4', date: '2026-06-06', description: 'UPI - Cafe Goodluck Bun Maska', amount: 120, type: 'debit', category: 'Food', mode: 'UPI' },
      { id: 'tx_r5', date: '2026-06-10', description: 'UPI - Amazon Books and Stationery', amount: 850, type: 'debit', category: 'Education', mode: 'UPI' },
      { id: 'tx_r6', date: '2026-06-12', description: 'UPI - Received from Internship Stipend', amount: 15000, type: 'credit', category: 'Stipend', mode: 'UPI' },
      { id: 'tx_r7', date: '2026-06-14', description: 'UPI - Paid PG Rent Sharing', amount: 6000, type: 'debit', category: 'Rent', mode: 'UPI' },
      { id: 'tx_r8', date: '2026-06-15', description: 'UPI - Swiggy food order', amount: 310, type: 'debit', category: 'Food', mode: 'UPI' },
      { id: 'tx_r9', date: '2026-06-18', description: 'UPI - HDFC Saving deposits regular transfer', amount: 2000, type: 'debit', category: 'Savings Transfer', mode: 'UPI' },
      { id: 'tx_r10', date: '2026-06-20', description: 'UPI - Shared Cab with friends', amount: 180, type: 'debit', category: 'Travel', mode: 'UPI' }
    ]
  },
  {
    id: 'cust_priya_gig',
    name: 'Priya Narayanan',
    role: 'Gig Worker',
    age: 26,
    location: 'bengaluru_karnataka',
    gender: 'Female',
    phone: '+91 8105774849',
    email: 'priya.narayanan@gigpartners.in',
    creditHistory: false, // Irregular / Gig profile
    transactions: [
      { id: 'tx_p1', date: '2026-06-01', description: 'Zomato Partner Weekly Settlement', amount: 6800, type: 'credit', category: 'Gig Settlement', mode: 'IMPS' },
      { id: 'tx_p2', date: '2026-06-02', description: 'UPI - HP Fuel Station Petrol', amount: 350, type: 'debit', category: 'Fuel', mode: 'UPI' },
      { id: 'tx_p3', date: '2026-06-04', description: 'UPI - Indian Oil Petrol', amount: 300, type: 'debit', category: 'Fuel', mode: 'UPI' },
      { id: 'tx_p4', date: '2026-06-05', description: 'Swiggy Delivery Earnings Credit', amount: 7200, type: 'credit', category: 'Gig Settlement', mode: 'IMPS' },
      { id: 'tx_p5', date: '2026-06-07', description: 'UPI - PG Owner House Rent', amount: 5000, type: 'debit', category: 'Rent', mode: 'UPI' },
      { id: 'tx_p6', date: '2026-06-08', description: 'Zomato Partner Weekly Settlement', amount: 7300, type: 'credit', category: 'Gig Settlement', mode: 'IMPS' },
      { id: 'tx_p7', date: '2026-06-09', description: 'UPI - HP Fuel Station Petrol', amount: 400, type: 'debit', category: 'Fuel', mode: 'UPI' },
      { id: 'tx_p8', date: '2026-06-11', description: 'UPI - Grocery Smart Bazaar', amount: 1850, type: 'debit', category: 'Groceries', mode: 'UPI' },
      { id: 'tx_p9', date: '2026-06-12', description: 'Swiggy Delivery Earnings Credit', amount: 6400, type: 'credit', category: 'Gig Settlement', mode: 'IMPS' },
      { id: 'tx_p10', date: '2026-06-15', description: 'UPI - Mother Support Transfer', amount: 4000, type: 'debit', category: 'Family Support', mode: 'UPI' },
      { id: 'tx_p11', date: '2026-06-16', description: 'Zomato Partner Weekly Settlement', amount: 7900, type: 'credit', category: 'Gig Settlement', mode: 'IMPS' },
      { id: 'tx_p12', date: '2026-06-19', description: 'UPI - Hero Motocorp Service Center', amount: 1250, type: 'debit', category: 'Vehicle Repair', mode: 'UPI' },
      { id: 'tx_p13', date: '2026-06-20', description: 'Swiggy Delivery Earnings Credit', amount: 8100, type: 'credit', category: 'Gig Settlement', mode: 'IMPS' }
    ]
  },
  {
    id: 'cust_baldev_farmer',
    name: 'Baldev Singh',
    role: 'Farmer',
    age: 44,
    location: 'bhatinda_punjab',
    gender: 'Male',
    phone: '+91 9416550293',
    email: 'baldev.farmer.bti@gmail.com',
    creditHistory: false, // Low-literacy / Rural criteria
    transactions: [
      { id: 'tx_b1', date: '2026-03-10', description: 'Mandi Grain Arhatia Sale Settlement', amount: 48000, type: 'credit', category: 'Seasonal Harvest Payout', mode: 'IMPS' },
      { id: 'tx_b2', date: '2026-03-20', description: 'UPI - IFFCO Fertilizer Depot', amount: 4200, type: 'debit', category: 'Agri Expenses', mode: 'UPI' },
      { id: 'tx_b3', date: '2026-04-15', description: 'Cash Withdrawal Bank Branch ATM', amount: 15000, type: 'debit', category: 'Cash Outflow', mode: 'Cash' },
      { id: 'tx_b4', date: '2026-05-02', description: 'UPI - Punjab Tractor Spares Shop', amount: 3100, type: 'debit', category: 'Agri Expenses', mode: 'UPI' },
      { id: 'tx_b5', date: '2026-05-15', description: 'Government PM-Kisan Samman Subsidy', amount: 2000, type: 'credit', category: 'Government Subsidy', mode: 'IMPS' },
      { id: 'tx_b6', date: '2026-05-25', description: 'UPI - Bhatinda Seeds Store', amount: 6400, type: 'debit', category: 'Agri Expenses', mode: 'UPI' },
      { id: 'tx_b7', date: '2026-06-01', description: 'Mandi Cotton Advance Booking', amount: 22000, type: 'credit', category: 'Seasonal Harvest Payout', mode: 'IMPS' },
      { id: 'tx_b8', date: '2026-06-12', description: 'UPI - Village School Fees children', amount: 2400, type: 'debit', category: 'Education', mode: 'UPI' },
      { id: 'tx_b9', date: '2026-06-15', description: 'UPI - Kirana Store Grocery', amount: 3500, type: 'debit', category: 'Groceries', mode: 'UPI' }
    ]
  },
  {
    id: 'cust_ananya_freelancer',
    name: 'Ananya Gupta',
    role: 'Freelancer',
    age: 28,
    location: 'mumbai_maharashtra',
    gender: 'Female',
    phone: '+91 7021115598',
    email: 'ananya.creates@gmail.com',
    creditHistory: true, // Moderate profile
    transactions: [
      { id: 'tx_a1', date: '2026-06-02', description: 'Credit - UK Client Web Design Project', amount: 85000, type: 'credit', category: 'Freelance Payout', mode: 'IMPS' },
      { id: 'tx_a2', date: '2026-06-03', description: 'Debit - Figma Pro Subscription', amount: 1800, type: 'debit', category: 'Software Subs', mode: 'Card' },
      { id: 'tx_a3', date: '2026-06-04', description: 'UPI - Starbucks Coffee', amount: 380, type: 'debit', category: 'Lifestyle', mode: 'UPI' },
      { id: 'tx_a4', date: '2026-06-05', description: 'UPI - Bandra PG Apartment Rent', amount: 22000, type: 'debit', category: 'Rent', mode: 'UPI' },
      { id: 'tx_a5', date: '2026-06-10', description: 'Credit - Local Restaurant Branding advance', amount: 45000, type: 'credit', category: 'Freelance Payout', mode: 'UPI' },
      { id: 'tx_a6', date: '2026-06-11', description: 'Debit - Adobe Creative Cloud Monthly', amount: 4800, type: 'debit', category: 'Software Subs', mode: 'Card' },
      { id: 'tx_a7', date: '2026-06-12', description: 'UPI - HDFC Securities Mutual Fund SIP', amount: 15000, type: 'debit', category: 'SIP Investment', mode: 'UPI' },
      { id: 'tx_a8', date: '2026-06-14', description: 'UPI - Uber Premium Ride Mumbai', amount: 1100, type: 'debit', category: 'Travel', mode: 'UPI' },
      { id: 'tx_a9', date: '2026-06-15', description: 'Credit - Upwork Corp Dashboard payout', amount: 62000, type: 'credit', category: 'Freelance Payout', mode: 'IMPS' },
      { id: 'tx_a10', date: '2026-06-18', description: 'UPI - Gold gym Bandra membership renewal', amount: 12000, type: 'debit', category: 'Lifestyle', mode: 'UPI' },
      { id: 'tx_a11', date: '2026-06-20', description: 'UPI - Zerodha Coin ELSS MF Deposit', amount: 20000, type: 'debit', category: 'SIP Investment', mode: 'UPI' }
    ]
  },
  {
    id: 'cust_ashok_salaried',
    name: 'Ashok Mehta',
    role: 'Salaried',
    age: 38,
    location: 'delhi_ncr',
    gender: 'Male',
    phone: '+91 9911002244',
    email: 'ashok.mehta@corporate.in',
    creditHistory: true, // Strong stable history
    transactions: [
      { id: 'tx_as1', date: '2026-06-01', description: 'Salary Credit - IDBI Bank Corp Payroll', amount: 115000, type: 'credit', category: 'Salary', mode: 'IMPS' },
      { id: 'tx_as2', date: '2026-05-31', description: 'IDBI Home Loan EMI Debit', amount: 34000, type: 'debit', category: 'EMI Loan Repayment', mode: 'NetBanking' },
      { id: 'tx_as3', date: '2026-06-03', description: 'UPI - Tata Power Electricity Bill', amount: 4800, type: 'debit', category: 'Utilities', mode: 'UPI' },
      { id: 'tx_as4', date: '2026-06-04', description: 'UPI - Bharat Petroleum LPG & Fuel', amount: 3200, type: 'debit', category: 'Fuel', mode: 'UPI' },
      { id: 'tx_as5', date: '2026-06-05', description: 'UPI - Safehands Car EMI Payment', amount: 12500, type: 'debit', category: 'EMI Loan Repayment', mode: 'UPI' },
      { id: 'tx_as6', date: '2026-06-08', description: 'UPI - Reliance Digital AC Buying', amount: 24500, type: 'debit', category: 'Lifestyle', mode: 'UPI' },
      { id: 'tx_as7', date: '2026-06-10', description: 'UPI - Amazon India Groceries pantry', amount: 6200, type: 'debit', category: 'Groceries', mode: 'UPI' },
      { id: 'tx_as8', date: '2026-06-12', description: 'UPI - ICICI Mutual Fund SIP', amount: 10000, type: 'debit', category: 'SIP Investment', mode: 'UPI' },
      { id: 'tx_as9', date: '2026-06-14', description: 'Debit - Max New York Life Insurance premium', amount: 9500, type: 'debit', category: 'Insurance', mode: 'NetBanking' },
      { id: 'tx_as10', date: '2026-06-16', description: 'UPI - Delhi Metro Recharge SMARTCARD', amount: 500, type: 'debit', category: 'Travel', mode: 'UPI' },
      { id: 'tx_as11', date: '2026-06-18', description: 'UPI - Rent Transfer for Parent Home', amount: 15000, type: 'debit', category: 'Rent', mode: 'UPI' }
    ]
  }
];
