# Manual Contract Verification Guide

## Your Contract on Celo Sepolia
**TriviaGame Address**: `0x38C2E62626273953c570Bc584803958E2DB9422d`

**Explorer Link**: https://explorer.celo.org/celo-sepolia/address/0x38C2E62626273953c570Bc584803958E2DB9422d

## Steps to Verify

1. **Visit the contract page** (link above)

2. **Click the "Code" tab**

3. **Click "Verify & Publish Contract Source Code"**

4. **Fill in the verification form**:
   - **Compiler Type**: Solidity (Single file)
   - **Compiler Version**: v0.8.24+commit.e11b9ed9
   - **Open Source License Type**: MIT License

5. **Click Continue**

6. **Paste the flattened contract code**:
   - Open the file: `smart-contracts/TriviaGame_flat.sol`
   - Copy ALL the contents
   - Paste into the "Enter the Solidity Contract Code" field

7. **Constructor Arguments** (if asked):
   - You'll need the TriviaToken address that was deployed
   - Check your deployment output for the token address

8. **Click "Verify and Publish"**

## Alternative: Use Block Explorer Directly

If the above doesn't work, you can also try:
- Visit: https://celoscan.io
- Search for your contract address
- Follow their verification process

## Your Deployment Info

From your deployment, you should have seen:
```
TriviaToken deployed to: 0x...
TriviaGame deployed to: 0x38C2E62626273953c570Bc584803958E2DB9422d
```

Save both addresses - you'll need the TriviaToken address for:
1. Constructor argument verification
2. Updating `frontend/hooks/useTokenBalance.ts`

## Note

Your contract is already working on Celo Sepolia testnet! Verification just makes the source code visible on the block explorer - it's optional but recommended for transparency.
