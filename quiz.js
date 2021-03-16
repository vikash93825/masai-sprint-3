window.addEventListener('load', function () {
    var url = new URLSearchParams(window.location.search)
    var no_of_question = url.get('amount')
    var category = url.get('category');
    var difficulty = url.get('difficulty')

    var xhr = new XMLHttpRequest()
    xhr.open('GET', `https://opentdb.com/api.php?amount=${no_of_question}&category=${category}&difficulty=${difficulty}`)
    xhr.send();
    xhr.onload = function () {
        var response = JSON.parse(this.response)
        console.log(response)
        if (response['response_code'] == 0) {
            handleQuiz(response['results'])
            var category = document.getElementById('h1');
            category.textContent = response['results'][0]['category']
        }
    }
})

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;
var displayCorrect = []

function handleQuiz(data) {
    var questions = []

    for (var i = 0; i < data.length; i++) {
        questions.push({
            question: data[i]['question'],
            choices: [data[i]['incorrect_answers'][0], data[i]['correct_answer'], data[i]['incorrect_answers'][2], data[i]['incorrect_answers'][1]],
            correctAnswer: 1
        })
    }

    //console.log(questions)

    displayData(questions);

    var quizMessage = document.querySelector('.quizMessage');

    quizMessage.style.display = 'none';

    document.querySelector('.nextButton').addEventListener('click', function () {

        if (!quizOver) {
            var radiobtn = document.querySelector('input[type=radio]:checked');

            if (radiobtn === null) {
                quizMessage.innerText = 'Please select an answer';
                quizMessage.style.display = 'block';
            } 
            else {
                console.log(radiobtn.value);

                quizMessage.style.display = 'none';

                if (Number(radiobtn.value) === questions[currentQuestion].correctAnswer) {
                    displayCorrect.push({
                        ques: questions[currentQuestion],
                        ans: questions[currentQuestion].correctAnswer
                    })
                    correctAnswers++;
                }

                currentQuestion++;

                if (currentQuestion < questions.length) {
                    displayData(questions);
                } else {
                    displayScore(questions);
                    document.querySelector('.nextButton').innerText = 'Play Again?';
                    quizOver = true;
                    displayCorrect = []
                }
            }
        }
        else {
            quizOver = false;
            document.querySelector('.nextButton').innerText = 'Next Question';
            resetQuiz(questions);
            displayData(questions);
            hideResult(questions);
        }
        //console.log(displayCorrect)
       
    });

}


function displayData(questions) {
    //console.log(questions.category)
    var question = questions[currentQuestion].question;
    var questionClass = document.querySelector('.quizContainer > .question');
    var choiceList = document.querySelector('.quizContainer > .choiceList');
    var numChoices = questions[currentQuestion].choices.length;


    questionClass.innerText = question;

    choiceList.innerHTML = '';

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        var li = document.createElement('li');
        li.innerHTML = '<li><input type="radio" value="' + i + '" name="dynradio" />' + choice + '</li>'
        choiceList.appendChild(li);

    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideResult();
}

function displayScore(questions) {
    document.querySelector('.quizContainer > .result').innerText = 'You scored: ' + correctAnswers + ' out of ' + questions.length;
    document.querySelector('.quizContainer > .result').style.display = 'block';
}


function hideResult() {
    document.querySelector('.result').style.display = 'none';
}



