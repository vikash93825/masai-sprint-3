window.addEventListener('load', function () {
    var form = document.querySelector('form');
    form.addEventListener('submit', handleForm)

})
var data;
function handleForm() {
    event.preventDefault();
    //console.log(event.target)
    var form = new FormData(event.target);
    var no_of_question = form.get('questions')
    var category = form.get('category');
    var difficulty = form.get('difficulty')

    //console.log(difficulty)

    window.location = `file:///home/vikash/Masai-School/masai-sprint-3/quiz.html?amount=${no_of_question}&category=${category}&difficulty=${difficulty}`
}


