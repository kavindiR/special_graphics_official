'use client';

import { useState } from 'react';
import { Poppins } from 'next/font/google'; 
import { Search, Clock, DollarSign, Users, Filter } from 'lucide-react';
import Link from 'next/link';

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

interface Contest {
  id: number;
  title: string;
  description: string;
  prize: string;
  timeLeft: string;
  entries: number;
  status: 'active' | 'guaranteed' | 'blind' | 'private';
  category: string;
  image?: string;
}

const contests: Contest[] = [
  {
    id: 1,
    title: 'Logo Design for Tech Startup',
    description: 'Looking for a modern, minimalist logo design for our tech startup. Should reflect innovation and technology.',
    prize: '$500',
    timeLeft: '2 days left',
    entries: 45,
    status: 'guaranteed',
    category: 'Logo & Branding',
  },
  {
    id: 2,
    title: 'Brand Identity Package',
    description: 'Complete brand identity including logo, color palette, and brand guidelines.',
    prize: '$1,200',
    timeLeft: '5 days left',
    entries: 23,
    status: 'active',
    category: 'Logo & Branding',
  },
  {
    id: 3,
    title: 'Website Redesign',
    description: 'Modern website redesign for e-commerce platform. Need responsive design.',
    prize: '$800',
    timeLeft: '1 day left',
    entries: 67,
    status: 'blind',
    category: 'Web & App Design',
  },
  {
    id: 4,
    title: 'Product Packaging Design',
    description: 'Eco-friendly packaging design for organic skincare products.',
    prize: '$600',
    timeLeft: '3 days left',
    entries: 34,
    status: 'private',
    category: 'Packaging & Label',
  },
  {
    id: 5,
    title: 'Social Media Graphics',
    description: 'Set of social media graphics and templates for Instagram and Facebook.',
    prize: '$300',
    timeLeft: '4 days left',
    entries: 28,
    status: 'active',
    category: 'Business & Advertising',
  },
  {
    id: 6,
    title: 'Book Cover Design',
    description: 'Eye-catching book cover design for a fantasy novel. Dark, mysterious theme.',
    prize: '$400',
    timeLeft: '6 days left',
    entries: 52,
    status: 'guaranteed',
    category: 'Book',
  },
];

export default function ContestPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Logo & Branding', 'Web & App Design', 'Packaging & Label', 'Business & Advertising', 'Book'];

  const filteredContests = contests.filter(contest => {
    const matchesSearch = contest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contest.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || contest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { text: string; className: string }> = {
      guaranteed: { text: 'Guaranteed', className: 'bg-green-100 text-green-800' },
      active: { text: 'Active', className: 'bg-blue-100 text-blue-800' },
      blind: { text: 'Blind', className: 'bg-purple-100 text-purple-800' },
      private: { text: 'Private', className: 'bg-gray-100 text-gray-800' },
    };
    return badges[status] || badges.active;
  };

  return (
    <main 
      className={`min-h-screen bg-white ${poppins.variable}`}
      style={{
          '--font-body': 'var(--font-poppins)',
          '--font-heading': 'var(--font-poppins)',
          fontFamily: 'var(--font-poppins)'
      } as React.CSSProperties}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Design Contests
          </h1>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Search contests..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-black transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <button className="border border-gray-300 px-4 py-2 text-sm rounded-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Contests Grid */}
        {filteredContests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContests.map((contest) => {
              const statusBadge = getStatusBadge(contest.status);
              return (
                <Link
                  key={contest.id}
                  href={`/inspirations`}
                  className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Contest Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-gray-400 text-sm">[Contest Preview]</div>
                  </div>

                  {/* Contest Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${statusBadge.className}`}>
                        {statusBadge.text}
                      </span>
                      <span className="text-xs text-gray-500">{contest.category}</span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-gray-900 mb-2 group-hover:text-black transition-colors">
                      {contest.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {contest.description}
                    </p>

                    {/* Contest Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-semibold text-gray-900">{contest.prize}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{contest.entries} entries</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{contest.timeLeft}</span>
                      </div>
                    </div>

                    <button className="w-full bg-black text-white py-2 text-sm font-semibold rounded-sm hover:bg-gray-800 transition-colors">
                      View Contest
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p>No contests found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}

