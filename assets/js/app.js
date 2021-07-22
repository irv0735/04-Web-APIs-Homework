let scoreList = JSON.parse(localStorage.getItem("scoreList"));
let orderedList = document.querySelector("#score-list");

/**
 * Sorts the scores that are in local storage
 * @author Nate Irvin <nathan.a.irvin@gmail.com>
 */
function sortScores() {
    scoreList.sort((a, b) => (a.score < b.score) ? 1 : (a.score === b.score) ? ((a.initials > b.initials) ? 1 : -1) : -1);
}

/**
 * Renders the scores in the ordered list item
 * @author Nate Irvin <nathan.a.irvin@gmail.com>
 */
function renderScores() {
    if (scoreList !== null) {
        sortScores();
        for (i=0; i<scoreList.length; i++) {
            let li = document.createElement("li");
            li.setAttribute("class", "highscore-li");
            li.textContent = scoreList[i].initials + " - " + scoreList[i].score;
            orderedList.appendChild(li);
        } 
    } else {
        document.getElementById("score-list").innerHTML = "";
    }
}

/**
 * Resets the scores, clearing local storage
 * @author Nate Irvin <nathan.a.irvin@gmail.com>
 */
function resetScores() {
    localStorage.clear();
    scoreList = null;
    renderScores();
}


// Event listeners for the Start-Over and Reset Buttons
document.getElementById("start-over").addEventListener("click", function(){
    location.href = "././index.html";
});


document.getElementById("reset").addEventListener("click", function(){
    resetScores();
});



// Renders the scores when the page is loaded. 
renderScores();