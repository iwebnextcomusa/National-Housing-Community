import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Calendar, Heart, ShieldCheck, CheckCircle2, DollarSign, Gift, HeartHandshake } from 'lucide-react';
import { donationTiersData } from '../data';

export function DonateView() {
  const [pledgeType, setPledgeType] = useState<'one-time' | 'recurring'>('one-time');
  const [donationAmount, setDonationAmount] = useState<number>(150);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [billingName, setBillingName] = useState('');
  const [billingEmail, setBillingEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [receiptCode, setReceiptCode] = useState('');

  // Handle standard tier picks
  const handleTierSelect = (amount: number) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  // Handle custom number overrides
  const handleCustomChange = (val: string) => {
    setCustomAmount(val);
    const num = Number(val);
    if (!isNaN(num) && num > 0) {
      setDonationAmount(num);
    } else {
      setDonationAmount(0);
    }
  };

  // Dynamically extract matching descriptions
  const getImpactDescription = (amount: number) => {
    if (amount <= 0) return 'Please select an amount to review community support impact.';
    
    // Find closest lower or equal tier matching
    const matches = [...donationTiersData].sort((a, b) => b.amount - a.amount);
    const bestFit = matches.find((tier) => amount >= tier.amount);
    
    if (bestFit) {
      return `Impact: ${bestFit.impact}`;
    }
    return 'Impact: Directly pooled into eviction prevention micro-grants for vulnerable residents.';
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!billingName.trim()) tempErrors.billingName = 'Billing name is required';
    if (!billingEmail.trim()) {
      tempErrors.billingEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(billingEmail)) {
      tempErrors.billingEmail = 'Provide valid email';
    }
    if (donationAmount <= 0) {
      tempErrors.amount = 'Please select or type a valid donation amount';
    }
    if (!/^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/.test(cardNumber.trim().replace(/\s/g, ''))) {
      tempErrors.cardNumber = 'Provide a valid 16-digit credit card number';
    }
    if (!/^\d{2}\/\d{2}$/.test(cardExpiry.trim())) {
      tempErrors.cardExpiry = 'Requires MM/YY';
    }
    if (!/^\d{3,4}$/.test(cardCvc.trim())) {
      tempErrors.cardCvc = 'Requires CVC';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const code = 'TX-' + Math.floor(10000000 + Math.random() * 90000000);
      setReceiptCode(code);
      setSubmitted(true);

      const list = JSON.parse(localStorage.getItem('nhc_donations') || '[]');
      list.push({
        id: code,
        date: new Date().toLocaleDateString(),
        amount: donationAmount,
        type: pledgeType,
        name: billingName,
        email: billingEmail
      });
      localStorage.setItem('nhc_donations', JSON.stringify(list));
    }
  };

  return (
    <div className="space-y-16 text-left">
      {/* Intro section */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <span className="text-xs font-mono tracking-widest text-blue-600 uppercase">CONFIDENTIAL & EXEMPTION SECURED</span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
          Fuel eviction-prevention <br />
          <span className="text-blue-600">
            and safe sheltering.
          </span>
        </h1>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Over 88% of our financial reserves are deployed directly to pay rent balances and provide senior co-op placements. We are a registered tax-exempt charitable NGO.
        </p>
      </section>

      {/* Main donation layout split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
        
        {/* Left Side: interactive amount selection and impact metrics */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Gift className="h-5 w-5 text-blue-600" />
              1. Choose Pledge Amount
            </h3>
            
            {/* One-time vs Monthly switch */}
            <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200 self-start">
              <button
                onClick={() => setPledgeType('one-time')}
                className={`py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase transition cursor-pointer ${
                  pledgeType === 'one-time'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-503 text-slate-500 hover:text-slate-800'
                }`}
              >
                One-Time
              </button>
              <button
                onClick={() => setPledgeType('recurring')}
                className={`py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase transition cursor-pointer ${
                  pledgeType === 'recurring'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-503 text-slate-500 hover:text-slate-800'
                }`}
              >
                Monthly Support
              </button>
            </div>
          </div>

          {/* Preset Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {donationTiersData.map((tier) => (
              <button
                key={tier.amount}
                onClick={() => handleTierSelect(tier.amount)}
                className={`py-3 px-3 rounded-xl border text-xs font-bold font-mono transition cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  donationAmount === tier.amount && !customAmount
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100/50'
                }`}
              >
                <span>${tier.amount}</span>
                <span className={`text-[8px] font-normal leading-none font-sans opacity-80 ${
                  donationAmount === tier.amount && !customAmount ? 'text-white' : 'text-slate-500'
                }`}>
                  {tier.label.replace(' Advocate', '').replace(' Preventer', '').replace(' Supporter', '')}
                </span>
              </button>
            ))}
          </div>

          {/* Custom Input override */}
          <div className="space-y-1 pt-2">
            <label className="block text-xs font-semibold text-slate-500">Or enter custom amount ($USD):</label>
            <div className="relative max-w-sm">
              <DollarSign className="absolute left-3 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="text"
                value={customAmount}
                onChange={(e) => handleCustomChange(e.target.value)}
                placeholder="Custom donor amount..."
                className="w-full bg-slate-50 rounded-xl py-3 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-400 border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
              />
            </div>
            {errors.amount && <p className="text-[10px] text-rose-600">{errors.amount}</p>}
          </div>

          {/* Living Calculator Dynamic Impact Box */}
          <div className="bg-blue-50 rounded-2xl p-4.5 border border-blue-100 flex gap-4 items-start">
            <HeartHandshake className="h-6 w-6 text-blue-600 shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-1 text-left">
              <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Active Community Impact Math:</h4>
              <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                A pledge of <span className="text-blue-600 font-bold font-mono">${donationAmount}</span> {pledgeType === 'recurring' ? 'every month' : 'today'} directly supports housing.
              </p>
              <p className="text-xs text-slate-655 text-slate-600 italic pt-1 leading-normal">
                {getImpactDescription(donationAmount)}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row gap-2 justify-between text-xs text-slate-500 font-mono">
            <span>Deductible IRS Code: 501(c)(3)</span>
            <span>Tax Receipts Compiled Automatically</span>
          </div>
        </div>

        {/* Right Side: Credit Card info / Simulation Form */}
        <div className="lg:col-span-5 bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-sm text-left">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                onSubmit={handleDonateSubmit}
                className="space-y-4"
              >
                <div className="border-b border-slate-105 pb-3">
                  <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-blue-655 text-blue-650 text-blue-600" />
                    2. Secure Billing
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="don-name">
                    Name on Card *
                  </label>
                  <input
                    id="don-name"
                    type="text"
                    value={billingName}
                    onChange={(e) => setBillingName(e.target.value)}
                    placeholder="Marcus Jenkins"
                    className={`w-full bg-slate-50 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 border focus:outline-none focus:ring-2 focus:ring-blue-500/10 ${
                      errors.billingName ? 'border-rose-500' : 'border-slate-205 border-slate-200'
                    }`}
                  />
                  {errors.billingName && <p className="text-[10px] text-rose-600 mt-1">{errors.billingName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="don-email">
                    Billing Email *
                  </label>
                  <input
                    id="don-email"
                    type="email"
                    value={billingEmail}
                    onChange={(e) => setBillingEmail(e.target.value)}
                    placeholder="marcus@email.com"
                    className={`w-full bg-slate-50 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 border focus:outline-none focus:ring-2 focus:ring-blue-500/10 ${
                      errors.billingEmail ? 'border-rose-500' : 'border-slate-205 border-slate-200'
                    }`}
                  />
                  {errors.billingEmail && <p className="text-[10px] text-rose-600 mt-1">{errors.billingEmail}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="don-card">
                    Card Number *
                  </label>
                  <input
                    id="don-card"
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4000 1234 5678 9010"
                    maxLength={19}
                    className={`w-full bg-slate-50 rounded-xl py-2.5 px-3.5 text-sm font-mono text-slate-800 placeholder-slate-400 border focus:outline-none focus:ring-2 focus:ring-blue-500/10 ${
                      errors.cardNumber ? 'border-rose-500' : 'border-slate-205 border-slate-200'
                    }`}
                  />
                  {errors.cardNumber && <p className="text-[10px] text-rose-600 mt-1">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="don-expiry">
                      Expiry Date *
                    </label>
                    <input
                      id="don-expiry"
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={`w-full bg-slate-50 rounded-xl py-2.5 px-3.5 text-sm font-mono text-slate-800 placeholder-slate-400 border focus:outline-none focus:ring-2 focus:ring-blue-500/10 ${
                        errors.cardExpiry ? 'border-rose-500' : 'border-slate-205 border-slate-200'
                      }`}
                    />
                    {errors.cardExpiry && <p className="text-[10px] text-rose-600 mt-1">{errors.cardExpiry}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="don-cvc">
                      Security CVC *
                    </label>
                    <input
                      id="don-cvc"
                      type="password"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="•••"
                      maxLength={4}
                      className={`w-full bg-slate-50 rounded-xl py-2.5 px-3.5 text-sm font-mono text-slate-800 placeholder-slate-400 border focus:outline-none focus:ring-2 focus:ring-blue-500/10 ${
                        errors.cardCvc ? 'border-rose-500' : 'border-slate-205 border-slate-200'
                      }`}
                    />
                    {errors.cardCvc && <p className="text-[10px] text-rose-600 mt-1">{errors.cardCvc}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-100"
                >
                  <span>Transmit Security Payment</span>
                  <Heart className="h-4 w-4 fill-white" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border border-green-100">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-slate-900">Donation Processed Successfully!</h4>
                  <p className="text-xs text-slate-600 leading-normal max-w-xs mx-auto">
                    A heartful thank you, <span className="text-blue-600 font-semibold">{billingName}</span>. Your support is critical to keeping the community housed.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-left w-full space-y-1.5">
                  <div className="flex justify-between items-center font-mono border-b border-slate-200 pb-1.5 mb-1.5">
                    <span className="text-slate-500">OFFICIAL RECEIPT</span>
                    <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-105">{receiptCode}</span>
                  </div>
                  <p><strong className="text-slate-700">Pledge Level:</strong> ${donationAmount} {pledgeType === 'recurring' ? 'Monthly' : 'One-time'}</p>
                  <p className="leading-snug pt-1 text-slate-655 text-slate-500 font-sans italic border-t border-slate-200 border-dashed mt-1">
                    "{getImpactDescription(donationAmount)}"
                  </p>
                  <p className="text-[10px] text-slate-455 text-slate-600 mt-2">A PDF tax citation has been dispatched to {billingEmail} for your tax files.</p>
                </div>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setCardNumber('');
                    setCardExpiry('');
                    setCardCvc('');
                    setCustomAmount('');
                  }}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-xs text-white rounded-xl transition cursor-pointer"
                >
                  Issue Another Pledge
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
