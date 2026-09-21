const questions = [
    {
        question: "Which language is mainly used to style web pages?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: "CSS"
    },

    {
        question: "Which language is used to add interactivity to websites?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
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
        options: [".", "#", "*", "$"],
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

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");

function loadQuestion() {

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1}/${questions.length}`;

    scoreElement.textContent = `Score: ${score}`;

    progressBar.style.width =
        `${((currentQuestion) / questions.length) * 100}%`;

    optionsElement.innerHTML = "";

    nextButton.disabled = true;

    q.options.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option");

        button.onclick = () => selectAnswer(button, option);

        optionsElement.appendChild(button);
    });
}

function selectAnswer(selectedButton, selectedAnswer) {

    const correctAnswer = questions[currentQuestion].answer;

    const allOptions =
        document.querySelectorAll(".option");

    allOptions.forEach(button => {
        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });

    if (selectedAnswer === correctAnswer) {
        score++;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("wrong");
    }

    scoreElement.textContent = `Score: ${score}`;

    nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {

    document.getElementById("quiz-screen")
        .classList.add("hidden");

    document.getElementById("result-screen")
        .classList.remove("hidden");

    document.getElementById("final-score").textContent =
        `${score}/${questions.length}`;
}

function restartQuiz() {

    currentQuestion = 0;
    score = 0;

    document.getElementById("quiz-screen")
        .classList.remove("hidden");

    document.getElementById("result-screen")
        .classList.add("hidden");

    loadQuestion();
}

loadQuestion();