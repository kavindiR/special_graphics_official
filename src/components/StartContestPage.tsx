'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Users, Clock, Trophy, DollarSign, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function StartContestPage() {
    const { isAuthenticated } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [contestTitle, setContestTitle] = useState('');
    const [budget, setBudget] = useState('');
    const [description, setDescription] = useState('');

    const categories = [
        { id: 'logo', label: 'Logo & Brand Identity', icon: '🎨' },
        { id: 'web', label: 'Web & App Design', icon: '💻' },
        { id: 'business', label: 'Business & Advertising', icon: '📊' },
        { id: 'clothing', label: 'Clothing & Merchandise', icon: '👕' },
        { id: 'art', label: 'Art & Illustration', icon: '🖼️' },
        { id: 'packaging', label: 'Packaging & Label', icon: '📦' },
        { id: 'book', label: 'Book & Magazine', icon: '📚' },
    ];

    const pricingTiers = [
        {
            name: 'Bronze',
            price: 299,
            entries: '30+',
            guaranteed: false,
            features: ['30+ design concepts', '7-day contest', 'Money-back guarantee']
        },
        {
            name: 'Silver',
            price: 499,
            entries: '60+',
            guaranteed: true,
            features: ['60+ design concepts', '7-day contest', 'Guaranteed prize', 'Money-back guarantee']
        },
        {
            name: 'Gold',
            price: 799,
            entries: '90+',
            guaranteed: true,
            features: ['90+ design concepts', '7-day contest', 'Guaranteed prize', 'Top-level designers', 'Money-back guarantee']
        },
        {
            name: 'Platinum',
            price: 1299,
            entries: '120+',
            guaranteed: true,
            features: ['120+ design concepts', '7-day contest', 'Guaranteed prize', 'Top-level designers only', 'Priority support', 'Money-back guarantee']
        }
    ];

    const handleStartContest = () => {
        if (!isAuthenticated) {
            window.location.href = '/auth';
            return;
        }
        // Navigate to contest creation form
        window.location.href = '/contest/create';
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Start a Contest</h1>
                        <p className="text-xl text-gray-100 mb-8">
                            Get multiple design concepts from talented designers. Choose your favorite and work with the designer to perfect it.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/hire-designer">
                                <Button className="bg-white text-black hover:bg-gray-100">
                                    Or Hire a Designer Directly
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-pink-600">1</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">Start Your Contest</h3>
                            <p className="text-gray-600 text-sm">Describe your design needs and set your budget</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Designers Compete</h3>
                            <p className="text-gray-600 text-sm">Multiple designers submit concepts for your project</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trophy className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Choose Winner</h3>
                            <p className="text-gray-600 text-sm">Select your favorite design and provide feedback</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Get Final Design</h3>
                            <p className="text-gray-600 text-sm">Work with the winner to perfect your design</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Tiers */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-4">Choose Your Package</h2>
                    <p className="text-center text-gray-600 mb-12">Select the package that best fits your needs</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pricingTiers.map((tier) => (
                            <div 
                                key={tier.name} 
                                className={`bg-white rounded-lg shadow-sm border-2 p-6 ${
                                    tier.name === 'Gold' ? 'border-pink-500 ring-2 ring-pink-200' : 'border-gray-200'
                                }`}
                            >
                                {tier.name === 'Gold' && (
                                    <div className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                                        MOST POPULAR
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold">${tier.price}</span>
                                    <span className="text-gray-600 text-sm ml-2">USD</span>
                                </div>
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Users className="h-5 w-5 text-gray-600" />
                                        <span className="font-semibold">{tier.entries} design concepts</span>
                                    </div>
                                    {tier.guaranteed && (
                                        <div className="flex items-center gap-2 mb-4">
                                            <Shield className="h-5 w-5 text-green-600" />
                                            <span className="text-sm text-gray-600">Guaranteed prize</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 mb-4">
                                        <Clock className="h-5 w-5 text-gray-600" />
                                        <span className="text-sm text-gray-600">7-day contest</span>
                                    </div>
                                </div>
                                <ul className="space-y-2 mb-6">
                                    {tier.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button 
                                    className={`w-full ${
                                        tier.name === 'Gold' 
                                            ? 'bg-pink-600 hover:bg-pink-700 text-white' 
                                            : 'bg-black hover:bg-gray-800 text-white'
                                    }`}
                                    onClick={handleStartContest}
                                >
                                    Start {tier.name} Contest
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Start Form */}
            <div className="bg-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-4">Quick Start Your Contest</h2>
                    <p className="text-center text-gray-600 mb-8">Fill out the form below to get started</p>
                    
                    <div className="bg-gray-50 rounded-lg p-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    What do you need designed?
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            type="button"
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`p-4 rounded-lg border-2 transition-all ${
                                                selectedCategory === category.id
                                                    ? 'border-pink-500 bg-pink-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="text-2xl mb-2">{category.icon}</div>
                                            <div className="text-sm font-medium text-gray-700">{category.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Contest Title
                                </label>
                                <Input
                                    placeholder="e.g., Modern Logo for Tech Startup"
                                    value={contestTitle}
                                    onChange={(e) => setContestTitle(e.target.value)}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Budget (USD)
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        type="number"
                                        placeholder="299"
                                        value={budget}
                                        onChange={(e) => setBudget(e.target.value)}
                                        className="w-full pl-10"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Describe your design needs, style preferences, and any specific requirements..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[120px]"
                                />
                            </div>

                            <Button
                                className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                                onClick={handleStartContest}
                                disabled={!selectedCategory || !contestTitle || !budget}
                            >
                                Continue to Contest Details
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Start a Contest?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <Users className="h-10 w-10 text-pink-600 mb-4" />
                            <h3 className="font-bold text-lg mb-2">Multiple Options</h3>
                            <p className="text-gray-600 text-sm">
                                Receive dozens of unique design concepts from talented designers around the world.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <Trophy className="h-10 w-10 text-purple-600 mb-4" />
                            <h3 className="font-bold text-lg mb-2">You Choose</h3>
                            <p className="text-gray-600 text-sm">
                                You have full control to select the design that best matches your vision and brand.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <Shield className="h-10 w-10 text-blue-600 mb-4" />
                            <h3 className="font-bold text-lg mb-2">Money-Back Guarantee</h3>
                            <p className="text-gray-600 text-sm">
                                If you're not satisfied with the designs, we offer a full money-back guarantee.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

