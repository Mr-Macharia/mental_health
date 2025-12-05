'use client';

import { motion } from 'framer-motion';
import { Search, FileText, ListChecks, AlertTriangle, BrainCircuit, Sparkles } from 'lucide-react';

// Mock data for a specific client. In a real app, you'd fetch this using the clientId from params.
const mockClientData = {
  id: '2',
  name: 'John Smith',
  sessions: [
    {
      id: 's1',
      date: '2024-07-19',
      summary: {
        sentimentShift: 'Noticed a significant drop in mood when discussing work-related stress.',
        cognitiveDistortions: ['Catastrophizing', 'All-or-nothing thinking'],
        riskAssessment: {
          level: 'High',
          notes: 'Mentioned "feeling hopeless" and "wanting it all to end." Crisis protocol was triggered.',
        },
      },
    },
    {
      id: 's2',
      date: '2024-07-12',
      summary: {
        sentimentShift: 'Generally positive, but expressed anxiety about an upcoming presentation.',
        cognitiveDistortions: ['Mind reading'],
        riskAssessment: {
          level: 'Low',
          notes: 'No immediate risk factors identified.',
        },
      },
    },
  ],
  actionItems: [
    'Practice 5-4-3-2-1 grounding technique when feeling overwhelmed.',
    'Journal about the specific work trigger discussed.',
    'Schedule a 15-minute walk during the lunch break.',
  ],
};

// RAG Chat Component
function RagChat() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Search className="h-5 w-5 mr-2 text-blue-600" />
        Chat with Client Data
      </h3>
      <div className="flex-grow h-64 border rounded-md p-4 mb-4 bg-gray-50 overflow-y-auto text-sm">
        <p className="text-gray-500">Ask a question about the client&#39;s session history.</p>
        <p className="mt-4"><strong className="text-blue-600">You:</strong> &quot;Has the client mentioned insomnia in the last month?&quot;</p>
        <p className="mt-2"><strong className="text-green-600">AI:</strong> &quot;Yes, they mentioned trouble sleeping on Oct 12th and Oct 15th, specifically related to work stress. (Source: Session #4, 12:00)&quot;</p>
      </div>
      <div className="flex">
        <input 
          type="text" 
          placeholder="Your question..." 
          className="flex-grow border rounded-l-md p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600">
          Ask
        </button>
      </div>
    </div>
  );
}

export default function ClientDetailPage({ params }) {
  // In a real app, you'd use `params.clientId` to fetch data.
  const { name, sessions, actionItems } = mockClientData;
  const latestSession = sessions[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <p className="text-sm text-gray-500">Client</p>
        <h2 className="text-4xl font-bold text-gray-800">{name}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Session Summaries & History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Latest Session Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center"><FileText className="h-5 w-5 mr-2 text-blue-600" />Latest Session Summary ({latestSession.date})</h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <strong className="flex items-center text-gray-800"><AlertTriangle className={`h-4 w-4 mr-2 ${latestSession.summary.riskAssessment.level === 'High' ? 'text-red-500' : 'text-yellow-500'}`} />Risk Assessment: <span className={`ml-2 font-bold ${latestSession.summary.riskAssessment.level === 'High' ? 'text-red-600' : 'text-yellow-600'}`}>{latestSession.summary.riskAssessment.level}</span></strong>
                <p className="text-sm pl-6">{latestSession.summary.riskAssessment.notes}</p>
              </div>
              <div>
                <strong className="flex items-center text-gray-800"><BrainCircuit className="h-4 w-4 mr-2" />Cognitive Distortions Identified:</strong>
                <div className="flex flex-wrap gap-2 pl-6 mt-1">
                  {latestSession.summary.cognitiveDistortions.map(dist => (
                    <span key={dist} className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full">{dist}</span>
                  ))}
                </div>
              </div>
              <div>
                <strong className="flex items-center text-gray-800"><Sparkles className="h-4 w-4 mr-2" />Sentiment Shift:</strong>
                <p className="text-sm pl-6">{latestSession.summary.sentimentShift}</p>
              </div>
            </div>
          </div>

          {/* Action Items */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center"><ListChecks className="h-5 w-5 mr-2 text-blue-600" />Actionable Next Steps</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {actionItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Session History */}
          <div className="bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold p-6 border-b">Session History</h3>
            <ul className="divide-y divide-gray-200">
              {sessions.map(session => (
                <li key={session.id} className="p-4 hover:bg-gray-50 flex justify-between items-center">
                  <p className="font-medium">Session from {session.date}</p>
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer">View Details</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: RAG Chat */}
        <div className="lg:col-span-1">
          <RagChat />
        </div>
      </div>
    </motion.div>
  );
}