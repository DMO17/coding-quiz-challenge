const mainPage = document.querySelector(".main-page");
const starterDiv = document.querySelector(".start-quiz-container");
const startQuizBtn = document.querySelector(".start-btn");
const counterDisplay = document.querySelector("#countdown");

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
];

// current question identifier

let currentQuestion = 0; //rename

// setting up a timer function
let count = 30;

function countDownTimer() {
  const timer = setInterval(startCountDown, 1000);

  function startCountDown() {
    if (count < 0) {
      clearInterval(timer);
      console.log("renderGameOver"); //function;

      highScoreFormPage();
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

  quizQuestion.textContent = questionAndAnswers[currentQuestion].question;

  div.append(quizQuestion, constructBtnDiv());

  div.addEventListener("click", verifyAnswer);

  mainPage.append(div);
}

// construct quiz high score form page

function submitHighScoreForm() {
  // form element
  const form = document.createElement("form");
  form.setAttribute("action", "/action_page.php");
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
  inputName.setAttribute("value", ""); /// value???????????????

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

  return mainPage;
}

// set up a local storage for scoring tally for each quiz attempt
//
//
//
//

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

  //if else statement

  if (correctAnswer !== userAnswer) {
    count -= 10;
    console.log("answer is incorrect");
  } else {
    console.log(`answer is correct`);
  }

  currentQuestion += 1;

  if (currentQuestion < questionAndAnswers.length) {
    quizQuestionCards.remove();
    renderQuestion();
  } else {
    quizQuestionCards.remove();
    highScoreFormPage();
  }
}

// pause timer to lock in score time
function recordScoreTime(event) {}

// store scores and initials in local storage

// create high score page
