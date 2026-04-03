const questionElement = document.getElementById("question")
const optionsElement = document.getElementById("options")
const nxtButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn")
const resultElement = document.getElementById("result");
const progressElement = document.getElementById("progress");

let currentQuesIdx = 0;
let score = 0;
let selectedAnswer = null;
let userAnswers = [];

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


prevButton.addEventListener("click", () => {
   if(currentQuesIdx > 0){
    currentQuesIdx--;
    loadQuestion();
   } 
});

nxtButton.addEventListener("click", () => {
    if (selectedAnswer === null) {
        alert("Please select an answer before moving to the next question.");
        return;
    }

    userAnswers.push({
        question: questions[currentQuesIdx].question,
        selected: selectedAnswer,
        correct: questions[currentQuesIdx].answer,
        options: questions[currentQuesIdx].options
    });

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
    prevButton.classList.add("hidden");
    progressElement.classList.add("hidden");
    resultElement.classList.remove("hidden");

    let summaryHTML = `
    <div class="score-box">
        <h3>Quiz Completed 🎉</h3>
         <p>Your Score: ${score} / ${questions.length} </p>
    </div>
    `;

    userAnswers.forEach((item, index) => {
        const isCorrect = item.selected === item.correct;
        summaryHTML += `
           <div class = "summary-card ${isCorrect ? "correct-card" : "wrong-card"}">
            <div class="summary-header">
              <h3>Q${index + 1}. ${item.question}</h3>
              <span>${isCorrect ? "1/1" : "0/1"}</span>
            </div>
            
            ${item.options.map(option => {
            let className = "summary-option";
            if (option === item.correct) {
                className += " correct-option";
            }

            if (option === item.selected && option !== item.correct) {
                className += " wrong-option"
            }

            return `<div class="${className}">${option}</div>`;

        }).join("")}

                ${!isCorrect ? `<p class="correct-answer-text">Correct Answer: ${item.correct}</p>` : ""}
                </div>
        `;
    })

    resultElement.innerHTML = summaryHTML;
}

loadQuestion();