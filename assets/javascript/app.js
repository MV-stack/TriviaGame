$(document).ready(function () {
  //Declare global variables
  var game;
  var counter = 30;
  var clock;
  var timer = 20;
  var correctCounter = 0;
  var incorrectCounter = 0;
  var unansweredCounter = 0;
  var currentQuestionIndex = 0

  //Trivia questions and answers

  var questions = [{
      question: "How was the film described on the original Jurassic Park film poster?",
      answers: ["Guess who's back?", "An adventure 65 million years in the making.", "If you like dinosaurs, you'll love this!", "Not your average day out!"],
      correctAnswer: "An adventure 65 million years in the making."
    }, {
      question: "What is the name of the island that Jurassic Park takes place?",
      answers: ["Isla St Clair", "Cortez Island", "Isla Nublar", "Easter Island"],
      correctAnswer: "Isla Nublar"
    }, {
      question: "What is the first dinosaur that Dr. Grant and Dr. Sattler see when they arrive on the island?",
      answers: ["Triceratops", "Stegasaurus", "T-Rex", "Brachiosaurus"],
      correctAnswer: "Brachiosaurus"
    }, {
      question: "What is the name of the company that brought dinosaurs back to life?",
      answers: ["Umbrella Corp.", "InGen", "Cyberdyne Systems", "ABC Corp."],
      correctAnswer: "InGen"
    }, {
      question: "Who wrote Jurassic Park?",
      answers: ["Michael Crichton", "Steven Spielberg", "Owen Wilson", "Stephen King"],
      correctAnswer: "Michael Crichton"
    }, {
      question: "How many Academy Awards did Jurassic Park win?",
      answers: ["One", "Two", "Three", "None"],
      correctAnswer: "Three"
    }, {
      question: "What kind of DNA was used to bring dinosaurs back to life?",
      answers: ["Frog", "Crocodile", "Snake", "Ostrich"],
      correctAnswer: "Frog"
    }
  ]

  //Game start
  function startGame() {
    console.log("counter: " + counter)
    $("#time-left").html(counter);
    setInterval(countDown, 1000);
    $(".start-btn").hide();
    $(".question").html("<h2>" + questions[currentQuestionIndex].question + "</h2>")
    for (i = 0; i < questions[currentQuestionIndex].answers.length; i++) {
      console.log(i)
      $(".question").append($('<input/>').attr({
        type: 'button',
        name: 'btn1',
        value: questions[currentQuestionIndex].answers[i],
        class: "answerButton"
      }))
    }
  }

  function countDown() {

    this.counter--;
    $("#time-left").text(counter);
    if (counter === 0) {
      console.log("Times up");
      timer();
    }
  }
  $("answers").css("visibility", "hidden");
  $("body").on("click", ".start-btn", function (event) {
    event.preventDefault();
    startGame();
    $(".answers").css("visbility", "visible");
  });
  $("body").on("click", "answer", function (event) {
    chosenAnswer = $(this).text();
    var answerCounter = questions[counter].answers;
    var answer = $(".answer");
    for (var i = 0; i < answerCounter.length; i++) {
      if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === false) {
        clearInterval(clock);
        $(this).attr("class", "wrong-answer answer");
        $(".first-answer").css("background-color", "blue");
        $(".first-answer").css("color", "white");
        wrongAnswer();
      }
    }
  });
  $("body").on("click", ".reset-button", function (event) {
    event.preventDefault();
    resetGame();

  });
});
console.log("connected")