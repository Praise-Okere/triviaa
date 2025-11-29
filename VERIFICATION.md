# Contract Verification Guide

## Your Deployed Contracts on Celo Sepolia

**TriviaGame Contract**: `0x38C2E62626273953c570Bc584803958E2DB9422d`

## View on Block Explorer

Visit your contract on Celo Explorer:
https://explorer.celo.org/celo-sepolia/address/0x38C2E62626273953c570Bc584803958E2DB9422d

## Verify Contract Source Code

To verify your contract on the block explorer (so others can see your source code):

### Method 1: Using Hardhat

1. Install the verification plugin:
```bash
cd smart-contracts
npm install --save-dev @nomicfoundation/hardhat-verify
```

2. Add to your `hardhat.config.ts`:
```typescript
import "@nomicfoundation/hardhat-verify";

// Add this to your config:
etherscan: {
  apiKey: {
    celoSepolia: "YOUR_CELOSCAN_API_KEY" // Get from https://celoscan.io/myapikey
  },
  customChains: [
    {
      network: "celoSepolia",
      chainId: 11142220,
      urls: {
        apiURL: "https://api-celo-sepolia.celoscan.io/api",
        browserURL: "https://celo-sepolia.celoscan.io"
      }
    }
  ]
}
```

3. Run verification:
```bash
npx hardhat verify --network celoSepolia 0x38C2E62626273953c570Bc584803958E2DB9422d
```

### Method 2: Manual Verification on Block Explorer

1. Go to: https://explorer.celo.org/celo-sepolia/address/0x38C2E62626273953c570Bc584803958E2DB9422d
2. Click on the "Contract" tab
3. Click "Verify & Publish"
4. Fill in:
   - Compiler Type: Solidity (Single file)
   - Compiler Version: v0.8.24
   - License: MIT
5. Paste your contract source code
6. Click "Verify and Publish"

## Next Steps

1. ✅ Contract address updated in frontend
2. Update the TriviaToken address in `frontend/hooks/useTokenBalance.ts`
3. Restart your dev server to see the changes
4. Test earning TRIVIA tokens by answering questions!

## Troubleshooting

If verification fails:
- Make sure you're using the exact same compiler version (0.8.24)
- Include all imported contracts (OpenZeppelin)
- Check that optimization settings match
