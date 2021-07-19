let scoreList = JSON.parse(localStorage.getItem("scoreList"));
let orderedList = document.querySelector("#score-list");

function sortScores() {
    scoreList.sort((a, b) => (a.score < b.score) ? 1 : (a.score === b.score) ? ((a.initials > b.initials) ? 1 : -1) : -1);
}

function renderScores() {
    if (scoreList !== null) {
        console.log("valid entry");
        console.log(scoreList);
    } else {
        console.log("Empty List");
    }
    for (i=0; i<scoreList.length; i++) {
        let li = document.createElement("li")
        li.textContent = scoreList[i].initials + " - " + scoreList[i].score;
        orderedList.appendChild(li);
    } 
}

function resetScores() {

    clearStorage();
    renderScores();
}


// Event listeners to Reset Scores or Go Back buttons

// Reset


// Go Back

sortScores();
renderScores();