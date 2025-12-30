"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Pin, Dribbble } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#030014] text-white pt-16 md:pt-20 pb-6 border-t border-gray-900">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16 text-sm">
                    {/* Col 1 */}
                    <div className="flex flex-col gap-4 ml-12 md:ml-20">
                        <h4 className="font-bold text-base mb-2">Company</h4>
                        <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
                        <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link>
                        <Link href="/team" className="text-gray-400 hover:text-white transition-colors">Team</Link>
                        <Link href="/press" className="text-gray-400 hover:text-white transition-colors">Press releases</Link>
                    </div>

                    {/* Col 2 */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-base mb-2">Categories</h4>
                        <Link href="/category/logo" className="text-gray-400 hover:text-white transition-colors">Logo & Brand</Link>
                        <Link href="/category/web" className="text-gray-400 hover:text-white transition-colors">Web & App Design</Link>
                        <Link href="/category/business" className="text-gray-400 hover:text-white transition-colors">Business & Advertising</Link>
                        <Link href="/category/clothing" className="text-gray-400 hover:text-white transition-colors">Clothing & Merchandise</Link>
                        <Link href="/category/packaging" className="text-gray-400 hover:text-white transition-colors">Packaging & Label</Link>
                        <Link href="/category/covers" className="text-gray-400 hover:text-white transition-colors">Magazine & Book Covers</Link>
                    </div>

                    {/* Col 3 */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-base mb-2">Get a Design</h4>
                        <Link href="/design/logo" className="text-gray-400 hover:text-white transition-colors">Logo Design</Link>
                        <Link href="/design/card" className="text-gray-400 hover:text-white transition-colors">Business Card</Link>
                        <Link href="/design/web" className="text-gray-400 hover:text-white transition-colors">Web Design</Link>
                        <Link href="/design/package" className="text-gray-400 hover:text-white transition-colors">Package/Label Design</Link>
                        <Link href="/design/brand" className="text-gray-400 hover:text-white transition-colors">Brand Design</Link>
                        <Link href="/design/tshirt" className="text-gray-400 hover:text-white transition-colors">T-Shirt Design</Link>
                        <Link href="/design/book" className="text-gray-400 hover:text-white transition-colors">Book Cover Design</Link>
                        <Link href="/categories" className="text-gray-400 hover:text-white transition-colors">Browse all categories</Link>
                    </div>

                    {/* Col 4 */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-base mb-2">Info</h4>
                        <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link>
                        <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
                        <Link href="/support" className="text-gray-400 hover:text-white transition-colors">Customer Support</Link>
                    </div>

                    {/* Col 5 */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-base mb-2">Become a Designer</h4>
                        <Link href="/designer/advance-package" className="text-gray-400 hover:text-white transition-colors">Advance Package Design</Link>
                        <Link href="/designer/advance-logo" className="text-gray-400 hover:text-white transition-colors">Advance Logo Design</Link>
                        <Link href="/designer/basics" className="text-gray-400 hover:text-white transition-colors">Basics of Graphic Design</Link>
                        <Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help</Link>
                        <Link href="/become-designer" className="text-gray-400 hover:text-white transition-colors">Become a Designer</Link>
                    </div>

                    {/* Col 6: Sitemap / All Pages */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-base mb-2">Sitemap</h4>
                        <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
                        <Link href="/auth" className="text-gray-400 hover:text-white transition-colors">Login / Auth</Link>
                        <Link href="/categories" className="text-gray-400 hover:text-white transition-colors">Categories</Link>
                        <Link href="/find-designer" className="text-gray-400 hover:text-white transition-colors">Find a Designer</Link>
                        <Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</Link>
                        <Link href="/inspirations" className="text-gray-400 hover:text-white transition-colors">Inspirations</Link>
                        <Link href="/submit-files" className="text-gray-400 hover:text-white transition-colors">Submit Files</Link>
                        <Link href="/winner-form" className="text-gray-400 hover:text-white transition-colors">Winner Form</Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-400">
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 items-center">
                        <span>© Special Graphics</span>
                        <span className="hidden md:block">|</span>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link>
                        <span className="hidden md:block">|</span>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <span className="hidden md:block">|</span>
                        <div className="flex gap-2">
                            <span className="text-white">English</span>
                            <span className="hover:text-white cursor-pointer transition-colors">Español</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Facebook size={20} className="cursor-pointer hover:text-white transition-colors" />
                        <Twitter size={20} className="cursor-pointer hover:text-white transition-colors" />
                        <Instagram size={20} className="cursor-pointer hover:text-white transition-colors" />
                        <Linkedin size={20} className="cursor-pointer hover:text-white transition-colors" />
                        <Pin size={20} className="cursor-pointer hover:text-white transition-colors" />
                        <Dribbble size={20} className="cursor-pointer hover:text-white transition-colors" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
