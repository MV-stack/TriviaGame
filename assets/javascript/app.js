// Declare variables
var counter = 30;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var timer;

// Questions
var triviaQuestions = [{
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
];

// Go to the next question when timer expires
function nextQuestion() {
    var isQuestionOver = (triviaQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
        
        console.log('Game Over!');
        displayResult();
    } else {
        currentQuestion++;
        loadQuestion();
    }
    
}

// 30 second timer to answer questions
function timeUp() {
    clearInterval(timer);
    lost++;    
    setTimeout(nextQuestion, 3 * 1000);
}

function countDown() {
    counter--;

    $('#time').html(counter);

    if (counter === 0) {
        timeUp();
    }
}

// Display the question and answers
function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000);

    var question = triviaQuestions[currentQuestion].question; 
    var answers = triviaQuestions[currentQuestion].answers; 

    $('#time').html(counter);
    $('#game').html(`
        <h4>${question}</h4>
        ${loadanswers(answers)}
        ${loadRemainingQuestion()}
    `);
}

function loadanswers(answers) {
    var result = '';

    for (var i = 0; i < answers.length; i++) {
        result += `<p class="answer" data-answer="${answers[i]}">${answers[i]}</p>`;
    }

    return result;
}

$(document).on('click', '.answer', function() {
    console.log('AAAAAAAAAAAHHHHHHH');
    clearInterval(timer);
    var selectedAnswer = $(this).attr('data-answer');
    var correctAnswer = triviaQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        console.log('Correct!');        
        setTimeout(nextQuestion, 3 * 1000);
    } else {
        lost++;
        console.log('Wrong!');       
        setTimeout(nextQuestion, 3 * 1000);
    }
});

function displayResult() {
    var result = `
        <p>You got ${score} questions(s) right</p>
        <p>You missed ${lost} questions(s)</p>
        <p>Total questions ${triviaQuestions.length} questions(s) right</p>
        <button class="start-btn" id="reset">Reset Game</button>
    `;

    $('#game').html(result);
}

$(document).on('click', '#reset', function() {
    counter = 30;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;
    loadQuestion();
});

function loadRemainingQuestion() {
    var remainingQuestion = triviaQuestions.length - (currentQuestion + 1);
    var totalQuestion = triviaQuestions.length;

    return `Question: ${remainingQuestion}/${totalQuestion}`;
}

$('.start-btn').click(function() {
    $('.start-btn').remove();
    $('#time').html(counter);
    loadQuestion();
});

