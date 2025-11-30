import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

   
    const TriviaToken = await ethers.getContractFactory("TriviaToken");
    const token = await TriviaToken.deploy();
    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();
    console.log("TriviaToken deployed to:", tokenAddress);

  
    const TriviaGame = await ethers.getContractFactory("TriviaGame");
    const game = await TriviaGame.deploy(tokenAddress);
    await game.waitForDeployment();
    const gameAddress = await game.getAddress();
    console.log("TriviaGame deployed to:", gameAddress);

    await token.transferOwnership(gameAddress);
    console.log("TriviaToken ownership transferred to TriviaGame");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
