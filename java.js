var timeRem = document.querySelector(".timeremaining");
var questionsElement = document.querySelector(".questions-rendered");

var secondsRemaining = 60;
var penaltySec = 15;
var timerInterval;
var numberCorrect = 0;
var questionIn = 0;
var highscore;
var highScoresArray = [];
var score;

var startButt = document.getElementById("start");
var viewScoreButt = document.getElementById("viewScores");
var initialSpot = document.getElementById("initialsDiv");
var scoreSpot = document.getElementById("scoresDiv");

function setTime() {
    timerInterval = setInterval(function () {
        secondsRemaining--;
        timeRem.textContent = "Time Remaining: " + secondsRemaining;
        if (secondsRemaining === 0) {
            finish();
        }
    }, 1000);
}

function finish() {
    clearInterval(timerInterval);
    secondsRemaining = 0;
    document.querySelector(".timeremaining").innerHTML = "You completed the hardest quiz of your life!";
    questionsElement.textContent = "";
    score = numberCorrect * (100 / questions.length);
    document.getElementById("choice-response").innerHTML = "Your final score is: " + score;
    initialSpot.style.display = "block";
    document.getElementById("myInitials").value = "";
}

function getInitials() {
    if (highScoresArray.length === 0) {
        highscore = document.getElementById("myInitials").value + " - " + score;
    } else {
        highscore = " " + document.getElementById("myInitials").value + " - " + score;
    }
    highScoresArray.push(highscore);
    initialSpot.style.display = "none";
    document.querySelector(".timeremaining").innerHTML = "High Scores";
    document.getElementById("choice-response").innerHTML = highScoresArray;
    scoreSpot.style.display = "block";
}

function startOver() {
    document.getElementById("choice-response").innerHTML = "";
    scoreSpot.style.display = "none";
    timeRem.textContent = "Time Remaining: 0";
    startButt.style.display = "initial";
    viewScoreButt.style.display = "initial";
    document.getElementById("instructions").innerHTML + "Let's see if you can pass!"
}

function viewScore() {
    if (highScoresArray.length === 0) {
        document.getElementById("choice-response").innerHTML = "No Scores: ";
    } else {
        document.getElementById("choice-response").innerHTML = "High Scores: " + highScoresArray;
    }
}

function clearScore() {
    highScoresArray = [];
    document.getElementById("choice-response").innerHTML = highScoresArray;
}

startButt.addEventListener("click", function () {
    secondsRemaining = 60;
    setTime();

    numberCorrect = 0;
    questionIn = 0;

    startButt.style.display = "none";
    viewScoreButt.style.display = "none";

    document.getElementById("choice-response").innerHTML = "";
    document.getElementById("instructions").innerHTML = "";

    displayQuestions();
});

function displayQuestions() {
    if (secondsRemaining <= 0 || questionIn >= questions.length) {
        finish();
        return;
    }
    questionsElement.textContent = "";

    var questionQuest = questions[questionIn];
    var questionDiv = document.createElement("div");
    var questionText = document.createElement("p");

    questionText.textContent = questionQuest.title;

    questionDiv.appendChild(questionText);

    for (i = 0; i < questionQuest.choices.length; i++) {
        var option = document.createElement("button");

        option.textContent = questionQuest.choices[i];

        
        option.setAttribute("class", "option");

        option.addEventListener("click", function (e) {
            var optionClicked = e.target.innerHTML;
            if (optionClicked === questions[questionIn].answer) {
                numberCorrect++;
                document.getElementById("choice-response").innerHTML = "Correct!";
                displayQuestions(questionIn++);
            } else {
                secondsRemaining = secondsRemaining - penaltySec;
                document.getElementById("choice-response").innerHTML = "Wrong!";
                displayQuestions(questionIn++);
            }
        });
        questionDiv.appendChild(option);
    }
    questionsElement.appendChild(questionDiv);
}