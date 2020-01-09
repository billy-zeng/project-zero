console.log("Star Chasers up and running...")

/* =================== Variables ====================== */

// Characters
const characters = ["Axel", "Bolt", "Iggy", "Speedy"];

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

// 8biticon.com icons
const charIcons = [
"images/icon0.jpg",
"images/icon1.jpg",
"images/icon2.jpg",
"images/icon3.jpg"
];

// Star element
const star = `<span id="starspan"><img id="star" src="images/star.png"></span>`;

// Round counter
let roundNumber = 1;

// Turn counter
let turnNumber = 1; // iterate up to turn 29 => game ends

/* =================== Player Objects =================== */

const player1 = {
	iconId: "p1Icon",
	character: "",
	charIcon: "",
	diceBlock: [],
	selected: false,
	currentPosition: 1,
	coinCount: 0,
	starCount: 0,

	// Player 1 chooses a character and places their game piece on the board
	chooseCharacter(i){
		this.character = characters[i];
		this.charIcon = `<span><img id=${this.iconId} class="player__icon" src=${charIcons[i]}></span>`;
		this.diceBlock = diceBlocks[i];
		this.setPlayerAvatar(i);
		this.setPlayerName(i);
		this.setDiceIcons(i);
		$('#p1Icon').parent().remove();
		$(`div:contains(" 1 ")`).prepend(this.charIcon);
	},

	setPlayerAvatar(i){
		$('#player1Avatar > img').attr('src', charIcons[i]);
	},

	setPlayerName(i){
		$('#player1Avatar').prev().text(this.character);
	},

	setDiceIcons(i){
		$('#p1__card .diceblock__icons').append(`<span>Dice Block: ${diceIcons[i]}</span>`)
	},

	// Player 1 rolls 1 die
	rollDie(){
		const randomIdx = (Math.floor(Math.random()*6));
		return this.diceBlock[randomIdx];
	},

	// Calculate new position based on dice roll
	// calculateNewPosition(){
	// 	this.currentPosition = this.currentPosition + this.rollDie() + this.rollDie();
	// 	if(this.currentPosition > 40){
	// 		this.currentPosition = this.currentPosition % 40;
	// 	};
	// },

	// Move player 1's piece on the board
	movePiece(){
		let positionString;
		if(this.currentPosition > 40){		// edge case: set correct position
			positionString = (this.currentPosition % 40).toString();
		} else{
			positionString = this.currentPosition.toString();
		}
		$('#p1Icon').parent().remove();
		$(`div:contains( ${positionString} )`).prepend(this.charIcon);
	},

	// Check space for star and capture if present
	checkForStar(){
		if($('#p1Icon').parent().next().attr('id') === 'starspan'){
			console.log("Found a star!"); // testing purposes
			this.starCount += 1;
			$('#starCount1').text(`${this.starCount}`);
			spawnStar();
		}
	},

	checkColor(){
		const posString = this.currentPosition.toString();
		if ($(`div:contains( ${posString} )`).hasClass('green')){ // testing purposes
			console.log("green!");
			this.landOnGreen();
		} else if ($(`div:contains( ${posString} )`).hasClass('red')){ // testing purposes
			console.log("red!");
			this.landOnRed();
		} else if ($(`div:contains( ${posString} )`).hasClass('yellow')){ // testing purposes
			console.log("yellow!");
			this.landOnYellow();
		} else if ($(`div:contains( ${posString} )`).hasClass('blue')){ // testing purposes
			console.log("blue!");
		};
	},

	landOnGreen(){
		const advanceSpaces = Math.floor(Math.random()*2 + 1);
		const newPosition = this.currentPosition + advanceSpaces;
		while(this.currentPosition < newPosition){
			this.currentPosition++;
			this.movePiece();
			this.checkForStar();
		}
		// edge case: set correct position
		if(this.currentPosition > 40){
			this.currentPosition = this.currentPosition % 40;
		}
		console.log(`${this.character} advanced ${advanceSpaces} spaces`); // testing purposes
	},

	landOnRed(){
		const moveBackSpaces = Math.floor(Math.random()*2 + 1);
		this.currentPosition -= moveBackSpaces;
		if(this.currentPosition === 0){
			this.currentPosition = 40;
		}
		let positionString = this.currentPosition.toString();
		$('#p1Icon').parent().remove();
		$(`div:contains( ${positionString} )`).prepend(this.charIcon);
		console.log(`${this.character} moved back ${moveBackSpaces} spaces`); // testing purposes
	},

	landOnYellow(){
		const gainedCoins = Math.floor(Math.random()*5 + 1);
		this.coinCount += gainedCoins;
		$('#coinCount1').text(`${this.coinCount}`);
		console.log(`${this.character} gained ${gainedCoins} coins`); // testing purposes
	},

	// Full move; run this when player clicks roll button
	playTurn(){
		const dieRoll1 = this.rollDie();
		$('#diceImage1').attr('src', `${diceImages[dieRoll1]}`);
		const dieRoll2 = this.rollDie();
		$('#diceImage2').attr('src', `${diceImages[dieRoll2]}`);
		const newPosition = this.currentPosition + dieRoll1 + dieRoll2;
		while(this.currentPosition < newPosition){
			this.currentPosition++;
			this.movePiece();
			this.checkForStar();
		}
		// edge case: set correct position
		if(this.currentPosition > 40){
			this.currentPosition = this.currentPosition % 40;
		}
		console.log(`landed on ${this.currentPosition}`); // testing purposes
		this.checkColor();
		console.log(this.currentPosition); // testing purposes

		// turnNumber++;
		// $('#turnCounter').text(`${turnNumber}`);
		// console.log(`Turn: ${turnNumber}`);
	},

};

const player2 = {
	iconId: "p2Icon",
	character: "",
	charIcon: "",
	diceBlock: [],
	selected: false,
	currentPosition: 1,
	coinCount: 0,
	starCount: 0,
	// Player 2 chooses a character and places their game piece on the board
	chooseCharacter(i){
		this.character = characters[i];
		this.charIcon = `<span><img id=${this.iconId} class="player__icon" src=${charIcons[i]}></span>`;
		this.diceBlock = diceBlocks[i];
		this.setPlayerAvatar(i);
		this.setPlayerName(i);
		this.setDiceIcons(i);
		$('#p2Icon').parent().remove();
		$(`div:contains(" 1 ")`).prepend(this.charIcon);
	},

	setPlayerAvatar(i){
		$('#player2Avatar > img').attr('src', charIcons[i]);
	},

	setPlayerName(i){
		$('#player2Avatar').prev().text(this.character);
	},

	setDiceIcons(i){
		$('#p2__card .diceblock__icons').append(`Dice Block: ${diceIcons[i]}`)
	},

	// Player 2 rolls 1 die
	rollDie(){
		const randomIdx = (Math.floor(Math.random()*6));
		return this.diceBlock[randomIdx];
	},

	// Move player 2's piece on the board
	movePiece(){
		let positionString;
		if(this.currentPosition > 40){		// edge case: set correct position
			positionString = (this.currentPosition % 40).toString();
		} else{
			positionString = this.currentPosition.toString();
		}
		$('#p2Icon').parent().remove();
		$(`div:contains( ${positionString} )`).prepend(this.charIcon);
	},

	// Check space for star and capture if present
	checkForStar(){
		if($('#p2Icon').parent().next().attr('id') === 'starspan'){
			console.log("Found a star!");
			this.starCount += 1;
			$('#starCount2').html(`${this.starCount}`);
			spawnStar();

		}

	},

	checkColor(){
		const posString = this.currentPosition.toString();
		if ($(`div:contains( ${posString} )`).hasClass('green')){
			console.log("green!");
			this.landOnGreen();
		} else if ($(`div:contains( ${posString} )`).hasClass('red')){
			console.log("red!");
			this.landOnRed();
		} else if ($(`div:contains( ${posString} )`).hasClass('yellow')){
			console.log("yellow!");
			this.landOnYellow();
		} else if ($(`div:contains( ${posString} )`).hasClass('blue')){
			console.log("blue!");
		};
	},

	landOnGreen(){
		const advanceSpaces = Math.floor(Math.random()*2 + 1);
		const newPosition = this.currentPosition + advanceSpaces;
		while(this.currentPosition < newPosition){
			this.currentPosition++;
			this.movePiece();
			this.checkForStar();
		}
		// edge case: set correct position
		if(this.currentPosition > 40){
			this.currentPosition = this.currentPosition % 40;
		}
		console.log(`${this.character} advanced ${advanceSpaces} spaces`);
	},

	landOnRed(){
		const moveBackSpaces = Math.floor(Math.random()*2 + 1);
		this.currentPosition -= moveBackSpaces;
		if(this.currentPosition === 0){
			this.currentPosition = 40;
		}
		let positionString = this.currentPosition.toString();
		$('#p2Icon').parent().remove();
		$(`div:contains( ${positionString} )`).prepend(this.charIcon);
		console.log(`${this.character} moved back ${moveBackSpaces} spaces`);
	},

	landOnYellow(){
		const gainedCoins = Math.floor(Math.random()*5 + 1);
		this.coinCount += gainedCoins;
		$('#coinCount1').text(`${this.coinCount}`);
		console.log(`${this.character} gained ${gainedCoins} coins`);
	},

	// Full move; run this when player clicks roll button
	playTurn(){
		const dieRoll1 = this.rollDie();
		$('#diceImage1').attr('src', `${diceImages[dieRoll1]}`);
		const dieRoll2 = this.rollDie();
		$('#diceImage2').attr('src', `${diceImages[dieRoll2]}`);
		const newPosition = this.currentPosition + dieRoll1 + dieRoll2;
		// const newPosition = this.currentPosition + this.rollDie() + this.rollDie();
		while(this.currentPosition < newPosition){
			this.currentPosition++;
			this.movePiece();
			this.checkForStar();
		}
		// edge case: set correct position
		if(this.currentPosition > 40){
			this.currentPosition = this.currentPosition % 40;
		}
		console.log(`landed on ${this.currentPosition}`);
		this.checkColor();
		console.log(this.currentPosition); // testing purposes

		// turnNumber++;
		// $('#turnCounter').text(`${turnNumber}`);
		// console.log(`Turn: ${turnNumber}`);
	},


};

/* ========================== Game Functions ================================ */

// Have star appear on a random spot on the map
function spawnStar(){
	// $("#star").parent().remove(); // remove star from board first 
	$('#starspan').remove();
	const randomIndex = Math.floor(Math.random()*40);
	const randomSpot = $(".gameboard__space").eq(randomIndex);
	randomSpot.prepend(star);
};

// run when player clicks a select button
function handleCharSelect(x){
	if(player1.selected === true){
		player2.chooseCharacter(x);
		player2.selected = true;
		$('#charSelectModal').css('display', 'none');
	} else {
		player1.chooseCharacter(x);
		player1.selected = true;
		$(`#selectButton${x}`).parent().remove();
	}
};

/* ========================== Testing ================================ */

// Initialize game

spawnStar();

/* ========================== Event Listeners ================================ */

$('.btn-info').on('click', function(){
	if(turnNumber%2 === 0){
		player2.playTurn();
	} else {
		player1.playTurn();
	}

	turnNumber++;
	$('#turnCounter').text(`Turn: ${turnNumber}`);
	console.log(`Turn: ${turnNumber}`);
});

/* Modal button testing*/

/* Select button listeners */

// Select button 0
$('#selectButton0').on('click', function(){
	handleCharSelect(0);
});

// Select button 1
$('#selectButton1').on('click', function(){
	handleCharSelect(1);
});

// Select button 2
$('#selectButton2').on('click', function(){
	handleCharSelect(2);
});

// Select button 3
$('#selectButton3').on('click', function(){
	handleCharSelect(3);
});

/* ========================== Player Class for OOP approach ================================ */

// class Player {
// 	constructor(){
// 		this.character = "";
// 		this.diceBlock = [];
// 		this.currentPosition = 1;
// 		this.coinCount: 0;
// 		this.starCount = 0;
// 	}
// 	chooseCharacter(i){
// 		this.character = characters[i];
// 		this.charIcon = charIcons[i];
// 		this.diceBlock = diceBlocks[i];
// 	}
// 	rollDice(){
// 		const randomIdx = (Math.floor(Math.random()*6));
// 		return this.diceBlock[randomIdx];
// 	},
// 	calculateNewPosition(){
// 		this.currentPosition = this.currentPosition + this.rollDice() + this.rollDice();
// 		if(this.currentPosition > 40){
// 			this.currentPosition = this.currentPosition % 40;
// 		}
// 	},
// }

// player1 = new Player;
// player2 = new Player;
