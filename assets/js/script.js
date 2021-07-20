// Global Variablss
let countdown = document.getElementById("time-left");
let gameBox = document.getElementById("game-box");
let feedback = document.getElementById("feedback")
let currentQuest = 0;
let endDetect = false;
let currentOptions = [];
let timeLeft = 100;
let scoreList = [];
const contentArray = [
    quest1 = {
        question: "How many data-types are there?",
        options: ["1", "4", "5", "6"],
        answer: 3
    },
    quest2 = {
        question: "What are listed inside the parentheses () in the function definition?",
        options: ["arguments", "values", "parameters", "variables"],
        answer: 2
    },
    quest3 = {
        question: "Presented with: const car = {make: 'Ford', model: 'Mustang', year: '1987'} How would you access 'Ford'?", 
        options: ["make", "car['make']", "car.make", "2 or 3"],
        answer: 3
    }, 
    quest4 = {
        question: "const dogs = ['lab', 'yorkie', 'border collie', 'great dane']  What would dogs.pop() be and example of?",
        options: ["method", "variable", "attribute", "array"],
        answer: 0
    }, 
    quest5 = {
        question: "How can I return a random integer from 0 to 9?", 
        options: ["Math.random(9)", "Math.floor(Math.random() * 10)", "Math.floor(Math.random(9))", "Math.floor(10)"],
        answer: 1
    }, 
    quest6 = {
        question: "let x = '5'; if (x === 5) {return true} else {return false}; What will be returned?",
        options: ["true", "false"],
        answer: 1
    }, 
    quest7 = {
        question: "What does the reverse() method do?",
        options: ["returns the value multiplied by (-1)", "returns the last item of an array", "reverses the elements in an array", "runs the loop in reverse order"],
        answer: 2
    },
    quest8 = {
        question: "What does getTime() return?", 
        options: ["The current local time of the PC?", "The GMT time?", "The number of millisconds since January 1, 1970"],
        answer: 2
    },
    quest9 = {
        question: "I can access any HTML element in the DOM using javascript.",
        options: ["True", "False"],
        answer: 0
    },
    quest10 = {
        question: "A 'var' and 'let' declaration are equivalent.",
        options: ["True", "False"],
        answer: 1
    }
];


// -----------------<>------------------//
// Functions

// Main loop to keep track of timer
function kickOff() {
    countdown.innerHTML = timeLeft;
    let timeInterval = setInterval(function() {
        if (endDetect == false) {
            timeLeft--;
            countdown.innerHTML = timeLeft;
            if (timeLeft == 0) {
                clearInterval(timeInterval);
                timeExpired();
            }
        } else {
            countdown.innerHTML = timeLeft;
            clearInterval(timeInterval);
            setTimeout(function() {}, 1000);
            postQuiz();
        }
    }, 1000);
};

// Function to pull up screen to enter initials if quiz completed prior to time running out
function postQuiz() {
    clearBox();
    let endTitle = document.createElement("H2");
    endTitle.innerHTML = "All Done!"
    gameBox.appendChild(endTitle);
    let finalScoreStatment = document.createElement("p");
    finalScoreStatment.innerHTML = "Your final score: " + timeLeft;
    gameBox.appendChild(finalScoreStatment);
    
    //Creating the Form submission for Initials
    let form = document.createElement("form");
    form.setAttribute("method", "POST");

    let initials = document.createElement("input");
    initials.setAttribute("type", "text");
    let label = document.createElement("label");
    label.setAttribute("for", "initials");
    label.innerHTML = "Enter your Initials: ";
    let input = document.createElement("input");
    input.setAttribute("type", "submit");
    input.setAttribute("class", "submit-button")

    form.appendChild(label);
    form.appendChild(initials);
    form.appendChild(input);
    gameBox.appendChild(form);

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let enteredIn = initials.value.trim();
        if (enteredIn === "") {
            window.alert("Please don't try to break me. Enter initials only. (-5 points)");
            timeLeft -= 5;
            postQuiz();
            return;
        } else {
            storeScore(timeLeft, enteredIn);
            location.href = "././highscores.html";
        }
    });
};

// Function to store the high score and entered initials
function storeScore(s, i) {
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));
    if (storedScoreList !== null){
        scoreList = storedScoreList;
    }
    let newEntry = {
        score: s,
        initials: i
    };
    scoreList.push(newEntry);
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

// Function called if time runs out (Lose with no score)
function timeExpired() {
    clearBox();
    let lossStatement = document.createElement("H2");
    lossStatement.innerHTML = "Sorry, you need to go back and study... This course might not be for you."
    gameBox.appendChild(lossStatement);
    let button = document.createElement("button");
    button.setAttribute("class", "try-again");
    button.innerHTML = "Try Again";
    gameBox.appendChild(button);
    button.addEventListener("click", function(){
        location.href = "././index.html";
    });
};

// Function called if correct answer is chosen
function correctChoice() {
    currentQuest++;
    feedback.innerHTML = "Correct!";
    setTimeout(function() {
        feedback.innerHTML = "";
    }, 1750);
    if (currentQuest < contentArray.length){
        loadQuestion(currentQuest);
    } else (
        endDetect = true
    )
};

// Function called if incorrect answer is chosen
function incorrectChoice() {
    currentQuest++;
    feedback.innerHTML = "Wrong...That cost you 10 seconds";
    setTimeout(function() {
        feedback.innerHTML = "";
    }, 1750);
    timeLeft -= 10; 
    if (currentQuest < contentArray.length){
        loadQuestion(currentQuest);
    } else (
        endDetect = true
    )
};

// Function called when start game button is clicked
function startGame() {
    clearBox();
    kickOff();
    loadQuestion(currentQuest);
};

// Clears the div for new content to be added
function clearBox() {
    document.getElementById("game-box").innerHTML = "";
};

// Render question and options
function loadQuestion(index) {
    clearBox();
    let quest = document.createElement("H2");
    quest.innerHTML = contentArray[index].question;
    gameBox.appendChild(quest);
    let choiceBox = document.createElement("ol");
    gameBox.appendChild(choiceBox);

    // Render the answer options    
    for (i=0; i< contentArray[index].options.length; i++) {
        let selection = contentArray[index].options[i];
        
        let li = document.createElement("li");
        li.classList.add("choice");
        li.textContent = selection;

        if (i == contentArray[index].answer) {
            li.setAttribute("data-solution", "ans");
        }
        gameBox.childNodes[1].appendChild(li);
    }

    // Add Event listener to list items (has to be done within the function as the element was created here)
    gameBox.childNodes[1].addEventListener("click", function(event) {
        let element = event.target;
    
        if (element.matches("li") === true) {
            let check = element.getAttribute("data-solution");
            if (check == "ans") {
                correctChoice();
            } else {
                incorrectChoice();
            }
        }
    });
};

// -----------------<>------------------//
// Event listeners

document.getElementById("start-btn").addEventListener("click", startGame);




