# Deployment Guide

## Prerequisites
1. Get Celo Sepolia testnet CELO from the faucet: https://faucet.celo.org/alfajores
2. Have your wallet's private key ready

## Steps

### 1. Set up environment variables
```bash
cd smart-contracts
cp .env.example .env
```

Edit `.env` and add your private key (without 0x prefix):
```
PRIVATE_KEY=your_actual_private_key_here
```

### 2. Deploy contracts
```bash
npx hardhat run scripts/deploy.ts --network celoSepolia
```

This will output:
```
TriviaToken deployed to: 0x...
TriviaGame deployed to: 0x...
```

### 3. Update frontend with contract addresses

Copy the `TriviaGame` address and update `frontend/hooks/useTriviaGame.ts`:
```typescript
const TRIVIA_GAME_ADDRESS = "0xYOUR_DEPLOYED_ADDRESS_HERE";
```

Also update `frontend/hooks/useTokenBalance.ts` with the `TriviaToken` address.

### 4. Restart the dev server
```bash
cd ../frontend
# Stop the current dev server (Ctrl+C)
npm run dev
```

## Verification

After deployment, you can verify your contracts on Celo Explorer:
- Celo Sepolia: https://explorer.celo.org/alfajores/address/YOUR_CONTRACT_ADDRESS

## Troubleshooting
If deployment fails:
- Ensure you have enough CELO in your wallet (get from faucet)
- Check that your private key is correct in `.env`
- Verify you're connected to the right network
