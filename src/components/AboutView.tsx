import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Users, Compass, Eye, Map, Shield } from 'lucide-react';
import { teamData } from '../data';

export function AboutView() {
  const values = [
    {
      title: 'Empathy-First',
      desc: 'We place respect and human dignity at the front of every tenant dispute, application match, and legal mediation process.',
      icon: Heart,
      color: 'text-rose-600 bg-rose-50 border-rose-100'
    },
    {
      title: 'Structural Stability',
      desc: 'We pursue permanent, secure housing structures over hasty temporary patches, fostering long-term family security.',
      icon: Shield,
      color: 'text-green-600 bg-green-50 border-green-100'
    },
    {
      title: 'Accountability & Clarity',
      desc: 'We are completely transparent. 85%+ of donations directly support actual client housing vouchers and eviction-avert balances.',
      icon: Compass,
      color: 'text-blue-600 bg-blue-50 border-blue-100'
    }
  ];

  const milestones = [
    { year: '2018', title: 'Organization Founding', desc: 'National Housing Community was formed with an initial team of 4 coordinators to help families locate Section 8 match programs.' },
    { year: '2021', title: 'Voucher Hub Deployment', desc: 'Built a proprietary county vacancy match engine, accelerating transition from shelters to homes by 40%.' },
    { year: '2024', title: 'Emergency Rent Reserve Launched', desc: 'Formulated a rapid financing relief reserve, deploying rent grants directly to stop immediate, high-risk evictions.' },
    { year: '2026', title: 'The Next Milestone', desc: 'Expanding physical presence to surrounding states while establishing an integrated AI Housing Advocate to match resource inquiries instantly.' }
  ];

  return (
    <div className="space-y-16">
      {/* Intro Mission Section */}
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-blue-600 text-xs font-mono">
          <Eye className="h-3.5 w-3.5 text-blue-600" />
          <span>OUR PRIMARY DIRECTIVE</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
          Securing Foundations, <br />
          <span className="text-blue-600">
            One Block at a Time.
          </span>
        </h1>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2.5xl mx-auto">
          National Housing Community is a non-profit organization dedicated to building equitable access to affordable housing, facilitating tenant advocacy, and eliminating homelessness through mediation and financial security programs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-left max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-blue-600 rounded-sm inline-block" />
              Our Vision
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              We envision integrated neighborhood communities where homelessness is nonexistent, housing is universally recognized as a human right, and every family holds the skills to achieve financial and household sovereignty.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-green-500 rounded-sm inline-block" />
              Our Mission
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              To dismantle structural housing insecurity by providing direct placement advice, legal tenant landlord advice, and short-term finances to keep struggling populations securely sheltered.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm shadow-slate-100 max-w-7xl mx-auto">
        <div className="text-center max-w-lg mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono tracking-widest text-blue-600 uppercase">ETHICAL STANDARDS</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">The Values that Guide Our Caseworkers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {values.map((v, i) => {
            const IconComponent = v.icon;
            return (
              <div
                key={i}
                className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between space-y-6 hover:border-slate-200 transition"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${v.color}`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{v.title}</h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Impact Timelines / Milestones */}
      <section className="max-w-5xl mx-auto text-left">
        <div className="mb-10 text-center space-y-1">
          <span className="text-xs font-mono tracking-widest text-blue-600 uppercase">HISTORICAL ARCHITECTURE</span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Timeline of Collective Progress</h2>
        </div>

        <div className="relative border-l-2 border-slate-200 ml-4 md:ml-32 space-y-8 pb-4">
          {milestones.map((m, i) => (
            <div key={i} className="relative pl-6 sm:pl-8 group">
              {/* Year marker pinned to left */}
              <div className="absolute -left-[53px] top-1 hidden md:block w-10 text-right text-xs font-mono font-bold text-blue-600 group-hover:text-blue-500 transition">
                {m.year}
              </div>

              {/* Dot marker */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-white border-2 border-blue-600 rounded-full group-hover:scale-110 transition duration-150" />

              <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:shadow-sm transition space-y-1">
                <span className="text-[10px] font-mono text-blue-600 md:hidden">{m.year}</span>
                <h4 className="text-sm font-bold text-slate-900 tracking-tight">{m.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed pt-0.5">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto text-left space-y-8">
        <div className="text-center max-w-lg mx-auto space-y-1">
          <span className="text-xs font-mono tracking-widest text-blue-600 uppercase">OUR TRUSTED ADVISORS</span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Our Dedicated Leadership Team</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamData.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm shadow-slate-100"
            >
              <div className="h-56 relative overflow-hidden group">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="p-6 space-y-2">
                <div>
                  <h4 className="text-base font-bold text-slate-900 tracking-tight">{member.name}</h4>
                  <p className="text-xs text-blue-600 font-medium mt-0.5">{member.role}</p>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-2 pt-2 border-t border-slate-100">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
