import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, FileText, Plus, Minus, HelpCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { GetHelpForm } from './Forms';
import { faqsData } from '../data';

export function GetHelpView() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="space-y-16 text-left">
      {/* Intro section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-mono tracking-widest text-blue-600 uppercase">IMMEDIATE RESOURCES HUB</span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Seeking Housing Support? <br />
            <span className="text-blue-600">
              We stand prepared to assist.
            </span>
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
            If you are struggling with eviction threats, utility disconnects, or seek subsidized housing, please utilize our secure portal below. Our case file coordinators will review details confidentially.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
              <Phone className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Emergency Intake Office</p>
                <p className="text-base font-bold text-slate-800 mt-0.5">(323) 396-1569</p>
                <p className="text-[10px] text-slate-505 text-slate-500 leading-normal">Intakes processed Mon-Fri 8AM - 6PM</p>
              </div>
            </div>
            
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
              <Mail className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Direct Intake PDF Coordinator</p>
                <p className="text-base font-bold text-slate-800 mt-0.5">ronebiz@gmail.com</p>
                <p className="text-[10px] text-slate-505 text-slate-500 leading-normal">Submit eviction warnings directly via attachment</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-blue-600" />
              Eligibility Intake parameters
            </h3>
            <ul className="space-y-2">
              <li className="flex gap-2 text-xs text-slate-600 items-start">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>Household income must align with HUD local Area Median Income limits (typically below 50% or 30% AMI).</span>
              </li>
              <li className="flex gap-2 text-xs text-slate-600 items-start">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>Provide a copy of pending eviction pleadings or utility shutoff warnings for rapid financial reserve releases.</span>
              </li>
              <li className="flex gap-2 text-xs text-slate-600 items-start">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>Identification materials (SSN or alternative residency documentation) required during secondary validation stages.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Secure Form column */}
        <div className="lg:col-span-5 w-full">
          <GetHelpForm />
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 max-w-5xl mx-auto space-y-8 shadow-sm shadow-slate-100">
        <div className="text-center max-w-md mx-auto space-y-1.5">
          <span className="text-xs font-mono tracking-widest text-blue-600 uppercase">CLARITY CORNER</span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500">Find clarifying parameters regarding HUD vouchers, emergency mediation, and free enrollment.</p>
        </div>

        <div className="space-y-3">
          {faqsData.map((faq) => {
            const isSelected = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-slate-50/50 rounded-2xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 text-slate-800 hover:bg-slate-100/50 transition focus:outline-none cursor-pointer"
                  aria-expanded={isSelected}
                >
                  <div className="flex gap-3 items-center">
                    <HelpCircle className="h-4 w-4 text-blue-500 shrink-0" />
                    <span className="text-xs md:text-sm font-bold tracking-tight text-slate-900">{faq.question}</span>
                  </div>
                  {isSelected ? (
                    <Minus className="h-4 w-4 text-blue-600 shrink-0" />
                  ) : (
                    <Plus className="h-4 w-4 text-slate-400 shrink-0" />
                  )}
                </button>
                
                <AnimatePresence initial={false}>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-5 pt-0 text-xs text-slate-655 text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
