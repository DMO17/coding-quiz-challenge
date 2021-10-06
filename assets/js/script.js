const mainPage = document.querySelector(".main-page");

//set upp an event listner attached to the starterDiv to remove the page and start the timer when the button is clicked

starterDiv.addEventListener("click", startBtn);

function startBtn(event) {
  const starterDiv = document.querySelector(".start-quiz-container");
  const target = event.target;

  if (target.getAttribute("class") === "start-btn") {
    starterDiv.remove();
  }
}
