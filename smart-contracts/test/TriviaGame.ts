import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("TriviaGame", function () {
    async function deployTriviaFixture() {
        const [owner, otherAccount] = await ethers.getSigners();

        const TriviaToken = await ethers.getContractFactory("TriviaToken");
        const token = await TriviaToken.deploy();
        const tokenAddress = await token.getAddress();

        const TriviaGame = await ethers.getContractFactory("TriviaGame");
        const game = await TriviaGame.deploy(tokenAddress);
        const gameAddress = await game.getAddress();

        // Transfer ownership of token to game so it can mint
        await token.transferOwnership(gameAddress);

        return { game, token, owner, otherAccount, gameAddress };
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { game, owner } = await loadFixture(deployTriviaFixture);
            expect(await game.owner()).to.equal(owner.address);
        });

        it("Game contract should own the Token contract", async function () {
            const { token, gameAddress } = await loadFixture(deployTriviaFixture);
            expect(await token.owner()).to.equal(gameAddress);
        });
    });

    describe("Game Logic", function () {
        it("Should mint tokens when submitting a correct answer", async function () {
            const { game, token, owner } = await loadFixture(deployTriviaFixture);
            const questionId = 1;
            const rewardAmount = await game.rewardAmount();

            await expect(game.submitCorrectAnswer(questionId))
                .to.emit(game, "RewardClaimed")
                .withArgs(owner.address, questionId, rewardAmount);

            expect(await token.balanceOf(owner.address)).to.equal(rewardAmount);
        });

        it("Should prevent answering the same question twice", async function () {
            const { game } = await loadFixture(deployTriviaFixture);
            const questionId = 1;

            await game.submitCorrectAnswer(questionId);

            await expect(game.submitCorrectAnswer(questionId)).to.be.revertedWith(
                "Already answered this question"
            );
        });
    });
});
