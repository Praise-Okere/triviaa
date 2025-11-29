import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import TriviaGameABI from '@/abis/TriviaGame.json';

// Deployed TriviaGame contract address on Celo Sepolia (V2 with Batch Rewards)
const TRIVIA_GAME_ADDRESS = "0x0B3Dc26723008E7d9B4468Aaae95e66605f6B028";

export function useTriviaGame() {
    const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    const submitAnswer = (questionId: number) => {
        writeContract({
            address: TRIVIA_GAME_ADDRESS,
            abi: TriviaGameABI.abi,
            functionName: 'submitCorrectAnswer',
            args: [BigInt(questionId)],
        });
    };

    const submitBatchAnswers = (questionIds: number[]) => {
        writeContract({
            address: TRIVIA_GAME_ADDRESS,
            abi: TriviaGameABI.abi,
            functionName: 'submitBatchAnswers',
            args: [questionIds.map(id => BigInt(id))],
        });
    };

    return {
        submitAnswer,
        submitBatchAnswers,
        isPending,
        isConfirming,
        isConfirmed,
        hash,
        writeError
    };
}
