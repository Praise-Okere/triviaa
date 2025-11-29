# 🎓 Celo Trivia - Learn to Earn

A blockchain-powered educational trivia game built on Celo that rewards users with TRIVIA tokens for correctly answering questions about the Celo ecosystem.

![Celo Trivia](https://img.shields.io/badge/Celo-Sepolia-yellow)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Solidity](https://img.shields.io/badge/Solidity-0.8.24-blue)

## 🌟 Features

- **🎮 Interactive Quiz** - 10 randomized questions about Celo blockchain
- **💰 Token Rewards** - Earn 10 TRIVIA tokens per correct answer
- **🔐 Embedded Wallet** - Auto-generated wallet, no manual setup needed
- **📱 MiniPay Compatible** - Optimized for Opera Mini's MiniPay wallet
- **⚡ Batch Rewards** - Claim all rewards in a single transaction
- **🎨 Modern UI** - Beautiful yellow & black theme with smooth animations

## 🏗️ Architecture

### Smart Contracts (Celo Sepolia Testnet)
- **TriviaGame**: `0x0B3Dc26723008E7d9B4468Aaae95e66605f6B028`
- **TriviaToken**: `0xB6F2A6FDf405Ea3414fCbD13f0e9e361c33d17a8`

### Tech Stack
- **Frontend**: Next.js 16, React, TailwindCSS, Framer Motion
- **Blockchain**: Solidity, Hardhat, Ethers.js v6
- **Wallet**: RainbowKit, Wagmi, Embedded Wallet (localStorage)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Git

### Clone the Repository
```bash
git clone https://github.com/Praise-Okere/trivia.git
cd trivia
```

### Install Dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Smart Contracts (Optional - for development)
```bash
cd smart-contracts
npm install
```

## 🚀 Running the Application

### Development Mode
```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:3000`

### Production Build
```bash
cd frontend
npm run build
npm start
```

## 📖 How to Use

### For Users

#### 1. **Start the Quiz**
- Visit the landing page
- Click **"Start Learning"** button
- A wallet is automatically created for you in the background

#### 2. **Play the Game**
- Answer 10 questions about Celo blockchain
- Each correct answer earns you 10 TRIVIA tokens
- See your score update in real-time

#### 3. **Claim Your Rewards** ⚠️ **IMPORTANT**
After completing the quiz, you need testnet CELO to claim your rewards:

**Step-by-Step:**

a. **Copy Your Wallet Address**
   - At the top of the quiz page, you'll see your wallet address
   - Tap/click on it to select, then copy it

b. **Get Free Testnet CELO**
   - Click the **"💰 Get Free Test CELO"** button
   - Or visit: https://faucet.celo.org/alfajores
   - Paste your wallet address
   - Request testnet CELO (it's free!)
   - Wait ~30 seconds for it to arrive

c. **Claim TRIVIA Tokens**
   - Go back to the quiz results page
   - Click **"Claim X TRIVIA Tokens"**
   - Wait for the transaction to complete
   - Your balance will update in the top right corner! 🎉

#### 4. **Play Again**
- Click "Play Again" to get a new set of questions
- Keep earning more TRIVIA tokens!

### For MiniPay Users

1. Open the app URL in **Opera Mini** browser
2. MiniPay wallet will be automatically detected
3. Follow the same steps as above
4. Transactions will be signed through MiniPay

## 🛠️ Development

### Project Structure
```
trivia/
├── frontend/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── abis/            # Contract ABIs
│   └── public/          # Static assets
├── smart-contracts/
│   ├── contracts/       # Solidity contracts
│   ├── scripts/         # Deployment scripts
│   └── test/           # Contract tests
└── README.md
```

### Key Files

#### Frontend
- `app/page.tsx` - Landing page
- `app/quiz/page.tsx` - Quiz game page
- `components/EmbeddedQuiz.tsx` - Main quiz component
- `hooks/useEmbeddedWallet.ts` - Wallet management
- `hooks/useEmbeddedTriviaGame.ts` - Contract interactions

#### Smart Contracts
- `contracts/TriviaGame.sol` - Game logic & rewards
- `contracts/TriviaToken.sol` - ERC20 token
- `scripts/deploy_v2.ts` - Deployment script

### Environment Variables

Create `.env` in `smart-contracts/` directory:
```env
PRIVATE_KEY=your_private_key_here
```

### Deploy Contracts (Optional)

```bash
cd smart-contracts
npx hardhat run scripts/deploy_v2.ts --network celoSepolia
```

### Deploy to Vercel

1. Import the repository to Vercel.
2. **Important**: In "Project Settings" > "General", set the **Root Directory** to `frontend`.
3. The build command should be `next build` and output directory `.next`.
4. Deploy!

### Run Tests

```bash
cd smart-contracts
npx hardhat test
```

## 🔧 Configuration

### Update Contract Addresses

If you deploy new contracts, update these files:

1. `frontend/hooks/useEmbeddedTriviaGame.ts`
   ```typescript
   const TRIVIA_GAME_ADDRESS = "YOUR_GAME_ADDRESS";
   ```

2. `frontend/hooks/useEmbeddedTokenBalance.ts`
   ```typescript
   const TRIVIA_TOKEN_ADDRESS = "YOUR_TOKEN_ADDRESS";
   ```

## 🎯 Features Explained

### Embedded Wallet System
- **Auto-Generation**: Wallet created on first visit
- **Persistent**: Stored in browser localStorage
- **Secure**: Private key stays in user's browser
- **No Popups**: Seamless experience, no MetaMask prompts

### Batch Rewards
- **Efficient**: Claim all rewards in one transaction
- **Gas Savings**: Single transaction instead of multiple
- **Better UX**: No interruptions during quiz

### Question Randomization
- 10 questions selected from a bank of 10+
- Shuffled order each game
- Fresh experience every time

## 🐛 Troubleshooting

### "Transaction Failed" Error
**Cause**: Your wallet doesn't have CELO for gas fees

**Solution**:
1. Copy your wallet address from the quiz page
2. Visit https://faucet.celo.org/alfajores
3. Paste address and request testnet CELO
4. Wait 30 seconds and try claiming again

### Wallet Address Not Copying
**Solution**:
- Tap/click the address to select it
- Use Ctrl+C (Windows) or Cmd+C (Mac)
- On mobile: Long-press and select "Copy"

### Balance Not Updating
**Solution**:
- Wait 5-10 seconds after claiming
- Refresh the page
- Check your wallet address on [Celo Explorer](https://explorer.celo.org/celo-sepolia)

## 📱 Mobile Support

The app is fully responsive and works great on:
- ✅ Desktop browsers (Chrome, Firefox, Safari)
- ✅ Mobile browsers (Chrome, Safari)
- ✅ Opera Mini (MiniPay)

## 🔐 Security Notes

⚠️ **Important**: This is a testnet application for educational purposes.

- Private keys are stored in browser localStorage
- Only use for testnet tokens (no real value)
- For production, consider using:
  - Hardware wallets
  - Social recovery
  - Multi-sig wallets

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning and building!

## 🙏 Acknowledgments

- Built for Celo Hackathon
- Powered by Celo blockchain
- UI inspired by modern web3 apps

## 📞 Support

Having issues? 
- Check the [Troubleshooting](#-troubleshooting) section
- Open an issue on GitHub
- Visit [Celo Discord](https://discord.gg/celo)

## 🎓 Learn More

- [Celo Documentation](https://docs.celo.org)
- [MiniPay Guide](https://docs.celo.org/minipay)
- [Solidity Docs](https://docs.soliditylang.org)

---

**Made with ❤️ for the Celo community**
