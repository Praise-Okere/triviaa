export interface Question {
    id: number;
    question: string;
    options: string[];
    answer: number;
}

export interface LearningModule {
    id: string;
    title: string;
    content: string; // Markdown-like or HTML string
    questions: Question[];
}

export const learningModules: LearningModule[] = [
    {
        id: "celo-overview",
        title: "Celo Overview & Mission",
        content: `
            <h3 class="text-xl font-bold text-yellow-400 mb-4">Mobile-First Blockchain</h3>
            <p class="mb-4 text-zinc-300">Celo is a carbon-negative, mobile-first, EVM-compatible blockchain ecosystem leading a thriving new digital economy for all. It is designed to be accessible to anyone with a mobile phone.</p>
            
            <h3 class="text-xl font-bold text-yellow-400 mb-4">Key Innovations</h3>
            <ul class="list-disc list-inside space-y-2 text-zinc-300 mb-4">
                <li><strong>Lightweight Identity:</strong> Celo allows you to map your phone number to your wallet address, making crypto payments as easy as sending a text.</li>
                <li><strong>Ultralight Client:</strong> Celo's mobile client is incredibly light, allowing it to run efficiently on smartphones with limited data and storage.</li>
                <li><strong>Carbon Negative:</strong> Celo offsets more carbon than it emits, making it one of the most eco-friendly blockchains.</li>
            </ul>

            <h3 class="text-xl font-bold text-yellow-400 mb-4">Consensus Mechanism</h3>
            <p class="mb-4 text-zinc-300">Celo uses a Proof-of-Stake (PoS) consensus mechanism called Istanbul BFT, which provides fast finality and high throughput.</p>
        `,
        questions: [
            { id: 101, question: "What is Celo's primary design philosophy?", options: ["Server-first", "Mobile-first", "Desktop-first", "Hardware-first"], answer: 1 },
            { id: 102, question: "What consensus mechanism does Celo use?", options: ["Proof of Work", "Proof of Stake (Istanbul BFT)", "Proof of History", "Proof of Authority"], answer: 1 },
            { id: 103, question: "Celo is compatible with which Virtual Machine?", options: ["Solana VM", "Move VM", "Ethereum VM (EVM)", "Bitcoin VM"], answer: 2 },
            { id: 104, question: "What unique identity feature does Celo offer?", options: ["Retina scanning", "Phone number mapping", "DNA sequencing", "Passport linking"], answer: 1 },
            { id: 105, question: "What is Celo's environmental status?", options: ["Carbon Neutral", "Carbon Negative", "Carbon Positive", "Unknown"], answer: 1 },
            { id: 106, question: "What makes Celo suitable for mobile devices?", options: ["Heavy client", "Ultralight client", "Cloud mining", "5G requirement"], answer: 1 },
            { id: 107, question: "Celo aims to create a digital economy for...", options: ["Only banks", "All", "Only tech experts", "Only governments"], answer: 1 },
            { id: 108, question: "What does EVM compatibility mean for Celo?", options: ["It runs Bitcoin apps", "It runs Ethereum apps", "It runs Solana apps", "It runs no apps"], answer: 1 },
            { id: 109, question: "How does Celo handle transaction finality?", options: ["Slow finality", "Fast finality", "No finality", "Weekly finality"], answer: 1 },
            { id: 110, question: "Celo's mission is focused on...", options: ["Prosperity for all", "Profit for few", "Gaming only", "Mining only"], answer: 0 },
        ]
    },
    {
        id: "celo-stablecoins-gas",
        title: "Stablecoins & Gas Fees",
        content: `
            <h3 class="text-xl font-bold text-yellow-400 mb-4">Native Stablecoins</h3>
            <p class="mb-4 text-zinc-300">Celo supports native stablecoins like <strong>cUSD (Celo Dollar)</strong>, <strong>cEUR (Celo Euro)</strong>, and <strong>cREAL (Celo Real)</strong>. These assets track the value of their respective fiat currencies.</p>
            
            <h3 class="text-xl font-bold text-yellow-400 mb-4">Pay Gas with Stablecoins</h3>
            <p class="mb-4 text-zinc-300">A unique feature of Celo is the ability to pay for transaction fees (gas) using stablecoins (like cUSD) instead of the native CELO token. This simplifies the user experience significantly.</p>

            <h3 class="text-xl font-bold text-yellow-400 mb-4">Mento Reserve</h3>
            <p class="mb-4 text-zinc-300">The stability of these assets is maintained by the Mento Reserve, a diversified portfolio of crypto assets (like BTC, ETH) and natural capital assets.</p>
        `,
        questions: [
            { id: 201, question: "Which of these is a Celo native stablecoin?", options: ["USDT", "cUSD", "DAI", "USDC"], answer: 1 },
            { id: 202, question: "What is cEUR pegged to?", options: ["US Dollar", "Euro", "Real", "Gold"], answer: 1 },
            { id: 203, question: "What is unique about paying gas on Celo?", options: ["It's always free", "You can pay with stablecoins", "Must use ETH", "Paid by miners"], answer: 1 },
            { id: 204, question: "What maintains the stability of Celo stablecoins?", options: ["The Fed", "Mento Reserve", "World Bank", "Nothing"], answer: 1 },
            { id: 205, question: "What is cREAL?", options: ["Fake money", "Celo Real (Brazilian currency)", "Real Estate token", "Celo Reality"], answer: 1 },
            { id: 206, question: "Can you pay gas with cUSD?", options: ["Yes", "No", "Only on Sundays", "Only for NFTs"], answer: 0 },
            { id: 207, question: "The Mento Reserve holds...", options: ["Only CELO", "Diversified crypto & natural assets", "Only USD", "Nothing"], answer: 1 },
            { id: 208, question: "Stablecoins on Celo are designed to...", options: ["Fluctuate wildly", "Track fiat value", "Always go up", "Always go down"], answer: 1 },
            { id: 209, question: "Paying gas with stablecoins improves...", options: ["Mining speed", "User Experience (UX)", "Block size", "Network latency"], answer: 1 },
            { id: 210, question: "cUSD stands for...", options: ["Crypto USD", "Celo Dollar", "Central USD", "Cool USD"], answer: 1 },
        ]
    },
    {
        id: "celo-refi-impact",
        title: "Regenerative Finance (ReFi)",
        content: `
            <h3 class="text-xl font-bold text-yellow-400 mb-4">The Home of ReFi</h3>
            <p class="mb-4 text-zinc-300">Celo is known as the home of <strong>Regenerative Finance (ReFi)</strong>. ReFi is a movement that uses web3 tools to solve systemic issues like climate change and poverty.</p>
            
            <h3 class="text-xl font-bold text-yellow-400 mb-4">Natural Capital</h3>
            <p class="mb-4 text-zinc-300">Celo enables assets backed by natural capital (e.g., rainforests, carbon credits). This means holding Celo assets can directly support the environment.</p>

            <h3 class="text-xl font-bold text-yellow-400 mb-4">Social Impact</h3>
            <p class="mb-4 text-zinc-300">Through Universal Basic Income (UBI) projects like ImpactMarket and GoodDollar built on Celo, the network facilitates direct aid to communities in need.</p>
        `,
        questions: [
            { id: 301, question: "What does ReFi stand for?", options: ["Real Finance", "Regenerative Finance", "Retro Finance", "Rapid Finance"], answer: 1 },
            { id: 302, question: "What is a key goal of ReFi?", options: ["Maximize extraction", "Solve systemic issues like climate change", "Create more banks", "Increase inflation"], answer: 1 },
            { id: 303, question: "Celo is known as the home of...", options: ["NFTs", "ReFi", "Memecoins", "Bitcoin"], answer: 1 },
            { id: 304, question: "What is Natural Capital?", options: ["Paper money", "Assets like rainforests & carbon credits", "Factory machinery", "Office buildings"], answer: 1 },
            { id: 305, question: "Which UBI project is built on Celo?", options: ["ImpactMarket", "Bitcoin", "Ethereum", "Solana"], answer: 0 },
            { id: 306, question: "ReFi uses web3 tools to...", options: ["Ignore problems", "Regenerate communities & environment", "Create waste", "Centralize power"], answer: 1 },
            { id: 307, question: "Holding Celo assets can support...", options: ["Deforestation", "The environment", "Pollution", "Nothing"], answer: 1 },
            { id: 308, question: "GoodDollar is a project focused on...", options: ["UBI (Universal Basic Income)", "NFT trading", "Gambling", "Mining"], answer: 0 },
            { id: 309, question: "ReFi shifts the focus from extraction to...", options: ["Regeneration", "Destruction", "Stagnation", "Depletion"], answer: 0 },
            { id: 310, question: "Celo's infrastructure supports...", options: ["Social impact projects", "Only high-frequency trading", "Only gaming", "Closed systems"], answer: 0 },
        ]
    }
];
