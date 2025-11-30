import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying Game V2 with account:", deployer.address);

    const tokenAddress = "0xd1dE3936083662fE9741249a1613e2cd3A2C267a";
    console.log("Using existing TriviaToken at:", tokenAddress);

   
    const TriviaGame = await ethers.getContractFactory("TriviaGame");
    const game = await TriviaGame.deploy(tokenAddress);
    await game.waitForDeployment();
    const gameAddress = await game.getAddress();
    console.log("TriviaGame V2 deployed to:", gameAddress);

    

    console.log("Deploying NEW TriviaToken because ownership is locked in old game contract...");

    const TriviaToken = await ethers.getContractFactory("TriviaToken");
    const newToken = await TriviaToken.deploy();
    await newToken.waitForDeployment();
    const newTokenAddress = await newToken.getAddress();
    console.log("NEW TriviaToken deployed to:", newTokenAddress);

    // Deploy Game with NEW Token
    const gameV2 = await TriviaGame.deploy(newTokenAddress);
    await gameV2.waitForDeployment();
    const gameV2Address = await gameV2.getAddress();
    console.log("TriviaGame V2 deployed to:", gameV2Address);

    // Transfer ownership of NEW Token to NEW Game
    await newToken.transferOwnership(gameV2Address);
    console.log("NEW TriviaToken ownership transferred to TriviaGame V2");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
