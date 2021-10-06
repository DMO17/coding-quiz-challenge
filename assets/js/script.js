const mainPage = document.querySelector(".main-page");
const starterDiv = document.querySelector(".start-quiz-container");

const questionAndAnswers = {};

//set upp an event listener attached to the starterDiv to remove the page

starterDiv.addEventListener("click", startBtn);

function startBtn(event) {
  const target = event.target;

  if (target.getAttribute("class") === "start-btn") {
    starterDiv.remove();
  }
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
