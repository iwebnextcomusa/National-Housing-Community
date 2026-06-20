import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, HeartPulse, Sparkles, Building, Handshake, Users } from 'lucide-react';
import { ThreeScene } from './ThreeScene';
import { impactStats, successStoriesData } from '../data';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative pt-8 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-blue-600 text-xs font-mono">
              <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
              <span>COMMUNITY ADVOCACY REIMAGINED</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-5.5xl font-extrabold tracking-tight text-blue-950 leading-[1.12]">
              Dignified Housing, <br />
              <span className="text-blue-600">
                Empowered Lives.
              </span>
            </h1>
            
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              At National Housing Community, we believe every individual deserves a stable foundation. We resolve housing insecurity, prevent homelessness, and build sustainable neighborly support ecosystems.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => onNavigate('get-help')}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition cursor-pointer shadow-lg shadow-blue-100 text-center"
              >
                Request Housing Assistance
              </button>
              <button
                onClick={() => onNavigate('donate')}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl transition border border-slate-200 text-center cursor-pointer shadow-sm"
              >
                Donate Funds
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200">
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-semibold text-slate-900">Certified Support</p>
                  <p className="text-slate-500 text-[11px]">Authorized HUD navigator programs</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <HeartPulse className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-semibold text-slate-900">100% Free Services</p>
                  <p className="text-slate-500 text-[11px]">Free case reviews & counseling</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Majestic 3D scene representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 w-full"
          >
            <ThreeScene />
          </motion.div>
        </div>
      </section>

      {/* Impact Stats Bento Grid */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-8 md:p-12 shadow-sm shadow-slate-100">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono tracking-widest text-blue-600 uppercase">OUR WORLDWIDE TRACTION</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">The Quantifiable Impact of Communal Action</h2>
          <p className="text-slate-500 text-sm">We combine structural advice with financial buffers to achieve long-term neighborhood stability.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactStats.map((stat, i) => (
            <div
              key={i}
              className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between text-left space-y-3 shadow-sm hover:border-slate-200 transition"
            >
              <span className="text-3xl md:text-4xl font-extrabold text-blue-600 tracking-tight">
                {stat.value}
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">{stat.label}</p>
                <p className="text-xs text-slate-500 mt-1 leading-normal">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Success Stories Gallery Slider */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-left">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-blue-600 uppercase">STORIES OF REFUGE</span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">Lives Transformed & Stabilized</h2>
            <p className="text-slate-500 text-sm max-w-2xl">
              Meet some of the beautiful families and residents who have walked alongside our caseworkers to reclaim permanent, safe shelter.
            </p>
          </div>
          <button
            onClick={() => onNavigate('about')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 group cursor-pointer"
          >
            <span>Learn our historical mission</span>
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          {successStoriesData.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 flex flex-col md:flex-row shadow-sm hover:shadow-md transition duration-300 group"
            >
              <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden relative">
                <img
                  src={story.imageUrl}
                  alt={story.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-blue-600 uppercase bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    {story.location}
                  </span>
                  <p className="text-xs font-semibold text-slate-500 pt-1">{story.impact}</p>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">{story.name}</h3>
                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    "{story.quote}"
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal line-clamp-4">
                  {story.fullStory}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Outreach Callouts CTA Bento */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {/* Volunteer outreach callout card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm shadow-slate-100 relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-50 rounded-full blur-2xl group-hover:bg-blue-100/50 transition duration-300 pointer-events-none" />
          
          <div className="space-y-4 max-w-md relative z-10">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Become a Volunteer Advocate</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Contribute your skills, host finance counseling programs, distribute food supplies, or help renters fill out placement applications. Keep your community integrated.
            </p>
            <button
              onClick={() => onNavigate('volunteer')}
              className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 inline-flex items-center gap-2 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-md shadow-blue-100"
            >
              <span>View Opportunities</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Corporate / Individual Donation outreach card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm shadow-slate-100 relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-green-50 rounded-full blur-2xl group-hover:bg-green-100/50 transition duration-300 pointer-events-none" />
          
          <div className="space-y-4 max-w-md relative z-10">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center border border-green-100 text-green-600">
              <Building className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Make a Lasting Legacy Donation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Financial support provides emergency grants that directly prevent evictions, pay utility bills, or fund transitional housing units for unhoused families.
            </p>
            <button
              onClick={() => onNavigate('donate')}
              className="py-2.5 px-4 bg-green-600 hover:bg-green-700 inline-flex items-center gap-2 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-md shadow-green-100"
            >
              <span>Donate Today</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
