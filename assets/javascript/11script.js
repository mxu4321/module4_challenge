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

// ========== ⬇ high score related variables ⬇ ==========
var viewHighScores = document.querySelector("#view-high-scores");
var quizHeader = document.querySelector(".quiz-header");
var mainQuizBody = document.querySelector(".quiz-game");
var quizQuestion = document.querySelector("#quiz-question");
var quizDescription = document.querySelector("#quiz-description");
var quizStartButton = document.querySelector("#quiz-button");

var answerList = document.querySelector(".answer-list"); //
var answerA = document.querySelector("#a");
var answerB = document.querySelector("#b");
var answerC = document.querySelector("#c");
var answerD = document.querySelector("#d");
var answerButtons = [answerA, answerB, answerC, answerD];
var resultDisplay = document.querySelector("#result-display");

var currentQuestion = 0;
// ========== ⬇ score variables ⬇ ==========
var score = 0;
// var score;
var initials = "";
var nameScorePair = {};
// var scores = {};

// ========== ⬇ high score display function ⬇ ==========
function displayHighScores() {
  // 💡TODO： 需要添加其他所有div情况⬇
  // highScores.style.display = "flex";
  var pressedOK = confirm(
    "You will be directed to high scores rank list and lose current progress"
  );
  if (pressedOK) {
    // displayHighScores();
    highScores.style.display = "flex";
    startQuiz.style.display = "none";
    playQuiz.style.display = "none";
    stopQuiz.style.display = "none";
    // ------ check if already on high score page -------
    if (quizHeader.textContent == "👑 High Score Rank 👑") {
      return;
    }
    // quizHeader.textContent = "👑 High Score Rank 👑";
    // ----- get score rank list -----
    var scoreRankList = document.querySelector("#score-rank-list");
    var top1 = document.querySelector("li");
    var top2 = document.querySelector("li");
    var top3 = document.querySelector("li");
    // ----- list will initially display as empty string when no input -----
    top1.textContent = "";
    top2.textContent = "";
    top3.textContent = "";
  } else {
    return;
  }
  // highScores.style.display = "flex";
  // startQuiz.style.display = "none";
  // playQuiz.style.display = "none";
  // stopQuiz.style.display = "none";
  // // ------ check if already on high score page -------
  // if (quizHeader.textContent == "👑 High Score Rank 👑") {
  //   return;
  // }
  // // quizHeader.textContent = "👑 High Score Rank 👑";
  // // ----- get score rank list -----
  // var scoreRankList = document.querySelector("#score-rank-list");
  // var top1 = document.querySelector("li");
  // var top2 = document.querySelector("li");
  // var top3 = document.querySelector("li");
  // // ----- list will initially display as empty string when no input -----
  // top1.textContent = "";
  // top2.textContent = "";
  // top3.textContent = "";
}

// ========== ⬇ -- ⬇ ==========
function goBack() {
  //  ⚠️目前go back是回到主页⬇
  alert("You will be directed to home page");
  startQuiz.style.display = "flex";
  highScores.style.display = "none";
  playQuiz.style.display = "none";
  clearInterval(timer);
  timerSpan.innerHTML = 60;
  timeLeft = 60;
}
// ⚠️目前做题一半离开后，再重新开始，题目为当前未完成的剩余数量
// 如果去看score，这一次的结果就作废，stopGame
// ========== ⬇ -- ⬇ ==========
var goBackBtn = document.querySelector("#go-back");
goBackBtn.addEventListener("click", goBack);

// ----- get clear score button & function -----
var clearScoreBtn = document.querySelector("clear-score");
clearScoreBtn.addEventListener("click", function () {
  clearScore(); // TODO: declare function
});

// function goBack() {
//   alert("You will be directed to the start quiz page");
//   // to-do: game home page & function needed
// }
// to-do: add save score to local & load score to call displayHighScore()
// ========== ⬇ timer variables ⬇ ==========
// var timerSpan = document.querySelector("#timer");
var timeLeft = 60; // initial time to 60 seconds
// var countdown;
// ----------- Timer Function -----------
// function timer () {
//   setInterval(() => {
//     timeLeft--;
//     timerSpan.textContent = timeLeft.toString();
//   }, 1000);
//   //   var countdown = setInterval(timer(), 1000);
//   // if left time === 0, stop game
//   if (timeLeft === 0) { //⚠️ 目前无效,时间到0会继续倒计时为负数
//     clearInterval(timer);
//     timerSpan.innerHTML = "0";
//     stopGame();
//   }
// }

// ========== ⬇ start game function ⬇ ==========
// var currentQuestion = 0;
// this function runs when user clicked "start quiz" button
function startGame() {
  // shuffle the order of question array
  function shuffleQuestions() {
    for (var i = questions.length - 1; i > 0; i--) {
      var random = Math.floor(Math.random() * (i + 1));
      var popQuestions = questions[i]; //⚠️
      questions[i] = questions[random]; //⚠️
      questions[random] = popQuestions; //⚠️
    }
  }
  shuffleQuestions();
  // ----------- Timer Function -----------
  // timer();
  timer = setInterval(() => {
    timeLeft--;
    timerSpan.textContent = timeLeft.toString();

    if (timeLeft <= 0) {
      //⚠️ 目前无效,时间到0会继续倒计时为负数
      clearInterval(timer);
      timerSpan.innerHTML = "0";
      stopGame();
    }
  }, 1000);
  //   var countdown = setInterval(timer(), 1000);
  // if left time === 0, stop game

  playGame();
}

// ========== ⬇ quiz game variables ⬇ ==========
// var answerList = document.querySelector(".answer-list"); //
// var answerA = document.querySelector("#a");
// var answerB = document.querySelector("#b");
// var answerC = document.querySelector("#c");
// var answerD = document.querySelector("#d");
// var answerButtons = [answerA, answerB, answerC, answerD];
// var resultDisplay = document.querySelector("#result-display");

// ========== ⬇ jump to next question ⬇ ==========
function showNextQuestion() {
  // var currentQuestion = 0;
  // quizQuestion.textContent = questions[currentQuestion].prompt;
  quizQuestion.textContent = questions[currentQuestion].prompt;
  answerA.textContent = "1. " + questions[currentQuestion].a;
  answerB.textContent = "2. " + questions[currentQuestion].b;
  answerC.textContent = "3. " + questions[currentQuestion].c;
  answerD.textContent = "4. " + questions[currentQuestion].d;

  // add option to quiz game body
  // answerList.append(answerA, answerB, answerC, answerD);
  // mainQuizBody.append(answerList, resultDisplay);
  //console.log("ShowingNextQuestion");
  return; //Luis
}

// ========== ⬇ play quiz game function ⬇ ==========
// 想再加一个while playgame, click view-high-score will trigger confirm"you will lost your current progress"
function playGame() {
  // display quiz page and hide other pages
  highScores.style.display = "none";
  startQuiz.style.display = "none";
  playQuiz.style.display = "flex";

  showNextQuestion();

  // Get the ID of the answer button user clicked
  // ⚠️目前这个条件可能没有被完全执行
  answerButtons.forEach((button) => {
    // when user clicked answer list button, trigger event
    button.addEventListener("click", function (e) {
      var buttonId = e.target.id;
      var isCorrect = buttonId === questions[currentQuestion].answer;
      if (!isCorrect) {
        // if user answered wrong, deduct by 5 seconds and display "wrong"
        timeLeft = Math.max(timeLeft - 5, 0); //目前在最后一题不管用//Luis
        resultDisplay.innerHTML = "wrong";
        resultFadeOut();
      } else {
        score += Math.round(100 / questions.length);
        resultDisplay.innerHTML = "correct";
        resultFadeOut();
      }
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showNextQuestion();
      } else {
        clearInterval(timer);
        timerSpan.innerHTML = "0";
        stopGame();
      }
      //   需要加个if条件判断是否所有题目都答完了 Luis
    });
  });

  // ------ abandon game when user view score during game ------
  // viewHighScores.addEventListener("click", function () {
  //   var pressedOK = confirm(
  //     "You will be directed to high scores rank list and lose current progress"
  //   );
  //   if (pressedOK) {
  //     displayHighScores();
  //   } else {
  //     return;
  //   } // even clicked cancel will jump to view high scores
  // });
}
function high() {
  console.log("he");
  var pressedOK = confirm(
    "You will be directed to high scores rank list and lose current progress"
  );
  if (pressedOK) {
    displayHighScores();
  } else {
    return;
  } // even clicked cancel will jump to view high scores
}

viewHighScores.addEventListener("click", high);

// ========== ⬇ fade out result display ⬇ ==========
function resultFadeOut() {
  var resultTimer = setInterval(function () {
    resultDisplay.remove();
  }, 2000);
  // stop the remove() after 2s
  clearInterval(resultTimer);
}

// ========== ⬇ end of game variables ⬇ ==========
var questionNumber = questions.length; //曾经放在playGame()之前
var finalScoreP = document.querySelector("#final-score-p");
// finalScoreP.id = "final-score-p";
var userScore = document.querySelector("#user-score");
// userScore.id = "user-score";
var enterNameSpan = document.querySelector("#enter-name-span");
// enterNameSpan.id = "enter-name-span";
// enterNameSpan.textContent = "Enter your name initials: "; //⚠️需加判断：是否为initials
var nameInput = document.querySelector("#name-input");
// nameInput.id = "name-input";
var saveBtn = document.querySelector("#save-button");
// saveBtn.id = "save-button";
// ========== ⬇ end of game function ⬇ ==========
function stopGame() {
  // highScores.style.display = "none";
  startQuiz.style.display = "none";
  playQuiz.style.display = "none";
  stopQuiz.style.display = "flex";
  viewHighScores.style.display = "none";
  // ⚠️ 目前在游戏界面结束时分数显示为undefined
  userScore.innerHTML = score;
  playGame();
  // //   function: save score to local & user initial
  // score = 0;
  // return;
}

// ========== ⬇ save score and load score ⬇ ==========
var userInitials = document.querySelector("name-input");
saveBtn.addEventListener("click", function () {
  initials = nameInput.value;
  nameScorePair.name = initials;
  nameScorePair.score = parseInt(userScore.textContent);
  console.log(nameScorePair);
});
// ⚠️todo：设置localstorage
// ⚠️todo： 设置sort score function
// ⚠️todo：当点击view high score时显示从高到低排列三个nameSocrePair(getItem)
// ⚠️todo：while playgame(),if clicked view high score, confirm(you'll lose the progress)

// ========== ⬇ divider ⬇ ==========
// ⚠️todo：go back
// ⚠️todo：clear score
// ========== ⬇ divider ⬇ ==========
