let playerPoints = 0;
let computerPoints = 0;
const handElements = [...document.querySelectorAll(".game-hand-container")];
const gameStatus = document.querySelector("#game-status");
const playerPointsEl = document.querySelector("#player-points");
const computerPointsEl = document.querySelector("#computer-points");
const playerHand = document.querySelector("#player-hand");
const computerHand = document.querySelector("#computer-hand");
const playAgainBtn = document.querySelector("#play-again");

handElements.forEach(hand => hand.addEventListener("click", renderGame))

function getComputerChoice() {
    const gameChoices = ["rock", "paper", "scissors"];
    const computerChoice = gameChoices[Math.floor(Math.random() * gameChoices.length)];
    return getPlayerObject(computerChoice);
}

function getPlayerChoice(e) {
    const playerChoice = e.target.id;  
    return getPlayerObject(playerChoice)
}

function getPlayerObject(playerChoice) {
    const playerObject = {
        hand: "",
        emoji: ""
    };

    if (playerChoice === "rock") {
        playerObject.hand = "rock";
        playerObject.emoji = "✊";
    } else if (playerChoice === "paper") {
        playerObject.hand = "paper";
        playerObject.emoji = "✋";
    } else {
        playerObject.hand = "scissors";
        playerObject.emoji = "✌️";
    }

    return playerObject;
}

function renderGame(e) {
    const round = playRound(getPlayerChoice(e), getComputerChoice());
    displayRound(round)
    updatePoints(round)
    checkScoreboard()
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice.hand === computerChoice.hand) {
        return {
            winner: null,
            tied: true,
            playerChoice,
            computerChoice
        }
    }

    let winner;

    switch (playerChoice.hand) {
        case "rock":
            winner = (computerChoice.hand === "paper") ? "computer" : "player";
            break;
        case "paper":
            winner = (computerChoice.hand === "scissors") ? "computer" : "player";
            break;
        case "scissors":
            winner = (computerChoice.hand === "rock") ? "computer" : "player";
            break;
    }

    return {
        winner,
        tied: false,
        playerChoice,
        computerChoice
    }
}

function displayRound(round) {
    playerHand.textContent = round.playerChoice.emoji;
    computerHand.textContent = round.computerChoice.emoji;
}

function updatePoints(round) {
    let roundStatus;

    if (round.winner === null) {
        roundStatus = "You tied!";
    } else if (round.winner === "player") {
        playerPoints++
        roundStatus = "You won!";
    } else {
        computerPoints++
        roundStatus = "You lost :(";
    }

    playerPointsEl.textContent = `${playerPoints} point(s)`;
    computerPointsEl.textContent = `${computerPoints} point(s)`;
    gameStatus.textContent = roundStatus;
}

function checkScoreboard() {
    let gameWinner;
    const hasWinner = playerPoints === 5 || computerPoints === 5;

    if (hasWinner && playerPoints > computerPoints) {
        gameWinner = "You won the game!";
    } else if (hasWinner && computerPoints > playerPoints) {
        gameWinner = "You lost the game";
    }

    if (!gameWinner) return;

    gameStatus.textContent = gameWinner;
    playAgain()
}

function playAgain() {
    playAgainBtn.style.display = "flex";
    document.querySelector("#reset-game").addEventListener("click", resetGame)
}

function resetGame() {
    playAgainBtn.style.display = "none";
    playerPoints = 0;
    computerPoints = 0;
    playerHand.textContent = "🤜";
    computerHand.textContent = "🤛";
    playerPointsEl.textContent = "0 point(s)";
    computerPointsEl.textContent = "0 point(s)";
    gameStatus.textContent = "Let's get things rollin'";
} 
