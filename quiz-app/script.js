const questionElement = document.getElementById("question")
const optionsElement = document.getElementById("options")
const nxtButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const progressElement = document.getElementById("progress");

let currentQuesIdx = 0;
let score = 0;
let selectedAnswer = null;

function loadQuestion() {
    selectedAnswer = null;
    const currentQuestion = questions[currentQuesIdx];

    progressElement.textContent = `Question ${currentQuesIdx + 1} of ${questions.length}`;
    questionElement.textContent = currentQuestion.question;

    optionsElement.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");

        button.addEventListener("click", () => {
            document.querySelectorAll(".option-btn").forEach(btn => {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");
            selectedAnswer = option;
        });

        optionsElement.appendChild(button);
    });

}


nxtButton.addEventListener("click", () => {
    if (selectedAnswer === null) {
        alert("Please select an answer before moving to the next question.");
        return;
    }

    if (selectedAnswer === questions[currentQuesIdx].answer) {
        score++;
    }

    currentQuesIdx++;

    if (currentQuesIdx < questions.length) {
        loadQuestion();
    }
    else {
        showResult();
    }
});

function showResult() {
    document.getElementById("question-container").classList.add("hidden");
    nxtButton.classList.add("hidden");
    progressElement.classList.add("hidden");
    resultElement.classList.remove("hidden");

    resultElement.innerHTML =
        `<h3>Quiz Completed 🎉</h3>
         <p>Your Score: ${score} / ${questions.length} </p>
        `;

}

loadQuestion();