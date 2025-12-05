'use client';

import Link from 'next/link';
import { LayoutDashboard, Bell, Settings, LogOut, MessageSquare } from 'lucide-react';

export default function DashboardLayout({ children }) {
  // Mock user for display
  const therapistName = "Dr. Anya Sharma";

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <Link href="/" className='cursor-auto'>
            <h1 className="text-2xl font-bold text-blue-600">MindfulAI</h1>
          </Link>
          <p className="text-sm text-gray-500">Therapist Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 font-medium">
            <LayoutDashboard className="h-5 w-5 mr-3" />
            My Clients
          </Link>
          <Link href="/dashboard/alerts" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 font-medium">
            <Bell className="h-5 w-5 mr-3" />
            Alerts
          </Link>
          <Link href="/dashboard/settings" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 font-medium">
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Link>
          <Link href="/client/chat" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 font-medium" target="_blank">
            <MessageSquare className="h-5 w-5 mr-3" />
            Client View
          </Link>
        </nav>
        <div className="p-4 border-t">
          <div className="mb-4">
            <p className="font-semibold">{therapistName}</p>
            <p className="text-xs text-gray-500">Therapist</p>
          </div>
          <button className="w-full flex items-center text-left px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 font-medium">
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
    </div>
  );
}