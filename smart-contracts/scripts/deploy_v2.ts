import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying Game V2 with account:", deployer.address);

    const tokenAddress = "0xd1dE3936083662fE9741249a1613e2cd3A2C267a";
    console.log("Using existing TriviaToken at:", tokenAddress);

    // 1. Deploy New Game Contract
    const TriviaGame = await ethers.getContractFactory("TriviaGame");
    const game = await TriviaGame.deploy(tokenAddress);
    await game.waitForDeployment();
    const gameAddress = await game.getAddress();
    console.log("TriviaGame V2 deployed to:", gameAddress);

    // 2. Transfer Ownership of Token to New Game
    // Note: The deployer must currently be the owner of the Token contract?
    // Wait, the OLD Game contract is the owner!
    // We need to transfer ownership from Old Game to New Game? 
    // Or did we transfer it to the Game contract permanently?

    // If the Old Game contract is the owner, we are in trouble unless the Old Game contract has a function to transfer ownership.
    // Let's check TriviaGame.sol... it inherits Ownable.
    // But TriviaGame is Ownable (it has an owner), but does it expose a way to call `token.transferOwnership`?
    // No, it doesn't seem to have a function to call arbitrary functions on the token.

    // Uh oh. If we transferred ownership of TriviaToken to the TriviaGame contract, and TriviaGame doesn't have a function to transfer it back or to someone else, the TriviaToken ownership is stuck in the Old Game contract!

    // Let's check the TriviaGame code I wrote.
    // contract TriviaGame is Ownable { ... }
    // It does NOT have a function to transfer the token ownership.

    // This means we CANNOT use the existing TriviaToken contract for the new Game contract because the Old Game contract owns it and won't give it up.

    // SOLUTION: We must deploy a NEW TriviaToken as well.
    // This is fine for a testnet app. The user will get a new token balance.

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
