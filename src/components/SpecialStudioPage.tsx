'use client';

import { useState, useEffect } from 'react';
import { Poppins } from 'next/font/google'; 
import { Check, ArrowRight, ChevronLeft, ChevronRight, Plus, Minus, Search } from 'lucide-react';

// --- TYPES ---
interface WorkItem { id: number; title: string; color: string; image: string; }
interface ClientLogo { name: string; image: string; }
interface FaqItem { q: string; a: string; }
interface FaqData { [key: string]: FaqItem[]; }

// --- FONT ---
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

// --- DATA ---
const heroSlides: string[] = ['/images/studio-hero-1.jpg', '/images/studio-hero-2.jpg', '/images/studio-hero-3.jpg', '/images/studio-hero-4.jpg', '/images/studio-hero-5.jpg'];
const clientLogos: ClientLogo[] = [{ name: "Van Balen", image: "" }, { name: "Image Wash", image: "" }, { name: "Coca Cola", image: "" }, { name: "Ethique", image: "" }, { name: "Ali & Shay", image: "" }];
const works: WorkItem[] = [{ id: 1, title: 'Pink Brand', color: 'bg-pink-600', image: '' }, { id: 2, title: 'Orange Box', color: 'bg-orange-500', image: '' }, { id: 3, title: 'Beige Tag', color: 'bg-[#D2B48C]', image: '' }, { id: 4, title: 'Green Pattern', color: 'bg-emerald-800', image: '' }, { id: 5, title: 'Red Festive', color: 'bg-red-600', image: '' }, { id: 6, title: 'Dark Neon', color: 'bg-slate-900', image: '' }, { id: 7, title: 'Blue Abstract', color: 'bg-blue-900', image: '' }, { id: 8, title: 'Night Lights', color: 'bg-black', image: '' }];
const allFaqs: FaqData = { studio: [{ q: "What is the difference between Special Studio and the design contest?", a: "Special Studio is a premium agency service..." }, { q: "How much does it cost?", a: "Packages start from specific rates..." }, { q: "How do I get started?", a: "Click the start button to begin..." }, { q: "Do you offer brand workshops?", a: "Yes, we facilitate workshops..." }], general: [{ q: "What methods of payment do you accept?", a: "Visa, Mastercard, Paypal..." }, { q: "Do you have a money back guarantee?", a: "Yes, specifically for contests..." }, { q: "Who are the Creative Directors?", a: "Senior designers with 10+ years exp..." }, { q: "Who are the Project Managers?", a: "Your dedicated point of contact..." }] };

export default function SpecialStudioPage() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [activeFaqTab, setActiveFaqTab] = useState<'studio' | 'general'>('studio'); 
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); 

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(() => { nextSlide(); }, 4000); 
    return () => clearInterval(timer);
  }, []);

  const filteredFaqs = allFaqs[activeFaqTab].filter(item => 
      item.q.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const primaryButtonClass = "group relative bg-[#1A1A1A] text-white px-10 py-4 text-xs font-bold uppercase tracking-widest rounded-sm overflow-hidden transition-all hover:bg-black hover:pr-14";
  const buttonTextClass = "relative z-10 transition-transform duration-300 group-hover:-translate-x-2";
  const buttonArrowClass = "absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-0 translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0";

  return (
    <main 
      className={`min-h-screen bg-white pb-20 ${poppins.variable}`}
      style={{
          '--font-body': 'var(--font-poppins)',
          '--font-heading': 'var(--font-poppins)',
          fontFamily: 'var(--font-poppins)'
      } as React.CSSProperties}
    >
      
      {/* SECTION 1: HERO */}
      <section className="bg-gray-50 py-12 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 aspect-square relative bg-white p-4 shadow-lg rotate-1 md:rotate-0">
                 <div className="w-full h-full relative overflow-hidden bg-gray-200">
                     {heroSlides.map((src, index) => (
                         <div key={index} className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 text-lg">[Hero Image {index + 1}]</div>
                         </div>
                     ))}
                     <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all z-10"><ChevronLeft className="w-6 h-6 text-black" /></button>
                     <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all z-10"><ChevronRight className="w-6 h-6 text-black" /></button>
                     <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                        {heroSlides.map((_, idx) => (<div key={idx} className={`w-2 h-2 rounded-full ${idx === currentSlide ? 'bg-black' : 'bg-gray-300'}`}></div>))}
                     </div>
                 </div>
            </div>
            <div className="w-full md:w-1/2 pl-0 md:pl-12 space-y-8">
                <div className="font-heading text-lg font-bold text-black uppercase tracking-widest mb-[-10px]">Special</div>
                <h1 className="font-heading text-6xl md:text-7xl font-extrabold text-black leading-[0.9]">Studio</h1>
                <div className="space-y-4">
                    <p className="font-heading text-xl font-bold text-gray-900 leading-snug">The brand agency from Special Graphics. <br/>Design packages managed by expert creatives.</p>
                    <ul className="space-y-3 text-base text-gray-700 font-medium">
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-black rounded-full"></span> Follow-the-sun design process</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-black rounded-full"></span> Dedicated Creative Director for your project</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-black rounded-full"></span> Weekly check-ins and creative reviews</li>
                    </ul>
                </div>
                <div className="flex flex-wrap items-center gap-6 pt-6">
                    <button className={primaryButtonClass}><span className={buttonTextClass}>Talk to us</span><ArrowRight className={buttonArrowClass} /></button>
                    <button className="text-xs font-bold underline underline-offset-4 hover:text-gray-600 transition-colors">Get the full-service brand pack</button>
                </div>
            </div>
        </div>
      </section>

      {/* SECTION 2: OUR SERVICES */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
         <div className="flex flex-col md:flex-row gap-20">
             <div className="w-full md:w-1/3 pt-10">
                 <h2 className="font-heading text-4xl font-bold text-gray-900 mb-8">Our services</h2>
                 <p className="text-base text-gray-600 leading-relaxed mb-8">They're not completely random, actually. Special Studio is tailored for...</p>
                 <ul className="space-y-4 text-base text-gray-900 font-bold mb-8"><li>• Visual identity from scratch</li><li>• Rebranding established businesses</li></ul>
                 <p className="text-base text-gray-600 leading-relaxed">Our dedicated team offers a streamlined process that ensures you get the creative outcome you need and deserve.</p>
             </div>
             <div className="w-full md:w-2/3 grid grid-cols-2 gap-4">
                 <div className="aspect-square bg-gray-50 flex items-center justify-center p-4"><div className="text-gray-300 text-sm">[Logo Sketch]</div></div>
                 <div className="aspect-square bg-white border border-gray-100 flex items-center justify-center p-4"><div className="text-gray-300 text-sm">[Digital Art]</div></div>
                 <div className="aspect-square bg-purple-50 flex items-center justify-center p-4"><div className="text-purple-300 text-sm">[Color Palette]</div></div>
                 <div className="aspect-square bg-purple-100 flex items-center justify-center p-4"><div className="text-purple-400 text-sm">[Merchandise]</div></div>
             </div>
         </div>
      </section>

      {/* SECTION 3: FULL SERVICE BRAND PACK */}
      <section className="bg-white py-12 px-6 md:px-12">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row shadow-2xl rounded-sm overflow-hidden min-h-[500px]">
              <div className="w-full md:w-1/2 bg-[#0F0F0F] relative p-10 flex flex-col justify-end">
                  <div className="absolute top-12 left-12 w-64 h-40 bg-gradient-to-r from-purple-900 to-purple-600 opacity-90 rounded-sm shadow-2xl z-10"></div>
                  <div className="absolute top-24 left-24 w-64 h-40 bg-gradient-to-r from-blue-900 to-blue-600 opacity-90 rounded-sm shadow-2xl z-0"></div>
                  <h3 className="text-white font-bold text-2xl tracking-widest uppercase mt-auto relative z-20">Special Studio</h3>
              </div>
              <div className="w-full md:w-1/2 bg-white p-16 flex flex-col justify-center">
                  <h2 className="font-heading text-4xl font-extrabold text-gray-900 mb-6 leading-tight">The full-service <br/> brand pack</h2>
                  <p className="text-xs font-bold text-gray-400 mb-10 uppercase tracking-widest">Everything you need to launch</p>
                  <ul className="space-y-4 text-base text-gray-800 font-medium mb-12">
                      <li className="flex items-center gap-3"><Check className="w-5 h-5" /> Custom logo design</li>
                      <li className="flex items-center gap-3"><Check className="w-5 h-5" /> Brand guidelines document</li>
                      <li className="flex items-center gap-3"><Check className="w-5 h-5" /> Logo variations & components</li>
                      <li className="flex items-center gap-3"><Check className="w-5 h-5" /> Social media kit</li>
                      <li className="flex items-center gap-3"><Check className="w-5 h-5" /> Merchandise & stationery</li>
                  </ul>
                  <button className="bg-[#1A1A1A] text-white px-10 py-4 text-xs font-bold uppercase tracking-widest rounded-sm w-max hover:bg-black transition-colors">Get Started</button>
              </div>
          </div>
      </section>

      {/* SECTION 4: CUSTOM QUOTE */}
      <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row gap-20 items-center">
              <div className="w-full md:w-1/2">
                  <h2 className="font-heading text-4xl font-bold text-gray-900 mb-6">Need a custom quote?</h2>
                  <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">Looking for more? Or maybe less? We can tailor a package to suit your specific needs. Tell us what you need and we'll send a custom estimate.</p>
                  <button className={primaryButtonClass}><span className={buttonTextClass}>Contact Us</span><ArrowRight className={buttonArrowClass} /></button>
              </div>
              <div className="w-full md:w-1/2 h-[350px] bg-[#A4C936] relative flex items-center justify-center overflow-hidden rounded-sm shadow-inner">
                  <div className="w-40 h-64 bg-black rotate-12 absolute left-1/4 shadow-2xl flex items-center justify-center border border-gray-800"><span className="text-white/80 text-xs font-mono tracking-widest -rotate-90">BRAND</span></div>
                  <div className="w-40 h-64 bg-black -rotate-6 absolute right-1/4 shadow-2xl flex items-center justify-center border border-gray-800"><span className="text-white/80 text-xs font-mono tracking-widest -rotate-90">IDENTITY</span></div>
              </div>
          </div>
      </section>

      {/* SECTION 5: CLIENTS */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
          <h2 className="font-heading text-2xl font-bold text-center mb-16">Our clients</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-24 items-start">
              {clientLogos.map((client, index) => (
                  <div key={index} className={`flex items-center justify-center ${index % 2 === 0 ? 'mt-0' : 'mt-12'}`}>
                      <div className="h-16 w-32 bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-400 font-bold">{client.name}</div>
                  </div>
              ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-gray-600 leading-relaxed text-center px-8">
              <p>"Working with Special Graphics was a seamless experience. They understood our vision perfectly."</p>
              <p>"The dedicated creative director made all the difference. We felt supported at every step."</p>
              <p>"Exceptional quality and speed. Our rebrand was launched ahead of schedule."</p>
          </div>
      </section>

      {/* SECTION 6: WORKS */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center mb-16">Our Works</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {works.map((work) => (
                  <div key={work.id} className={`aspect-square ${work.color} relative group overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow`}>
                      <div className="absolute inset-0 flex items-center justify-center text-white/40 text-sm font-bold p-4 text-center">[{work.title}]</div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  </div>
              ))}
          </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-center mb-16">Frequently asked questions</h2>
          <div className="flex justify-end mb-8 relative">
              <input type="text" placeholder="Looking for something?" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border-b border-gray-300 pb-2 pr-8 text-sm focus:outline-none focus:border-black w-64 transition-colors"/>
              <Search className="w-4 h-4 text-gray-400 absolute right-0 bottom-3" />
          </div>
          <div className="flex gap-12 border-b border-gray-200 mb-10">
              <button onClick={() => { setActiveFaqTab('studio'); setOpenFaqIndex(null); }} className={`pb-4 text-sm font-bold transition-colors ${activeFaqTab === 'studio' ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-600'}`}>Studio Related FAQs</button>
              <button onClick={() => { setActiveFaqTab('general'); setOpenFaqIndex(null); }} className={`pb-4 text-sm font-bold transition-colors ${activeFaqTab === 'general' ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-600'}`}>General</button>
          </div>
          <div className="space-y-6">
              {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((item, index) => (
                      <div key={index} className="border-b border-gray-100 pb-6">
                          <button onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)} className="flex justify-between items-center w-full text-left py-2 hover:opacity-70 transition-opacity">
                              <span className="font-bold text-base text-gray-900">{item.q}</span>
                              <span className="text-gray-400">{openFaqIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}</span>
                          </button>
                          <div className={`grid transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                              <div className="overflow-hidden"><p className="text-sm text-gray-500 leading-relaxed">{item.a}</p></div>
                          </div>
                      </div>
                  ))
              ) : (<div className="text-center text-gray-400 py-8 text-sm">No matching questions found.</div>)}
          </div>
      </section>

    </main>
  );
}
