import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ComponentBox = ({ componentName = "Button" }) => {
  const [activeTab, setActiveTab] = useState('preview');

  const htmlCode = `<button class="btn btn-primary">Click me</button>`;
  const jsxCode = `<button className="btn btn-primary">Click me</button>`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-900 text-white p-6 rounded-xl border border-white/10 shadow-xl w-full max-w-4xl mx-auto mt-10"
    >
      {/* Component Title */}
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-gray-200 to-orange-400 bg-clip-text text-transparent">
        {componentName} Component
      </h2>

      {/* Tab Nav */}
      <div className="flex space-x-4 mb-4">
        {['preview', 'html', 'jsx'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === tab
                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-black shadow'
                : 'bg-zinc-800 hover:bg-zinc-700'
            }`}
          >
            {tab === 'preview' && '🔍 Preview'}
            {tab === 'html' && '💻 HTML'}
            {tab === 'jsx' && '⚛️ JSX'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-black/40 border border-white/10 rounded-lg p-6 min-h-[120px]">
        <AnimatePresence mode="wait">
          {activeTab === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-x-4"
            >
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-accent">Accent</button>
            </motion.div>
          )}

          {activeTab === 'html' && (
            <motion.pre
              key="html"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-yellow-400 whitespace-pre-wrap"
            >
              {htmlCode}
            </motion.pre>
          )}

          {activeTab === 'jsx' && (
            <motion.pre
              key="jsx"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-green-400 whitespace-pre-wrap"
            >
              {jsxCode}
            </motion.pre>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ComponentBox;
