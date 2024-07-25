const questions = {
    facil: [
        { logo: "images/easy/almendra.png", options: ["Almendra", "Patricio rey y sus redonditos de ricota", "Callejeros", "Ratones paranoicos", "Viejas locas"], answer: "Almendra" },
        { logo: "images/easy/callejeros.png", options: ["Callejeros", "Almendra", "Patricio rey y sus redonditos de ricota", "Viejas Locas", "Ratones paranoicos"], answer: "Callejeros" },
        { logo: "images/easy/los redondos.png", options: ["Patricio rey y sus redonditos de ricota", "Callejeros", "Ratones paranoicos", "Viejas Locas", "Almendra"], answer: "Patricio rey y sus redonditos de ricota" },
        { logo: "images/easy/ratones.png", options: ["Ratones paranoicos", "Almendra", "Patricio rey y sus redonditos de ricota", "Viejas Locas", "Callejeros"], answer: "Ratones paranoicos" },
        { logo: "images/easy/viejas.png", options: ["Viejas locas", "Almendra", "Callejeros", "Patricio rey y sus redonditos de ricota", "Ratones paranoicos"], answer: "Viejas locas" }
    ],
    dificil: [
        { logo: "images/dificil/color_humano.png", options: ["Máquina de hacer pájaros", "Color humano", "Contraluz", "La barra del chocolate", "PorSuiGieco"], answer: "Color humano" },
        { logo: "images/dificil/contraluz.png", options: ["Máquina de hacer pájaros", "Color humano", "Contraluz", "La barra del chocolate", "PorSuiGieco"], answer: "Contraluz" },
        { logo: "images/dificil/la_barra_del_chocolate.png", options: ["Máquina de hacer pájaros", "Color humano", "Contraluz", "La barra del chocolate", "PorSuiGieco"], answer: "La barra del chocolate" },
        { logo: "images/dificil/porsuigieco.png", options: ["Máquina de hacer pájaros", "Color humano", "Contraluz", "La barra del chocolate", "PorSuiGieco"], answer: "PorSuiGieco" },
        { logo: "images/dificil/maquina.png", options: ["Máquina de hacer pájaros", "Color humano", "Contraluz", "La barra del chocolate", "PorSuiGieco"], answer: "Máquina de hacer pájaros" }
    ]
};

let currentQuestionIndex = 0;
let currentLevel = 'facil';
const userAnswers = [];

function startQuiz(level) {
    currentQuestionIndex = 0;
    currentLevel = level;
    userAnswers.length = 0; // clear previous answers

    document.querySelector('.button-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-result').innerHTML = '';

    showQuestion();
}

function showQuestion() {
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const nextButton = document.getElementById('next-button');

    const question = questions[currentLevel][currentQuestionIndex];
    const shuffledOptions = shuffle(question.options.slice());

    quizQuestion.innerHTML = `<img src="${question.logo}" alt="Logo de la banda">`;
    quizOptions.innerHTML = '';

    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => selectAnswer(button, option, question.answer);
        quizOptions.appendChild(button);
    });

    nextButton.style.display = 'none';
}

function selectAnswer(button, selectedAnswer, correctAnswer) {
    const quizOptions = document.getElementById('quiz-options');
    const nextButton = document.getElementById('next-button');

    if (selectedAnswer === correctAnswer) {
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
        Array.from(quizOptions.children).forEach(btn => {
            if (btn.innerText === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    Array.from(quizOptions.children).forEach(btn => {
        btn.disabled = true;
    });

    nextButton.style.display = 'block';
    userAnswers[currentQuestionIndex] = selectedAnswer;
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions[currentLevel].length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    let score = 0;

    questions[currentLevel].forEach((q, index) => {
        if (userAnswers[index] === q.answer) {
            score++;
        }
    });

    const resultContainer = document.getElementById('quiz-result');
    resultContainer.innerText = `Tu puntuación es: ${score} de ${questions[currentLevel].length}`;
    document.getElementById('quiz-question').style.display = 'none';
    document.getElementById('quiz-options').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}