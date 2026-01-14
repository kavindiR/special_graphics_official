'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Users, 
  Image, 
  TrendingUp, 
  BarChart3, 
  Search, 
  Trash2, 
  Eye,
  LogOut,
  Home,
  UserCheck,
  ImageIcon,
  Heart,
  CheckCircle2,
  XCircle,
  RefreshCw,
  AlertCircle,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Mail,
  Phone,
  Globe,
  Activity,
  DollarSign,
  FileText,
  Settings,
  Bell,
  MoreVertical,
  Edit,
  Ban,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { apiRequest, getUserData } from '@/lib/api';
import Link from 'next/link';
import AdminSidebar from './admin/AdminSidebar';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'designer' | 'admin';
  avatar?: string;
  bio?: string;
  isVerified: boolean;
  createdAt: string;
  lastLogin?: string;
  designsCount?: number;
  totalLikes?: number;
}

interface Design {
  id: string;
  title: string;
  description: string;
  image: string;
  designerName: string;
  designerId: string;
  tags: string[];
  tools: string;
  likes: number;
  views: number;
  createdAt: string;
  category?: string;
  status?: 'active' | 'pending' | 'archived';
}

interface Stats {
  totalUsers: number;
  totalDesigners: number;
  totalDesigns: number;
  totalLikes: number;
  recentUsers: number;
  recentDesigns: number;
  activeUsers: number;
  totalRevenue?: number;
  growthRate?: number;
}

interface ActivityLog {
  id: string;
  type: 'user_registered' | 'design_uploaded' | 'user_deleted' | 'design_deleted' | 'role_changed';
  user: string;
  description: string;
  timestamp: string;
}

// Advanced Mock Data
const generateMockUsers = (count: number): User[] => {
  const roles: ('user' | 'designer' | 'admin')[] = ['user', 'designer', 'admin'];
  const names = [
    'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'David Brown',
    'Emily Davis', 'Chris Wilson', 'Lisa Anderson', 'Robert Taylor', 'Amanda Martinez',
    'James Thomas', 'Jessica Jackson', 'Michael White', 'Ashley Harris', 'Daniel Martin',
    'Jennifer Thompson', 'Matthew Garcia', 'Michelle Martinez', 'Joshua Robinson', 'Amanda Clark'
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i + 1}`,
    name: names[i % names.length] || `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length],
    avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
    bio: i % 3 === 0 ? 'Professional designer with 5+ years experience' : undefined,
    isVerified: i % 4 !== 0,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    designsCount: i % 3 === 0 ? Math.floor(Math.random() * 20) : 0,
    totalLikes: i % 3 === 0 ? Math.floor(Math.random() * 500) : 0,
  }));
};

const generateMockDesigns = (count: number): Design[] => {
  const titles = [
    'Modern Logo Design', 'Website Mockup', 'Brand Identity', 'Packaging Design',
    'Business Card', 'Social Media Graphics', 'Poster Design', 'App Interface',
    'Book Cover', 'Product Label', 'Banner Design', 'Icon Set', 'Infographic',
    'Brochure Design', 'Menu Design', 'Letterhead', 'T-Shirt Design', 'Sticker Design'
  ];
  const designers = ['Jane Designer', 'Mike Johnson', 'Sarah Williams', 'Chris Wilson', 'Lisa Anderson'];
  const categories = ['Logo', 'Web Design', 'Branding', 'Print', 'Packaging', 'Social Media'];
  const tools = ['Adobe Illustrator', 'Figma', 'Photoshop', 'Sketch', 'Canva', 'InDesign'];
  const tags = [
    ['logo', 'branding', 'modern'],
    ['web', 'ui', 'responsive'],
    ['print', 'business', 'professional'],
    ['social', 'marketing', 'digital'],
    ['packaging', 'product', 'retail']
  ];
  const statuses: ('active' | 'pending' | 'archived')[] = ['active', 'pending', 'archived'];

  return Array.from({ length: count }, (_, i) => ({
    id: `design-${i + 1}`,
    title: titles[i % titles.length] || `Design ${i + 1}`,
    description: `A professional ${titles[i % titles.length]?.toLowerCase()} created with attention to detail and modern design principles.`,
    image: `https://picsum.photos/400/300?random=${i + 1}`,
    designerName: designers[i % designers.length],
    designerId: `user-${(i % designers.length) + 2}`,
    tags: tags[i % tags.length],
    tools: tools[i % tools.length],
    likes: Math.floor(Math.random() * 200),
    views: Math.floor(Math.random() * 1000),
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    category: categories[i % categories.length],
    status: statuses[i % statuses.length],
  }));
};

const generateMockActivities = (count: number): ActivityLog[] => {
  const types: ActivityLog['type'][] = ['user_registered', 'design_uploaded', 'user_deleted', 'design_deleted', 'role_changed'];
  const users = ['John Doe', 'Jane Designer', 'Admin User', 'Mike Johnson', 'Sarah Williams'];
  const descriptions = [
    'New user registered',
    'Design uploaded',
    'User account deleted',
    'Design removed',
    'User role updated'
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `activity-${i + 1}`,
    type: types[i % types.length],
    user: users[i % users.length],
    description: descriptions[i % types.length],
    timestamp: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
  }));
};

const mockUsers = generateMockUsers(25);
const mockDesigns = generateMockDesigns(30);
const mockActivities = generateMockActivities(20);

export default function AdminPanel() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get('tab') || 'dashboard';
  
  const [users, setUsers] = useState<User[]>([]);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalDesigners: 0,
    totalDesigns: 0,
    totalLikes: 0,
    recentUsers: 0,
    recentDesigns: 0,
    activeUsers: 0,
    totalRevenue: 0,
    growthRate: 0,
  });
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPage, setUsersPage] = useState(1);
  const [designsPage, setDesignsPage] = useState(1);
  const itemsPerPage = 10;
  
  // Filters
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = getUserData();
      setCurrentUser(user);
      
      if (!user) {
        setCurrentUser({
          id: 'dev-user',
          name: 'Dev Admin',
          email: 'admin@dev.local',
          role: 'admin'
        });
      }
      
      await fetchData();
    };
    
    checkAuth();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      setUseMockData(false);
      
      await Promise.all([
        fetchUsers(),
        fetchDesigns(),
        fetchStats(),
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setUseMockData(true);
      setUsers(mockUsers);
      setDesigns(mockDesigns);
      setActivities(mockActivities);
      calculateStats(mockUsers, mockDesigns);
      setError('Using mock data - Backend connection failed.');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (userList: User[], designList: Design[]) => {
    const now = new Date();
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const recentUsers = userList.filter(user => 
      new Date(user.createdAt) >= last7Days
    ).length;

    const recentDesigns = designList.filter(design => 
      new Date(design.createdAt) >= last7Days
    ).length;

    const totalLikes = designList.reduce((sum, design) => sum + (design.likes || 0), 0);
    const totalDesigners = userList.filter(user => user.role === 'designer' || user.role === 'admin').length;
    const activeUsers = userList.filter(user => 
      user.lastLogin && new Date(user.lastLogin) >= last30Days
    ).length;

    const totalRevenue = designList.length * 29.99; // Mock revenue
    const growthRate = recentUsers > 0 ? ((recentUsers / userList.length) * 100).toFixed(1) : '0';

    setStats({
      totalUsers: userList.length,
      totalDesigners,
      totalDesigns: designList.length,
      totalLikes,
      recentUsers,
      recentDesigns,
      activeUsers,
      totalRevenue,
      growthRate: parseFloat(growthRate),
    });
  };

  const fetchUsers = async () => {
    try {
      const response = await apiRequest<{ users: User[] }>('/users', {
        method: 'GET',
      });
      if (response.success && response.data) {
        setUsers(response.data.users || []);
        return response.data.users || [];
      } else {
        throw new Error(response.error || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  const fetchDesigns = async () => {
    try {
      const response = await apiRequest<{ designs: Design[] }>('/designs', {
        method: 'GET',
      });
      if (response.success && response.data) {
        setDesigns(response.data.designs || []);
        return response.data.designs || [];
      } else {
        throw new Error(response.error || 'Failed to fetch designs');
      }
    } catch (error) {
      console.error('Error fetching designs:', error);
      throw error;
    }
  };

  const fetchStats = async () => {
    try {
      const [usersRes, designsRes] = await Promise.all([
        apiRequest<{ users: User[] }>('/users', { method: 'GET' }),
        apiRequest<{ designs: Design[] }>('/designs', { method: 'GET' }),
      ]);

      const allUsers = usersRes.success && usersRes.data ? usersRes.data.users || [] : [];
      const allDesigns = designsRes.success && designsRes.data ? designsRes.data.designs || [] : [];
      calculateStats(allUsers, allDesigns);
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await apiRequest(`/users/${userId}`, {
        method: 'DELETE',
      });
      
      if (response.success || useMockData) {
        setUsers(users.filter(user => user.id !== userId));
        calculateStats(users.filter(user => user.id !== userId), designs);
        setActivities([{
          id: `activity-${Date.now()}`,
          type: 'user_deleted',
          user: currentUser?.name || 'Admin',
          description: `User deleted`,
          timestamp: new Date().toISOString(),
        }, ...activities]);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setUsers(users.filter(user => user.id !== userId));
      calculateStats(users.filter(user => user.id !== userId), designs);
    }
  };

  const handleDeleteDesign = async (designId: string) => {
    if (!confirm('Are you sure you want to delete this design?')) return;
    
    try {
      const response = await apiRequest(`/designs/${designId}`, {
        method: 'DELETE',
      });
      
      if (response.success || useMockData) {
        setDesigns(designs.filter(design => design.id !== designId));
        calculateStats(users, designs.filter(design => design.id !== designId));
        setActivities([{
          id: `activity-${Date.now()}`,
          type: 'design_deleted',
          user: currentUser?.name || 'Admin',
          description: `Design deleted`,
          timestamp: new Date().toISOString(),
        }, ...activities]);
      }
    } catch (error) {
      console.error('Error deleting design:', error);
      setDesigns(designs.filter(design => design.id !== designId));
      calculateStats(users, designs.filter(design => design.id !== designId));
    }
  };

  const handleUpdateUserRole = async (userId: string, newRole: string) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;

      const response = await apiRequest<{ user: User }>(`/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({ role: newRole }),
      });

      if (response.success && response.data) {
        setUsers(users.map(u => u.id === userId ? response.data!.user : u));
        calculateStats(users.map(u => u.id === userId ? response.data!.user : u), designs);
      } else {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole as any } : u));
        calculateStats(users.map(u => u.id === userId ? { ...u, role: newRole as any } : u), designs);
      }
      
      setActivities([{
        id: `activity-${Date.now()}`,
        type: 'role_changed',
        user: currentUser?.name || 'Admin',
        description: `Role changed to ${newRole}`,
        timestamp: new Date().toISOString(),
      }, ...activities]);
    } catch (error) {
      console.error('Error updating user role:', error);
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole as any } : u));
      calculateStats(users.map(u => u.id === userId ? { ...u, role: newRole as any } : u), designs);
    }
  };

  const exportData = (type: 'users' | 'designs') => {
    const data = type === 'users' ? filteredUsers : filteredDesigns;
    const csv = [
      Object.keys(data[0] || {}).join(','),
      ...data.map(item => Object.values(item).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-export-${new Date().toISOString()}.csv`;
    a.click();
  };

  const filteredUsers = useMemo(() => {
    let filtered = users.filter(user =>
      user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
    );

    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [users, userSearchQuery, roleFilter, sortBy]);

  const filteredDesigns = useMemo(() => {
    let filtered = designs.filter(design =>
      design.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.designerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (statusFilter !== 'all') {
      filtered = filtered.filter(design => design.status === statusFilter);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'likes':
          return b.likes - a.likes;
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });

    return filtered;
  }, [designs, searchQuery, statusFilter, sortBy]);

  const paginatedUsers = useMemo(() => {
    const start = (usersPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, usersPage]);

  const paginatedDesigns = useMemo(() => {
    const start = (designsPage - 1) * itemsPerPage;
    return filteredDesigns.slice(start, start + itemsPerPage);
  }, [filteredDesigns, designsPage]);

  const totalUsersPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const totalDesignsPages = Math.ceil(filteredDesigns.length / itemsPerPage);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'designer':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const setActiveTab = (tab: string) => {
    router.push(`/admin?tab=${tab}`);
  };

  if (loading && !useMockData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your platform</p>
              </div>
              <div className="flex items-center gap-4">
                {error && useMockData && (
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Mock Data
                  </Badge>
                )}
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={currentUser?.avatar} />
                    <AvatarFallback>{currentUser?.name?.charAt(0) || 'A'}</AvatarFallback>
                  </Avatar>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{currentUser?.name || 'Admin'}</p>
                    <p className="text-xs text-gray-500">{currentUser?.email || 'admin@dev.local'}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchData()}
                  disabled={loading}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Link href="/">
                  <Button variant="outline" size="sm">
                    <LogOut className="w-4 h-4 mr-2" />
                    Exit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowUp className="w-3 h-3 text-green-600" />
                        <p className="text-xs text-green-600">+{stats.recentUsers} this week</p>
                      </div>
                    </div>
                    <div className="bg-blue-100 rounded-full p-3">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Designers</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalDesigners}</p>
                      <p className="text-xs text-gray-500 mt-1">Active creators</p>
                    </div>
                    <div className="bg-purple-100 rounded-full p-3">
                      <UserCheck className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Designs</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalDesigns}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowUp className="w-3 h-3 text-green-600" />
                        <p className="text-xs text-green-600">+{stats.recentDesigns} this week</p>
                      </div>
                    </div>
                    <div className="bg-green-100 rounded-full p-3">
                      <ImageIcon className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Likes</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalLikes.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 mt-1">Across all designs</p>
                    </div>
                    <div className="bg-red-100 rounded-full p-3">
                      <Heart className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Users</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{stats.activeUsers}</p>
                      <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                    </div>
                    <Activity className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{stats.growthRate}%</p>
                      <p className="text-xs text-gray-500 mt-1">User growth</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Revenue</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">${stats.totalRevenue?.toLocaleString() || '0'}</p>
                      <p className="text-xs text-gray-500 mt-1">Estimated</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </div>

              {/* Recent Activity & Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {activities.slice(0, 10).map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                        <div className="bg-gray-100 rounded-full p-2">
                          <Activity className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                          <p className="text-xs text-gray-500">{activity.user} • {new Date(activity.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Regular Users</span>
                        <span className="font-medium text-gray-900">
                          {users.filter(u => u.role === 'user').length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gray-600 h-3 rounded-full transition-all"
                          style={{
                            width: `${users.length > 0 ? (users.filter(u => u.role === 'user').length / users.length) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Designers</span>
                        <span className="font-medium text-gray-900">
                          {users.filter(u => u.role === 'designer').length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all"
                          style={{
                            width: `${users.length > 0 ? (users.filter(u => u.role === 'designer').length / users.length) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Admins</span>
                        <span className="font-medium text-gray-900">
                          {users.filter(u => u.role === 'admin').length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-purple-600 h-3 rounded-full transition-all"
                          style={{
                            width: `${users.length > 0 ? (users.filter(u => u.role === 'admin').length / users.length) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportData('users')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Roles</option>
                    <option value="user">Users</option>
                    <option value="designer">Designers</option>
                    <option value="admin">Admins</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                {paginatedUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No users found</p>
                  </div>
                ) : (
                  <>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">User</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Email</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Role</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Status</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Designs</th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Joined</th>
                          <th className="text-right py-3 px-6 text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedUsers.map((user) => (
                          <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={user.avatar} />
                                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <span className="text-sm font-medium text-gray-900">{user.name}</span>
                                  {user.bio && (
                                    <p className="text-xs text-gray-500">{user.bio}</p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-600">{user.email}</td>
                            <td className="py-4 px-6">
                              <select
                                value={user.role}
                                onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                                className="text-xs px-2 py-1 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="user">User</option>
                                <option value="designer">Designer</option>
                                <option value="admin">Admin</option>
                              </select>
                            </td>
                            <td className="py-4 px-6">
                              {user.isVerified ? (
                                <Badge className="bg-green-100 text-green-800 border-green-200">
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              ) : (
                                <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Unverified
                                </Badge>
                              )}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-600">
                              {user.designsCount || 0}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* Pagination */}
                    {totalUsersPages > 1 && (
                      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          Showing {(usersPage - 1) * itemsPerPage + 1} to {Math.min(usersPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setUsersPage(p => Math.max(1, p - 1))}
                            disabled={usersPage === 1}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          <span className="text-sm text-gray-600">
                            Page {usersPage} of {totalUsersPages}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setUsersPage(p => Math.min(totalUsersPages, p + 1))}
                            disabled={usersPage === totalUsersPages}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Designs Tab */}
          {activeTab === 'designs' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Design Management</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportData('designs')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search designs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="archived">Archived</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="likes">Most Liked</option>
                    <option value="views">Most Viewed</option>
                  </select>
                </div>
              </div>

              <div className="p-6">
                {paginatedDesigns.length === 0 ? (
                  <div className="text-center py-12">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No designs found</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {paginatedDesigns.map((design) => (
                        <div key={design.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <div className="aspect-video bg-gray-100 overflow-hidden relative">
                            <img
                              src={design.image}
                              alt={design.title}
                              className="w-full h-full object-cover"
                            />
                            <Badge className={`absolute top-2 right-2 ${
                              design.status === 'active' ? 'bg-green-100 text-green-800' :
                              design.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {design.status}
                            </Badge>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-1 truncate">{design.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">by {design.designerName}</p>
                            <p className="text-xs text-gray-500 mb-3 line-clamp-2">{design.description}</p>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <Heart className="w-4 h-4 text-red-500" />
                                  <span>{design.likes}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <Eye className="w-4 h-4" />
                                  <span>{design.views}</span>
                                </div>
                              </div>
                              <span className="text-xs text-gray-500">
                                {new Date(design.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => window.open(design.image, '_blank')}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteDesign(design.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Pagination */}
                    {totalDesignsPages > 1 && (
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          Showing {(designsPage - 1) * itemsPerPage + 1} to {Math.min(designsPage * itemsPerPage, filteredDesigns.length)} of {filteredDesigns.length} designs
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDesignsPage(p => Math.max(1, p - 1))}
                            disabled={designsPage === 1}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          <span className="text-sm text-gray-600">
                            Page {designsPage} of {totalDesignsPages}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDesignsPage(p => Math.min(totalDesignsPages, p + 1))}
                            disabled={designsPage === totalDesignsPages}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Regular Users</span>
                        <span className="font-medium text-gray-900">
                          {users.filter(u => u.role === 'user').length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gray-600 h-3 rounded-full transition-all"
                          style={{
                            width: `${users.length > 0 ? (users.filter(u => u.role === 'user').length / users.length) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Designers</span>
                        <span className="font-medium text-gray-900">
                          {users.filter(u => u.role === 'designer').length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all"
                          style={{
                            width: `${users.length > 0 ? (users.filter(u => u.role === 'designer').length / users.length) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Admins</span>
                        <span className="font-medium text-gray-900">
                          {users.filter(u => u.role === 'admin').length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-purple-600 h-3 rounded-full transition-all"
                          style={{
                            width: `${users.length > 0 ? (users.filter(u => u.role === 'admin').length / users.length) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Statistics</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-600" />
                        <span className="text-sm text-gray-700">Total Users</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{stats.totalUsers}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-gray-600" />
                        <span className="text-sm text-gray-700">Total Designs</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{stats.totalDesigns}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-gray-600" />
                        <span className="text-sm text-gray-700">Total Likes</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{stats.totalLikes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-gray-600" />
                        <span className="text-sm text-gray-700">Avg Likes/Design</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        {stats.totalDesigns > 0 ? (stats.totalLikes / stats.totalDesigns).toFixed(1) : '0'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
