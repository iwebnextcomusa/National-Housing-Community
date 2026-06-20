import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Calendar, User, Heart, Shield, CheckCircle, ArrowRight, DollarSign } from 'lucide-react';

// --- HELP REQUEST / ELIGIBILITY APPLICATION FORM ---
export function GetHelpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    householdSize: '1',
    monthlyIncome: '',
    assistanceType: 'rent_subsidy',
    shelterStatus: 'couch_surfing',
    description: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d \(\)-]{9,16}$/.test(formData.phone)) {
      tempErrors.phone = 'Please provide a valid phone number (e.g. 123-456-7890)';
    }
    if (!formData.monthlyIncome.trim()) {
      tempErrors.monthlyIncome = 'Approximate monthly income is required';
    } else if (isNaN(Number(formData.monthlyIncome)) || Number(formData.monthlyIncome) < 0) {
      tempErrors.monthlyIncome = 'Income must be a valid positive number';
    }
    if (!formData.description.trim()) {
      tempErrors.description = 'Please explain your situation so our counselors can match resources';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Simulate submission & trigger visual Ticket ID
      const randomID = 'NHC-' + Math.floor(100000 + Math.random() * 900000);
      setTicketId(randomID);
      setSubmitted(true);
      
      // Persist in localStorage to show local audit durability
      const list = JSON.parse(localStorage.getItem('nhc_assistance_requests') || '[]');
      list.push({ id: randomID, date: new Date().toLocaleDateString(), ...formData });
      localStorage.setItem('nhc_assistance_requests', JSON.stringify(list));
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm text-left">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-xl font-bold font-sans text-slate-900">Emergency Assistance Request</h3>
              <p className="text-xs text-slate-505 text-slate-500 mt-1 leading-relaxed">
                Fill out the secure registration below. Confidentiality is fully assured under federal privacy guidelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="help-name">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    id="help-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className={`w-full bg-slate-50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                      errors.name ? 'border-rose-500' : 'border-slate-200 focus:border-blue-500'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="help-email">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    id="help-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className={`w-full bg-slate-50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                      errors.email ? 'border-rose-500' : 'border-slate-200 focus:border-blue-500'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="help-phone">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    id="help-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(323) 555-0100"
                    className={`w-full bg-slate-50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                      errors.phone ? 'border-rose-500' : 'border-slate-200 focus:border-blue-500'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="help-size">
                    Household Size
                  </label>
                  <select
                    id="help-size"
                    value={formData.householdSize}
                    onChange={(e) => setFormData({ ...formData, householdSize: e.target.value })}
                    className="w-full bg-slate-50 rounded-xl py-3 px-3 text-sm text-slate-800 border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5+ People</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="help-income">
                    Monthly Income ($) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-2.5 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      id="help-income"
                      type="text"
                      value={formData.monthlyIncome}
                      onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                      placeholder="1800"
                      className={`w-full bg-slate-50 rounded-xl py-3 pl-8 pr-3 text-sm text-slate-800 placeholder-slate-400 border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                        errors.monthlyIncome ? 'border-rose-500' : 'border-slate-200 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  {errors.monthlyIncome && <p className="text-[11px] text-rose-600 mt-1">{errors.monthlyIncome}</p>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="help-assistance">
                  Type of Assistance
                </label>
                <select
                  id="help-assistance"
                  value={formData.assistanceType}
                  onChange={(e) => setFormData({ ...formData, assistanceType: e.target.value })}
                  className="w-full bg-slate-50 rounded-xl py-3 px-3 text-sm text-slate-800 border border-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="hud_voucher">HUD/Section 8 Placement</option>
                  <option value="rent_subsidy">Emergency Rent Aid</option>
                  <option value="eviction_mediation">Landlord Mediation / Legal</option>
                  <option value="emergency_shelter">Crisis Rest & Sheltering</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="help-status">
                  Current Living Situation
                </label>
                <select
                  id="help-status"
                  value={formData.shelterStatus}
                  onChange={(e) => setFormData({ ...formData, shelterStatus: e.target.value })}
                  className="w-full bg-slate-50 rounded-xl py-3 px-3 text-sm text-slate-800 border border-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="housed">At Risk of Eviction (Housed)</option>
                  <option value="couch_surfing">Temporary Couch Surfing</option>
                  <option value="emergency_shelter">Emergency Family Shelter</option>
                  <option value="unsheltered">Currently Unhoused</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="help-desc">
                Situation Statement & Specific Needs *
              </label>
              <textarea
                id="help-desc"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Briefly state your circumstances, family dependencies, and any pending eviction deadlines..."
                className={`w-full bg-slate-50 rounded-xl p-3 text-sm text-slate-800 placeholder-slate-400 border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.description ? 'border-rose-500' : 'border-slate-200 focus:border-blue-500'
                }`}
              />
              {errors.description && <p className="text-[11px] text-rose-600 mt-1">{errors.description}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:translate-y-[1px] text-white text-sm font-bold rounded-xl transition duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-100"
            >
              <span>Submit Secure Assessment</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-5"
          >
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border border-green-100 animate-pulse">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-slate-900">Application Received Securely</h4>
              <p className="text-sm text-slate-655 text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-blue-600 font-semibold">{formData.name}</span>. Your case file has been established. Our regional housing counselors will prioritize review.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 w-full max-w-sm space-y-2 text-left">
              <div className="flex justify-between items-center text-xs font-mono border-b border-slate-100 pb-2">
                <span className="text-slate-500">TICKET ASSIGNMENT</span>
                <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{ticketId}</span>
              </div>
              <div className="grid grid-cols-2 gap-y-1.5 text-xs pt-1">
                <span className="text-slate-505 text-slate-500">Service Category:</span>
                <span className="text-slate-800 text-right font-medium">Emergency Housing match</span>
                <span className="text-slate-505 text-slate-500">Review Timeline:</span>
                <span className="text-green-600 text-right font-semibold">12 - 24 Hours</span>
                <span className="text-slate-505 text-slate-500">Assistance Hotline:</span>
                <span className="text-slate-800 text-right">(323) 396-1569</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  householdSize: '1',
                  monthlyIncome: '',
                  assistanceType: 'rent_subsidy',
                  shelterStatus: 'couch_surfing',
                  description: ''
                });
              }}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-xs text-white rounded-xl transition cursor-pointer"
            >
              Submit Another Case Form
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


// --- VOLUNTEER REGISTRATION FORM ---
export function VolunteerForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    area: 'food_distribution',
    availability: 'weekends',
    motivation: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    }
    if (!formData.motivation.trim()) {
      tempErrors.motivation = 'Please share briefly why you would like to join';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      
      const list = JSON.parse(localStorage.getItem('nhc_volunteer_signups') || '[]');
      list.push({ date: new Date().toLocaleDateString(), ...formData });
      localStorage.setItem('nhc_volunteer_signups', JSON.stringify(list));
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm text-left">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Join Our Volunteer Force</h3>
              <p className="text-xs text-slate-500 mt-1">
                Your time and talents directly empower vulnerable families. Register below to attend an orientation.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="vol-name">
                Full Name *
              </label>
              <input
                id="vol-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Sarah Miller"
                className={`w-full bg-slate-50 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.name ? 'border-rose-500' : 'border-slate-200 focus:border-blue-500'
                }`}
              />
              {errors.name && <p className="text-[10px] text-rose-600 mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="vol-email">
                  Email Address *
                </label>
                <input
                  id="vol-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah@example.com"
                  className={`w-full bg-slate-50 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    errors.email ? 'border-rose-500' : 'border-slate-200 focus:border-blue-500'
                  }`}
                />
                {errors.email && <p className="text-[10px] text-rose-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="vol-phone">
                  Phone Number *
                </label>
                <input
                  id="vol-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(323) 555-0199"
                  className={`w-full bg-slate-50 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    errors.phone ? 'border-rose-500' : 'border-slate-200 focus:border-blue-500'
                  }`}
                />
                {errors.phone && <p className="text-[10px] text-rose-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="vol-area">
                  Preferred Volunteer Area
                </label>
                <select
                  id="vol-area"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full bg-slate-50 rounded-xl py-2.5 px-3 text-sm text-slate-800 border border-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="food_distribution">Food Pantry & Shelters Support</option>
                  <option value="literacy_workshops">Workshop hosting (Credit & Budgets)</option>
                  <option value="landlord_mediation">Advocacy & legal Support Helper</option>
                  <option value="phone_outreach">Phone banking & community wellness checkins</option>
                  <option value="admin_support">Administrative / Office Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="vol-avail">
                  Availability
                </label>
                <select
                  id="vol-avail"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  className="w-full bg-slate-50 rounded-xl py-2.5 px-3 text-sm text-slate-800 border border-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="weekdays">Weekdays (9 AM - 5 PM)</option>
                  <option value="weekends">Saturdays / Sundays</option>
                  <option value="evenings">Evenings (6 PM - 9 PM)</option>
                  <option value="flexible">Flexible / Anytime</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="vol-motivate">
                Why do you want to volunteer? *
              </label>
              <textarea
                id="vol-motivate"
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                rows={3}
                placeholder="Share your background, skills, or what drives you to keep our communities sheltered..."
                className={`w-full bg-slate-50 rounded-xl p-3 text-sm text-slate-800 placeholder-slate-400 border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.motivation ? 'border-rose-500' : 'border-slate-200 focus:border-blue-500'
                }`}
              />
              {errors.motivation && <p className="text-[10px] text-rose-600 mt-1">{errors.motivation}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-100"
            >
              <span>Submit Registration Form</span>
              <Heart className="h-4 w-4 fill-white" />
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-4"
          >
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center border border-green-100 animate-pulse">
              <CheckCircle className="h-7 w-7 text-green-600" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-lg font-bold text-slate-900">Awesome! You're Pre-Registered</h4>
              <p className="text-sm text-slate-600 leading-normal max-w-sm">
                Thank you for stepping forward, <span className="text-blue-600 font-semibold">{formData.name}</span>! Our volunteer outreach director will contact you shortly with upcoming schedules and onboarding steps.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-left w-full max-w-xs space-y-1 text-slate-600">
               <p><strong className="text-slate-800">Orientation:</strong> Next Saturday at 11:00 AM</p>
               <p><strong className="text-slate-800">Format:</strong> Zoom Link & On-site briefing options</p>
               <p><strong className="text-slate-800">Support Hotline:</strong> (323) 396-1569</p>
            </div>

            <button
              onClick={() => setSubmitted(false)}
              className="text-xs text-slate-500 hover:text-slate-700 underline cursor-pointer"
            >
              Return / Edit Register Form
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


// --- CONTACT FORM ---
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email';
    }
    if (!formData.message.trim()) {
      tempErrors.message = 'Please provide your enquiry description';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      
      const list = JSON.parse(localStorage.getItem('nhc_contact_inquiries') || '[]');
      list.push({ date: new Date().toLocaleDateString(), ...formData });
      localStorage.setItem('nhc_contact_inquiries', JSON.stringify(list));
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm text-left">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="con-name">
                Full Name *
              </label>
              <input
                id="con-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
                className={`w-full bg-slate-50 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.name ? 'border-rose-500' : 'border-slate-200 focus:border-blue-500'
                }`}
              />
              {errors.name && <p className="text-[10px] text-rose-600 mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="con-email">
                  Email Address *
                </label>
                <input
                  id="con-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@email.com"
                  className={`w-full bg-slate-50 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    errors.email ? 'border-rose-500' : 'border-slate-200 focus:border-blue-500'
                  }`}
                />
                {errors.email && <p className="text-[10px] text-rose-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="con-phone">
                  Phone (Optional)
                </label>
                <input
                  id="con-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(323) 555-0100"
                  className="w-full bg-slate-50 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="con-subj">
                Subject Matters
              </label>
              <select
                id="con-subj"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-slate-50 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 border border-slate-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="general">General Inquiries & Outreach</option>
                <option value="partnerships">Strategic Partnerships & Grants</option>
                <option value="donations">Corporate Donating & Legacies</option>
                <option value="housing_landlords">Landlord Alliance registration</option>
                <option value="media">Media / Press Queries</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1" htmlFor="con-msg">
                Your Message *
              </label>
              <textarea
                id="con-msg"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                placeholder="Message details..."
                className={`w-full bg-slate-50 rounded-xl p-3 text-sm text-slate-800 placeholder-slate-400 border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.message ? 'border-rose-500' : 'border-slate-200 focus:border-blue-500'
                }`}
              />
              {errors.message && <p className="text-[10px] text-rose-600 mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-105/15"
            >
              <span>Send Message</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-10 text-center space-y-4"
          >
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center border border-green-100 animate-pulse">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-lg">Message Transmission Confirmed</h4>
              <p className="text-xs text-slate-655 text-slate-500 max-w-xs mx-auto">
                Thank you for writing to National Housing Community, <span className="text-blue-600 font-semibold">{formData.name}</span>. An administrative assistant of ronebiz@gmail.com will follow up within 24 business hours.
              </p>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
              }}
              className="text-xs text-slate-500 hover:text-slate-700 underline cursor-pointer"
            >
              Write Another Message
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
