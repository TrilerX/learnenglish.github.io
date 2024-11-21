function startQuiz() {
    document.getElementById("quiz-section").style.display = "block";
}

function checkAnswer(answer) {
    const result = document.getElementById("result");
    if (answer === "were") {
        result.textContent = "Correct! 'They' takes 'were'.";
        result.style.color = "green";
    } else {
        result.textContent = "Incorrect. Try again!";
        result.style.color = "red";
    }
}