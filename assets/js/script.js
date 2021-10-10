const mainPage = document.querySelector(".main-page");
const starterDiv = document.querySelector(".start-quiz-container");
const startQuizBtn = document.querySelector(".start-btn");
const counterDisplay = document.querySelector("#countdown");
const redirectHighScoreLink = document.querySelector(".high-score-link");

// list of the question and answers of the quiz
const questionAndAnswers = [
  {
    question: "Commonly used data types DO NOT include:",
    options: ["1) strings", "2) booleans", "3) alerts", "4) numbers"],
    answer: "3) alerts",
  },

  {
    question:
      "The condition in an if / else statement is enclosed within _____",
    options: [
      "1) parentheses",
      "2) quotes",
      "3) square brackets",
      "4) curly brackets",
    ],
    answer: "1) parentheses",
  },
  {
    question: "Arrays in javascript can be used to store _____",
    options: [
      "1) numbers and strings",
      "2) multiple arrays and functions",
      "3) objects and booleans",
      "4) all of the above",
    ],
    answer: "4) all of the above",
  },
  {
    question:
      "String Values must be enclosed within _____ when being assigned to variables",
    options: ["1) commas", "2) curly brackets", "3) quotes", "4) parentheses"],
    answer: "1) commas",
  },
  {
    question:
      "A very useful tool to use during development and debugging for printing content to debugger is:",
    options: [
      "1) javascript",
      "2) console.log",
      "3) loops",
      "4) terminal/bash",
    ],
    answer: "2) console.log",
  },
];

// current question identifier index

let currentQuestion = 0; //rename

// setting up the start timer countdown function
let timer;
let count = 50;

function countDownTimer() {
  timer = setInterval(startCountDown, 1000);

  function startCountDown() {
    if (count < 0) {
      clearInterval(timer);
      counterDisplay.textContent = 0;
      renderGameOver();

      // console.log("renderGameOver"); //function;
    } else {
      counterDisplay.textContent = count;
      count -= 1;
    }
  }
}

// construct a div that contains the answers options template
function constructBtnDiv() {
  const div = document.createElement("div");
  div.setAttribute("class", "options-container");

  for (let i = 0; i < questionAndAnswers[currentQuestion].options.length; i++) {
    const buttons = document.createElement("button");

    buttons.setAttribute("class", "options");

    buttons.setAttribute(
      "data-message",
      questionAndAnswers[currentQuestion].options[i]
    );

    buttons.textContent = questionAndAnswers[currentQuestion].options[i];

    div.append(buttons);
  }
  return div;
}

// construct a full questions card function

function renderQuestion() {
  const div = document.createElement("div");
  div.setAttribute("class", "questionCard");
  div.setAttribute("data-main", questionAndAnswers[currentQuestion].answer);

  const quizQuestion = document.createElement("h2");
  quizQuestion.setAttribute("class", "questionCardTitle");

  quizQuestion.textContent = questionAndAnswers[currentQuestion].question;

  div.append(constructBtnDiv());

  div.addEventListener("click", verifyAnswer);

  mainPage.append(quizQuestion, div);
}

// render game over and present high score page when time is 0
function renderGameOver() {
  // storing quiz question cards as a variable
  const quizQuestionCards = document.querySelector(".questionCard");
  const questionTitles = document.querySelector(".questionCardTitle");

  questionTitles.remove();
  quizQuestionCards.remove();
  highScoreFormPage();
}

// construct quiz high score form page

function submitHighScoreForm() {
  // form element
  const form = document.createElement("form");
  form.setAttribute("class", "player-score-form");

  // label element
  const labelName = document.createElement("label");
  labelName.setAttribute("for", "player-name");
  labelName.textContent = "Player Initials";

  // input element
  const inputName = document.createElement("input");
  inputName.setAttribute("id", "player-name");
  inputName.setAttribute("type", "text");
  inputName.setAttribute("name", "player-name");
  inputName.setAttribute("value", "");

  //submit element
  const submitInput = document.createElement("input");
  submitInput.setAttribute("type", "submit");
  submitInput.setAttribute("value", "Submit");
  submitInput.setAttribute("id", "submit-btn");

  // append label, input and submit input to form

  form.append(labelName, inputName, submitInput);

  return form;
}

function highScoreFormPage() {
  const div = document.createElement("div");
  div.setAttribute("class", "score-form-container");

  const h2 = document.createElement("h2");
  h2.textContent = "QUIZ COMPLETE";

  div.append(h2, submitHighScoreForm());

  mainPage.append(div);

  const submitPlayerDetails = document.querySelector("#submit-btn");

  submitPlayerDetails.addEventListener("click", storingHighScores);

  return mainPage;
}

// constructing the high scores list

function constructHighScoreList() {
  //create a div container

  const div = document.createElement("div");
  div.setAttribute("class", "high-score-list-container");

  // create main score header

  const h1 = document.createElement("h1");
  h1.textContent = "HIGH SCORE LIST";

  //create an unordered list

  const highScoreList = document.createElement("ul");
  highScoreList.setAttribute("class", "hs-ol-list");

  const extractData = JSON.parse(localStorage.getItem("highScores"));

  for (let i = 0; i < extractData.length; i++) {
    //get data from storage

    const individualHighScores = document.createElement("li");

    individualHighScores.setAttribute("class", "individual-scores");

    individualHighScores.textContent = ` ${extractData[i].name} : ${extractData[i].count}`;

    highScoreList.append(individualHighScores);

    div.append(highScoreList);

    mainPage.append(h1, div);
  }

  return div;
}

//set upp an event listener attached to the starterDiv to remove the page when button is clicked and the timer starts

startQuizBtn.addEventListener("click", startQuiz);

function startQuiz(event) {
  starterDiv.remove();
  countDownTimer();
  renderQuestion();
}

// declare verify answer function

function verifyAnswer(event) {
  //target
  const target = event.target;

  //current target
  const currentTarget = event.currentTarget;

  // matching answers and options
  const correctAnswer = currentTarget.getAttribute("data-main");
  const userAnswer = target.getAttribute("data-message");

  // storing quiz question cards as a variable
  const quizQuestionCards = document.querySelector(".questionCard");
  const questionTitles = document.querySelector(".questionCardTitle");

  //if else statement to match answers and user option
  if (correctAnswer !== userAnswer) {
    count -= 10;
    console.log("answer is incorrect", userAnswer);
  } else {
    console.log(`answer is correct`, correctAnswer);
  }

  currentQuestion += 1;

  if (currentQuestion < questionAndAnswers.length) {
    questionTitles.remove();
    quizQuestionCards.remove();
    renderQuestion();
  } else {
    clearInterval(timer);
    questionTitles.remove();
    quizQuestionCards.remove();
    highScoreFormPage();
  }
}

// store scores and initials in local storage

function storingHighScores(event) {
  let name = document.querySelector("#player-name").value;

  let score = count <= 0 ? 0 : count;

  //get from LS
  const highScoreDataFromLS =
    JSON.parse(localStorage.getItem("highScores")) ?? [];

  const playersDetails = {
    name: name,
    count: score,
  };

  highScoreDataFromLS.push(playersDetails);

  // set in LS
  const convertToLSData = JSON.stringify(highScoreDataFromLS);
  localStorage.setItem("highScores", convertToLSData);
}

// redirect to the high score URL
redirectHighScoreLink.addEventListener("click", highScorePage);

function highScorePage(event) {
  location.assign("/high-score.html");
}
