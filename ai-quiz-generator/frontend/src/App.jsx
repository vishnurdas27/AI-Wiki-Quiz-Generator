import React, { useState } from 'react'
import GenerateQuizTab from './tabs/GenerateQuizTab'
import HistoryTab from './tabs/HistoryTab'

export default function App() {
  const [tab, setTab] = useState('gen')

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 transition-colors">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-indigo-700 dark:text-indigo-300">
            AI Wiki Quiz Generator
          </h1>
          <nav className="flex gap-2">
            <button
              className={`tab transition-all duration-200 px-4 py-2 rounded-lg font-medium ${
                tab === 'gen'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'hover:bg-indigo-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
              onClick={() => setTab('gen')}
            >
              Generate Quiz
            </button>
            <button
              className={`tab transition-all duration-200 px-4 py-2 rounded-lg font-medium ${
                tab === 'hist'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'hover:bg-indigo-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
              onClick={() => setTab('hist')}
            >
              Past Quizzes
            </button>
          </nav>
        </div>
      </header>


      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10">
        {tab === 'gen' ? <GenerateQuizTab /> : <HistoryTab />}
      </main>


    </div>
  )
}
