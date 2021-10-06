const mainPage = document.querySelector(".main-page");
const starterDiv = document.querySelector(".start-quiz-container");
const startQuizBtn = document.querySelector(".start-btn");
const counterDisplay = document.querySelector("#countdown");

// list of the question and answers of the quiz
const questionAndAnswers = [
  {
    question: "Question 1",
    options: [" Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    answer: "Answer 3",
  },

  {
    question: "Question 2",
    options: [" Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    answer: "Answer 1",
  },
];

// setting up a timer function
let count = 20;

function countDownTimer() {
  const timer = setInterval(startCountDown, 1000);

  function startCountDown() {
    if (count === 0) {
      clearInterval(timer);
    } else {
      counterDisplay.textContent = count;
      count -= 1;
    }
  }
}

//set upp an event listener attached to the starterDiv to remove the page when button is clicked and the timer starts

startQuizBtn.addEventListener("click", startQuiz);

function startQuiz(event) {
  starterDiv.remove();
  countDownTimer();
}

// testing html question card for answer validation using console.log

const divBox = document.querySelector(".question-1");

divBox.addEventListener("click", onClick);

function onClick(event) {
  const target = event.target;
  const currentTarget = event.currentTarget;

  if (target.getAttribute("class") === "options") {
    const dataText = target.getAttribute("data-message");
    const dataMessage = currentTarget.getAttribute("data-main");

    if (dataText === dataMessage) {
      console.log("correct answer");
      divBox.remove();
    } else {
      console.log("incorrect answer");
      divBox.remove();
    }
  }
}

function constructBtnDiv() {
  const div = document.createElement("div");
  div.setAttribute("class", "");
}
function renderQuestion() {}
