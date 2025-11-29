'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const TRIVIA_TOKEN_ADDRESS = "0xB6F2A6FDf405Ea3414fCbD13f0e9e361c33d17a8";

const ERC20_ABI = [
    "function balanceOf(address account) view returns (uint256)",
    "function decimals() view returns (uint8)"
];

export function useEmbeddedTokenBalance(address?: string) {
    const [balance, setBalance] = useState('0');
    const [isLoading, setIsLoading] = useState(false);

    const fetchBalance = async () => {
        if (!address) return;

        try {
            setIsLoading(true);
            const provider = new ethers.JsonRpcProvider('https://forno.celo-sepolia.celo-testnet.org');
            const contract = new ethers.Contract(TRIVIA_TOKEN_ADDRESS, ERC20_ABI, provider);

            const bal = await contract.balanceOf(address);
            const formatted = ethers.formatUnits(bal, 18);
            setBalance(formatted);
        } catch (err) {
            console.error('Error fetching balance:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBalance();
        // Poll every 5 seconds
        const interval = setInterval(fetchBalance, 5000);
        return () => clearInterval(interval);
    }, [address]);

    return {
        balance,
        isLoading,
        refetch: fetchBalance,
    };
}
