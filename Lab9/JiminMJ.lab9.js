function catchingInputError(choice) {
    return choice.toLowerCase();
}

function randomComputerDecision() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function winnerDecision(userDecision, computerDecision) {
    if (userDecision === computerDecision) {
        return "It's a tie!";
    } else if (userDecision === "rock" && computerDecision === "scissors") {
        return "You win!";
    } else if (userDecision === "scissors" && computerDecision === "paper") {
        return "You win!";
    } else if (userDecision === "paper" && computerDecision === "rock") {
        return "You win!";
    } else if (computerDecision === "rock" && userDecision === "scissors") {
        return "Computer wins!";
    } else if (computerDecision === "scissors" && userDecision === "paper") {
        return "Computer wins!";
    } else if (computerDecision === "paper" && userDecision === "rock") {
        return "Computer wins!";
    } else {
        return "invalid choice. Please enter Rock, Paper, or Scissors.";
    }
}

function playGame() {
    const userinput = prompt("Enter your choice: Rock, Paper, or Scissors");
    const userFinalDecision = catchingInputError(userinput);
    const computerFinalDecision = randomComputerDecision();

    console.log("The User's given decision: " + userFinalDecision);
    console.log("The Computer's given decision: " + computerFinalDecision);

    const result = winnerDecision(userFinalDecision, computerFinalDecision);
    console.log(result);

    const playAgain = confirm("Do you want to play again?");
    if (playAgain) {
        playGame();
    }
}

playGame();
