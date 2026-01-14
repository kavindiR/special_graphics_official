'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Image, 
  BarChart3,
  Settings,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin',
    id: 'dashboard'
  },
  {
    title: 'Users',
    icon: Users,
    href: '/admin?tab=users',
    id: 'users'
  },
  {
    title: 'Designs',
    icon: Image,
    href: '/admin?tab=designs',
    id: 'designs'
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    href: '/admin?tab=analytics',
    id: 'analytics'
  },
];

export default function AdminSidebar() {
  const searchParams = useSearchParams();
  const activeTab = searchParams?.get('tab') || 'dashboard';

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-gray-900">
          <Home className="w-5 h-5" />
          <span>Special Graphics</span>
        </Link>
        <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p className="font-medium text-gray-700 mb-1">Development Mode</p>
          <p>Admin panel is active</p>
        </div>
      </div>
    </aside>
  );
}

