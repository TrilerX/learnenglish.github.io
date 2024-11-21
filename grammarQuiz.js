class Question {
    constructor(question, options, answer) {
        this.question = question;
        this.options = options;
        this.answer = answer;
    }

    isCorrect(option) {
        return this.answer === option;
    }
}

const grammarQuestions = [
    new Question("What is the past tense of 'to be' for 'I'?", ["Was", "Were", "Am"], "Was"),
    new Question("Which WH question asks about a person?", ["Who", "What", "Where"], "Who"),
    new Question("When do we use 'many'?", ["Countable nouns", "Uncountable nouns", "Verbs"], "Countable nouns"),
    new Question("What is the past tense of 'go'?", ["Went", "Gone", "Going"], "Went"),
    new Question("Which WH question asks about time?", ["How", "When", "Where"], "When"),
    new Question("Which word is used with uncountable nouns?", ["Much", "Many", "Few"], "Much"),
    new Question("What is the past tense of 'eat'?", ["Ate", "Eaten", "Eating"], "Ate"),
    new Question("Which word is used with countable nouns?", ["Much", "Many", "Little"], "Many"),
    new Question("Which WH question asks about location?", ["Where", "Who", "How"], "Where"),
    new Question("What is the past tense of 'have'?", ["Had", "Has", "Having"], "Had"),
    new Question("Which WH question asks about reason?", ["Why", "What", "How"], "Why"),
    new Question("Which word is used with plural nouns?", ["Much", "Many", "Few"], "Many"),
    new Question("What is the past tense of 'run'?", ["Ran", "Run", "Running"], "Ran"),
    new Question("Which WH question asks about a specific object?", ["What", "Who", "Where"], "What"),
    new Question("Which form of 'to be' is used with 'they' in the past tense?", ["Was", "Were", "Is"], "Were"),
];


let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

function startGrammarQuiz() {
    currentIndex = 0;
    score = 0;
    document.body.innerHTML += `
        <div id="quiz-overlay">
            <div id="quiz-content">
                <h2>Grammar Quiz</h2>
                <p id="question-number"></p>
                <p id="quiz-question"></p>
                <div id="quiz-options"></div>
                <p id="timer">Time Left: 30s</p>
                <button id="next-button" class="quiz-control" onclick="nextGrammarQuestion()" disabled>Next</button>
                <button id="close-button" class="quiz-control" onclick="closeQuiz()">Close</button>
            </div>
        </div>
    `;
    showGrammarQuestion();
}

function showGrammarQuestion() {
    const question = grammarQuestions[currentIndex];
    document.getElementById("question-number").textContent = `Question ${currentIndex + 1} of ${grammarQuestions.length}`;
    document.getElementById("quiz-question").textContent = question.question;

    const optionsDiv = document.getElementById("quiz-options");
    optionsDiv.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("quiz-option");
        button.onclick = () => checkGrammarAnswer(button, option);
        optionsDiv.appendChild(button);
    });

    resetTimer();
}

function checkGrammarAnswer(button, option) {
    clearInterval(timer);
    const question = grammarQuestions[currentIndex];

    if (question.isCorrect(option)) {
        button.style.backgroundColor = "green";
        button.style.border = "2px solid black";
        score += 10; // Correct answer adds points
    } else {
        button.style.backgroundColor = "red";
        button.style.border = "2px solid black";
        score -= 5; // Incorrect answer deducts points
    }

    document.querySelectorAll(".quiz-option").forEach(btn => btn.disabled = true);
    document.getElementById("next-button").disabled = false;
}

function resetTimer() {
    timeLeft = 30;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up!");
            document.getElementById("next-button").disabled = false;
        }
    }, 1000);
}

function nextGrammarQuestion() {
    currentIndex++;
    if (currentIndex < grammarQuestions.length) {
        showGrammarQuestion();
    } else {
        clearInterval(timer);
        alert(`Quiz complete! Your final score is: ${score}`);
        closeQuiz();
    }
}

function closeQuiz() {
    document.getElementById("quiz-overlay").remove();
    clearInterval(timer);
}
