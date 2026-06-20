import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Tag, ArrowUpRight, Sparkles } from 'lucide-react';
import { newsData, eventsData } from '../data';

export function NewsView() {
  const [filter, setFilter] = useState<'all' | 'Announcement' | 'Community'>('all');

  const filteredNews = newsData.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <div className="space-y-16 text-left max-w-7xl mx-auto">
      {/* Intro section */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <span className="text-xs font-mono tracking-widest text-blue-600 uppercase">COMMUNAL PRESS BULLETIN</span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
          News, Insights & Community Calendar
        </h1>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Keep abreast of territorial fair-housing legislative developments, emergency grant allocations, and upcoming homebuyer instruction masterclasses.
        </p>
      </section>

      {/* Main content grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: News feed (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-blue-600" />
              Latest Bulletins
            </h2>
            
            {/* Filter buttons */}
            <div className="flex gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200 self-start">
              <button
                onClick={() => setFilter('all')}
                className={`py-1.5 px-3 rounded-lg text-[10px] uppercase font-bold transition cursor-pointer ${
                  filter === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-503 text-slate-500 hover:text-slate-800'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('Announcement')}
                className={`py-1.5 px-3 rounded-lg text-[10px] uppercase font-bold transition cursor-pointer ${
                  filter === 'Announcement' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-503 text-slate-500 hover:text-slate-800'
                }`}
              >
                Grants / Announcements
              </button>
              <button
                onClick={() => setFilter('Community')}
                className={`py-1.5 px-3 rounded-lg text-[10px] uppercase font-bold transition cursor-pointer ${
                  filter === 'Community' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-503 text-slate-500 hover:text-slate-800'
                }`}
              >
                Local Seminars
              </button>
            </div>
          </div>

          {/* Bulletins lists */}
          <div className="space-y-6">
            {filteredNews.map((news) => (
              <div
                key={news.id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm shadow-slate-100 flex flex-col md:flex-row hover:shadow-md transition duration-300 group"
              >
                {/* News Image */}
                <div className="w-full md:w-2/5 h-48 md:h-auto overflow-hidden relative">
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/10 to-transparent p-3 hidden md:block" />
                </div>

                {/* News Content */}
                <div className="w-full md:w-3/5 p-6 flex flex-col justify-between space-y-4 text-left">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {news.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{news.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition">
                      {news.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      {news.summary}
                    </p>
                  </div>
                  
                  <p className="text-[11px] text-slate-500 leading-normal border-t border-slate-100 pt-3">
                    {news.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Events Calendar (4 cols) */}
        <div className="lg:col-span-4 space-y-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="h-4.5 w-4.5 text-blue-600" />
              Community Calendar
            </h2>
            <span className="text-[9px] font-mono text-slate-400">2026 SCHEDULE</span>
          </div>

          <div className="space-y-4">
            {eventsData.map((e) => (
              <div
                key={e.id}
                className="p-4 bg-slate-50/50 rounded-xl border border-slate-200 hover:border-slate-300 transition text-left space-y-2.5 relative overflow-hidden group"
              >
                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded uppercase font-bold">
                    {e.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug pt-0.5">
                    {e.title}
                  </h4>
                </div>

                <div className="space-y-1 text-[10px] text-slate-500 border-t border-slate-100 pt-2 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-slate-400 shrink-0" />
                    <span>{e.date} • {e.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                    <span>{e.location}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-605 text-slate-500 leading-relaxed font-sans pt-1">
                  {e.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-[10px] text-slate-500 leading-normal text-center border-t border-slate-105 border-slate-100 pt-3 font-mono leading-relaxed">
             Need to schedule an alternative workshop appointment? <br />
             <a href="mailto:ronebiz@gmail.com" className="text-blue-600 underline hover:text-blue-700 font-bold">Email caseworker team</a>
          </div>
        </div>

      </div>
    </div>
  );
}
