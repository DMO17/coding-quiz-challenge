const mainPage = document.querySelector(".main-page");
const starterDiv = document.querySelector(".start-quiz-container");
const startQuizBtn = document.querySelector(".start-btn");
const counterDisplay = document.querySelector("#countdown");

// list of the question and answers of the quiz
const questionAndAnswers = [
  {
    question: "Question 1",
    options: ["answer 1", "answer 2", "answer 3", "answer 4"],
    answer: "answer 3",
  },

  {
    question: "Question 2",
    options: ["answer 1", "answer 2", "answer 3", "answer 4"],
    answer: "answer 1",
  },
  {
    question: "Question 3",
    options: ["answer 1", "answer 2", "answer 3", "answer 4"],
    answer: "answer 4",
  },
];

// current question identifier

let currentQuestion = 0; //rename

// setting up a timer function
let count = 20;

function countDownTimer() {
  const timer = setInterval(startCountDown, 1000);

  function startCountDown() {
    if (count < 0) {
      clearInterval(timer);
      console.log("renderGameOver"); //function;
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

// declare verify answer function

function verifyAnswer(event) {
  //target
  const target = event.target;

  //current target
  const currentTarget = event.currentTarget;

  const correctAnswer = currentTarget.getAttribute("data-main");
  const userAnswer = currentTarget.getAttribute("data-message");

  //if else statement

  if (correctAnswer !== userAnswer) {
    count -= 5;
  }

  currentQuestion += 1;

  if (currentQuestion < questionAndAnswers.length) {
    document.querySelector(".questionCard").remove();

    renderQuestion();
  } else {
    console.log("render score form ");
  }
}

//set upp an event listener attached to the starterDiv to remove the page when button is clicked and the timer starts

startQuizBtn.addEventListener("click", startQuiz);

function startQuiz(event) {
  starterDiv.remove();
  countDownTimer();
  renderQuestion();
}

// get questions
// get answers
//refactor interms of names
// css style your code
