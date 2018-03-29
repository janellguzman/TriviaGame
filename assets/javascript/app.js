$( document ).ready(function() {

// This game object holds all of the questions, possible answers, and then the index of the correct answer for each.
    var game = {
    questions: [
    {
    question: 'What instrument does Lisa play?',
    possibles: ['Flute', 'Saxophone', 'Clarinet', 'Trumpet'],
    id: 'question-one',
    answer: 1
    }, 
    
    {    
    question: 'Where do the Simpsons live?',
    possibles: ['Springfield', 'Shelbyville', 'Morganville', 'Los Angeles'],
    id: 'question-two',
    answer: 0
    },
    
    {
    question: 'What is the maiden name of Marge Simpson?',
    possibles: ['Kennedy', 'Jacqueline', 'Mendocino', 'Bouvier'],
    id: 'question-three',
    answer: 3
    },
    
    {
    question: 'What beer does Homer drink at home?',
    possibles: ['Fudd', 'Budd', 'Duff', 'Buzz', 'Slurm', 'Miller'],
    id: 'question-four',
    answer: 2
    },
   
    {
    question: 'Who did Maggie shoot?',
    possibles: ['Mr. Smithers', 'Mr. Burns', 'Mayor Quimby', 'Ned Flanders'],
    id: 'question-five',
    answer: 1
    },

    {
    question: 'What other language did Bart learn?',
    possibles: ['Japanese', 'Russian', 'Dothraki', 'French', 'Klingon'],
    id: 'question-six',
    answer: 3
    },

    {
    question: 'Who always tries to kill Bart when he escapes from prison?',
    possibles: ['Principal Skinner', 'Moe', 'Barney', 'Krusty the Clown', 'Sideshow Bob'],
    id: 'question-seven',
    answer: 4
    },

    {
    question: "What is the name of Homer's older half brother?",
    possibles: ['Bort', 'Agnus', 'Sam', 'Herb', 'Fry'],
    id: 'question-eight',
    answer: 3
    }

    ]
}
    
// This initializes the button that starts the game.
$(".startGame").on("click", function (){
$('.wrapper').show(); 
$(this).hide();
});
    
// These events start the timer.
var number = 60;
$('#timeLeft').on('click', run);
    
// This function enables the number of seconds to decrease until no time remains.
function decrement(){
number--;

// Show the number in the #timeLeft div.
$('#timeLeft').html('<h2>' + number + " seconds"+'</h2>');

// When the number is equal to zero, game stops.
if (number === 0){
   stop();

// Alert the user that time is up.
var message = 'Game Over!';
$('#message').html('time up!');
checkAnswers();
    }
}
    
// Run function sets the spacing of the decrement function's time interval so that it is a second per number decrement.
function run(){
counter = setInterval(decrement, 1000);
}
        
// The stop function clears our the counter.
function stop(){
         clearInterval(counter);
        }
 
// Execute the run function.
run();
    
// This function dynamically creates the inputs needed for the form and relates them to the items held within the game object. 
function formTemplate(data) {
       var qString = "<form id='questionOne'>"+ data.question +"<br>";
       var possibles = data.possibles;

// For loop to go through the possibles array for each question to add the values of each possibles.
for (var i = 0; i < possibles.length; i++) {
     var possible = possibles[i];
     console.log(possible);
     qString = qString + "<input type='radio' name='"+data.id+"' value="+ i +">"+possible;
    }
     return qString + "</form>";
    }
    window.formTemplate = formTemplate;
    
// This allows it to be displayed on the page.
function buildQuestions(){
     var questionHTML = ''
for (var i = 0; i<game.questions.length; i++) {
     questionHTML = questionHTML + formTemplate(game.questions[i]);
    }
 
    $('#questions-container').append(questionHTML);
    
    }
    
// Function that checks answers.
function isCorrect(question){
     var answers = $('[name='+question.id+']');
     var correct = answers.eq(question.answer);
     var isChecked = correct.is(':checked');
     return isChecked;
    }
    
buildQuestions();
    
// Function to build the display of guesser results.
function resultsTemplate(question){
     var htmlBlock = '<div>'
     htmlBlock = htmlBlock + question.question + ': ' + isChecked;
     return htmlBlock + "</div>";
    }
    
// Function to show the guesser results.
function checkAnswers (){
    
// Variables needed to hold results.
var resultsHTML = '';
var guessedAnswers = [];
var correct = 0;
var incorrect = 0;
var unAnswered =0
    
// For loop iterates through each question and adds up correct answers.
for (var i = 0; i<game.questions.length; i++) {
    if (isCorrect(game.questions[i])) {
    correct++;
            }
    else {
// Then this statement runs the questions at each index through the checkAnswered function to determine whether the user clicked
// an answer, or did not click an answer, so that incorrect and unAnswered scores can be delineated from each other.
    if (checkAnswered(game.questions[i])) {
    incorrect++;
                }
    else {
    unAnswered++;
                }
            }
    
        }

// Display the results of the function in the results div and use strings of text to relay the results.
$('.results').html('Correct: '+correct+ "<br>" +'Incorrect: '+incorrect+ "<br>" +'Unanswered: '+unAnswered);
    }
    
// This function checks whether the guesser actually checked an answer for each of the questions.
function checkAnswered(question){
    var anyAnswered = false;
    var answers = $('[name='+question.id+']');

// For loop creates a condition to check if the buttons were checked and and then set the anyAnswered variable to true if they were.
for (var i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
    anyAnswered = true;
            }
        }
    return anyAnswered;
    
    }
    
// Create a function with an onclick event for the doneButton that checks the answers OR stops the clock when "done" button is pressed.
$('#doneButton').on('click', function() {
checkAnswers();
stop();
$("#messageDiv").html("Game Over!");
        })
    });