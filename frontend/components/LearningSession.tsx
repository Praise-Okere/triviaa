'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { LearningModule } from '@/data/learningContent';

interface LearningSessionProps {
    module: LearningModule;
    onComplete: () => void;
}

export default function LearningSession({ module, onComplete }: LearningSessionProps) {
    return (
        <div className="w-full max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/80 backdrop-blur-md rounded-3xl p-8 border border-zinc-800 shadow-2xl"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-yellow-400/10 rounded-xl">
                        <BookOpen className="w-6 h-6 text-yellow-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{module.title}</h2>
                </div>

                <div
                    className="prose prose-invert prose-yellow max-w-none mb-8"
                    dangerouslySetInnerHTML={{ __html: module.content }}
                />

                <div className="flex justify-end">
                    <button
                        onClick={onComplete}
                        className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-yellow-400/20"
                    >
                        Take Quiz <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
