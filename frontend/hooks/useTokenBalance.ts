import { useReadContract } from 'wagmi';
import { formatUnits } from 'viem';

// TODO: Replace with actual deployed TriviaToken address
const TRIVIA_TOKEN_ADDRESS = "0xB6F2A6FDf405Ea3414fCbD13f0e9e361c33d17a8";

const ERC20_ABI = [
    {
        "inputs": [{ "name": "account", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{ "name": "", "type": "uint8" }],
        "stateMutability": "view",
        "type": "function"
    }
] as const;

export function useTokenBalance(address?: `0x${string}`) {
    const { data: balance, refetch } = useReadContract({
        address: TRIVIA_TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address,
        }
    });

    const formattedBalance = balance ? formatUnits(balance, 18) : '0';

    return {
        balance: formattedBalance,
        rawBalance: balance,
        refetch
    };
}
