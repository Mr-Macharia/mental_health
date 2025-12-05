'use client';

import Link from 'next/link';
import { MessageSquare, ListChecks, HeartHandshake, Settings, LogOut } from 'lucide-react';

export default function ClientDashboardLayout({ children }) {
  const clientName = "Jane Doe"; // Mock client name

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <Link href="/">
            <h1 className="text-2xl font-bold text-blue-600">MindfulAI</h1>
          </Link>
          <p className="text-sm text-gray-500">Your Personal Space</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/client/chat" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 font-medium">
            <MessageSquare className="h-5 w-5 mr-3" />
            Chat
          </Link>
          <Link href="/client/tasks" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 font-medium">
            <ListChecks className="h-5 w-5 mr-3" />
            My Tasks
          </Link>
        </nav>
        <div className="p-4 border-t">
          <div className="mb-4">
            <p className="font-semibold">{clientName}</p>
          </div>
          <button className="w-full flex items-center text-left px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 font-medium">
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}