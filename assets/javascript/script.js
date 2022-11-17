// ========== ⬇ pseudo code ⬇ ==========
// ## Highest score: local storage
//     * user can enter name initial
//     * user can choose to clear
//     * shows on the upper left conner:"view highest scores"
//     * save up to 5 highest stores:
//         - sort the score and save the highest 5 ones
//         - arrange score from high to low, top down bottom
//         - associate the users with the scores
// ## timer: setInterval()
//     * on the upper right conner
//     * total time counts as seconds: 60s
//     * as user answering the quiz, time is counting down
//     * when times goes to 0 user cannot do quiz and get score
// ## code quiz
//     * show right or wrong under the choices with a divider after user's selection
//     * 10 questions with total 20 point, 2 points for each question
//     * when user chose an option will automatically jump to next question
//     * show current progress of how many questions left

// ========== ⬇ game area variables ⬇ ==========
var startQuiz = document.querySelector("#start-quiz");
var playQuiz = document.querySelector("#play-quiz");
var stopQuiz = document.querySelector("#stop-quiz");
var highScores = document.querySelector("#high-scores");
var timerSpan = document.querySelector("#timer");
var timeLeft = 60; // initial time to 60 seconds
var timer;

// ========== ⬇ high score display page variables ⬇ ==========
var viewHighScores = document.querySelector("#view-high-scores");
var quizHeader = document.querySelector(".quiz-header");
var quizQuestion = document.querySelector("#quiz-question");

// ========== ⬇ quiz game variables ⬇ ==========
var answerA = document.querySelector("#a");
var answerB = document.querySelector("#b");
var answerC = document.querySelector("#c");
var answerD = document.querySelector("#d");
var answerButtons = [answerA, answerB, answerC, answerD];
var resultDisplay = document.querySelector("#result-display");
var currentQuestion = 0;

// ========== ⬇ score variables ⬇ ==========
var score = 0;
var initials = "";
var nameScorePair = { name: "", score: 0 };
var scores =
  JSON.parse(localStorage.getItem("scores")) == null
    ? new Array(3).fill({ name: "", score: 0 })
    : JSON.parse(localStorage.getItem("scores"));

// ========== ⬇ high score display function ⬇ ==========
function displayHighScores() {
  highScores.style.display = "flex";
  startQuiz.style.display = "none";
  playQuiz.style.display = "none";
  stopQuiz.style.display = "none";
  // ------ check if already on high score page -------
  if (quizHeader.textContent == "👑 High Score Rank 👑") {
    return;
  }
  // ------ go back button ------
  var goBackBtn = document.querySelector("#go-back");
  goBackBtn.addEventListener("click", goBack);
  // ----- get rank list from HTML -----
  var top1 = document.querySelector("#top1");
  var top2 = document.querySelector("#top2");
  var top3 = document.querySelector("#top3");
  // ----- list will initially display as empty string when no input -----
  top1.textContent = "Name: " + scores[0].name + " Score: " + scores[0].score;
  top2.textContent = "Name: " + scores[1].name + " Score: " + scores[1].score;
  top3.textContent = "Name: " + scores[2].name + " Score: " + scores[2].score;
  return;
};

// ========== ⬇ clear score function ⬇ ==========
function clearScore() {
  var pressedOK = confirm(
    "Press \"OK\" to clear the existing scoreboard."
  );
  if (pressedOK) {
    scores = new Array(3).fill({ name: "", score: 0 });
    localStorage.setItem("scores", JSON.stringify(scores));
    displayHighScores();
  }
}

// ========== ⬇ go back to start game page ⬇ ==========
function goBack() {
  alert("You will be directed to home page");
  homePage();
}

// ========== ⬇ home page function ⬇ ==========
function homePage() {
  window.location.reload();
}

// ========== ⬇ start game function ⬇ ==========
//  ----- this function runs when user clicked "start quiz" button ----- 
function startGame() {
  startQuiz.style.display = "flex";
  playQuiz.style.display = "none";
  //  ----- shuffle the order of question array ----- 
  function shuffleQuestions() {
    for (var i = questions.length - 1; i > 0; i--) {
      var random = Math.floor(Math.random() * (i + 1));
      var popQuestions = questions[i];
      questions[i] = questions[random];
      questions[random] = popQuestions;
    }
  }
  shuffleQuestions();
  //  -----  Timer Function  ----- 
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerSpan.textContent = timeLeft.toString();
    } else {
      //  ----- if no time left, stop game ----- 
      clearInterval(timer);
      timerSpan.innerHTML = "0";
      stopGame();
    }
  }, 1000);
  playGame();
}

// ========== ⬇ play quiz game function ⬇ ==========

function playGame() {
  //  ----- display quiz page and hide other pages ----- 
  highScores.style.display = "none";
  startQuiz.style.display = "none";
  playQuiz.style.display = "flex";

  showNextQuestion();
  //  ----- if user choose to see score during game will need to confirm if abandon current game ----- 
  viewHighScores.addEventListener("click", abandonGame);

  //  ----- Get the ID of the answer button user clicked ----- 
  answerButtons.forEach((button) => {
    //  ----- when user clicked answer list button, trigger event ----- 
    button.addEventListener("click", function (e) {
      e.stopPropagation;
      var buttonId = e.target.id;
      var isCorrect = buttonId === questions[currentQuestion].answer;
      if (!isCorrect) {
        //  ----- if user answered wrong, deduct by 5 seconds and display "wrong" ----- 
        timeLeft = Math.max(timeLeft - 5, 0);
        resultDisplay.style.display="block";
        resultDisplay.innerHTML = "wrong";
        resultFadeOut(resultDisplay);
      } else {
        score += parseInt(100 / questions.length);
        resultDisplay.style.display="block";
        resultDisplay.innerHTML = "correct";
        resultFadeOut(resultDisplay);
      }
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showNextQuestion();
      } else {
        clearInterval(timer);
        timerSpan.innerHTML = "0";
        stopGame();
      }
    });
  });
}

// ========== ⬇ jump to next question ⬇ ==========
function showNextQuestion() {
  quizQuestion.textContent = questions[currentQuestion].prompt;
  answerA.textContent = "1. " + questions[currentQuestion].a;
  answerB.textContent = "2. " + questions[currentQuestion].b;
  answerC.textContent = "3. " + questions[currentQuestion].c;
  answerD.textContent = "4. " + questions[currentQuestion].d;
  return; 
}

// ========== ⬇ abandon game when user view score during game ⬇ ==========
function abandonGame() {
  //console.log("he");
  var pressedOK = confirm(
    "You will be directed to high scores rank list and lose the current progress"
  );
  if (pressedOK) {
    clearInterval(timer);
    timerSpan.innerHTML = "0";
    displayHighScores();
  } else {
    console.log("pressed Cancel");
    return false;
    // 目前点了cancel还是会跳转分数页面，同时倒计时为0后出现stopGame页面
  }
}

// ========== ⬇ fade out result display ⬇ ==========
function resultFadeOut(element) {
  setTimeout(() => {
    element.style.display="none";
  }, 2000);
}

// ========== ⬇ end of game variables ⬇ ==========
var finalScoreP = document.querySelector("#final-score-p");
var enterNameSpan = document.querySelector("#enter-name-span");

// ========== ⬇ end of game function ⬇ ==========
function stopGame() {
  var userScore = document.querySelector("#user-score");
  var saveBtn = document.querySelector("#save-button");

  startQuiz.style.display = "none";
  playQuiz.style.display = "none";
  stopQuiz.style.display = "flex";
  viewHighScores.style.display = "none";
  userScore.textContent = score;

    //  ----- check user's input for name initials ----- 
  saveBtn.addEventListener("click", function () {

    initials = document.querySelector("#name-input").value;
    // console.log(initials);

    var letterBank = "ABCDEFGHIJKLMNOPQURSTUVWXYZ";
    if (initialValidate(letterBank,initials) && initials.length === 2) {
      nameScorePair.name = initials.toUpperCase("");
    } else {
      alert("Please enter 2 letters for your name initials")
      return;
    }

    nameScorePair.score = parseInt(userScore.textContent);
    scores.push(nameScorePair); //add new element to the array
    scores.sort(compareFn); //sort the array with the defined compareFn function
    scores = scores.slice(0, 3); //obtain only the first 3 elements
    localStorage.setItem("scores", JSON.stringify(scores)); //store to local storage
    displayHighScores(); //display high scores page
  });
  score = 0;
  return;
}

// ========== ⬇ initial validate function⬇ ==========
function initialValidate(bank, initial) {
  var arr_substr = initial.toUpperCase().split('');
  for (each of arr_substr) {
    if (!bank.includes(each)) {
      return false;
    }
  }
  return true;
}
// ========== ⬇ compare score function ⬇ ==========
function compareFn(a, b) {
  return b.score - a.score;
}