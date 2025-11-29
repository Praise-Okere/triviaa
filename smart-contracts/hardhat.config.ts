import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import "@nomicfoundation/hardhat-verify";

const config: HardhatUserConfig = {
    solidity: "0.8.24",
    networks: {
        celoSepolia: {
            url: "https://forno.celo-sepolia.celo-testnet.org", // Celo Sepolia RPC
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 11142220, // Celo Sepolia chain ID
        },
        alfajores: {
            url: "https://alfajores-forno.celo-testnet.org",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 44787,
        },
        celo: {
            url: "https://forno.celo.org",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 42220,
        },
    },
    etherscan: {
        apiKey: {
            celoSepolia: "PLACEHOLDER_API_KEY",
        },
        customChains: [
            {
                network: "celoSepolia",
                chainId: 11142220,
                urls: {
                    apiURL: "https://api.celoscan.io/api",
                    browserURL: "https://celoscan.io"
                }
            }
        ]
    },
    sourcify: {
        enabled: false
    }
};

export default config;
