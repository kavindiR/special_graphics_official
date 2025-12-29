"use client";

import { useState, useEffect } from 'react';
import Accordion from '@/components/Accordion';
import { Check, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function HowItWorksPage() {
    // --- SLIDER LOGIC ---
    const [currentSlide, setCurrentSlide] = useState(0);

    // The Data for the slider
    const testimonials = [
        {
            id: 1,
            quote: "Special Graphics is a platform with a good name and a very good service...",
            text: "where entrepreneurs can easily find the right design for their company. The book cover for us was a very important part of the success of the book. Therefore, we entrusted this to experts and ended up being very happy with the result.",
            author: "Ryan Spalding",
            role: "Founder of Jedi Mind Tricks, Texas",
            imageText: "[Bottle Image]"
        },
        {
            id: 2,
            quote: "The process was incredibly smooth and the results were beyond expectations...",
            text: "We needed a complete rebrand and the variety of submissions we received was staggering. The designer we chose was professional and delivered files perfectly formatted for print and web.",
            author: "Sarah Jenkins",
            role: "CEO of TechStart, New York",
            imageText: "[App Mockup]"
        },
        {
            id: 3,
            quote: "Highly recommended for anyone looking for high-quality creative work...",
            text: "I was skeptical about running a contest, but the talent pool here is unmatched. We got exactly what we needed in record time.",
            author: "Michael Chang",
            role: "Director at BlueWave, California",
            imageText: "[Logo Design]"
        }
    ];

    // 1. Manual Navigation Functions
    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    };

    // 2. Auto-change slide every 4 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    // --- PAGE CONTENT ---
    return (
        <div className="min-h-screen bg-white">
            {/* SECTION 1: HERO */}
            <div className="max-w-7xl mx-auto px-8 pt-16 pb-12">
                <div className="flex flex-col md:flex-row gap-16 items-start">
                    <div className="flex-1 max-w-lg mt-4">
                        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-5 font-sans">
                            Home / How it Works
                        </p>
                        <h1 className="font-serif text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            How it works
                        </h1>
                        <p className="text-gray-500 text-sm leading-7 mb-10 font-sans">
                            We deliver exceptional design solutions through our worldwide network of professional designers. For personalized assistance, <span className="underline text-gray-700 cursor-pointer">connect with one of our design experts today.</span>
                        </p>
                        <div className="flex items-center gap-6">
                            <button className="bg-[#222] text-white px-8 py-4 text-xs font-bold rounded-sm hover:bg-black hover:scale-105 active:scale-95 transition-all duration-200 font-sans shadow-lg uppercase">
                                Publish a Contest
                            </button>
                            <button className="text-gray-500 text-xs font-bold hover:text-black transition-colors font-sans underline underline-offset-4 uppercase">
                                Start Your Project Now
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 w-full h-[320px] bg-[#FFD700] rounded-sm relative shadow-sm flex items-center justify-center text-white/50 font-bold text-4xl">
                        HERO IMAGE
                    </div>
                </div>
            </div>

            {/* SECTION 2: PROCESS TABS */}
            <div className="border-y border-gray-100 py-6 mb-20 sticky top-0 bg-white/95 backdrop-blur z-40">
                <div className="max-w-7xl mx-auto px-8 flex justify-center gap-16 text-sm font-bold font-serif text-gray-400 items-center">
                    <span className="text-black cursor-pointer">1. Brief</span>
                    <span className="hover:text-black cursor-pointer transition-colors">2. Connect</span>
                    <span className="hover:text-black cursor-pointer transition-colors">3. Collaborate</span>
                    <span className="bg-[#222] text-white px-4 py-1.5 rounded text-[10px] uppercase tracking-wide hover:bg-black transition-colors cursor-pointer font-sans">Get Started</span>
                </div>
            </div>

            {/* SECTION 3: "Let us know what you need" */}
            <div className="max-w-7xl mx-auto px-8 py-4 mb-24">
                <div className="flex flex-col md:flex-row gap-20 items-center">
                    <div className="flex-1 relative">
                        <div className="w-full h-[450px] bg-[#FDFBF7] rounded p-8 flex items-center justify-center relative">
                            <div className="w-3/4 h-3/4 bg-gray-200 shadow-sm flex items-center justify-center text-gray-400 text-xs">
                                [Image: Gin Labels]
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 max-w-lg">
                        <h2 className="font-serif text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            Let us know <br /> what you need <br /> designed.
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8 font-sans">
                            Begin by drafting a creative brief to effectively communicate your unique requirements to our designers.
                        </p>
                        <ul className="space-y-4 mb-10 font-sans text-sm text-gray-600">
                            <li className="flex gap-3 items-start"><Check className="w-4 h-4 text-black mt-0.5" /> <span>Secure Payment Release Upon Completion</span></li>
                            <li className="flex gap-3 items-start"><Check className="w-4 h-4 text-black mt-0.5" /> <span>Receive Production-Ready Files for Print and Digital Use</span></li>
                            <li className="flex gap-3 items-start"><Check className="w-4 h-4 text-black mt-0.5" /> <span>Full Copyright and Ownership Transfer</span></li>
                        </ul>
                        <div className="mt-8 border-t border-gray-200">
                            <Accordion title="What files do I need?" content="You will need vector files (AI, EPS) and raster files (JPG, PNG)." />
                            <Accordion title="Where are my design files stored?" content="Files are stored securely in your project handover area." />
                            <Accordion title="Can I keep working with my designer?" content="Yes, you can start 1-to-1 projects anytime." />
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 4: COLLABORATE SECTION */}
            <div className="py-10">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-24">
                        <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">
                            Collaborate with Top Designers
                        </h2>
                        <p className="text-gray-500 text-sm font-sans">
                            Discover leading agencies & professionals for your project.
                        </p>
                    </div>

                    {/* ROW 1: Find a Designer */}
                    <div className="flex flex-col md:flex-row gap-20 items-center mb-32">
                        <div className="flex-1 flex justify-center">
                            <div className="w-[340px] h-[340px] bg-gray-50 relative rounded-sm">
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    [Portfolio Image]
                                </div>
                                <div className="absolute -bottom-8 left-6 bg-white p-4 shadow-lg border border-gray-100 rounded-sm w-56 flex gap-4 items-center">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                                    <div>
                                        <div className="font-bold text-sm text-gray-900">Jennifer_Artist</div>
                                        <div className="text-[10px] text-gray-400 font-sans uppercase tracking-wider">Top Level</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 max-w-lg">
                            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                                Find a designer
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6 font-sans">
                                Work directly with a specific designer by browsing their portfolios and inviting them to your project.
                            </p>
                            <ul className="space-y-4 mb-10 font-sans text-sm text-gray-600">
                                <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-black" /> Experts in Over 90 Design Categories</li>
                                <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-black" /> Review Portfolios and Request Quotes</li>
                                <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-black" /> Quality Checked Designers</li>
                            </ul>
                            <div className="border-t border-gray-200 mt-6">
                                <Accordion title="How soon can we start?" content="You can start immediately after hiring." />
                                <Accordion title="How are payments handled?" content="Payments are held securely in escrow." />
                                <Accordion title="How do I choose a designer?" content="Browse portfolios and read reviews to decide." />
                            </div>
                        </div>
                    </div>


                    {/* ROW 2: Start a Contest */}
                    <div className="flex flex-col md:flex-row-reverse gap-20 items-center mb-24">
                        <div className="flex-1 flex justify-center">
                            <div className="bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 rounded-sm w-[380px] relative">
                                <span className="absolute top-0 right-0 bg-black text-white text-[10px] px-3 py-1.5 font-bold uppercase tracking-wide">Winner</span>
                                <div className="h-56 bg-gray-50 flex items-center justify-center font-serif text-2xl text-gray-300 font-bold border border-dashed border-gray-200 mb-5">
                                    WONDER FARM
                                </div>
                                <div className="flex justify-between items-center text-xs font-sans border-t border-gray-100 pt-4">
                                    <span className="text-gray-500">#25 by Raj</span>
                                    <div className="flex gap-0.5 text-black">
                                        <Star className="w-3 h-3 fill-black" />
                                        <Star className="w-3 h-3 fill-black" />
                                        <Star className="w-3 h-3 fill-black" />
                                        <Star className="w-3 h-3 fill-black" />
                                        <Star className="w-3 h-3 fill-gray-200 text-gray-200" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 max-w-lg">
                            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                                Start a contest
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6 font-sans">
                                Share your brief with our entire design community. Designers submit ideas, and you pick your favorite.
                            </p>
                            <ul className="space-y-4 mb-10 font-sans text-sm text-gray-600">
                                <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-black" /> Receive Creative Designs From Multiple Designers</li>
                                <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-black" /> Choose and Own Your Favorite Design</li>
                                <li className="flex gap-3 items-center"><Check className="w-4 h-4 text-black" /> 100% Money Back Guarantee</li>
                            </ul>
                            <div className="border-t border-gray-200 mt-6">
                                <Accordion title="Guaranteed contests?" content="Yes, you can guarantee a prize to attract more designers." />
                                <Accordion title="Can I protect my idea?" content="Yes, utilize our NDA feature for privacy." />
                                <Accordion title="How long does it take?" content="Most contests run for 7 days." />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* SECTION 5: AUTOMATIC TESTIMONIAL SLIDER */}
            <div className="bg-white py-24 border-t border-gray-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-8 relative group">

                    {/* 3. ARROWS (Manual Navigation) */}
                    {/* Left Arrow */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 p-3 hover:bg-gray-50 rounded-full transition-all z-20 hidden md:block"
                    >
                        <ChevronLeft className="w-12 h-12 text-gray-300 hover:text-black transition-colors font-thin" />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={handleNext}
                        className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 p-3 hover:bg-gray-50 rounded-full transition-all z-20 hidden md:block"
                    >
                        <ChevronRight className="w-12 h-12 text-gray-300 hover:text-black transition-colors font-thin" />
                    </button>

                    <div className="max-w-5xl mx-auto">

                        {/* Slider Content */}
                        <div className="flex flex-col md:flex-row gap-16 items-center min-h-[400px]">

                            {/* Left: Product Image */}
                            <div className="flex-1">
                                <div className="w-64 h-80 bg-gray-100 mx-auto rounded-sm flex items-center justify-center text-gray-400 shadow-xl transition-all duration-500 ease-in-out">
                                    {testimonials[currentSlide].imageText}
                                </div>
                            </div>

                            {/* Right: Text Content */}
                            <div className="flex-1 transition-opacity duration-500 ease-in-out">
                                <div className="mb-6">
                                    <span className="text-6xl font-serif text-gray-200 leading-none">“</span>
                                    <h3 className="font-serif text-2xl font-bold text-gray-900 -mt-4 mb-4">
                                        {testimonials[currentSlide].quote}
                                    </h3>
                                    <p className="text-xs text-gray-500 leading-relaxed font-sans">
                                        {testimonials[currentSlide].text}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 mt-8">
                                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-900 font-sans">{testimonials[currentSlide].author}</div>
                                        <div className="text-[10px] text-gray-500 font-sans">{testimonials[currentSlide].role}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. The Dots */}
                        <div className="flex justify-center gap-2 mt-12">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-black w-4" : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
