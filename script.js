const startBtn = document.querySelector(".start-btn");
const main = document.querySelector(".main");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const tryAgainBtn = document.querySelector(".tryAgain-btn");
const goHomeBtn = document.querySelector(".goHome-btn");

startBtn.onclick = () => {
    quizSection.classList.add("active");
    quizBox.classList.add("active");
    showQuestions(0);
    questionCounter(1);
    headerScore();
};
tryAgainBtn.onclick = () => {
    quizBox.classList.add("active");
    nextBtn.classList.remove("active");
    resultBox.classList.remove("active");

    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
    selectedOptions = []
    showQuestions(questionCount);
    questionCounter(questionNumber);
    showSelectedOptions();
    headerScore();
};
goHomeBtn.onclick = () => {
    quizSection.classList.remove("active");
    nextBtn.classList.remove("active");
    resultBox.classList.remove("active");

    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
    selectedOptions = []
    showQuestions(questionCount);
    questionCounter(questionNumber);
    showSelectedOptions();
};
let questionCount = 0;
let questionNumber = 1;
let userScore = 0;
const nextBtn = document.querySelector(".next-btn");
nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        questionNumber++;
        questionCounter(questionNumber);
        nextBtn.classList.remove("active");
    } else {
        showResultBox();
    }
};
const optionList = document.querySelector(".option-list");
function showQuestions(index) {
    const questionText = document.querySelector(".question-text");
    questionText.textContent = `${questions[index].number}. ${questions[index].question}`;

    let optionTag = '';
    for (let i = 0; i < questions[index].options.length; i++) {
        optionTag += `<div class="option"><span>${questions[index].options[i]}</span></div>`;
    }

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;
    console.log(correctAnswer);
    if (userAnswer == correctAnswer) {
        answer.classList.add("correct");
        userScore += 1;
        headerScore();
    } else {
        answer.classList.add("incorrect");
        //if answer incorrect, auto selected correct answer
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute("class", "option correct");
            }
        }
    }
    //if user selected, disabled all options
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
    }
    selectedOptions.push(userAnswer);
    nextBtn.classList.add("active");
}
function questionCounter(index) {
    const questionTotal = document.querySelector(".question-total");
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}
function headerScore() {
    const headerScoreText = document.querySelector(".header-score");
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}
function showResultBox() {
    quizBox.classList.remove("active");
    resultBox.classList.add("active");
    const scoreText = document.querySelector(".score-text");
    scoreText.textContent = `Your Score ${userScore} of ${questions.length}`;
    const circularValue = document.querySelector(".circular-value");
    const progressValue = document.querySelector(".progress-value");
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;
    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularValue.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6
            }deg, rgba(255, 255, 255, .1) 0deg)`;
        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
    showSelectedOptions();
}
let selectedOptions = [];
function showSelectedOptions() {
    const selectedOptionsList = document.querySelector('.selectedOptionsList')
    let selectedOptionsText = ''
    for (let i = 0; i < selectedOptions.length; i++) {
        let optionClass = ''
        if (selectedOptions[i] == questions[i].answer) {
            optionClass = 'correct'
        } else {
            optionClass = 'incorrect'
        }
        selectedOptionsText += `<li class="${optionClass}">${i + 1}. ${selectedOptions[i]}</li>`
    }
    selectedOptionsList.innerHTML = selectedOptionsText
}
