'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useTokenBalance } from '@/hooks/useTokenBalance';
import { Coins, BookOpen, Trophy, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { balance } = useTokenBalance(address);

  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center p-4 md:p-8 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[100px]" />
      </div>

      <nav className="w-full max-w-5xl flex justify-between items-center mb-12 z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center font-black text-black text-xl shadow-lg shadow-yellow-400/20">C</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Celo<span className="text-yellow-400">Trivia</span></h1>
        </div>
        <div className="flex items-center gap-4">
          {isConnected && (
            <div className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-yellow-500/20 shadow-lg shadow-yellow-500/5">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-bold">{parseFloat(balance).toFixed(2)} TRIVIA</span>
            </div>
          )}
          <ConnectButton />
        </div>
      </nav>

      <div className="w-full max-w-5xl flex-1 flex flex-col items-center justify-center z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl">
          <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight leading-tight">
            Learn to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Earn</span>
          </h2>
          <p className="text-2xl text-zinc-400 mb-12 leading-relaxed max-w-2xl mx-auto">
            Master the Celo blockchain ecosystem through interactive quizzes and earn real crypto rewards.
          </p>

          <Link href="/quiz">
            <button className="group bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-5 px-12 rounded-full text-xl transition-all transform hover:scale-105 shadow-2xl shadow-yellow-400/30 flex items-center gap-3 mx-auto">
              Start Learning
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
          <div className="bg-zinc-900/50 backdrop-blur-md rounded-2xl p-6 border border-zinc-800 text-center">
            <BookOpen className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Learn</h3>
            <p className="text-zinc-400">Test your knowledge of Celo blockchain</p>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-md rounded-2xl p-6 border border-zinc-800 text-center">
            <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Earn</h3>
            <p className="text-zinc-400">Get rewarded with TRIVIA tokens</p>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-md rounded-2xl p-6 border border-zinc-800 text-center">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Compete</h3>
            <p className="text-zinc-400">Challenge yourself and climb the ranks</p>
          </div>
        </div>
      </div>

      <footer className="w-full text-center text-zinc-600 py-8 text-sm z-10">
        Built for Celo Hackathon
      </footer>
    </main>
  );
}
