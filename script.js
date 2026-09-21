const questions = [

    {
        question: "Which language is mainly used to style web pages?",

        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],

        answer: "CSS"
    },


    {
        question: "Which language is used to make web pages interactive?",

        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],

        answer: "JavaScript"
    },


    {
        question: "What does HTML stand for?",

        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],

        answer: "Hyper Text Markup Language"
    },


    {
        question: "Which symbol is used for an ID selector in CSS?",

        options: [
            ".",
            "#",
            "*",
            "$"
        ],

        answer: "#"
    },


    {
        question: "Which method converts JSON text into a JavaScript object?",

        options: [
            "JSON.parse()",
            "JSON.convert()",
            "JSON.object()",
            "JSON.toObject()"
        ],

        answer: "JSON.parse()"
    }

];


// VARIABLES

let currentQuestion = 0;

let score = 0;

let answered = false;


// ELEMENTS

const startScreen =
    document.getElementById("startScreen");

const quizScreen =
    document.getElementById("quizScreen");

const resultScreen =
    document.getElementById("resultScreen");

const startBtn =
    document.getElementById("startBtn");

const nextBtn =
    document.getElementById("nextBtn");

const restartBtn =
    document.getElementById("restartBtn");

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const questionCount =
    document.getElementById("questionCount");

const scoreElement =
    document.getElementById("score");

const progressElement =
    document.getElementById("progress");

const finalScore =
    document.getElementById("finalScore");

const totalQuestions =
    document.getElementById("totalQuestions");

const percentage =
    document.getElementById("percentage");

const totalQuestionsStart =
    document.getElementById("totalQuestionsStart");


// SHOW TOTAL QUESTIONS

totalQuestionsStart.textContent =
    questions.length;


// START QUIZ

startBtn.addEventListener("click", () => {

    startScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");

    loadQuestion();

});


// LOAD QUESTION

function loadQuestion() {

    answered = false;

    nextBtn.disabled = true;

    const current =
        questions[currentQuestion];


    // Counter

    questionCount.textContent =
        `${currentQuestion + 1} / ${questions.length}`;


    // Score

    scoreElement.textContent =
        score;


    // Question

    questionElement.textContent =
        current.question;


    // Progress

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressElement.style.width =
        `${progress}%`;


    // Clear old answers

    answersElement.innerHTML = "";


    // Create answers

    current.options.forEach((optionText) => {

        const button =
            document.createElement("button");

        button.className = "answer";

        button.textContent =
            optionText;


        button.addEventListener(
            "click",
            () => selectAnswer(
                button,
                optionText
            )
        );


        answersElement.appendChild(button);

    });

}


// SELECT ANSWER

function selectAnswer(
    selectedButton,
    selectedAnswer
) {

    if (answered) {
        return;
    }


    answered = true;


    const correctAnswer =
        questions[currentQuestion].answer;


    const allAnswers =
        document.querySelectorAll(".answer");


    // Disable buttons

    allAnswers.forEach((button) => {

        button.disabled = true;

    });


    // Correct

    if (selectedAnswer === correctAnswer) {

        selectedButton.classList.add("correct");

        score++;

    }

    // Wrong

    else {

        selectedButton.classList.add("wrong");


        // Show correct answer

        allAnswers.forEach((button) => {

            if (
                button.textContent ===
                correctAnswer
            ) {

                button.classList.add("correct");

            }

        });

    }


    scoreElement.textContent =
        score;


    nextBtn.disabled = false;

}


// NEXT QUESTION

nextBtn.addEventListener("click", () => {

    currentQuestion++;


    if (
        currentQuestion <
        questions.length
    ) {

        loadQuestion();

    }

    else {

        showResult();

    }

});


// SHOW RESULT

function showResult() {

    quizScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");


    finalScore.textContent =
        score;


    totalQuestions.textContent =
        questions.length;


    const percentageValue =
        Math.round(
            (score / questions.length) * 100
        );


    percentage.textContent =
        `${percentageValue}% Correct`;

}


// RESTART

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;


    resultScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");


    loadQuestion();

});
