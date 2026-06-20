import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, ShieldAlert, Users, BookOpen, ChevronRight, HelpCircle, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { programsData } from '../data';

interface ProgramsViewProps {
  onNavigate: (tab: string) => void;
}

export function ProgramsView({ onNavigate }: ProgramsViewProps) {
  const [selectedIssue, setSelectedIssue] = useState('');
  
  // Custom interactive diagnosing matching matrix
  const issuesMap: Record<string, { program: string; action: string; advice: string }> = {
    senior_housing: {
      program: 'Affordable Housing Assistance',
      action: 'Fill out our secure Housing Assessment on the "Get Help" tab.',
      advice: 'Seniors over 62 qualify for specialized HUD Section 202 supportive housing. Our coordinators can match your household to regional senior co-ops and expedite applications.'
    },
    eviction_notice: {
      program: 'Eviction Mediation & Prevention aid',
      action: 'Call our emergency coordinator hotline at (323) 396-1569 immediately.',
      advice: 'Statutory rules limit landlord evictions. We act as a mediator to halt evictions, and deploy rent aid grants from our local charity reserves to reconcile ledgers.'
    },
    buyer_learning: {
      program: 'Tenant Sovereignty & Homebuyer workshops',
      action: 'Register for the First-Time Homebuyer Masterclass on our "News & Events" tab.',
      advice: 'Navigating credit scores, closing deposits, and state down-payment grants can be intimidating. Our workshops walk through mortgage selection steps.'
    },
    family_shelter: {
      program: 'Crisis Rest & Emergency Shelter match',
      action: 'Submit a secure Emergency Housing Assessment with high-priority status.',
      advice: 'We collaborate with county rest environments, voucher hotels, and transitional housing units to shield at-risk families immediately. Your children are safe.'
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HomeIcon':
        return <Home className="h-6 w-6" />;
      case 'ShieldAlertIcon':
        return <ShieldAlert className="h-6 w-6" />;
      case 'UsersIcon':
        return <Users className="h-6 w-6" />;
      case 'BookOpenIcon':
        return <BookOpen className="h-6 w-6" />;
      default:
        return <HelpCircle className="h-6 w-6" />;
    }
  };

  return (
    <div className="space-y-16 text-left">
      {/* Intro section */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <span className="text-xs font-mono tracking-widest text-blue-600 uppercase">CORE ADVOCACY SERVICES</span>
        <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
          Our Programs & Services
        </h1>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          We combine proactive tenant education with reactive emergency rent buffers and structured housing transition pipelines to ensure families retain dignified shelter.
        </p>
      </section>

      {/* Program list grids */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {programsData.map((program) => (
          <div
            key={program.id}
            className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 hover:shadow-md transition duration-300 flex flex-col justify-between space-y-6 shadow-sm shadow-slate-100"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600">
                  {getIcon(program.icon)}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {program.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight mt-1">{program.title}</h3>
                </div>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">{program.description}</p>
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Specific provisions & training</p>
              <ul className="space-y-1.5 pt-0.5">
                {program.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-slate-600 leading-normal">
                    <ChevronRight className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* DIAGNOSTIC RESOURCE FINDER INTERACTIVE BENTO */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 max-w-7xl mx-auto space-y-8 shadow-sm">
        <div className="max-w-2xl text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full text-blue-600 text-[10px] font-mono">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-blue-500" />
            <span>INTERACTIVE ACTION ASSIGNER</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Need Support? Find Your Safe Matching Path</h2>
          <p className="text-slate-500 text-xs">
            Select your primary housing concern below to find matching counselors, eligibility programs, and recommended next steps immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-4">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Describe Your Primary Concern:</label>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setSelectedIssue('senior_housing')}
                className={`py-3.5 px-4 rounded-xl border text-left text-xs font-semibold cursor-pointer transition ${
                  selectedIssue === 'senior_housing'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100'
                    : 'bg-slate-50/50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                I am a senior citizen seeking stable subsidized housing
              </button>
              <button
                onClick={() => setSelectedIssue('eviction_notice')}
                className={`py-3.5 px-4 rounded-xl border text-left text-xs font-semibold cursor-pointer transition ${
                  selectedIssue === 'eviction_notice'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100'
                    : 'bg-slate-50/50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                I am behind on rent and eviction threat received
              </button>
              <button
                onClick={() => setSelectedIssue('buyer_learning')}
                className={`py-3.5 px-4 rounded-xl border text-left text-xs font-semibold cursor-pointer transition ${
                  selectedIssue === 'buyer_learning'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100'
                    : 'bg-slate-50/50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                I am a renter hoping to prepare for homeownership
              </button>
              <button
                onClick={() => setSelectedIssue('family_shelter')}
                className={`py-3.5 px-4 rounded-xl border text-left text-xs font-semibold cursor-pointer transition ${
                  selectedIssue === 'family_shelter'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100'
                    : 'bg-slate-50/50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                I am currently unsheltered or look for emergency family refuge
              </button>
            </div>
          </div>

          <div className="md:col-span-12 lg:col-span-7 bg-slate-50/50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-4">
            <AnimatePresence mode="wait">
              {selectedIssue ? (
                <motion.div
                  key={selectedIssue}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 text-left"
                >
                  <div className="flex gap-2 items-center bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 max-w-max text-blue-600">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                    <span className="text-[10px] font-mono tracking-wider uppercase font-semibold">Matched Program: {issuesMap[selectedIssue].program}</span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider text-slate-600">Action Checklist:</h4>
                    <p className="text-xs font-semibold text-blue-700 bg-blue-50 p-4 rounded-xl border border-blue-100 leading-normal">
                      {issuesMap[selectedIssue].action}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Advisory matches (eligibility):</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {issuesMap[selectedIssue].advice}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-10 text-center space-y-3">
                  <span className="text-3xl filter saturate-50">🧭</span>
                  <div>
                    <p className="text-sm font-bold text-slate-850 text-slate-800">Awaiting Concern Selection</p>
                    <p className="text-xs text-slate-550 text-slate-500 mt-1">Please pick a concern on the left to review your tailored assistance matching profile.</p>
                  </div>
                </div>
              )}
            </AnimatePresence>

            {selectedIssue && (
              <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                <span className="text-[10px] text-slate-500 font-mono">Assistance Hotline: (323) 396-1569</span>
                <button
                  onClick={() => {
                    if (selectedIssue === 'buyer_learning') {
                      onNavigate('news-events');
                    } else {
                      onNavigate('get-help');
                    }
                  }}
                  className="py-2 px-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Go to resource hub</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
