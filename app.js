var questions = [{
    question: "1) According to the Dursleys, how did Harry’s parents die?",
    choices: ["Plane Crash", "Train Accident", "Bus Crash", "Car Accident"],
    correctAnswer: 3
}, {
    question: "2) What’s the LAST line of the book, Harry Potter and the Sorcerer’s Stone?",
    choices: ["Goodbye, for now, Hogwarts.", "Harry, Ron, and Hermione looked at each other sheepishly and smiled.", "I'm going to have a lot of fun with Dudley this summer...", "Dumbledore nodded with a smile."],
    correctAnswer: 2
}, {
    question: "3) What is Dumbledore’s full name?",
    choices: ["Albus Wulfric Percival Brian Dumbledore", "Albus Percival Wulfric Brian Dumbledore", "Albus Percival Brian Wulfric Dumbledore", "Albus Brian Percival Wulfric Dumbledore"],
    correctAnswer: 1
}, {
    question: "4) What is Lord Voldemort’s real name?",
    choices: ["Tom Marvolo Riddle", "Tom Marvilo Riddle", "Tom Marvin Riddle", "Tom Ravalo Riddle"],
    correctAnswer: 0
}, {
    question: "5) What does S.P.E.W. stand for?",
    choices: ["Society For the Promotion of Elfish Welfare", "Society For the Protection of Elves and Wizards", "Support For People, Elves, and Wizards", "Sorority For the Protection of Elves and Wands"],
    correctAnswer: 0
},{
	question: "6) Who gave us the Marauder’s Map?",
    choices: ["Messrs Moody, Wormtongue, Sappen, and Frongs", "Messrs Moony, Wormtail, Padfoot, and Prongs", "Messrs Molly, Wilfred, Peter, and Phongs", "Messrs Matchstick, Winston, Footfed, and Trongs"],
    correctAnswer: 1
},{
	question: "7) A person born into a wizarding family who cannot do magic is called…",
    choices: ["A Muggle", "A Half-Blood", "A Mudblood", "A Squib"],
    correctAnswer: 3
},{
	question: "8) What is the symbol for the Ravenclaw house?",
    choices: ["Raven", "Crow", "Eagle", "Hawk"],
    correctAnswer: 2
},{
	question: "9) How many Sickles are in a Galleon?",
    choices: ["13", "17", "15", "19"],
    correctAnswer: 1
},{
	question: "10) What are the three cores Garrick Ollivander uses in his wand-making?",
    choices: ["Phoenix feathers, dragon heartstring, and unicorn hair", "Phoenix feathers, dragon tooth, and centaur mane", "Dragon heartstring, unicorn horn, and centaur mane", "Phoenix beak, dragon heartstring, unicorn hair"],
    correctAnswer: 0
}];

if (confirm('Are you ready, Muggle?')) {
    alert('Grab your broomstick!');
} else {
    alert('Are you daft??? Get on with it!');
}

var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
	var c=180;
	var t;
$(document).ready(function () 
{
    // Gets Link for Theme Song
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "harrypotter.mp3");

    // Theme Button
    $(".theme-button").on("click", function() {
      audioElement.play();
    });
    $(".pause-button").on("click", function() {
      audioElement.pause();
    });

    // display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();
    $(this).find(".preButton").attr('disabled', 'disabled');
	
	timedCount();
	
	$(this).find(".preButton").on("click", function () 
	{		
		
        if (!quizOver) 
		{
			if(currentQuestion == 0) { return false; }
	
			if(currentQuestion == 1) {
			  $(".preButton").attr('disabled', 'disabled');
			}
			
				currentQuestion--; // since we have already displayed the first question on DOM ready
				if (currentQuestion < questions.length) 
				{
					displayCurrentQuestion();
					
				} 					
		} else {
			if(viewingAns == 3) { return false; }
			currentQuestion = 0; viewingAns = 3;
			viewResults();		
		}
    });

	
	// on clicking next, display the next question
    $(this).find(".nextButton").on("click", function () 
	{
        if (!quizOver) 
		{
			
            var val = $("input[type='radio']:checked").val();

            if (val == undefined) 
			{
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } 
			else 
			{
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();
				if (val == questions[currentQuestion].correctAnswer) 
				{
					correctAnswers++;
				}
				iSelectedAnswer[currentQuestion] = val;
				
				currentQuestion++; // Since we have already displayed the first question on DOM ready
				if(currentQuestion >= 1) {
					  $('.preButton').prop("disabled", false);
				}
				if (currentQuestion < questions.length) 
				{
					displayCurrentQuestion();
					
				} 
				else 
				{
					displayScore();
					$('#iTimeShow').html('Quiz Time Completed!');
					$('#timer').html("You scored " + correctAnswers + " out of " + questions.length);
					c=185;
					$(document).find(".preButton").text("View Answer");
					$(document).find(".nextButton").text("Play Again?");
					quizOver = true;
					return false;
					
				}
			}
					
		}	
		else 
		{ // quiz is over and clicked the next button (which now displays 'Play Again?'
			quizOver = false; $('#iTimeShow').html('Time Remaining:'); iSelectedAnswer = [];
			$(document).find(".nextButton").text("Next Question");
			$(document).find(".preButton").text("Previous Question");
			 $(".preButton").attr('disabled', 'disabled');
			resetQuiz();
			viewingAns = 1;
			displayCurrentQuestion();
            hideScore();
            
		}
    });
});



function timedCount()
	{
		if(c == 185) 
		{ 
			return false; 
		}
		
		var hours = parseInt( c / 3600 ) % 24;
		var minutes = parseInt( c / 60 ) % 60;
		var seconds = c % 60;
		var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);            
		$('#timer').html(result);
		
		if(c == 0 )
		{
					displayScore();
					$('#iTimeShow').html('Quiz Time Completed!');
					$('#timer').html("You scored" + correctAnswers + "out of" + questions.length);
					c=185;
					$(document).find(".preButton").text("View Answer");
					$(document).find(".nextButton").text("Play Again?");
					quizOver = true;
					return false;
					
		}
		
		c = c - 1;
		t = setTimeout(function()
		{
			timedCount()
		},1000);
	}
	
	
// This displays the current question AND the choices
function displayCurrentQuestion() 
{

	if(c == 185) { c = 180; timedCount(); }
    //console.log("In display current Question");
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(questionClass).text(question);
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;
	
	
    for (i = 0; i < numChoices; i++) 
	{
        choice = questions[currentQuestion].choices[i];
		
		if(iSelectedAnswer[currentQuestion] == i) {
			$('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
		} else {
			$('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
		}
    }
}

function resetQuiz()
{
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore()
{
    $(document).find(".quizContainer > .result").text("You scored " + correctAnswers + " out of " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() 
{
    $(document).find(".result").hide();
}

// displays the current question AND the choices
function viewResults() 
{

	if(currentQuestion == 10) { currentQuestion = 0;return false; }
	if(viewingAns == 1) { return false; }

	hideScore();
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // set the questionClass text to the current question
    $(questionClass).text(question);
    // remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;
	
	
	for (i = 0; i < numChoices; i++) 
	{
        choice = questions[currentQuestion].choices[i];
		
		if(iSelectedAnswer[currentQuestion] == i) {
			if(questions[currentQuestion].correctAnswer == i) {
				$('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			} else {
				$('<li style="border:2px solid red;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			}
		} else {
			if(questions[currentQuestion].correctAnswer == i) {
				$('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			} else {
				$('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			}
		}
    }

    function onSubmit() {
  localStorage.setItem("name", document.getElementById("name").value);
}
	
	currentQuestion++;
	
	setTimeout(function()
		{
			viewResults();
		},3000);
}