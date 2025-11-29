'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export function useEmbeddedWallet() {
    const [wallet, setWallet] = useState<any>(null);
    const [address, setAddress] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if wallet exists in localStorage
        const storedPrivateKey = localStorage.getItem('embedded_wallet_key');

        if (storedPrivateKey) {
            // Load existing wallet
            const existingWallet = new ethers.Wallet(storedPrivateKey);
            setWallet(existingWallet);
            setAddress(existingWallet.address);
        } else {
            // Create new wallet
            const newWallet = ethers.Wallet.createRandom();
            localStorage.setItem('embedded_wallet_key', newWallet.privateKey);
            setWallet(newWallet);
            setAddress(newWallet.address);
        }

        setIsLoading(false);
    }, []);

    const getConnectedWallet = () => {
        if (!wallet) return null;

        const provider = new ethers.JsonRpcProvider('https://forno.celo-sepolia.celo-testnet.org');
        return wallet.connect(provider);
    };

    return {
        wallet,
        address: address as `0x${string}`,
        isConnected: !!wallet,
        isLoading,
        getConnectedWallet,
    };
}
