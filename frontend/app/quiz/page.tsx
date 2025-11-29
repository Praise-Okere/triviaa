'use client';

import { useState, useEffect } from 'react';
import EmbeddedQuiz from '@/components/EmbeddedQuiz';
import LearningSession from '@/components/LearningSession';
import { Coins, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEmbeddedWallet } from '@/hooks/useEmbeddedWallet';
import { useEmbeddedTokenBalance } from '@/hooks/useEmbeddedTokenBalance';
import { learningModules, LearningModule } from '@/data/learningContent';

export default function QuizPage() {
    const { address, getConnectedWallet, isLoading } = useEmbeddedWallet();
    const { balance, refetch } = useEmbeddedTokenBalance(address);
    const [view, setView] = useState<'learning' | 'quiz'>('learning');
    const [currentModule, setCurrentModule] = useState<LearningModule | null>(null);


    useEffect(() => {
        if (address) {

            const lastChar = address.slice(-1);
            const index = parseInt(lastChar, 16) % learningModules.length;
            setCurrentModule(learningModules[index]);
        }
    }, [address]);

    if (isLoading || !currentModule) {
        return (
            <main className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-zinc-950 flex flex-col items-center p-4 md:p-8 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[100px]" />
            </div>

            <nav className="w-full max-w-5xl flex justify-between items-center mb-8 z-10">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center font-black text-black text-xl shadow-lg shadow-yellow-400/20">C</div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Celo<span className="text-yellow-400">Trivia</span></h1>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-yellow-500/20 shadow-lg shadow-yellow-500/5">
                        <Coins className="w-5 h-5 text-yellow-400" />
                        <span className="text-white font-bold">{parseFloat(balance).toFixed(2)} TRIVIA</span>
                    </div>
                </div>
            </nav>

            {/* Wallet Info Banner */}
            <div className="w-full max-w-5xl mb-6 z-10">
                <div className="bg-zinc-900/50 backdrop-blur-md rounded-2xl p-4 border border-zinc-800">
                    <p className="text-zinc-400 text-xs mb-2">📋 Your Wallet Address (tap to select, then copy)</p>
                    <div className="bg-zinc-800/50 p-3 rounded-lg mb-3">
                        <p className="text-white font-mono text-xs break-all select-all cursor-pointer" onClick={(e) => {
                            const range = document.createRange();
                            range.selectNodeContents(e.currentTarget);
                            const sel = window.getSelection();
                            sel?.removeAllRanges();
                            sel?.addRange(range);
                        }}>{address}</p>
                    </div>
                    <a
                        href={`https://faucet.celo.org/alfajores`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-bold rounded-lg transition-colors"
                    >
                        💰 Get Free Test CELO (Required to Claim Rewards)
                    </a>
                </div>
            </div>

            <div className="w-full max-w-5xl flex-1 flex flex-col items-center justify-center z-10">
                {view === 'learning' ? (
                    <LearningSession
                        module={currentModule}
                        onComplete={() => setView('quiz')}
                    />
                ) : (
                    <EmbeddedQuiz
                        questions={currentModule.questions}
                        onRewardClaimed={refetch}
                        getConnectedWallet={getConnectedWallet}
                        onRetry={() => setView('learning')}
                    />
                )}
            </div>

            <footer className="w-full text-center text-zinc-600 py-8 text-sm z-10">
                Built for Celo Hackathon
            </footer>
        </main>
    );
}
