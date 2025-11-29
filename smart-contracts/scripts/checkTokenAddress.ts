import { ethers } from "hardhat";

async function main() {
    const gameAddress = "0x6820E5229B334E3e174ae3665Ac6c99cC53DCf06";

    try {
        const TriviaToken = await ethers.getContractFactory("TriviaToken");
        const token = TriviaToken.attach(gameAddress);
        const name = await token.name();
        const symbol = await token.symbol();
        console.log("It is a Token:", name, symbol);
    } catch (e) {
        console.log("Not a token or call failed");
    }

    try {
        const TriviaGame = await ethers.getContractFactory("TriviaGame");
        const game = TriviaGame.attach(gameAddress);
        const tokenAddress = await game.token();
        console.log("It is the Game Contract. Token Address:", tokenAddress);
    } catch (e) {
        console.log("Not the game contract or call failed");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
