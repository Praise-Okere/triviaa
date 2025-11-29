import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // 1. Deploy Token
    const TriviaToken = await ethers.getContractFactory("TriviaToken");
    const token = await TriviaToken.deploy();
    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();
    console.log("TriviaToken deployed to:", tokenAddress);

    // 2. Deploy Game
    const TriviaGame = await ethers.getContractFactory("TriviaGame");
    const game = await TriviaGame.deploy(tokenAddress);
    await game.waitForDeployment();
    const gameAddress = await game.getAddress();
    console.log("TriviaGame deployed to:", gameAddress);

    // 3. Transfer Ownership of Token to Game (so Game can mint)
    // Actually, TriviaToken.mint is onlyOwner. The deployer is the owner.
    // We need to transfer ownership of the Token contract to the Game contract
    // OR we can just authorize the Game contract to mint.
    // In our simple implementation, TriviaToken is Ownable and mint is onlyOwner.
    // So we must transfer ownership to the Game contract.
    await token.transferOwnership(gameAddress);
    console.log("TriviaToken ownership transferred to TriviaGame");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
