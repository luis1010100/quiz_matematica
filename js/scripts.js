// declaração de variáveis 
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const QuizContainer = document.querySelector("#quiz-container");
const scoreContainer = document.querySelector("#score-container"); 
const letters = ['a','b','c','d'];
let points = 0;
let actualQuestion = 0;

//Perguntas 

const questions = [
    {
        "question": "Qual é a soma dos ângulos internos de um triângulo?",
        "answers": [
            {
                "answer": "90 graus",
                "correct": false,
            },
            {
                "answer": "180 graus",
                "correct": true,
            },
            {
                "answer": "270 graus",
                "correct": false,
            },
            {
                "answer": "360 graus",
                "correct": false,
            },
        ]
    },
    {
        "question": "Qual é o resultado da expressão 3*(4+2)?",
        "answers": [
            {
                "answer": "10",
                "correct": false,
            },
            {
                "answer": "12",
                "correct": false,
            },
            {
                "answer": "18",
                "correct": true,
            },
            {
                "answer": "24",
                "correct": false,
            },
        ]
    },
    {
        "question": "Qual é o valor de 3/4 multiplicado por 8?",
        "answers": [
            {
                "answer": "6",
                "correct": true,
            },
            {
                "answer": "1/2",
                "correct": false,
            },
            {
                "answer": "3/2",
                "correct": false,
            },
            {
                "answer": "9",
                "correct": false,
            },
        ]
    }   
]

//Substituição do quiz para a primeira pergunta

function init(){
    // cria a primeira pergunta
    createQuestion(0);
}

//Cria uma pergunta

function createQuestion(i){
    //limpar questão anterior
    const oldButtons = answersBox.querySelectorAll("button");
    oldButtons.forEach(function(btn){
        btn.remove();
    })

    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");
    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    questions[i].answers.forEach(function(answer,i){
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);
        const letterBtn = answerTemplate.querySelector(".btn-letter")
        const answerText = answerTemplate.querySelector(".question-answer");
        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];
        answerTemplate.setAttribute("correct-answer", answer['correct']);
    
        //remover hide e template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");
        //inserir alternativa

        answersBox.appendChild(answerTemplate);
        //evento de click no botão 

        answerTemplate.addEventListener("click", function(){
            checkAnswer(this)
        });
    });
    actualQuestion++;
} 

function checkAnswer(btn){
    const buttons= answersBox.querySelectorAll("button")
    
    buttons.forEach(function(button){
        if(button.getAttribute("correct-answer") === 'true'){
            button.classList.add("correct-answer")

            if(btn === button){
                points++;
            }
        } else {
           button.classList.add("wrong-answer")

        }
    });

    nextQuestion();

}

function nextQuestion(){
    //timer para o usuario ver as resposta

    setTimeout(function(){
        if(actualQuestion >= questions.length){
            showSuccessMessage()
                return;
        }
        createQuestion(actualQuestion);
    },500)
}

// exibe a tela final 

function showSuccessMessage(){
    hideOrShowQuiz();

    const score = ((points / questions.length)*100).toFixed(2);
    const displayScore = document.querySelector("#display-score span");
    displayScore.textContent= score.toString();

    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;

    const totalQuestions = document.querySelector("#questions-qty")
    totalQuestions.textContent = questions.length;
}

function hideOrShowQuiz(){
    QuizContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

const restartBtn = document.querySelector('#restart')
restartBtn.addEventListener("click", function(){
    actualQuestion = 0;
    points = 0;
    hideOrShowQuiz();
    init();
});
init();