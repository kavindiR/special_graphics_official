'use client';

import { useState } from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

export default function InspirationsPage() {
    const [activeFilter, setActiveFilter] = useState('rated');

    const designs = [
        { id: 25, designer: 'Raj', rating: 5, logoIndex: 0 },
        { id: 24, designer: 'Palak', rating: 5, logoIndex: 1 },
        { id: 22, designer: 'Ramesh', rating: 1, logoIndex: 2 },
        { id: 21, designer: 'Jen', rating: 0, logoIndex: 3 },
        { id: 16, designer: 'James', rating: 0, logoIndex: 4 },
        { id: 15, designer: 'Robin', rating: 0, logoIndex: 5 },
        { id: 13, designer: 'Kali', rating: 0, logoIndex: 6 },
        { id: 21, designer: 'Polo986', rating: 0, logoIndex: 7 },
        { id: 12, designer: 'Designer', rating: 0, logoIndex: 8 },
        { id: 10, designer: 'Designer', rating: 0, logoIndex: 9 },
    ];

    const logoColor = '#111111';
    const logoStroke = '#111111';

    const logoTemplates = [
        () => (
            <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
                <rect width="200" height="200" fill="#ffffff" />
                <polygon points="100,24 110,44 90,44" fill={logoColor} />
                <rect x="72" y="60" width="56" height="32" fill="none" stroke={logoStroke} strokeWidth="3" />
                <path d="M50 130 Q80 110 100 130 Q120 150 150 130" stroke={logoStroke} strokeWidth="3" fill="none" />
                <path d="M40 150 Q90 130 120 150 Q150 170 160 150" stroke={logoStroke} strokeWidth="3" fill="none" />
                <text x="100" y="175" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="28" fontWeight="700" fill={logoColor}>WONDER</text>
                <text x="100" y="195" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="20" fontWeight="600" fill={logoColor}>FARM</text>
            </svg>
        ),
        () => (
            <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
                <rect width="200" height="200" fill="#ffffff" />
                <circle cx="100" cy="90" r="70" fill="none" stroke={logoStroke} strokeWidth="4" />
                <path d="M40 110 Q80 90 120 110 Q160 130 180 110" stroke={logoStroke} strokeWidth="3" fill="none" />
                <line x1="60" y1="60" x2="40" y2="40" stroke={logoStroke} strokeWidth="3" />
                <line x1="140" y1="60" x2="160" y2="40" stroke={logoStroke} strokeWidth="3" />
                <text x="100" y="150" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="28" fontWeight="700" fill={logoColor}>WONDER</text>
                <text x="100" y="170" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="18" fontWeight="600" fill={logoColor}>FARM</text>
            </svg>
        ),
        () => (
            <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
                <rect width="200" height="200" fill="#ffffff" />
                <circle cx="100" cy="90" r="70" fill="none" stroke={logoStroke} strokeWidth="4" strokeDasharray="6 6" />
                <path d="M40 120 Q80 100 120 120 Q160 140 180 120" stroke={logoStroke} strokeWidth="3" fill="none" />
                <polygon points="100,40 110,55 90,55" fill={logoColor} />
                <text x="100" y="150" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="28" fontWeight="700" fill={logoColor}>WONDER</text>
                <text x="100" y="170" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="18" fontWeight="600" fill={logoColor}>FARM</text>
            </svg>
        ),
        () => (
            <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
                <rect width="200" height="200" fill="#ffffff" />
                <path d="M40 120 Q70 110 80 130 Q95 110 120 120 Q150 110 160 130" stroke={logoStroke} strokeWidth="3" fill="none" />
                <line x1="60" y1="60" x2="60" y2="100" stroke={logoStroke} strokeWidth="3" />
                <line x1="140" y1="60" x2="140" y2="100" stroke={logoStroke} strokeWidth="3" />
                <text x="100" y="150" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="30" fontWeight="700" fill={logoColor}>WONER</text>
                <text x="100" y="170" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="18" fontWeight="600" fill={logoColor}>FARM</text>
            </svg>
        ),
        () => (
            <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
                <rect width="200" height="200" fill="#ffffff" />
                <rect x="50" y="60" width="100" height="80" rx="10" fill="none" stroke={logoStroke} strokeWidth="3" />
                <line x1="60" y1="90" x2="140" y2="90" stroke={logoStroke} strokeWidth="3" />
                <line x1="60" y1="110" x2="140" y2="110" stroke={logoStroke} strokeWidth="3" />
                <text x="100" y="165" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="26" fontWeight="700" fill={logoColor}>WONDER</text>
            </svg>
        ),
        () => (
            <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
                <rect width="200" height="200" fill="#ffffff" />
                <path d="M80 60 L120 60 L130 100 L70 100 Z" fill="none" stroke={logoStroke} strokeWidth="3" />
                <path d="M65 115 Q90 100 100 130 Q110 100 135 115" stroke={logoStroke} strokeWidth="3" fill="none" />
                <text x="100" y="160" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="28" fontWeight="700" fill={logoColor}>WODER</text>
                <text x="100" y="180" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="18" fontWeight="600" fill={logoColor}>FARM</text>
            </svg>
        ),
        () => (
            <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
                <rect width="200" height="200" fill="#ffffff" />
                <ellipse cx="100" cy="80" rx="70" ry="50" fill="none" stroke={logoStroke} strokeWidth="3" />
                <path d="M60 120 Q90 100 110 120 Q140 140 160 120" stroke={logoStroke} strokeWidth="3" fill="none" />
                <text x="100" y="150" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="30" fontWeight="700" fill={logoColor}>WONDER</text>
            </svg>
        ),
        () => (
            <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
                <rect width="200" height="200" fill="#ffffff" />
                <path d="M50 120 Q80 110 100 130 Q120 150 150 130" stroke={logoStroke} strokeWidth="3" fill="none" />
                <circle cx="100" cy="70" r="35" fill="none" stroke={logoStroke} strokeWidth="3" />
                <text x="100" y="155" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="26" fontWeight="700" fill={logoColor}>WONDER</text>
                <text x="100" y="175" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="18" fontWeight="600" fill={logoColor}>FARM</text>
            </svg>
        ),
        () => (
            <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
                <rect width="200" height="200" fill="#ffffff" />
                <circle cx="100" cy="80" r="50" fill="none" stroke={logoStroke} strokeWidth="3" />
                <path d="M50 140 Q90 120 110 140 Q140 160 170 140" stroke={logoStroke} strokeWidth="3" fill="none" />
                <text x="100" y="165" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="26" fontWeight="700" fill={logoColor}>WONDER</text>
            </svg>
        ),
        () => (
            <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
                <rect width="200" height="200" fill="#ffffff" />
                <rect x="40" y="60" width="120" height="80" rx="8" fill="none" stroke={logoStroke} strokeWidth="3" />
                <text x="100" y="150" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="24" fontWeight="700" fill={logoColor}>WONDER</text>
            </svg>
        ),
    ];

    const renderLogo = (logoIndex: number) => {
        const Template = logoTemplates[logoIndex] ?? logoTemplates[0];
        return <Template />;
    };

    const handleSubmitDesign = () => {
        alert('Submit Design functionality - Upload your design here');
    };

    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter);
    };

    return (
        <div className="min-h-screen bg-white">


            <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-normal mb-6 text-gray-900 leading-tight tracking-tight">slice of life Country Love Body Cream Rendering</h1>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                            <Badge
                                variant="outline"
                                className="rounded-none border border-gray-300 bg-white text-gray-900 uppercase tracking-wide px-4 py-1 text-xs font-semibold"
                            >
                                Qualifying
                            </Badge>
                            <span className="text-sm font-bold text-gray-900">Guaranteed</span>
                            <span className="text-sm font-bold text-gray-900">•</span>
                            <span className="text-sm font-bold text-gray-900">Blind</span>
                            <span className="text-sm font-bold text-gray-900">•</span>
                            <span className="text-sm font-bold text-gray-900">Private</span>
                        </div>

                        <div className="flex flex-col items-end sm:items-center gap-2">
                            <Button
                                className="bg-black hover:bg-gray-800 text-white rounded-none px-6 py-2 border-0"
                                onClick={handleSubmitDesign}
                            >
                                Submit Design
                            </Button>
                            <span className="text-base sm:text-xl font-semibold text-gray-900">30 USD</span>
                        </div>
                    </div>

                    <Tabs defaultValue="designs" className="mb-6">
                        <TabsList className="bg-transparent border-b border-gray-200 rounded-none h-auto p-0 space-x-6">
                            <TabsTrigger
                                value="brief"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent bg-transparent pb-2 font-bold text-gray-900"
                            >
                                Brief
                            </TabsTrigger>
                            <TabsTrigger
                                value="designs"
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent bg-transparent pb-2 font-bold text-gray-900"
                            >
                                Designs <span className="ml-1 text-gray-500">(65)</span>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="bg-black text-white p-4 sm:p-5 mb-6 flex items-center gap-3">
                        <Bell className="h-5 w-5 flex-shrink-0" />
                        <span className="text-sm sm:text-base leading-relaxed">
                            You have 1 day, 15 hours left to <a href="#" className="underline hover:no-underline font-medium" onClick={(e) => { e.preventDefault(); handleSubmitDesign(); }}>submit design concepts</a>.
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
                            <button
                                className={`${activeFilter === 'all' ? 'font-bold border-b-2 border-black pb-1' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                                onClick={() => handleFilterClick('all')}
                            >
                                All <span className="text-gray-400">(65)</span>
                            </button>
                            <button
                                className={`${activeFilter === 'active' ? 'font-bold border-b-2 border-black pb-1' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                                onClick={() => handleFilterClick('active')}
                            >
                                Active <span className="text-gray-400">(11)</span>
                            </button>
                            <button
                                className={`${activeFilter === 'rated' ? 'font-bold border-b-2 border-black pb-1' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                                onClick={() => handleFilterClick('rated')}
                            >
                                Rated <span className="text-gray-400">(2)</span>
                            </button>
                            <button
                                className={`${activeFilter === 'withdrawn' ? 'font-bold border-b-2 border-black pb-1' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                                onClick={() => handleFilterClick('withdrawn')}
                            >
                                Withdrawn <span className="text-gray-400">(2)</span>
                            </button>
                            <button
                                className={`${activeFilter === 'declined' ? 'font-bold border-b-2 border-black pb-1' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                                onClick={() => handleFilterClick('declined')}
                            >
                                Declined <span className="text-gray-400">(2)</span>
                            </button>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center space-x-2 text-sm font-bold text-gray-700">
                                <span>All Designers (23)</span>
                                <ChevronDown className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => alert('All Designers selected')}>All Designers</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => alert('Top Rated selected')}>Top Rated</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => alert('Recent selected')}>Recent</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {designs.slice(0, 4).map((design) => (
                        <div
                            key={design.id}
                            className="bg-white border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group"
                            onClick={() => alert(`Viewing design #${design.id} by ${design.designer}`)}
                        >
                            <div className="aspect-square bg-white flex items-center justify-center p-6">
                                <div className="w-full h-full flex items-center justify-center">
                                    {renderLogo(design.logoIndex)}
                                </div>
                            </div>
                            <div className="p-4 sm:p-5 bg-white border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs sm:text-sm font-medium text-gray-700">#{design.id} by {design.designer}</span>
                                    <div className="flex gap-0.5 items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={`text-xl sm:text-2xl leading-none ${i < design.rating ? 'text-gray-900' : 'text-gray-300'}`}>★</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {designs.slice(4, 8).map((design) => (
                        <div
                            key={design.id}
                            className="bg-white border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group"
                            onClick={() => alert(`Viewing design #${design.id} by ${design.designer}`)}
                        >
                            <div className="aspect-square bg-white flex items-center justify-center p-6">
                                <div className="w-full h-full flex items-center justify-center">
                                    {renderLogo(design.logoIndex)}
                                </div>
                            </div>
                            <div className="p-4 sm:p-5 bg-white border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs sm:text-sm font-medium text-gray-700">#{design.id} by {design.designer}</span>
                                    <div className="flex gap-0.5 items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={`text-xl sm:text-2xl leading-none ${i < design.rating ? 'text-gray-900' : 'text-gray-300'}`}>★</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {designs.slice(8, 10).map((design) => (
                        <div
                            key={design.id}
                            className="bg-white border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group"
                            onClick={() => alert(`Viewing design #${design.id} by ${design.designer}`)}
                        >
                            <div className="aspect-square bg-white flex items-center justify-center p-6">
                                <div className="w-full h-full flex items-center justify-center">
                                    {renderLogo(design.logoIndex)}
                                </div>
                            </div>
                            <div className="p-4 sm:p-5 bg-white border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs sm:text-sm font-medium text-gray-700">#{design.id} by {design.designer}</span>
                                    <div className="flex gap-0.5 items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={`text-xl sm:text-2xl leading-none ${i < design.rating ? 'text-gray-900' : 'text-gray-300'}`}>★</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {[0, 1].map((hidden) => (
                        <div key={`hidden-${hidden}`} className="bg-white border border-gray-100">
                            <div className="aspect-square bg-white flex items-center justify-center p-6">
                                <span className="text-gray-400 text-base sm:text-lg font-medium">Hidden</span>
                            </div>
                            <div className="p-4 sm:p-5 bg-white border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs sm:text-sm font-medium text-gray-400">Hidden</span>
                                    <div className="flex gap-0.5 items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-xl sm:text-2xl leading-none text-gray-300">★</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>


        </div>
    );
}
