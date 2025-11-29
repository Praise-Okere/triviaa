'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Trophy } from 'lucide-react';
import { useAccount, useWriteContract } from 'wagmi';
import { useTriviaGame } from '@/hooks/useTriviaGame';

// Comprehensive Celo Questions Bank
const questionBank = [
    {
        id: 1,
        question: "What is the native currency of the Celo blockchain?",
        options: ["CELO", "ETH", "BTC", "SOL"],
        answer: 0
    },
    {
        id: 2,
        question: "Which consensus mechanism does Celo use?",
        options: ["Proof of Work", "Proof of Stake", "Proof of History", "Proof of Authority"],
        answer: 1
    },
    {
        id: 3,
        question: "Celo is compatible with which Virtual Machine?",
        options: ["Solana VM", "Move VM", "Ethereum VM (EVM)", "Bitcoin Script"],
        answer: 2
    },
    {
        id: 4,
        question: "What is Celo's mission?",
        options: ["Build DeFi protocols", "Prosperity for all", "Create NFTs", "Gaming platform"],
        answer: 1
    },
    {
        id: 5,
        question: "Which stablecoin is native to Celo?",
        options: ["USDT", "USDC", "cUSD", "DAI"],
        answer: 2
    },
    {
        id: 6,
        question: "What is MiniPay?",
        options: ["A DeFi protocol", "A mobile wallet for Celo", "An NFT marketplace", "A staking platform"],
        answer: 1
    },
    {
        id: 7,
        question: "Celo uses phone numbers for what purpose?",
        options: ["2FA only", "Address mapping", "Voting", "Mining"],
        answer: 1
    },
    {
        id: 8,
        question: "What is the block time on Celo?",
        options: ["15 seconds", "5 seconds", "1 minute", "30 seconds"],
        answer: 1
    },
    {
        id: 9,
        question: "Which of these is a Celo stablecoin?",
        options: ["cEUR", "BUSD", "TUSD", "FRAX"],
        answer: 0
    },
    {
        id: 10,
        question: "What programming language are Celo smart contracts written in?",
        options: ["Rust", "Solidity", "Go", "Python"],
        answer: 1
    },
    {
        id: 11,
        question: "What is Valora?",
        options: ["A Celo validator", "A mobile wallet", "A DeFi protocol", "An NFT platform"],
        answer: 1
    },
    {
        id: 12,
        question: "Celo is designed to be accessible via what device primarily?",
        options: ["Desktop computers", "Mobile phones", "Hardware wallets", "IoT devices"],
        answer: 1
    },
    {
        id: 13,
        question: "What is the Celo Foundation's focus?",
        options: ["Gaming", "Financial inclusion", "Social media", "Cloud computing"],
        answer: 1
    },
    {
        id: 14,
        question: "Which testnet does Celo use?",
        options: ["Goerli", "Alfajores", "Sepolia", "Mumbai"],
        answer: 1
    },
    {
        id: 15,
        question: "What is cREAL?",
        options: ["A gaming token", "Brazilian Real stablecoin", "NFT collection", "DeFi protocol"],
        answer: 1
    },
    {
        id: 16,
        question: "Celo validators are selected based on what?",
        options: ["Random lottery", "Stake amount", "Age of account", "Transaction volume"],
        answer: 1
    },
    {
        id: 17,
        question: "What makes Celo carbon negative?",
        options: ["No mining", "Carbon offset purchases", "Solar-powered nodes", "Tree planting"],
        answer: 1
    },
    {
        id: 18,
        question: "Which bridge connects Celo to Ethereum?",
        options: ["Wormhole", "Optics Bridge", "Rainbow Bridge", "Polygon Bridge"],
        answer: 1
    },
    {
        id: 19,
        question: "What is the purpose of CELO token?",
        options: ["Only for payments", "Governance and staking", "NFT minting", "Gaming rewards"],
        answer: 1
    },
    {
        id: 20,
        question: "Celo's identity protocol is called?",
        options: ["CeloID", "Identity Layer", "Phone Verification Protocol", "Attestations"],
        answer: 3
    },
    {
        id: 21,
        question: "What is the Celo Reserve?",
        options: ["A staking pool", "Backs Celo stablecoins", "Validator fund", "Treasury"],
        answer: 1
    },
    {
        id: 22,
        question: "Which organization maintains Celo?",
        options: ["Celo Labs", "cLabs", "Celo Foundation", "All of the above"],
        answer: 3
    },
    {
        id: 23,
        question: "What is Plumo?",
        options: ["A wallet", "Light client protocol", "DeFi app", "NFT standard"],
        answer: 1
    },
    {
        id: 24,
        question: "Celo transaction fees are paid in?",
        options: ["Only CELO", "Any Celo stablecoin", "Only cUSD", "ETH"],
        answer: 1
    },
    {
        id: 25,
        question: "What year was Celo mainnet launched?",
        options: ["2018", "2019", "2020", "2021"],
        answer: 2
    }
];

// Shuffle function to randomize questions
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export default function Quiz({ onRewardClaimed }: { onRewardClaimed?: () => void }) {
    // Initialize with shuffled questions (only once on mount)
    const [questions] = useState(() => shuffleArray(questionBank).slice(0, 10));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [correctAnswerIds, setCorrectAnswerIds] = useState<number[]>([]);

    const { isConnected } = useAccount();
    const { submitBatchAnswers, isPending, isConfirming, isConfirmed, hash } = useTriviaGame();

    // Refresh balance when reward is confirmed
    useEffect(() => {
        if (isConfirmed && onRewardClaimed) {
            setTimeout(() => onRewardClaimed(), 1000); // Small delay to ensure blockchain state is updated
        }
    }, [isConfirmed, onRewardClaimed]);

    const handleSelect = (index: number) => {
        if (selectedOption !== null) return; // Prevent changing answer
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

    if (!isConnected) {
        return (
            <div className="text-center p-8 bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-zinc-800 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-4">Connect Wallet to Play</h2>
                <p className="text-zinc-400">Earn TRIVIA tokens for every correct answer!</p>
            </div>
        );
    }

    if (showResult) {
        return (
            <div className="text-center p-8 bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-zinc-800 shadow-2xl">
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
                <p className="text-xl text-zinc-400 mb-6">You scored {score} / {questions.length}</p>

                {score > 0 && !isConfirmed && (
                    <div className="mb-6">
                        <p className="text-white mb-4">You earned {score * 10} TRIVIA tokens!</p>

                        {(isPending || isConfirming) ? (
                            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-200 text-sm flex items-center justify-center gap-2">
                                <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                                {isPending ? 'Confirm in Wallet...' : 'Minting Rewards...'}
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

                <button
                    onClick={() => window.location.reload()}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-8 rounded-full transition-all"
                >
                    Play Again
                </button>
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
