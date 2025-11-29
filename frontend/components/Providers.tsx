'use client';

import '@rainbow-me/rainbowkit/styles.css';
import {
    RainbowKitProvider,
    connectorsForWallets,
    Wallet,
    darkTheme,
} from '@rainbow-me/rainbowkit';
import {
    injectedWallet,
    walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider, createConfig, http } from 'wagmi';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { type Chain } from 'viem';

const celoSepolia = {
    id: 11142220,
    name: 'Celo Sepolia',
    nativeCurrency: { name: 'Celo', symbol: 'CELO', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://forno.celo-sepolia.celo-testnet.org'] },
    },
    blockExplorers: {
        default: { name: 'Celo Explorer', url: 'https://explorer.celo.org/celo-sepolia' },
    },
    testnet: true,
} as const satisfies Chain;

// Custom MiniPay wallet connector
const miniPayWallet = (): Wallet => ({
    id: 'minipay',
    name: 'MiniPay',
    iconUrl: 'https://avatars.githubusercontent.com/u/82592305?s=200&v=4',
    iconBackground: '#fff',
    downloadUrls: {
        android: 'https://play.google.com/store/apps/details?id=com.opera.mini.native',
        ios: 'https://apps.apple.com/app/opera-mini-web-browser/id363729560',
    },
    createConnector: (walletDetails) => {
        const injected = injectedWallet();
        return injected.createConnector(walletDetails);
    },
});

const connectors = connectorsForWallets(
    [
        {
            groupName: 'Recommended',
            wallets: [miniPayWallet, injectedWallet, walletConnectWallet],
        },
    ],
    {
        appName: 'Celo Trivia',
        projectId: 'YOUR_PROJECT_ID',
    }
);

const config = createConfig({
    connectors,
    chains: [celoSepolia],
    transports: {
        [celoSepolia.id]: http(),
    },
    ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme({
                    accentColor: '#facc15',
                    accentColorForeground: 'black',
                    borderRadius: 'large',
                })}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
