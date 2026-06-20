import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Heart, Radio, Calendar, Handshake, UsersIcon } from 'lucide-react';
import { VolunteerForm } from './Forms';

export function VolunteerView() {
  const benefits = [
    {
      title: 'Develop Real-World Expertise',
      desc: 'Attend state-certified workshops on regional HUD policy, credit advisory counseling, and tenant eviction mediation guidelines.',
      icon: Award
    },
    {
      title: 'Provide Direct Relief',
      desc: 'Work hands-on with local displacement housing directors to facilitate emergency food baskets and shelter resource bags.',
      icon: Heart
    },
    {
      title: 'Strategic Remote Service',
      desc: 'Participate remotely in our weekly phone health outreach, checking on seniors, and matching them to nutrition co-ops.',
      icon: Radio
    }
  ];

  const opportunities = [
    {
      title: 'Tenant Literacy Financial Advocate',
      type: 'Flexible / Remote option',
      desc: 'Lead or coordinate our weekly financial education curriculum, helping families understand budgeting, credit repairs, and Section 8 matching formulas.'
    },
    {
      title: 'Direct Shelter Logistics Coordinator',
      type: 'On-site / Saturdays',
      desc: 'Aid in sorting emergency donation boxes, organizing local food pantry tables, or greeting displaced seniors matching into transitional units.'
    },
    {
      title: 'Eviction Defense Intake Volunteer',
      type: 'On-site / Weekdays',
      desc: 'Assist clients calling our main hotline (323) 396-1569 in scanning their court briefs, cataloging eviction deadlines, and establishing casework numbers.'
    }
  ];

  return (
    <div className="space-y-16 text-left">
      {/* Intro section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-7xl mx-auto">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-mono tracking-widest text-blue-600 uppercase">A COMMITTED COALITION</span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Become a Catalyst for <br />
            <span className="text-blue-600">
              Sheltered Security.
            </span>
          </h1>
          
          <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
            We require dedicated minds, hands, and voices to operate our landlord mediations, food bank reserves, and HUD counseling. Direct community support changes local trajectories.
          </p>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Why Volunteering Matters:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {benefits.map((benefit, i) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600">
                      <IconComponent className="h-4.5 w-4.5" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">{benefit.title}</h4>
                    <p className="text-[10px] text-slate-500 leading-normal">{benefit.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Opportunities Needed:</h3>
            <div className="space-y-3">
              {opportunities.map((opp, i) => (
                <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900">{opp.title}</p>
                    <p className="text-[11px] text-slate-500 leading-normal">{opp.desc}</p>
                  </div>
                  <span className="text-[9px] font-mono text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded shrink-0 font-semibold uppercase tracking-wider">
                    {opp.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form container */}
        <div className="lg:col-span-5 w-full">
          <VolunteerForm />
        </div>
      </section>
    </div>
  );
}
