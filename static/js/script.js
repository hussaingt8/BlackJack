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
    "rock": { "scissors": 1, "rock": 0.5, "paper": 0 },
    "paper": { "rock": 1, "paper": 0.5, "scissors": 0 },
    "scissors": { "paper": 1, "scissors": 0.5, "rock": 0 },
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
  resetButton = `<hr /><button class="btn btn-danger" onclick="resetRPS()">Reset</button>`;

  document.getElementById("flex-box-rps-div").innerHTML = `${humanDiv}${messageDiv}${botDiv}${resetButton}`;
};

const rpsReset = document.getElementById("flex-box-rps-div").innerHTML;

resetRPS = () => {
  console.log(rpsReset);
  document.getElementById("flex-box-rps-div").innerHTML = rpsReset;
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
