// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./TriviaToken.sol";

contract TriviaGame is Ownable {
    TriviaToken public token;
    uint256 public rewardAmount = 10 * 10**18; // 10 TRIVIA tokens per correct answer

    // Mapping to track if a user has answered a specific question ID
    mapping(address => mapping(uint256 => bool)) public hasAnswered;

    event RewardClaimed(address indexed user, uint256 questionId, uint256 amount);

    constructor(address _tokenAddress) Ownable(msg.sender) {
        token = TriviaToken(_tokenAddress);
    }

    // In a real production app, we would verify a signature from the backend
    // to ensure the answer was actually correct.
    // For this hackathon/demo, we'll trust the frontend or use a simple hash check.
    // Let's implement a simple "submitAnswer" that just mints for now to demonstrate the flow,
    // assuming the frontend validates the correctness.
    function submitCorrectAnswer(uint256 questionId) external {
        require(!hasAnswered[msg.sender][questionId], "Already answered this question");
        
        hasAnswered[msg.sender][questionId] = true;
        token.mint(msg.sender, rewardAmount);
        
        emit RewardClaimed(msg.sender, questionId, rewardAmount);
    }

    function submitBatchAnswers(uint256[] calldata questionIds) external {
        uint256 totalReward = 0;
        
        for (uint256 i = 0; i < questionIds.length; i++) {
            uint256 qId = questionIds[i];
            if (!hasAnswered[msg.sender][qId]) {
                hasAnswered[msg.sender][qId] = true;
                totalReward += rewardAmount;
                emit RewardClaimed(msg.sender, qId, rewardAmount);
            }
        }

        if (totalReward > 0) {
            token.mint(msg.sender, totalReward);
        }
    }

    function setRewardAmount(uint256 _amount) external onlyOwner {
        rewardAmount = _amount;
    }
}
