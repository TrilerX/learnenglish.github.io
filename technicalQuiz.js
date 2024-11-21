class TechnicalQuestion {
    constructor(question, options, answer) {
        this.question = question;
        this.options = options;
        this.answer = answer;
    }

    isCorrect(option) {
        return this.answer === option;
    }
}

const technicalQuestions = [
    new TechnicalQuestion("What is an algorithm?", ["A security protocol", "A set of instructions", "A type of hardware"], "A set of instructions"),
    new TechnicalQuestion("What does a firewall do?", ["Manages databases", "Blocks unauthorized access", "Encrypts passwords"], "Blocks unauthorized access"),
    new TechnicalQuestion("Which is an example of a programming language?", ["Firewall", "Python", "HTTP"], "Python"),
    new TechnicalQuestion("What does the CPU do?", ["Stores data", "Performs calculations", "Manages traffic"], "Performs calculations"),
    new TechnicalQuestion("What is the role of RAM in a computer?", ["Processes data", "Stores data temporarily", "Protects data"], "Stores data temporarily"),
    new TechnicalQuestion("What is HTML used for?", ["Web design", "System programming", "Database management"], "Web design"),
    new TechnicalQuestion("What does an IP address do?", ["Identifies a device on a network", "Connects two devices", "Encrypts data"], "Identifies a device on a network"),
    new TechnicalQuestion("What is a URL?", ["Uniform Resource Locator", "Universal Resource Locator", "Uniform Record Locator"], "Uniform Resource Locator"),
    new TechnicalQuestion("What is a database?", ["A program for managing files", "A system for storing and retrieving data", "A programming language"], "A system for storing and retrieving data"),
    new TechnicalQuestion("What is Python?", ["A programming language", "A web browser", "A type of software"], "A programming language"),
    new TechnicalQuestion("What does DNS stand for?", ["Domain Name System", "Dynamic Network Service", "Data Network Service"], "Domain Name System"),
    new TechnicalQuestion("What is a 'bug' in programming?", ["A hardware issue", "An error in the code", "A programming language"], "An error in the code"),
    new TechnicalQuestion("What is the function of a router?", ["To store data", "To manage network traffic", "To encrypt data"], "To manage network traffic"),
    new TechnicalQuestion("What does HTTP stand for?", ["HyperText Transfer Protocol", "Hyperlink Text Transfer Protocol", "HyperText Translation Protocol"], "HyperText Transfer Protocol"),
    new TechnicalQuestion("What is a 'cloud' in computing?", ["A type of storage", "A programming language", "A network of servers"], "A network of servers"),
];

let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

function startTechnicalQuiz() {
    currentIndex = 0;
    score = 0;
    document.body.innerHTML += `
        <div id="quiz-overlay">
            <div id="quiz-content">
                <h2>Technical Terms Quiz</h2>
                <p id="question-number"></p>
                <p id="quiz-question"></p>
                <div id="quiz-options"></div>
                <p id="timer">Time Left: 30s</p>
                <button id="next-button" class="quiz-control" onclick="nextTechnicalQuestion()" disabled>Next</button>
                <button id="close-button" class="quiz-control" onclick="closeQuiz()">Close</button>
            </div>
        </div>
    `;
    showTechnicalQuestion();
}

function showTechnicalQuestion() {
    const question = technicalQuestions[currentIndex];
    document.getElementById("question-number").textContent = `Question ${currentIndex + 1} of ${technicalQuestions.length}`;
    document.getElementById("quiz-question").textContent = question.question;

    const optionsDiv = document.getElementById("quiz-options");
    optionsDiv.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("quiz-option");
        button.onclick = () => checkTechnicalAnswer(button, option);
        optionsDiv.appendChild(button);
    });

    resetTimer();
}

function checkTechnicalAnswer(button, option) {
    clearInterval(timer);
    const question = technicalQuestions[currentIndex];

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

function nextTechnicalQuestion() {
    currentIndex++;
    if (currentIndex < technicalQuestions.length) {
        showTechnicalQuestion();
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