//List of cards
//var listOfCards = ["fa-envelope","fa-coffee","fa-camera-retro","fa-cubes","fa-bus","fa-beer","fa-balance-scale","fa-bicycle"];
var listOfCards = ["drogo","snow","dany","arya","jamie","cercie","tyrion","sansa"]
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
//leaderboard object
var leaderBoardObj = {
  name: "",
  moves: 0,
  rating:""
  }

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
function genCard(card,id){
	$('.deck').append('<li class="card" id="'+card+'_'+id+'"><img class="'+card+'"></li>');
}

// Create a Deck of Cards
function genDeck(){
	for (var i = 0; i < 2; i++) {
		listOfCards = shuffle(listOfCards);
		var id = i+1;
		listOfCards.forEach(function (card){
			$('.deck').append('<li class="card" id="'+card+'_'+id+'"><img class="'+card+'"></li>');
		});
	}
	timerReset();
}

// Opens clicked card
function cardOpen(card){
	var cardId;
	var imgId;
	if(!card.hasClass("open show")) {
		cardId = $(card).attr('id');
		imgId = cardId.slice(0, -2);
		$('#'+cardId).children()[0].setAttribute("src","img/"+imgId+".png");
		$('#'+cardId).children()[0].setAttribute("class",cardId+" flip");
		card.addClass("open show");
		trackOpenCard.push(card);
	}
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
		setTimeout(matchCard,1300);
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

//Adds 0 if time is single digit
function formateTime(tm){
	var extendZero = "0";
	if (tm < 10){
		extendZero = extendZero + tm.toString();
	} else {
		extendZero = tm.toString();
	}
	return extendZero;
}


//Time Incrementer
function timeIncr() {
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
}

//Start timer
function timerStart(){
	console.log("timerStart");
    start = setInterval(function (){
		timeIncr();
		var time = formateTime(hours) +":"+ formateTime(minutes) +":"+ formateTime(seconds);
		$(".timer").text(time);
	},1000);
}

//Reset timer
function timerReset() {
	clearInterval(start);
	seconds = 0;
	minutes = 0;
	hours = 0;
	stop = false;
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
	main();
}

//Closes modal window
function removeModal(){
	$('.modal').css("display", "none");
}

//Play the game again
function playAgain(){
	restartGame();
	removeModal();
}

function classSwap(card,matchID,matchImgId){
	matchID = $(card).attr('id');
    matchImgId = matchID.slice(0, -2);
	$('#'+matchID).children()[0].removeAttribute("class");
	$('#'+matchID).children()[0].setAttribute("class",matchID);
	return matchID;
}

//Matches the open cards
function matchCard(){
	var matchID,matchImgId;
	var open_1 = trackOpenCard[0].children()[0].className.slice(0,-7);
	var open_2 = trackOpenCard[1].children()[0].className.slice(0,-7);
	if(open_1 === open_2){
		trackOpenCard.forEach(function (card) {
			classSwap(card,matchID,matchImgId);
			card.addClass('match');
   		});
		trackOpenCard = [];
		checkMatched();
	} else {
		trackOpenCard.forEach(function (card) {
        	matchID = classSwap(card,matchID,matchImgId);
			$('#'+matchID).children()[0].removeAttribute("src","img/"+matchImgId+".png");
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
	$(".close").click(removeModal);
}

//Call to main subroutine
main();