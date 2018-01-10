//List of cards
var listOfCards = ["fa-envelope","fa-coffee","fa-camera-retro","fa-cubes","fa-bus","fa-beer","fa-balance-scale","fa-bicycle"];
var moves = 0;
var trackOpenCard = [];
var matched = 0;
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
}

function cardOpen(card){
	card.toggleClass("open show");
	trackOpenCard.push(card);
}

function flipStar(){
	$('.stars').children()[0].remove();
	$('.stars').append('<li><i class="fa fa-star-o"></i></li>');
}

function moveCapture(){
	moves += 1;
	$('.moves').html(moves + " Moves");
	if (moves === 10 || moves === 20){
		flipStar();
	}
}

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

function checkMatched(){
	matched += 1;
	if (matched === 8){
		modal.css("display", "block");
	}
}

function restartGame(){
	trackOpenCard = [];
	moves = 0;
	matched = 0;
	$('.moves').html("");
	$('.deck').children("li").remove();
	$(".fa-star-o").attr("class", "fa fa-star");
	main();
}

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

function main(){
	genDeck();
	$('.card').click(flipCard);
	$('.restart').click(restartGame);
}

main();