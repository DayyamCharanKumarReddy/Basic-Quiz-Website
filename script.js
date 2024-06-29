const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');
const scoreContainerElement = document.getElementById('score-container');
const finalScoreElement = document.getElementById('final-score');
let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    scoreContainerElement.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    quizScore = 0;
    document.getElementById('right-answers').innerText = quizScore;
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    setStatusClass(document.body, correct);
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        questionContainerElement.classList.add('hide');
        scoreContainerElement.classList.remove('hide');
        finalScoreElement.innerText = quizScore;
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
    if (correct) {
        quizScore++;
    }
    document.getElementById('right-answers').innerText = quizScore;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Which one of these is a JavaScript framework?',
        answers: [
            { text: 'Python', correct: false },
            { text: 'Django', correct: false },
            { text: 'React', correct: true },
            { text: 'Eclipse', correct: false },
        ]
    },
    {
        question: 'Who is the PM of India?',
        answers: [
            { text: 'Narendra Modi', correct: true },
            { text: 'Rahul Gandhi', correct: false },
            { text: 'Mamatha Benerjee', correct: false },
            { text: 'Stalin', correct: false },
        ]
    },
    {
        question: 'What is the value of Pi?',
        answers: [
            { text: '3.15', correct: false },
            { text: '3.14', correct: true },
            { text: '3.16', correct: false },
            { text: '3.17', correct: false },
        ]
    },
    {
        question: 'Who is the champion of IPL-2024?',
        answers: [
            { text: 'CSK', correct: false },
            { text: 'KKR', correct: true },
            { text: 'RCB', correct: false },
            { text: 'SRH', correct: false },
        ]
    },
];
