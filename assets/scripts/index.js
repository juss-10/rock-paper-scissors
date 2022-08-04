
const handElements = [...document.querySelectorAll(".game-hand-container")];
let playerPoints = 0;
let computerPoints = 0;

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
        playerObject.emoji = "🪨";
    } else if (playerChoice === "paper") {
        playerObject.hand = "paper";
        playerObject.emoji = "📃";
    } else {
        playerObject.hand = "scissors";
        playerObject.emoji = "✂️";
    }

    return playerObject;
}

function renderGame(e) {
    const round = playRound(getPlayerChoice(e), getComputerChoice());
    displayRound(round)
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
    const playerHand = document.querySelector("#player-hand");
    const computerHand = document.querySelector("#computer-hand");

    playerHand.textContent = round.playerChoice.emoji;
    computerHand.textContent = round.computerChoice.emoji;
}