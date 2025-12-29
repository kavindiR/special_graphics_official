'use client';

import { useState } from 'react';
import { Search, ThumbsUp, Eye, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Logo & Branding');

  const categories = [
    'Logo & Branding',
    'Web & App Design',
    'Business & Advertising',
    'Clothing & Merchandising',
    'Art & Illustration',
    'Packaging & Label',
    'Book',
  ];

  const winningLogos = [
    {
      id: 1,
      title: 'SOUTHERN STYLE CUISINE',
      designer: 'Palak999',
      likes: 43,
      views: '1.5K',
      comments: 11,
    },
    {
      id: 2,
      title: 'WONDER FARM WINE-YARD',
      designer: 'Abishek89',
      likes: 43,
      views: '1.5K',
      comments: 11,
    },
    {
      id: 3,
      title: 'SOUTHERN STYLE CUISINE',
      designer: 'Shehani9',
      likes: 43,
      views: '1.5K',
      comments: 11,
    },
    {
      id: 4,
      title: 'PASO PIZZA WOOD EST. 2023',
      designer: 'Rox009',
      likes: 43,
      views: '1.5K',
      comments: 11,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Breadcrumbs */}
        <div className="mb-4 sm:mb-6">
          <nav className="text-xs sm:text-sm text-gray-600">
            <span className="hover:text-gray-900 cursor-pointer">Home</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Categories</span>
          </nav>
        </div>

        {/* Category Selection Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">Select the Category</h1>
            <div className="relative w-full sm:w-auto sm:min-w-[280px] lg:min-w-[300px]">
              <Input
                type="text"
                placeholder="Ex. Logo Design"
                className="pl-4 pr-10 h-11 sm:h-10 w-full border-gray-300 rounded-md text-sm sm:text-base"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
            {categories.map((category) => (
              selectedCategory === category ? (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-white text-gray-900 shadow-md min-h-[44px] touch-manipulation"
                  style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                >
                  {category}
                </button>
              ) : (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors min-h-[44px] touch-manipulation"
                >
                  {category}
                </button>
              )
            ))}
          </div>
        </div>

        {/* Custom Logo Design Promotional Section */}
        <div className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                Custom logo design made for your business
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Grow your business with a professional, custom logo designed by our freelance creative experts. Because good design makes great business.
              </p>

              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">What you get</h3>
                <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-900 flex-shrink-0">•</span>
                    <span>Fun and easy process – dozens of options to choose from</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-900 flex-shrink-0">•</span>
                    <span>Work with the best – all designers vetted for quality</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-900 flex-shrink-0">•</span>
                    <span>Full ownership – digital and print-ready files</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-900 flex-shrink-0">•</span>
                    <span>100% money-back guarantee for contests. T&Cs apply</span>
                  </li>
                </ul>
              </div>

              <div className="mb-4 sm:mb-6">
                <p className="text-xl sm:text-2xl font-bold text-gray-900">Starting from $299</p>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center">
                <Button className="bg-gray-800 hover:bg-gray-900 text-white rounded-none px-5 sm:px-6 py-3 sm:py-2 h-auto font-medium min-h-[44px] touch-manipulation w-full sm:w-auto">
                  View All Categories
                </Button>
                <a href="#" className="text-gray-900 font-medium hover:underline text-sm sm:text-base text-center sm:text-left py-2 min-h-[44px] flex items-center justify-center sm:justify-start touch-manipulation">
                  Start Your Project Now
                </a>
              </div>
            </div>

            {/* Logo Collage - Right Side - Image with Proper Layout */}
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center lg:items-start lg:justify-end order-1 lg:order-2">
              <div className="relative w-full h-full max-w-full lg:max-w-xl">
                <img
                  src="/logos/logo-collage.png"
                  alt="Logo Collection - Quality Landscaping, The Salted Cod Arthouse, Carriage House Inn, Stone Veneer Direct"
                  className="w-full h-full object-contain"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                  loading="lazy"
                  onError={(e) => {
                    console.error('Image failed to load. Please ensure the file exists at: public/logos/logo-collage.png');
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Logo Winning Contests Section */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">
            Logo Winning Contests
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
            {winningLogos.map((logo, index) => (
              <div
                key={logo.id}
                className="bg-white overflow-hidden hover:shadow-lg active:scale-[0.98] transition-all duration-200 cursor-pointer rounded-none touch-manipulation"
              >
                <div className="aspect-square bg-white border border-gray-200 flex items-center justify-center p-2 sm:p-3 md:p-4">
                  {index === 0 && (
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Circular logo with dashed border */}
                      <circle cx="100" cy="100" r="95" fill="none" stroke="#111" strokeWidth="2" strokeDasharray="4 4"/>
                      {/* Background gradient */}
                      <defs>
                        <radialGradient id="sunset1" cx="50%" cy="30%">
                          <stop offset="0%" stopColor="#f97316"/>
                          <stop offset="100%" stopColor="#ea580c"/>
                        </radialGradient>
                      </defs>
                      <circle cx="100" cy="100" r="90" fill="url(#sunset1)"/>
                      {/* Palm trees */}
                      <rect x="30" y="120" width="8" height="40" fill="#1a4d2e"/>
                      <path d="M34 120 Q20 100 34 90 Q48 100 34 120" fill="#1a4d2e"/>
                      <rect x="162" y="120" width="8" height="40" fill="#1a4d2e"/>
                      <path d="M166 120 Q152 100 166 90 Q180 100 166 120" fill="#1a4d2e"/>
                      {/* Person with cowboy hat and apron */}
                      <circle cx="100" cy="140" r="12" fill="#111"/>
                      <rect x="88" y="152" width="24" height="20" fill="#111"/>
                      <path d="M88 152 Q88 145 100 145 Q112 145 112 152" fill="#111"/>
                      {/* Plate and grill */}
                      <ellipse cx="100" cy="175" rx="15" ry="5" fill="#92400e"/>
                      <rect x="95" y="170" width="10" height="8" fill="#666"/>
                      {/* Sun */}
                      <circle cx="100" cy="50" r="25" fill="#fbbf24"/>
                      {/* Banner */}
                      <rect x="20" y="155" width="160" height="25" fill="#111" opacity="0.9"/>
                      <text x="100" y="172" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">SOUTHERN STYLE</text>
                      <text x="100" y="188" textAnchor="middle" fontSize="10" fill="#fff" opacity="0.9">CUISINE</text>
                    </svg>
                  )}
                  {index === 1 && (
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Circular logo */}
                      <circle cx="100" cy="100" r="95" fill="#fff" stroke="#111" strokeWidth="2"/>
                      {/* Farm landscape */}
                      <path d="M20 120 Q50 100 80 120 Q110 100 140 120 Q170 100 180 120 L180 180 L20 180 Z" fill="#e5e7eb"/>
                      {/* Hills */}
                      <path d="M20 140 Q60 120 100 140 Q140 120 180 140" stroke="#111" strokeWidth="2" fill="none"/>
                      {/* Farmhouse */}
                      <rect x="80" y="100" width="40" height="30" fill="#111"/>
                      <path d="M80 100 L100 85 L120 100" fill="#111"/>
                      <rect x="88" y="110" width="8" height="12" fill="#fff"/>
                      {/* Sun with radiating lines */}
                      <circle cx="100" cy="50" r="20" fill="#fbbf24"/>
                      <line x1="100" y1="30" x2="100" y2="20" stroke="#fbbf24" strokeWidth="2"/>
                      <line x1="100" y1="70" x2="100" y2="80" stroke="#fbbf24" strokeWidth="2"/>
                      <line x1="80" y1="50" x2="70" y2="50" stroke="#fbbf24" strokeWidth="2"/>
                      <line x1="120" y1="50" x2="130" y2="50" stroke="#fbbf24" strokeWidth="2"/>
                      {/* Decorative border - leaves on sides */}
                      <path d="M20 60 Q15 50 20 40 Q25 50 20 60" fill="#111"/>
                      <path d="M20 80 Q15 70 20 60 Q25 70 20 80" fill="#111"/>
                      <path d="M180 60 Q185 50 180 40 Q175 50 180 60" fill="#111"/>
                      <path d="M180 80 Q185 70 180 60 Q175 70 180 80" fill="#111"/>
                      {/* Stars at top */}
                      <path d="M50 30 L52 35 L57 35 L53 38 L55 43 L50 40 L45 43 L47 38 L43 35 L48 35 Z" fill="#111"/>
                      <path d="M150 30 L152 35 L157 35 L153 38 L155 43 L150 40 L145 43 L147 38 L143 35 L148 35 Z" fill="#111"/>
                      {/* Banner */}
                      <rect x="30" y="85" width="140" height="20" fill="#111"/>
                      <text x="100" y="100" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">WONDER FARM</text>
                      <text x="100" y="115" textAnchor="middle" fontSize="11" fill="#fff">WINE YARD</text>
                    </svg>
                  )}
                  {index === 2 && (
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Circular logo with dashed border */}
                      <circle cx="100" cy="100" r="95" fill="none" stroke="#111" strokeWidth="2" strokeDasharray="4 4"/>
                      {/* Background gradient */}
                      <defs>
                        <radialGradient id="sunset2" cx="50%" cy="30%">
                          <stop offset="0%" stopColor="#f97316"/>
                          <stop offset="100%" stopColor="#ea580c"/>
                        </radialGradient>
                      </defs>
                      <circle cx="100" cy="100" r="90" fill="url(#sunset2)"/>
                      {/* Palm trees */}
                      <rect x="30" y="120" width="8" height="40" fill="#1a4d2e"/>
                      <path d="M34 120 Q20 100 34 90 Q48 100 34 120" fill="#1a4d2e"/>
                      <rect x="162" y="120" width="8" height="40" fill="#1a4d2e"/>
                      <path d="M166 120 Q152 100 166 90 Q180 100 166 120" fill="#1a4d2e"/>
                      {/* Person with cowboy hat and apron */}
                      <circle cx="100" cy="140" r="12" fill="#111"/>
                      <rect x="88" y="152" width="24" height="20" fill="#111"/>
                      <path d="M88 152 Q88 145 100 145 Q112 145 112 152" fill="#111"/>
                      {/* Plate and grill */}
                      <ellipse cx="100" cy="175" rx="15" ry="5" fill="#92400e"/>
                      <rect x="95" y="170" width="10" height="8" fill="#666"/>
                      {/* Sun */}
                      <circle cx="100" cy="50" r="25" fill="#fbbf24"/>
                      {/* Banner */}
                      <rect x="20" y="155" width="160" height="25" fill="#111" opacity="0.9"/>
                      <text x="100" y="172" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">SOUTHERN STYLE</text>
                      <text x="100" y="188" textAnchor="middle" fontSize="10" fill="#fff" opacity="0.9">CUISINE</text>
                    </svg>
                  )}
                  {index === 3 && (
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Circular logo */}
                      <circle cx="100" cy="100" r="95" fill="#dc2626" stroke="#fff" strokeWidth="3"/>
                      {/* Decorative rope border */}
                      <circle cx="100" cy="100" r="85" fill="none" stroke="#fff" strokeWidth="2"/>
                      {/* Pizza oven with flames/tree */}
                      <rect x="75" y="80" width="50" height="40" rx="3" fill="#fff"/>
                      <path d="M85 80 Q100 60 115 80" fill="#fff"/>
                      <path d="M90 100 Q100 85 110 100" fill="#fbbf24"/>
                      <path d="M92 105 Q100 90 108 105" fill="#fbbf24"/>
                      {/* Stars */}
                      <path d="M60 70 L62 75 L67 75 L63 78 L65 83 L60 80 L55 83 L57 78 L53 75 L58 75 Z" fill="#fff"/>
                      <path d="M140 70 L142 75 L147 75 L143 78 L145 83 L140 80 L135 83 L137 78 L133 75 L138 75 Z" fill="#fff"/>
                      {/* Banner across middle */}
                      <rect x="30" y="95" width="140" height="18" fill="#dc2626"/>
                      <text x="100" y="107" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">PASO PIZZA WOOD</text>
                      {/* EST. 2023 below */}
                      <text x="100" y="175" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">EST. 2023</text>
                    </svg>
                  )}
                </div>
                <div className="p-3 sm:p-4 bg-white">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <ThumbsUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600 fill-gray-600" strokeWidth={0} />
                        <span className="text-[10px] sm:text-xs text-gray-500">{logo.likes}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600 fill-gray-600" strokeWidth={0} />
                        <span className="text-[10px] sm:text-xs text-gray-500">{logo.views}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600 fill-gray-600" strokeWidth={0} />
                        <span className="text-[10px] sm:text-xs text-gray-500">{logo.comments}</span>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-500">By {logo.designer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="#" className="text-gray-900 font-bold text-base sm:text-lg hover:underline inline-block py-2 min-h-[44px] flex items-center justify-center touch-manipulation">
              See all Winning Contests
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
