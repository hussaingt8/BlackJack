//Game 1: Your Age in Days

ageInDays = () => {
  var birthYear = prompt("What year were you born in?");
  var currentYear = new Date().getFullYear();
  var age_inDays = (currentYear - birthYear) * 365;
  var textAnswer = `<h1>You are  ${age_inDays} days old!</h1>`;
  document.getElementById("flex-box-result").innerHTML = textAnswer;
};

reset = () => {
  document.getElementById("flex-box-result").innerHTML = "";
};

//Game 2: Cat Generator
generateCat = (e) => {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  div.appendChild(image);
};

//Game 3: Rock, Paper, Scissors
rpsGame = (yourChoice) => {
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randToRpsInt());
  results = decideWinner(humanChoice, botChoice);
  message = finalMessage(results);
  console.log(message);
  rpsFrontEnd(yourChoice.id, botChoice, message);
};

/**
 * Returns either 0, 1 or 2
 */
randToRpsInt = () => {
  return Math.floor(Math.random() * 3);
};

/**
 * Takes in a integer and returns the choice as a string.
 * @param {int} number - Numbers 0-2
 */
numberToChoice = (number) => {
  let choices = ["rock", "paper", "scissors"];
  return choices[number];
};

/**
 * Takes in your choice & computer's choice as strings and returns
 * the scores as an array.
 * @param {string} yourChoice
 * @param {string} computerChoice
 */
decideWinner = (yourChoice, computerChoice) => {
  var rpsDatabase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };

  var yourScore = rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];

  return [yourScore, computerScore];
};

finalMessage = ([yourScore, computerScore]) => {
  switch (yourScore) {
    case 0:
      return { message: "You lost!", color: "red" };
    case 0.5:
      return { message: "You tied!", color: "yellow" };
    case 1:
      return { message: "You won!", color: "green" };
  }
};

rpsFrontEnd = (humanImageChoice, botImageChoice, finalMessage) => {
  var imagesDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };

  humanDiv = `<img src="${imagesDatabase[humanImageChoice]}" height=150 width=150 style="box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);">`;
  messageDiv = `<h1 style="color:${finalMessage["color"]}; font-size: 60px; padding: 30px;">${finalMessage["message"]}</h1>`;
  botDiv = `<img src="${imagesDatabase[botImageChoice]}" height=150 width=150 style="box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);">`;
  resetButton = `<hr /><button class="btn btn-danger" onclick="resetRPS()">Play Again</button>`;

  document.getElementById("flex-box-rps-div").innerHTML = `${humanDiv}${messageDiv}${botDiv}`;
  document.getElementById("play-again-div").innerHTML = `${resetButton}`;
};

const rpsReset = document.getElementById("flex-box-rps-div").innerHTML;

resetRPS = () => {
  document.getElementById("flex-box-rps-div").innerHTML = rpsReset;
  document.getElementById("play-again-div").innerHTML = "";
};

var all_buttons = document.getElementsByTagName("button");
var copyAllButtons = [];

for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}

buttonColorChange = (colorSelector) => {
  switch (colorSelector.value) {
    case "red":
      buttonsRed();
      break;
    case "green":
      buttonsGreen();
      break;
    case "reset":
      buttonColorReset();
      break;
    case "random":
      buttonColorRandom();
      break;
  }
};

buttonsRed = () => {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
};

buttonsGreen = () => {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
};

buttonColorReset = () => {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
};

buttonColorRandom = () => {
  let choices = ["btn-primary", "btn-success", "btn-danger", "btn-warning"];

  for (let i = 0; i < all_buttons.length; i++) {
    let randomchoice = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomchoice]);
  }
};

// Challenge 5: Blackjack
let blackjackGame = {
  you: {
    scoreSpan: "#your-blackjack-score",
    div: "#your-box",
    score: 0,
  },
  dealer: {
    scoreSpan: "#dealer-blackjack-score",
    div: "#dealer-box",
    score: 0,
  },
  isStand: false,
  turnsOver: false,
  wins: 0,
  losses: 0,
  draws: 0,
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    K: 10,
    Q: 10,
    J: 10,
    A: [1, 11],
  },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

// we are gonna use event listeners
// document.querySelector("#blackjack-hit-button").addEventListener("click", blackjackHit);

// document.querySelector("#blackjack-stand-button").addEventListener("click", dealerLogic);

// document.querySelector("#blackjack-deal-button").addEventListener("click", blackjackDeal);

const hitSound = new Audio("static/sounds/swish.m4a");
const winSound = new Audio("static/sounds/cash.mp3");
const lossSound = new Audio("static/sounds/aww.mp3");

blackjackHit = () => {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();
    updateScore(card, YOU);
    showCard(card, YOU);
    showScore(YOU);
  }
};

randomCard = () => {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
};

updateScore = (card, activePlayer) => {
  if (card === "A") {
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
};

showCard = (card, activePlayer) => {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("IMG");
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
};

showScore = (activePlayer) => {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer["score"];
  }
};

sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

dealerLogic = async () => {
  blackjackGame["isStand"] = true;
  while (DEALER["score"] < 16 && blackjackGame["isStand"] === true) {
    let card = randomCard();
    updateScore(card, DEALER);
    showCard(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }

  blackjackGame["turnsOver"] = true;
  showResult();
};

blackjackDeal = () => {
  if (blackjackGame["turnsOver"] === true) {
    blackjackGame["isStand"] = false;

    let yourImages = document.querySelector("#your-box").querySelectorAll("img");
    let dealerImages = document.querySelector("#dealer-box").querySelectorAll("img");
    for (i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }

    for (i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    YOU["score"] = 0;
    DEALER["score"] = 0;

    document.querySelector("#your-blackjack-score").textContent = 0;
    document.querySelector("#dealer-blackjack-score").textContent = 0;

    document.querySelector("#your-blackjack-score").style.color = "#ffffff";
    document.querySelector("#dealer-blackjack-score").style.color = "#ffffff";

    document.querySelector("#blackjack-result").textContent = "Let's play";
    document.querySelector("#blackjack-result").style.color = "black";

    blackjackGame["turnsOver"] = false;
  }
};

// show result on the top and update the score in the table
showResult = () => {
  let message, messageColor;

  if (blackjackGame["turnsOver"] === true) {
    if (YOU["score"] <= 21) {
      // condition: higher score than dealer's or when dealer busts but you're 21 or under.
      if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
        blackjackGame["wins"]++;
        document.querySelector("#wins").textContent = blackjackGame["wins"];
        message = "You won!";
        messageColor = "green";
        winSound.play();
      } else if (YOU["score"] < DEALER["score"]) {
        blackjackGame["losses"]++;
        document.querySelector("#losses").textContent = blackjackGame["losses"];
        message = "You lost!";
        messageColor = "red";
        lossSound.play();
      } else if (YOU["score"] === DEALER["score"]) {
        blackjackGame["draws"]++;
        document.querySelector("#draws").textContent = blackjackGame["draws"];
        message = "You drew!";
        messageColor = "black";
      }

      // condition: user busts but dealer doesn't
    } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
      blackjackGame["losses"]++;
      document.querySelector("#losses").textContent = blackjackGame["losses"];
      message = "You lost!";
      messageColor = "red";
      lossSound.play();

      // condition: when DEALERh bust.
    } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
      blackjackGame["draws"]++;
      document.querySelector("#draws").textContent = blackjackGame["draws"];
      message = "You drew!";
      messageColor = "black";
    }
  }

  document.querySelector("#blackjack-result").textContent = message;
  document.querySelector("#blackjack-result").style.color = messageColor;
};
