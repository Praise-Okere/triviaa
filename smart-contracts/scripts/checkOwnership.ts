import { ethers } from "hardhat";

async function main() {
    const tokenAddress = "0xd1dE3936083662fE9741249a1613e2cd3A2C267a";
    const gameAddress = "0x6820E5229B334E3e174ae3665Ac6c99cC53DCf06";

    const TriviaToken = await ethers.getContractFactory("TriviaToken");
    const token = TriviaToken.attach(tokenAddress);

    const owner = await token.owner();
    console.log("Current Token Owner:", owner);
    console.log("Game Contract Address:", gameAddress);

    if (owner.toLowerCase() === gameAddress.toLowerCase()) {
        console.log("✅ SUCCESS: Game contract IS the owner. It can mint tokens.");
    } else {
        console.log("❌ FAILURE: Game contract is NOT the owner. It CANNOT mint tokens.");
        console.log("You need to transfer ownership to the game contract.");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
