import React, { useState } from 'react';
import { Mail, Phone, MapPin, Globe, Clock, Sparkles, MessageSquare, Compass } from 'lucide-react';
import { ContactForm } from './Forms';

export function ContactView() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Community nodes for the stylized map placeholder
  const mapNodes = [
    { id: 'hq', name: 'Main Intake Headquarters', x: 120, y: 160, desc: '812 West Grand Ave, Los Angeles, CA (Direct Intake Support)' },
    { id: 'outreach1', name: 'West Valley Outreach Block', x: 280, y: 110, desc: 'Pantry distribution and financial workshop annex' },
    { id: 'outreach2', name: 'Southern Shelter Cooperative', x: 190, y: 240, desc: 'Active housing vouchers shelter coordinates' }
  ];

  return (
    <div className="space-y-16 text-left max-w-7xl mx-auto">
      {/* Intro section */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <span className="text-xs font-mono tracking-widest text-blue-600 uppercase">WE REIGN PREPARED</span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
          Connect with Case Advisors
        </h1>
        <p className="text-slate-605 text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Contact our intake agents, report landlord-tenant discrepancies, or schedule custom fair-housing consultations with legal mediators.
        </p>
      </section>

      {/* Main split contact and details */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact info coordinates and stylized map (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Coordinates grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <Phone className="h-6 w-6 text-blue-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Advocacy Phone</h4>
                <p className="text-md font-bold text-slate-900 mt-1">(323) 396-1569</p>
                <p className="text-[10px] text-slate-500 mt-1">Mon-Fri: 8:00 AM - 6:00 PM PST</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <Mail className="h-6 w-6 text-blue-500 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Advocacy Email</h4>
                <p className="text-md font-bold text-slate-900 mt-1">ronebiz@gmail.com</p>
                <p className="text-[10px] text-slate-500 mt-1">Dispatches monitored 24/7</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <MapPin className="h-6 w-6 text-blue-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Main Headquarters</h4>
                <p className="text-xs font-bold text-slate-900 mt-1 leading-relaxed">
                  812 W Grand Ave, <br />Los Angeles, CA 90017
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <Globe className="h-6 w-6 text-blue-500 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Domain</h4>
                <p className="text-xs font-bold text-blue-600 mt-1 font-mono">nationalhousingcommunity.net</p>
                <p className="text-[10px] text-slate-500 mt-1">Verified non-profit NGO</p>
              </div>
            </div>

          </div>

          {/* HIGH POLISHED STYLIZED EMBEDDED MAP PLACEHOLDER */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="text-left">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="h-4 w-4 text-blue-600" />
                  Regional Outreach Nodes Map
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Interactive locator of current active intake centers.</p>
              </div>
              <span className="text-[9px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase font-semibold">USA Pacific South</span>
            </div>

            {/* Simulated premium SVG map block */}
            <div className="w-full h-64 bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden flex items-center justify-center shadow-inner">
              {/* Minimal geographic grid background contours as visual representation */}
              <svg className="w-full h-full text-slate-200 absolute inset-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="light-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#light-grid)" />
                {/* Visual outlines representing municipal boundary paths */}
                <path d="M50,110 Q140,80 200,120 T350,140" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3" />
                <path d="M80,180 Q190,210 260,190 T320,290" fill="none" stroke="#3b82f6" strokeWidth="0.4" strokeOpacity="0.4" />
              </svg>

              {/* Pulsing interactive nodes */}
              {mapNodes.map((node) => (
                <div
                  key={node.id}
                  style={{ left: `${node.x}px`, top: `${node.y}px` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-crosshair group"
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Glowing halo indicator */}
                  <span className="absolute -inset-2 flex h-5 w-5 pointer-events-none">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-50 border border-blue-400"></span>
                  </span>
                  
                  {/* Central core dot */}
                  <div className="w-2.5 h-2.5 bg-blue-600 rounded-full border border-white relative z-10 hover:scale-130 transition shadow-sm" />
                  
                  {/* Tiny text ID on map */}
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-sm whitespace-nowrap pointer-events-none">
                    {node.name.replace(' Outreach', '').replace(' Headquarters', '').replace(' Cooperative', '')}
                  </span>
                </div>
              ))}

              {/* Dynamic tag explaining hovered details */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg p-2.5 text-xs shadow-md text-left">
                {hoveredNode ? (
                  <div>
                    <h5 className="font-bold text-slate-900 text-[11px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping" />
                      {mapNodes.find((n) => n.id === hoveredNode)?.name}
                    </h5>
                    <p className="text-[10px] text-slate-600 leading-normal mt-0.5">
                      {mapNodes.find((n) => n.id === hoveredNode)?.desc}
                    </p>
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-500 italic text-center">
                    Hover over active glowing coordinate pins on the layout above to check local service details.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form envelope component (5 cols) */}
        <div className="lg:col-span-5 w-full">
          <ContactForm />
        </div>

      </section>
    </div>
  );
}
