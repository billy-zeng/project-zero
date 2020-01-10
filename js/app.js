console.log("Star Chasers up and running...")

/* =================== Variables ====================== */

// Player objects
let player1 = {};
let player2 = {};

// Character names
const characters = ["Axel", "Jojo", "Rudy", "Speedy"];

// 8biticon.com icons
const charIcons = [
"images/icon0.jpg",
"images/icon1.jpg",
"images/icon2.jpg",
"images/icon3.jpg"
];

const charSelectModals = $('.charselect__section');

// Dice blocks
const diceBlocks = [
[1, 2, 3, 4, 5, 6],
[0, 2, 4, 4, 4, 6],
[1, 3, 3, 3, 5, 6],
[3, 3, 3, 3, 4, 4]
];

// font awesome dice icons
const diceIcons = [
['<i class="fas fa-dice-one"></i> <i class="fas fa-dice-two"></i> <i class="fas fa-dice-three"></i> <i class="fas fa-dice-four"></i> <i class="fas fa-dice-five"></i> <i class="fas fa-dice-six"></i>'],
['<i class="fas fa-square"></i> <i class="fas fa-dice-two"></i> <i class="fas fa-dice-four"></i> <i class="fas fa-dice-four"></i> <i class="fas fa-dice-four"></i> <i class="fas fa-dice-six"></i>'],
['<i class="fas fa-dice-one"></i> <i class="fas fa-dice-three"></i> <i class="fas fa-dice-three"></i> <i class="fas fa-dice-three"></i> <i class="fas fa-dice-five"></i> <i class="fas fa-dice-six"></i>'],
['<i class="fas fa-dice-three"></i> <i class="fas fa-dice-three"></i> <i class="fas fa-dice-three"></i> <i class="fas fa-dice-three"></i> <i class="fas fa-dice-four"></i> <i class="fas fa-dice-four"></i>'],
];

// images of the dice faces
const diceImages = ["images/dice0.png", "images/dice1.png", "images/dice2.png", "images/dice3.png", "images/dice4.png", "images/dice5.png", "images/dice6.png"];

// Star element
const star = `<span id="starspan"><img id="star" src="images/star.png"></span>`;

// tracks stars found per turn
let starsFound = 0;

// Total turns
const totalTurns = 30; // adjust for how many turns to play for

// Turn counter
let turnNumber = 1; // will iterate up to totalTurns => game ends

// /* =================== Player Class =================== */

class Player {
	constructor(playerId, pIcon){
		this.playerId = playerId; // pass 1 for player1 and 2 for player2
		this.iconId = pIcon; // pass p1Icon for player1 and p2Icon for p2
		this.character = "";
		this.charIcon = "";
		this.diceBlock = [];
		this.selected = false;
		this.currentPosition = 1;
		this.coinCount = 0;
		this.starCount = 0;
	};

	// Player chooses a character and places their game piece on the board
	chooseCharacter(i){
		this.character = characters[i];
		this.charIcon = `<span><img id=${this.iconId} class="player__icon" src=${charIcons[i]}></span>`;
		this.diceBlock = diceBlocks[i];
		this.setPlayerAvatar(i);
		this.setPlayerName(i);
		this.setDiceIcons(i);
		$(`#p${this.playerId}Icon`).parent().remove();
		$('#1').append(this.charIcon);
	};

	setPlayerAvatar(i){
		$(`#player${this.playerId}Avatar > img`).attr('src', charIcons[i]);
	};

	setPlayerName(i){
		$(`#player${this.playerId}Avatar`).prev().text(this.character);
	};

	setDiceIcons(i){
		$(`#p${this.playerId}__card .diceblock__icons`).html(`Dice Block: ${diceIcons[i]}`)
	};

	// Player rolls 1 die
	rollDie(){
		const randomIdx = (Math.floor(Math.random()*6));
		return this.diceBlock[randomIdx];
	};

	// Move player's piece on the board
	movePiece(){
		$(`#p${this.playerId}Icon`).parent().remove();
		$(`#${this.currentPosition}`).append(this.charIcon);
	};

	// update coin counter on DOM
	updateCoinCount(){
		$(`#coinCount${this.playerId}`).text(`${this.coinCount}`);
	};

	// update star counter on DOM
	updateStarCount(){
		$(`#starCount${this.playerId}`).html(`${this.starCount}`);
	};

	// Check space for star and capture if present
	checkForStar(){
		if($(`#p${this.playerId}Icon`).parent().siblings().last().attr('id') === 'starspan'){
			starsFound++;
			this.starCount += 1;
			this.updateStarCount();
			spawnStar();
		};
	};

	checkColor(){
		if ($(`#${this.currentPosition}`).hasClass('green')){
			this.landOnGreen();
		} else if ($(`#${this.currentPosition}`).hasClass('red')){
			this.landOnRed();
		} else if ($(`#${this.currentPosition}`).hasClass('yellow')){
			this.landOnYellow();
		} else if ($(`#${this.currentPosition}`).hasClass('blue')){
			this.landOnBlue();
		};
	};

	landOnGreen(){
		const advanceSpaces = Math.floor(Math.random()*2 + 1);
		const newPosition = this.currentPosition + advanceSpaces;

		// move to spaces one by one and check each for stars
		if (newPosition <= 40){
			while(this.currentPosition < newPosition){
				this.currentPosition++;
				this.movePiece();
				this.checkForStar();
			}
		} else {
			while(this.currentPosition < 40){
				this.currentPosition++;
				this.movePiece();
				this.checkForStar();
			}
			this.currentPosition = 0;
			while(this.currentPosition < (newPosition % 40)){
				this.currentPosition++;
				this.movePiece();
				this.checkForStar();
			}
		}

		$('.resultmessage__container').html(`<p>${this.character} landed on a green tile and advanced ${advanceSpaces} spaces!</p>`);
	};

	landOnRed(){
		const moveBackSpaces = Math.floor(Math.random()*2 + 1);
		this.currentPosition -= moveBackSpaces;
		if(this.currentPosition === 0){
			this.currentPosition = 40;
		} else if(this.currentPosition < 0){
			this.currentPosition = (this.currentPosition + 40) % 40;
		}
		this.movePiece();
		console.log(`${this.character} moved back ${moveBackSpaces} spaces`);

		$('.resultmessage__container').html(`<p>${this.character} landed on a red tile and moved back ${moveBackSpaces} spaces</p>`);
	};

	landOnYellow(){
		const gainedCoins = Math.floor(Math.random()*5 + 1);
		this.coinCount += gainedCoins;
		this.updateCoinCount();
		console.log(`${this.character} gained ${gainedCoins} coins`);

		$('.resultmessage__container').html(`<p>${this.character} landed on a yellow tile and gained ${gainedCoins} coins! <i class="fas fa-coins"></p>`);
	};

	landOnBlue(){
		// $('.resultmessage__container').html(`<p>${this.character} landed on a blue tile!</p>`);
		$('#availableCoins').html(`Coins Available: ${this.coinCount} <i class="fas fa-coins"></i>`);
		$('.store__modal').css('display', 'block');
	};

	// blue store option 1: jump ahead 3-5 spaces
	jumpAhead(){
		this.coinCount -= 3;
		this.updateCoinCount();
		const spacesToJump = Math.floor(Math.random()*3 + 3);
		this.currentPosition = this.currentPosition + spacesToJump;
		if(this.currentPosition > 40){
			this.currentPosition = this.currentPosition % 40;
		}
		this.movePiece();
		$('.resultmessage__container').html(`<p>${this.character} jumped on the trampoline and landed on tile [${this.currentPosition}]!</p>`);
		this.checkForStar();
		handleStarFoundMessage();
	};

	// blue store option 2: send opponent back 3-5 spaces
	sendBack(){
		this.coinCount -= 3;
		this.updateCoinCount();
		const spacesToSendBack = Math.floor(Math.random()*3 + 3);
		this.opponent.currentPosition -= spacesToSendBack;
		if(this.opponent.currentPosition === 0){
			this.opponent.currentPosition = 40;
		} else {
			this.opponent.currentPosition = (this.opponent.currentPosition + 40) % 40;
		}
		$(`#${this.opponent.iconId}`).parent().remove();
		$(`#${this.opponent.currentPosition}`).append(this.opponent.charIcon);
		$('.resultmessage__container').html(`<p>${this.character} threw a banana peel and sent ${this.opponent.character} back to tile [${this.opponent.currentPosition}]!</p>`);
	};

	// blue store option 3: jump to random spot on the map
	jumpToRandom(){
		this.coinCount -= 5;
		this.updateCoinCount();
		const randomTile = Math.floor(Math.random()*40 +1);
		this.currentPosition = randomTile;
		this.movePiece();
		$('.resultmessage__container').html(`<p>${this.character} hopped in the vortex and landed on tile [${this.currentPosition}]!</p>`);
		this.checkForStar();
		handleStarFoundMessage();
	};

	// Full move; run this when player clicks roll button
	playTurn(){

		// // check if game is over
		// if(turnNumber > totalTurns){
		// 	handleGameEnd();
		// };

		starsFound = 0;
		const dieRoll1 = this.rollDie();
		animateDiceRoll(1, dieRoll1);
		const dieRoll2 = this.rollDie();
		animateDiceRoll(2, dieRoll2);
		const newPosition = this.currentPosition + dieRoll1 + dieRoll2;

		if (newPosition <= 40){
			while(this.currentPosition < newPosition){
				this.currentPosition++;
				this.movePiece();
				this.checkForStar();
			}
		} else {
			while(this.currentPosition < 40){
				this.currentPosition++;
				this.movePiece();
				this.checkForStar();
			}
			this.currentPosition = 0;
			while(this.currentPosition < (newPosition % 40)){
				this.currentPosition++;
				this.movePiece();
				this.checkForStar();
			}
		}

		this.checkColor();

		handleStarFoundMessage();
		handleNextTurn();

		handleGameEnd();
	};

};

/* ========================== Game Functions ================================ */

// move from landing page to character selection
function moveToCharSelect(){
	$('.landingpage__modal').css('display', 'none');
	$('.charselect__modal').css('display', 'block');
};

// run when player clicks a select button
function handleCharSelect(x){
	if(player1.selected === true){
		player2.chooseCharacter(x);
		player2.selected = true;
		$('.charselect__modal').css('display', 'none');
		spawnStar();
	} else {
		player1.chooseCharacter(x);
		player1.selected = true;
		$(`#selectButton${x}`).parent().remove();
		$('.charselect__section').css('width', '33.33%');
	}
};

// Highlight text of current player to show whose turn it is
function highlightCurrentPlayer(){
	$('.player__header > h3 > span').eq(0).toggleClass('rainbow__text');
	$('.player__header > h3 > span').eq(1).toggleClass('rainbow__text');
};

// Have star appear on a random spot on the map
function spawnStar(){
	$('#starspan').remove();
	const randomIndex = Math.floor(Math.random()*40);
	const randomSpot = $(".gameboard__space").eq(randomIndex);
	randomSpot.append(star);
};

function handleStarFoundMessage(){
	if(starsFound === 1){
		$('.resultmessage__container > p').after(`Found a star! <i class="far fa-star"></i>`);
	} else if (starsFound > 1){
		$('.resultmessage__container > p').after(`Found ${starsFound} stars! <i class="far fa-star"></i>`);
	}
};

// Animation for dice roll
function animateDiceRoll(x, dieRoll){

	// shake animation
	$(`#diceImage${x}`).css('animation', "shake 1.1s ");

	// "slow" for loop to loop through dice image array
	let i=0; 
	timedLoop();
	function timedLoop(){
		setTimeout(function(){
			$(`#diceImage${x}`).attr('src', `${diceImages[i]}`);
			if(i<diceImages.length-1){
				timedLoop();
				i++;
			};
		}, 150);
	};

	// show actual dice roll result after looping through dice images
	setTimeout(function(){
		$(`#diceImage${x}`).attr('src', `${diceImages[dieRoll]}`);
		$(`#diceImage${x}`).css('animation', "");
	}, 1100);

};

// iterate turn count
function handleNextTurn(){
	turnNumber++;
	$('#turnCounter').text(`Turn: ${turnNumber}`);
	highlightCurrentPlayer();

	if(turnNumber > totalTurns){
		$('#turnCounter').text('Game Over');
		$('.btn-info').text('Play Again');
		$('.btn-info').toggleClass('roll__button');
		$('.btn-info').toggleClass('reset__button');
	};
};

function handleGameEnd(){
	if(turnNumber > totalTurns){
		let p1Total = player1.starCount + Math.floor(player1.coinCount/15);
		let p2Total = player2.starCount + Math.floor(player2.coinCount/15);

		if (p1Total > p2Total){
			$('.resultmessage__container').html(`<p>${player1.character} is the winner! With your help he collected a grand total of ${p1Total} stars <i class="far fa-star"></i></p>`);
		} else if (p1Total < p2Total){
			$('.resultmessage__container').html(`<p>${player2.character} is the winner! With your help he collected a grand total of ${p2Total} stars <i class="far fa-star"></i></p>`);
		} else {
			$('.resultmessage__container').html(`<p>It's a tie! Both players each collected a grand total of ${p1Total} stars <i class="far fa-star"></i></p>`);
		}
	};
};

function resetGame(){

	// reset the roll dice button
	$('.btn-info').text('Roll Dice');
	$('.btn-info').toggleClass('roll__button');
	$('.btn-info').toggleClass('reset__button');

	// remove player icons from board
	$('#p1Icon').parent().remove();
	$('#p2Icon').parent().remove();

	// reset player objects
	player1 = new Player(1, "p1Icon");
	player2 = new Player(2, "p2Icon");
	player1.opponent = player2;
	player2.opponent = player1;
	
	// reset game state variables
	starsFound = 0;
	roundNumber = 1;
	turnNumber = 1;

	// reset DOM counters
	player1.updateCoinCount();
	player2.updateCoinCount();
	player1.updateStarCount();
	player2.updateStarCount();
	$('#turnCounter').text(`Turn: ${turnNumber}`);

	// display default welcome message
	$('.resultmessage__container').html(`<p>Ready to go catch some stars!</p>`);

	// reset character select screen and open landing page
	$('.charselect__contents').empty();
	$('.charselect__contents').append(charSelectModals);
	$('.charselect__section').css('width', '25%');
	$('.landingpage__modal').css('display', 'block');
};

/* ========================== Initialize Game ================================ */

// Instantiate player objects from Player class
player1 = new Player(1, "p1Icon");
player2 = new Player(2, "p2Icon");
player1.opponent = player2;
player2.opponent = player1;

/* ========================== Event Listeners ================================ */

/* Roll button listener */
$('body').on('click', '.roll__button', function(){
	if(turnNumber%2 === 0){
		player2.playTurn();
	} else {
		player1.playTurn();
	}
});

/* Roll button listener */
$('body').on('click', '.reset__button', function(){
	resetGame();
});

/* Start button listener */
$('body').on('click', '.btn-light', function(){
	moveToCharSelect();
})

/* Select button listeners */

// Select button 0
$('body').on('click', '#selectButton0',function(){
	handleCharSelect(0);
});

// Select button 1
$('body').on('click', '#selectButton1',function(){
	handleCharSelect(1);
});

// Select button 2
$('body').on('click', '#selectButton2',function(){
	handleCharSelect(2);
});

// Select button 3
$('body').on('click', '#selectButton3',function(){
	handleCharSelect(3);
});

/* Store button listeners */

// Store button 0 listener
$('#storeButton0').on('click', function(){
	if(turnNumber%2 === 0){
		player1.jumpAhead();
	} else {
		player2.jumpAhead();
	}
	$('.store__modal').css('display', 'none');
});

// Store button 1 listener
$('#storeButton1').on('click', function(){
	if(turnNumber%2 === 0){
		player1.sendBack();
	} else {
		player2.sendBack();
	}
	$('.store__modal').css('display', 'none');
});

// Store button 2 listener
$('#storeButton2').on('click', function(){
	if(turnNumber%2 === 0){
		player1.jumpToRandom();
	} else {
		player2.jumpToRandom();
	}
	$('.store__modal').css('display', 'none');
});

/* Leave store button listener */
$('#leaveStoreButton').on('click', function(){
	$('.resultmessage__container').html(`<p>Thanks for stopping by the store!</p>`);
	$('.store__modal').css('display', 'none');
});
