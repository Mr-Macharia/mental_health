'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, BrainCircuit, MessageSquareHeart } from 'lucide-react';

// A reusable component for feature cards for cleaner code
const FeatureCard = ({ icon, title, description, delay }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
      variants={cardVariants}
    >
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default function LandingPage() {
  // Animation variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">MindfulAI</h1>
          <Link href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
            Therapist Login
          </Link>
        </div>
      </motion.header>

      <main>
        {/* Hero Section */}
        <section className="relative text-center py-20 md:py-32 px-6 bg-white">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
              An Intelligent Partner in <span className="text-blue-600">Mental Wellness</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Empowering therapists with AI-driven insights and providing clients with a dedicated, empathetic companion for their mental health journey.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/client/chat" className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300">
                Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">A Seamless Ecosystem</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">From real-time client interaction to deep, actionable insights for therapists.</p>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <FeatureCard
                icon={<MessageSquareHeart size={24} />}
                title="1. Client Interaction"
                description="Clients engage with an empathetic AI companion via voice or text, receiving immediate, supportive responses 24/7."
                delay={0}
              />
              <FeatureCard
                icon={<BrainCircuit size={24} />}
                title="2. AI Core Analysis"
                description="Our backend, powered by CrewAI and LangChain, analyzes conversations for sentiment, cognitive distortions, and potential risks."
                delay={0.2}
              />
              <FeatureCard
                icon={<ShieldCheck size={24} />}
                title="3. Therapist Insights"
                description="Therapists receive structured summaries and can 'chat with data' to uncover patterns, all within a secure, HIPAA-compliant dashboard."
                delay={0.4}
              />
            </motion.div>
          </div>
        </section>

        {/* Detailed Features Section */}
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Powered by Advanced AI Modules</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Each component is designed for safety, accuracy, and empathy.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Real-time Safety Engine</h4>
                <p className="text-sm text-gray-600">A guardrail model instantly detects high-risk language, triggering crisis protocols and alerting therapists immediately.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Asynchronous Analysis Crew</h4>
                <p className="text-sm text-gray-600">A team of AI agents (Scribe, Analyst, Risk Officer) processes sessions to generate comprehensive reports for therapists.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Therapist RAG Interface</h4>
                <p className="text-sm text-gray-600">"Interview" client data with natural language. Ask questions like "Has insomnia been mentioned?" and get cited answers.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Secure Vector Memory</h4>
                <p className="text-sm text-gray-600">All conversations are vectorized, allowing the AI to recall past sessions and enabling powerful long-term analysis.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Security & Compliance Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <motion.div
              className="bg-blue-600 text-white rounded-xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-8"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0">
                <ShieldCheck className="h-24 w-24 text-blue-300" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Security is Our Foundation</h2>
                <p className="text-lg text-blue-100 leading-relaxed">
                  We are committed to the highest standards of data privacy. Our platform is built with end-to-end encryption and is designed to be fully HIPAA-compliant, ensuring that all client and therapist data remains confidential and secure.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-6 text-center bg-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Join the future of mental healthcare. Provide better outcomes for your clients and streamline your workflow with powerful AI insights.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/signup" className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300">
                Request a Demo
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 px-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} MindfulAI. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/hipaa" className="hover:text-white">HIPAA Notice</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
