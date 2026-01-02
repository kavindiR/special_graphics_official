'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Navigation items configuration
interface NavItem {
    label: string;
    href?: string;
    badge?: string;
    dropdown?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
    { label: 'How it works', href: '/how-it-works' },
    { label: 'Categories', href: '/categories' },
    { label: 'Find a Designer', href: '/find-designer' },
    { label: 'Special Studio', href: '/studio', badge: 'NEW' },
    { label: 'Courses', href: '/courses' },
    { 
        label: 'Showcase', 
        dropdown: [
            { label: 'Inspiration', href: '/inspirations' },
            { label: 'Contest', href: '/contest' }
        ]
    },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
            <nav className="w-full px-6 md:px-8 lg:px-10">
                <div className="flex items-center justify-between h-16 lg:h-[72px]">

                    {/* Logo (Left Side) */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="block">
                            <span className="text-xl md:text-2xl text-gray-900 tracking-tight">
                                <span className="font-normal">Special</span>{' '}
                                <span className="font-bold">Graphics</span>
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Menu (Left-aligned near logo) - Hidden on mobile */}
                    <div className="hidden lg:flex items-center flex-1 ml-12">
                        <div className="flex items-center gap-6 xl:gap-8">
                            {navItems.map((item) => (
                                <div key={item.label} className="relative">
                                    {item.dropdown ? (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="relative text-sm font-medium text-gray-800 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap pt-1 flex items-center gap-1 outline-none">
                                                {item.label}
                                                <ChevronDown className="w-4 h-4" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="min-w-[160px]">
                                                {item.dropdown.map((subItem) => (
                                                    <DropdownMenuItem key={subItem.label} asChild>
                                                        <Link href={subItem.href} className="cursor-pointer">
                                                            {subItem.label}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    ) : (
                                        <Link
                                            href={item.href || '#'}
                                            className="relative text-sm font-medium text-gray-800 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap pt-1"
                                        >
                                            {/* NEW Badge */}
                                            {item.badge && (
                                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                                                    {item.badge}
                                                </span>
                                            )}
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons (Right Side) */}
                    <div className="flex items-center gap-4 md:gap-5">
                        {/* Sign In - Hidden on mobile */}
                        <Link
                            href="/auth"
                            className="hidden sm:block text-sm font-medium text-gray-800 hover:text-gray-900 transition-colors duration-200"
                        >
                            Sign In
                        </Link>

                        {/* Join Button - Hidden on mobile */}
                        <Link
                            href="/auth?mode=register"
                            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-transparent border border-black rounded-md hover:bg-black hover:text-white transition-all duration-200"
                        >
                            Join
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="border-t border-gray-100 py-4 space-y-1">
                        {navItems.map((item) => (
                            <div key={item.label}>
                                {item.dropdown ? (
                                    <div className="px-4 py-3">
                                        <div className="text-sm font-medium text-gray-700 mb-2">{item.label}</div>
                                        <div className="pl-4 space-y-1">
                                            {item.dropdown.map((subItem) => (
                                                <Link
                                                    key={subItem.label}
                                                    href={subItem.href}
                                                    className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href || '#'}
                                        className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span>{item.label}</span>
                                        {item.badge && (
                                            <span className="bg-black text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                )}
                            </div>
                        ))}

                        {/* Mobile Auth Links */}
                        <div className="pt-4 mt-4 border-t border-gray-100 space-y-2 px-4">
                            <Link
                                href="/auth"
                                className="block w-full text-center py-2.5 text-sm font-medium text-gray-800 hover:text-gray-900"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/auth?mode=register"
                                className="block w-full text-center py-2.5 text-sm font-medium text-black bg-transparent border border-black rounded-md hover:bg-black hover:text-white transition-all duration-200"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Join
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
