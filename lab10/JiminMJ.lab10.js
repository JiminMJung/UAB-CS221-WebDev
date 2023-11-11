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
        return "Invalid choice. Please enter Rock, Paper, or Scissors.";
    }
}

const buttons = document.querySelectorAll('button');
const resultDiv = document.querySelector('.result');
const resultsDiv = document.querySelector('.results');

// updateResults, printResults and placeholders for handleClick was modifed/fixed // 
function updateResults(result) {
    resultsDiv.innerHTML += result + ' ';
}

function printResults() {
    resultsDiv.innerHTML = resultsDiv.innerHTML.trim();
}

function handleClick(event) {
    const userChoice = catchingInputError(event.target.textContent);
    const computerChoice = randomComputerDecision();
    const result = winnerDecision(userChoice, computerChoice);
    resultDiv.innerHTML = `You chose ${userChoice}. Computer decided ${computerChoice}. ${result}`;
    updateResults(result);
}

buttons.forEach(button => {
    button.addEventListener('click', handleClick);
});

printResults();
