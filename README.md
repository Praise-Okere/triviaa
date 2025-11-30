# 🎓 Celo Trivia - Learn to Earn

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.24-blue?logo=solidity)](https://soliditylang.org/)
[![Celo](https://img.shields.io/badge/Celo-Sepolia-yellow)](https://docs.celo.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

A blockchain-powered educational platform built on Celo that rewards users with **TRIVIA tokens** for learning about the Celo ecosystem. Complete interactive lessons, pass quizzes, and earn crypto rewards!

## 🌟 Features

### 🎮 Progressive Learning Flow
- **3 Educational Modules**: Learn about Celo Overview, Stablecoins & Gas Fees, and Regenerative Finance (ReFi)
- **Sequential Unlocking**: Complete Module 1 → Unlock Module 2 → Unlock Module 3
- **Interactive Content**: Rich, engaging lessons based on official Celo documentation

### 💰 Earn While You Learn
- **Token Rewards**: Earn 10 TRIVIA tokens for each correct answer
- **Performance-Based**: Must score 9/10 or 10/10 to claim rewards
- **Batch Claiming**: Claim all rewards in a single transaction

### 🔐 Seamless Wallet Experience
- **Auto-Generated Wallet**: No manual wallet setup required
- **Embedded Wallet**: Wallet created automatically on first visit
- **MiniPay Compatible**: Optimized for Opera Mini's MiniPay wallet
- **Easy Funding**: Direct links to Celo Alfajores faucet

### 🎨 Premium Design
- **Modern UI**: Sleek yellow & black theme with smooth animations
- **Responsive**: Works perfectly on desktop and mobile
- **Framer Motion**: Smooth transitions and micro-interactions

## 🏗️ Architecture

### Smart Contracts (Celo Sepolia Testnet)

| Contract | Address | Purpose |
|----------|---------|---------|
| **TriviaGame** | `0x0B3Dc26723008E7d9B4468Aaae95e66605f6B028` | Manages quiz submissions and token rewards |
| **TriviaToken** | `0xB6F2A6FDf405Ea3414fCbD13f0e9e361c33d17a8` | ERC20 token for rewards |

### Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Ethers.js v6

**Blockchain:**
- Solidity 0.8.24
- Hardhat
- RainbowKit
- Wagmi
- Viem

**Wallet Integration:**
- Embedded Wallet (localStorage)
- RainbowKit
- MiniPay Support

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Git

### Clone the Repository
```bash
git clone https://github.com/Praise-Okere/triviaa.git
cd triviaa
```

### Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Install Smart Contract Dependencies (Optional)
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

### Step 1: Start Learning
1. Visit the landing page
2. Click **"Start Learning"** button
3. An embedded wallet is automatically created for you in the background

### Step 2: Learn Module Content
- Read through the educational content about Celo
- Content is sourced from official Celo documentation
- Each module covers a different aspect of the Celo ecosystem

### Step 3: Take the Quiz
- Click **"Take Quiz"** after reading the lesson
- Answer 10 questions about the module
- Each correct answer earns you 10 TRIVIA tokens
- You need **9 or 10 correct answers** to claim rewards

### Step 4: Get Testnet CELO (Required)
⚠️ **Important**: You need CELO for gas fees to claim rewards

**To get free testnet CELO:**
1. Copy your wallet address (shown at the top of the quiz page)
   - Tap the address to select it
   - Copy it (Ctrl+C / Cmd+C / long-press Copy)
2. Click the **"💰 Get Free Test CELO"** button
3. Paste your address on the [Celo Alfajores Faucet](https://faucet.celo.org/alfajores)
4. Request testnet CELO (it's free!)
5. Wait ~30 seconds for the CELO to arrive

### Step 5: Claim Your Rewards
1. After completing the quiz with a passing score:
   - If you scored 9-10/10, you'll see the **"Claim Rewards"** button
   - Click it to receive your TRIVIA tokens
2. Your token balance will update in the top right corner

### Step 6: Progress to Next Module
1. After claiming rewards, click **"Next Lesson"**
2. Repeat the learn → quiz → claim cycle for all 3 modules
3. After completing all modules, you can start over!

## 🎓 Learning Modules

### Module 1: Celo Overview & Mission
Learn about Celo's mobile-first approach, Istanbul BFT consensus, and carbon-negative status.

**Key Topics:**
- Mobile-first blockchain design
- Lightweight identity (phone number mapping)
- Ultralight client for smartphones
- Proof-of-Stake consensus

### Module 2: Stablecoins & Gas Fees
Understand Celo's native stablecoins and unique gas payment system.

**Key Topics:**
- cUSD, cEUR, and cREAL stablecoins
- Paying gas fees with stablecoins
- Mento Reserve mechanism
- Stability and value pegging

### Module 3: Regenerative Finance (ReFi)
Explore how Celo enables regenerative finance and social impact.

**Key Topics:**
- What is ReFi?
- Natural capital assets
- UBI projects (ImpactMarket, GoodDollar)
- Environmental and social impact

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Praise-Okere/triviaa)

**Manual Deployment:**
1. Import the repository to Vercel
2. **Critical**: In "Project Settings" → "General", set **Root Directory** to `frontend`
3. Build Command: `npm run build`
4. Output Directory: `.next`
5. Deploy!

### Environment Variables (Optional)
For smart contract development only:

```bash
# smart-contracts/.env
PRIVATE_KEY=your_private_key_here
```

## 🛠️ Development

### Project Structure
```
trivia/
├── frontend/                  # Next.js application
│   ├── app/                  # App router pages
│   │   ├── page.tsx         # Landing page
│   │   ├── quiz/            # Quiz page
│   │   └── layout.tsx       # Root layout
│   ├── components/          # React components
│   │   ├── EmbeddedQuiz.tsx
│   │   ├── LearningSession.tsx
│   │   └── Providers.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useEmbeddedWallet.ts
│   │   ├── useEmbeddedTriviaGame.ts
│   │   └── useEmbeddedTokenBalance.ts
│   ├── data/                # Learning content
│   │   └── learningContent.ts
│   └── abis/                # Contract ABIs
├── smart-contracts/         # Solidity contracts
│   ├── contracts/          # Smart contracts
│   │   ├── TriviaGame.sol
│   │   └── TriviaToken.sol
│   ├── scripts/            # Deployment scripts
│   └── test/              # Contract tests
└── README.md
```

### Key Files

**Frontend:**
- `app/page.tsx` - Landing page with hero section
- `app/quiz/page.tsx` - Main learning & quiz flow
- `components/EmbeddedQuiz.tsx` - Quiz component with scoring logic
- `components/LearningSession.tsx` - Educational content display
- `hooks/useEmbeddedWallet.ts` - Embedded wallet management
- `data/learningContent.ts` - Learning modules and questions

**Smart Contracts:**
- `contracts/TriviaGame.sol` - Game logic & reward distribution
- `contracts/TriviaToken.sol` - ERC20 token contract
- `scripts/deploy_v2.ts` - Deployment script

### Deploy Smart Contracts (Optional)

```bash
cd smart-contracts
npx hardhat run scripts/deploy_v2.ts --network celoSepolia
```

### Run Tests

```bash
cd smart-contracts
npx hardhat test
```

## 🔧 Configuration

### Update Contract Addresses

If you deploy new contracts, update these files:

**1. `frontend/hooks/useEmbeddedTriviaGame.ts`**
```typescript
const TRIVIA_GAME_ADDRESS = "YOUR_GAME_ADDRESS";
```

**2. `frontend/hooks/useEmbeddedTokenBalance.ts`**
```typescript
const TRIVIA_TOKEN_ADDRESS = "YOUR_TOKEN_ADDRESS";
```

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
- **Desktop**: Click the address to select it, then Ctrl+C (Windows) or Cmd+C (Mac)
- **Mobile**: Tap the address to select it, then long-press and select "Copy"

### Balance Not Updating
**Solution**:
- Wait 5-10 seconds after claiming
- Refresh the page
- Check your wallet on [Celo Explorer](https://explorer.celo.org/celo-sepolia)

### 404 Error on Vercel
**Cause**: Root Directory not set correctly

**Solution**:
1. Go to Project Settings → General
2. Set Root Directory to `frontend` (lowercase)
3. Redeploy

### Build Fails in Development
**Solution**:
```bash
# Clear cache and reinstall
rm -rf frontend/node_modules frontend/.next
cd frontend
npm install
npm run dev
```

## 📱 Mobile Support

The app is fully responsive and optimized for:
- ✅ Desktop browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (Chrome, Safari)
- ✅ **Opera Mini with MiniPay**

## 🔐 Security Notes

⚠️ **Important**: This is a testnet application for educational purposes.

**Embedded Wallet:**
- Private keys are stored in browser `localStorage`
- **Only use for testnet tokens** (no real value)
- For production, consider:
  - Hardware wallets
  - Social recovery wallets
  - MPC wallets
  - Proper key management systems

## 🎯 Features Explained

### Embedded Wallet System
- **Auto-Generation**: Wallet created automatically on first visit
- **Persistent**: Stored in browser localStorage
- **Secure**: Private key stays in user's browser
- **No Popups**: Seamless experience, no MetaMask prompts needed

### Progressive Learning
- **Sequential Modules**: Must complete Module 1 before Module 2, etc.
- **Score-Based Unlocking**: Need 9/10 or higher to progress
- **Retry Mechanism**: Can retry failed quizzes after reviewing content

### Batch Rewards
- **Efficient**: Claim all rewards in one transaction
- **Gas Savings**: Single transaction instead of multiple
- **Better UX**: No interruptions during quiz

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - feel free to use it for learning and building!

## 🙏 Acknowledgments

- Built for Celo Hackathon
- Educational content sourced from [Celo Documentation](https://docs.celo.org)
- Powered by Celo blockchain
- UI inspired by modern web3 applications

## 📞 Support

Having issues?
- Check the [Troubleshooting](#-troubleshooting) section
- Open an issue on GitHub
- Visit [Celo Discord](https://discord.gg/celo)

## 🔗 Links

- **Live Demo**: [Your Vercel URL]
- **GitHub**: https://github.com/Praise-Okere/triviaa
- **Celo Docs**: https://docs.celo.org
- **MiniPay Guide**: https://docs.celo.org/minipay
- **Celo Faucet**: https://faucet.celo.org/alfajores

## 🎓 Learn More

- [Celo Documentation](https://docs.celo.org)
- [Next.js Documentation](https://nextjs.org/docs)
- [Solidity Documentation](https://docs.soliditylang.org)
- [Hardhat Documentation](https://hardhat.org/getting-started/)

---

**Built with ❤️ for the Celo community**

*Help others learn about Celo and earn rewards!* 🚀
