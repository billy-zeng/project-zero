console.log("Star Chasers up and running...")

/* =================== Variables ====================== */

// Characters
const characters = ["Axel", "Bolt", "Iggy", "Speedy"];

// Dice blocks
const diceBlocks = [
[1, 2, 3, 4, 5, 6],
[0, 2, 4, 4, 4, 6],
[1, 3, 3, 3, 5, 6],
[3, 3, 3, 4, 4, 4]
];

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

/* =================== Player Objects =================== */

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

const player1 = {
	character: "",
	charIcon: "",
	diceBlock: [],
	currentPosition: 1,
	coinCount: 0,
	starCount: 0,
	// Player 1 chooses a character and places their game piece on the board
	chooseCharacter(i){
		this.character = characters[i];
		this.charIcon = `<span><img id="p1Icon" class="pIcon" src=${charIcons[i]}></span>`;
		this.diceBlock = diceBlocks[i];
		$('#p1Icon').parent().remove();
		$(`div:contains(" 1 ")`).prepend(this.charIcon);
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
			console.log("Found a star!");
			this.starCount += 1;
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
		const advanceSpaces = Math.floor(Math.random()*3 + 1);
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
	},

	landOnRed(){
		const moveBackSpaces = Math.floor(Math.random()*3 + 1);
		this.currentPosition -= moveBackSpaces;
		if(this.currentPosition === 0){
			this.currentPosition = 40;
		}
		let positionString = this.currentPosition.toString();
		$('#p1Icon').parent().remove();
		$(`div:contains( ${positionString} )`).prepend(this.charIcon);
	},

	landOnYellow(){
		const gainedCoins = Math.floor(Math.random()*6 + 1);
		this.coinCount += gainedCoins;
	},

	// Full move; run this when player clicks roll button
	fullMove(){
		const newPosition = this.currentPosition + this.rollDie() + this.rollDie();
		while(this.currentPosition < newPosition){
			this.currentPosition++;
			this.movePiece();
			this.checkForStar();
		}
		// edge case: set correct position
		if(this.currentPosition > 40){
			this.currentPosition = this.currentPosition % 40;
		}
		this.checkColor();
		console.log(this.currentPosition); // testing purposes
	},

};

const player2 = {
	character: "",
	charIcon: "",
	diceBlock: [],
	currentPosition: 1,
	coinCount: 0,
	starCount: 0,
	// Player 2 chooses a character and places their game piece on the board
	chooseCharacter(i){
		this.character = characters[i];
		this.charIcon = `<span><img id="p2Icon" class="pIcon" src=${charIcons[i]}></span>`;
		this.diceBlock = diceBlocks[i];
		$('#p2Icon').parent().remove();
		$(`div:contains(" 1 ")`).prepend(this.charIcon);
	},

	// Player 2 rolls 1 die
	rollDie(){
		const randomIdx = (Math.floor(Math.random()*6));
		return this.diceBlock[randomIdx];
	},

	// Calculate new position based on dice roll
	// calculateNewPosition(){
	// 	this.currentPosition = this.currentPosition + this.rollDie() + this.rollDie();
	// 	if(this.currentPosition > 40){
	// 		this.currentPosition = this.currentPosition % 40;
	// 	}
	// },

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
	},

	landOnYellow(){
		const gainedCoins = Math.floor(Math.random()*6 + 1);
		this.coinCount += gainedCoins;
	},

	// Full move; run this when player clicks roll button
	fullMove(){
		const newPosition = this.currentPosition + this.rollDie() + this.rollDie();
		while(this.currentPosition < newPosition){
			this.currentPosition++;
			this.movePiece();
			this.checkForStar();
		}
		// edge case: set correct position
		if(this.currentPosition > 40){
			this.currentPosition = this.currentPosition % 40;
		}
		this.checkColor();
		console.log(this.currentPosition); // testing purposes
	},


};

/* ========================== Game Functions ================================ */

// Have star appear on a random spot on the map
function spawnStar(){
	// $("#star").parent().remove(); // remove star from board first 
	$('#starspan').remove();
	const randomIndex = Math.floor(Math.random()*40);
	const randomSpot = $(".col-1").eq(randomIndex);
	randomSpot.prepend(star);
}	

// remove the star from the board when it is captured
// function removeStar(){
// 	$("#star").parent().remove();
// }

/* ========================== Testing ================================ */

// Initialize game
player2.chooseCharacter(2);
player1.chooseCharacter(0);

spawnStar();

