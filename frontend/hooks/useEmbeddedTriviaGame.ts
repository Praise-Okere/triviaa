'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import TriviaGameABI from '@/abis/TriviaGame.json';

const TRIVIA_GAME_ADDRESS = "0x0B3Dc26723008E7d9B4468Aaae95e66605f6B028";

export function useEmbeddedTriviaGame(getConnectedWallet: () => ethers.Wallet | null) {
    const [isPending, setIsPending] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [hash, setHash] = useState<string>('');
    const [error, setError] = useState<Error | null>(null);

    const submitBatchAnswers = async (questionIds: number[]) => {
        try {
            setIsPending(true);
            setError(null);

            const wallet = getConnectedWallet();
            if (!wallet) throw new Error('Wallet not connected');

            const contract = new ethers.Contract(
                TRIVIA_GAME_ADDRESS,
                TriviaGameABI.abi,
                wallet
            );

            const tx = await contract.submitBatchAnswers(questionIds);
            setHash(tx.hash);
            setIsPending(false);
            setIsConfirming(true);

            await tx.wait();
            setIsConfirming(false);
            setIsConfirmed(true);
        } catch (err) {
            setError(err as Error);
            setIsPending(false);
            setIsConfirming(false);
        }
    };

    return {
        submitBatchAnswers,
        isPending,
        isConfirming,
        isConfirmed,
        hash,
        error,
    };
}
