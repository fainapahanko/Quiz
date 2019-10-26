/*  <div class="wrapper">
    <h1></h1>
    <div class="main-content">
        <h3></h3>
        <div class="answers"></div>
    </div>
    <button>Check</button>
    <div class="correct-answer"></div>
    <div class="score">
        <p>Your score is <span></span></p>
    </div>
    </div>
*/
//category, type, difficulty, question, correct_answer, incorrect_answer 

var score = 0;
var questionNumber = 0;

function createQuestionBlock(questionData){
    if(document.querySelector("button").style.display = "block"){
        document.querySelector("button").style.display = "none"
    } 
    var p = document.querySelector("p")
    if(p.style.display = "none"){
        p.style.display = "block"
    }
    var mainContent = document.querySelector(".main-content")
    var h1 = document.querySelector("h1")
    h1.innerHTML = questionData.category
    var h3 = document.createElement("h3")
    h3.innerHTML = questionData.question
    mainContent.appendChild(h3)

    //correct answers + inccorect answers 
    var allAnswers = questionData.incorrect_answers.concat(questionData.correct_answer)
    allAnswers.sort()

    for(var answer of allAnswers){
        var answersDiv = document.createElement("div")
        answersDiv.className = "answers" 
        var radio = document.createElement("input")
        var label = document.createElement("label")
        var br = document.createElement("br")
        label.for = answer
        label.innerHTML = answer
        radio.type = 'radio'
        radio.name = 'radio'
        radio.value = answer
        radio.onclick = next
        var text = document.createTextNode(answer)
        answersDiv.appendChild(radio, text)
        answersDiv.appendChild(label)
        mainContent.appendChild(answersDiv)
    }
    return mainContent
}

function removeQuestions(){
    var answers = document.querySelectorAll(".answers")
    var h3 = document.querySelector("h3")
    for( var answer of answers){
        answer.remove()
    }
    h3.remove()
}
function StartAgain(){
    removeQuestions()
    var answer = event.target.value
    var span = document.querySelector("span")
    var correctAnswer = document.querySelector(".correct-answer")
    var p = document.querySelector("p")
    p.style.display = "none"
    if(answer != questions[questionNumber].correct_answer){
        correctAnswer.innerHTML = "Correct answer was " + questions[questionNumber].correct_answer +  ". Your final score is " + score + "/10."
    } else if(answer == questions[questionNumber].correct_answer){
        correctAnswer.innerHTML = "Nice job! Your final score is " + score + "/10."
    }
    questionNumber = 0
    score = 0
    span.innerText = score
    var button = document.querySelector("button")
    button.style.display = "block"
}

function next(event){
    var span = document.querySelector("span")
    var answer = event.target.value
    var correctAnswer = document.querySelector(".correct-answer")
    if(answer == questions[questionNumber].correct_answer){
        if(questionNumber == 9){
            StartAgain()
        } else {
            span.innerText = score + 1
            score++
            questionNumber++
            correctAnswer.innerHTML = "Nice job!"
            removeQuestions()
            createQuestionBlock(questions[questionNumber])
        }
    } else if (answer != questions[questionNumber].correct_answer) {
        if(questionNumber == 9){
            StartAgain()
        } else {
            correctAnswer.innerHTML = "Correct answer was " + questions[questionNumber].correct_answer
            questionNumber++
            removeQuestions()
            createQuestionBlock(questions[questionNumber])
        }
    }
    console.log(questionNumber)
}

 window.onload =function(){
    var span = document.querySelector("span")
    span.innerHTML = score
    createQuestionBlock(questions[questionNumber])
    console.log(questions.length)
 }