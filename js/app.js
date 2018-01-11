//List of cards
var listOfCards = ["fa-envelope","fa-coffee","fa-camera-retro","fa-cubes","fa-bus","fa-beer","fa-balance-scale","fa-bicycle"];
//Number of moves played
var moves = 0;
//Open card list
var trackOpenCard = [];
//Number of matches done
var matched = 0;
//Count seconds
var seconds = 0;
//Count minutes
var minutes = 0;
//Count hours
var hours = 0;
//Timer start
var start = 0;
//Timer stop
var stop = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Create Card element
function genCard(card){
	$('.deck').append('<li class="card"><i class="fa ' + card + '"></i></li>');
}

// Create a Deck of Cards
function genDeck(){
	for (var i = 0; i < 2; i++) {
		listOfCards = shuffle(listOfCards);
		listOfCards.forEach(genCard);
	}
	timerReset();
}

// Opens clicked card
function cardOpen(card){
	card.toggleClass("open show");
	trackOpenCard.push(card);
}

// Changes star from filled to outline
function flipStar(){
	$('.stars').children()[0].remove();
	$('.stars').append('<li><i class="fa fa-star-o"></i></li>');
}

// Tracks number of moves
function moveCapture(){
	moves += 1;
	$('.moves').html(" "+ moves + " Moves");
	if (moves === 10 || moves === 20){
		flipStar();
	}
}

//Opens card when clicked
function flipCard(){
	if (trackOpenCard.length == 0){
		cardOpen($(this));
	} 
	else if (trackOpenCard.length == 1) {
		cardOpen($(this));
		matchCard();
		moveCapture();
	}
}

//Tracks number of matched cards
function checkMatched(){
	matched += 1;
	if (matched === 8){
		$('.modal').css("display", "block");
		$('.stars').clone().appendTo('.rating');
		stop = true;
	}
}

function formateTime(tm){
	var extendZero = "0";
	if (tm < 10){
		extendZero = extendZero + tm.toString();
	} else {
		extendZero = tm.toString();
	}
	return extendZero;
}

//Timer
function timerStart(){
    start = setInterval(function (){
		if(stop !== true){
			if(seconds == 59){
				minutes++;
				seconds = 0;
			} else {
				seconds++;
			}
			if(minutes == 59){
				hours++;
				minutes = 0;
			}
		} else {
			seconds = seconds;
			minutes = minutes;
			hours = hours;
		}
		var time = formateTime(hours) +":"+ formateTime(minutes) +":"+ formateTime(seconds);
		$(".timer").text(time);
	},1000);
}

function timerReset() {
	clearInterval(start);
	seconds = 0;
	minutes = 0;
	hours = 0;
	$(".timer").text("00:00:00");
	timerStart();
}

//Restarts the game,resets the deck and numbers of moves.
function restartGame(){
	trackOpenCard = [];
	moves = 0;
	matched = 0;
	$('.moves').html("0 Moves");
	$('.deck').children("li").remove();
	$(".fa-star-o").attr("class", "fa fa-star");
	timerReset();
	main();
}

function playAgain(){
	restartGame();
	$('.modal').css("display", "none");
}
//Matches the open cards
function matchCard(){
	if(trackOpenCard[0][0].firstChild.className == trackOpenCard[1][0].firstChild.className){
		trackOpenCard.forEach(function (card) {
        	card.addClass('match');
   		});
		trackOpenCard = [];
		checkMatched();
	} else {
		console.log("not a match");
		trackOpenCard.forEach(function (card) {
        	card.toggleClass("open show");
   		});
		trackOpenCard = [];
	}
}

//Main game subroutine
function main(){
	genDeck();
	$('.card').click(flipCard);
	$('.restart').click(restartGame);
	$(".play-again").click(playAgain);
}

//Call to main subroutine
main();