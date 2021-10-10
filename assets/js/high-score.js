const mainHighScorePage = document.querySelector(
  ".full-high-score-list-container"
);

function constructHighScoreList() {
  //create a div container

  const div = document.createElement("div");
  div.setAttribute("class", "high-score-list-container");

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

    mainHighScorePage.append(div);
  }

  return div;
}

constructHighScoreList();
