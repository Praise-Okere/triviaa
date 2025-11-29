'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RefreshCcw } from 'lucide-react';
import { useEmbeddedTriviaGame } from '@/hooks/useEmbeddedTriviaGame';
import { Question } from '@/data/learningContent';

export default function EmbeddedQuiz({
    questions,
    onRewardClaimed,
    getConnectedWallet,
    onRetry
}: {
    questions: Question[];
    onRewardClaimed?: () => void;
    getConnectedWallet: () => any;
    onRetry: () => void;
}) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [correctAnswerIds, setCorrectAnswerIds] = useState<number[]>([]);

    const { submitBatchAnswers, isPending, isConfirming, isConfirmed, hash, error } = useEmbeddedTriviaGame(getConnectedWallet);

    // Minimum score to pass (must be > 8, so 9 or 10)
    const PASSING_SCORE = 9;
    const isPassed = score >= PASSING_SCORE;

    useEffect(() => {
        if (isConfirmed && onRewardClaimed) {
            setTimeout(() => onRewardClaimed(), 1000);
        }
    }, [isConfirmed, onRewardClaimed]);

    const handleSelect = (index: number) => {
        if (selectedOption !== null) return;
        setSelectedOption(index);

        const correct = index === questions[currentQuestion].answer;
        setIsCorrect(correct);

        if (correct) {
            setScore(score + 1);
            setCorrectAnswerIds([...correctAnswerIds, questions[currentQuestion].id]);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setIsCorrect(null);
        } else {
            setShowResult(true);
        }
    };

    const handleClaimRewards = () => {
        if (correctAnswerIds.length > 0) {
            submitBatchAnswers(correctAnswerIds);
        }
    };

    if (showResult) {
        return (
            <div className="text-center p-8 bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-zinc-800 shadow-2xl max-w-lg mx-auto">
                <Trophy className={`w-16 h-16 mx-auto mb-4 ${isPassed ? 'text-yellow-400' : 'text-zinc-600'}`} />
                <h2 className="text-3xl font-bold text-white mb-2">{isPassed ? 'Quiz Complete!' : 'Keep Learning!'}</h2>
                <p className="text-xl text-zinc-400 mb-6">You scored {score} / {questions.length}</p>

                {!isPassed && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <p className="text-red-200 mb-2">You need a score of {PASSING_SCORE} or higher to claim rewards.</p>
                        <p className="text-sm text-red-300/70">Review the learning material and try again!</p>
                    </div>
                )}

                {isPassed && !isConfirmed && (
                    <div className="mb-6">
                        <p className="text-white mb-4">You earned {score * 10} TRIVIA tokens!</p>

                        {error && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                                <p className="font-bold mb-1">Transaction Failed</p>
                                <p className="text-xs">Your wallet needs CELO for gas fees.</p>
                                <a
                                    href="https://faucet.celo.org/alfajores"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-yellow-400 underline hover:text-yellow-300 text-xs"
                                >
                                    Get free testnet CELO →
                                </a>
                            </div>
                        )}

                        {(isPending || isConfirming) ? (
                            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-200 text-sm flex items-center justify-center gap-2">
                                <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                                {isPending ? 'Preparing Transaction...' : 'Claiming Rewards...'}
                            </div>
                        ) : (
                            <button
                                onClick={handleClaimRewards}
                                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-yellow-400/20"
                            >
                                Claim {score * 10} TRIVIA Tokens
                            </button>
                        )}
                    </div>
                )}

                {isConfirmed && (
                    <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm font-medium">
                        Rewards Claimed Successfully!
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    {isPassed && isConfirmed && (
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-8 rounded-full transition-all"
                        >
                            Play Again
                        </button>
                    )}

                    {!isPassed && (
                        <button
                            onClick={onRetry}
                            className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-8 rounded-full transition-all"
                        >
                            <RefreshCcw className="w-4 h-4" /> Try Again
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="mb-6 flex justify-between items-center text-zinc-400 font-medium">
                <span>Question {currentQuestion + 1}/{questions.length}</span>
                <span>Score: {score}</span>
            </div>

            <div className="relative min-h-[300px]">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentQuestion}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-zinc-900/80 backdrop-blur-md rounded-3xl p-6 border border-zinc-800 shadow-2xl"
                    >
                        <h2 className="text-xl font-bold text-white mb-6 leading-relaxed">
                            {questions[currentQuestion].question}
                        </h2>

                        <div className="space-y-3">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSelect(index)}
                                    disabled={selectedOption !== null}
                                    className={`w-full p-4 rounded-xl text-left transition-all flex justify-between items-center border
                    ${selectedOption === null
                                            ? 'bg-zinc-800/50 hover:bg-zinc-800 border-zinc-700/50 text-zinc-100'
                                            : index === questions[currentQuestion].answer
                                                ? 'bg-green-500/20 border-green-500/50 text-green-200'
                                                : selectedOption === index
                                                    ? 'bg-red-500/20 border-red-500/50 text-red-200'
                                                    : 'bg-zinc-800/50 border-zinc-800 text-zinc-500'
                                        }
                  `}
                                >
                                    <span>{option}</span>
                                    {selectedOption !== null && index === questions[currentQuestion].answer && (
                                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                                    )}
                                    {selectedOption === index && index !== questions[currentQuestion].answer && (
                                        <XCircle className="w-5 h-5 text-red-400" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {selectedOption !== null && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 flex justify-end"
                            >
                                <button
                                    onClick={nextQuestion}
                                    className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-zinc-200 transition-colors"
                                >
                                    {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'} <ArrowRight className="w-4 h-4" />
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
