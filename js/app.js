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
	// Player 1 chooses a character
	chooseCharacter(i){
		this.character = characters[i];
		this.charIcon = `<span><img id="p1Icon" class="pIcon" src=${charIcons[i]}></span>`;
		this.diceBlock = diceBlocks[i];
		this.movePiece();
	},
	// Player 1 rolls 1 die
	rollDie(){
		const randomIdx = (Math.floor(Math.random()*6));
		return this.diceBlock[randomIdx];
	},
	// Calculate new position based on dice roll
	calculateNewPosition(){
		this.currentPosition = this.currentPosition + this.rollDie() + this.rollDie();
		if(this.currentPosition > 40){
			this.currentPosition = this.currentPosition % 40;
		};
	},
	// Move player 1's piece on the board
	movePiece(){
		$('#p1Icon').remove();
		const positionString = this.currentPosition.toString();
		$(`div:contains( ${positionString} )`).prepend(this.charIcon);
	},

	// Full turn
	fullMove(){		//run this when roll button is clicked 
		this.calculateNewPosition();
		this.movePiece();
		this.captureStar();
	},

	// Capture a star
	captureStar(){
		if($('#p1Icon').parent().next().attr('id') === 'starspan'){
			this.starCount += 1;
			spawnStar();
		}
	},
	
};

const player2 = {
	character: "",
	charIcon: "",
	diceBlock: [],
	currentPosition: 1,
	coinCount: 0,
	starCount: 0,
	// Player 2 chooses a character
	chooseCharacter(i){
		this.character = characters[i];
		this.charIcon = `<span><img id="p2Icon" class="pIcon" src=${charIcons[i]}></span>`;
		this.diceBlock = diceBlocks[i];
		this.movePiece();
	},
	// Player 2 rolls 1 die
	rollDie(){
		const randomIdx = (Math.floor(Math.random()*6));
		return this.diceBlock[randomIdx];
	},
	// Calculate new position based on dice roll
	calculateNewPosition(){
		this.currentPosition = this.currentPosition + this.rollDie() + this.rollDie();
		if(this.currentPosition > 40){
			this.currentPosition = this.currentPosition % 40;
		}
	},
	// Move player 2's piece on the board
	movePiece(){
		$('#p2Icon').remove();
		const positionString = this.currentPosition.toString();
		$(`div:contains( ${positionString} )`).prepend(this.charIcon);
	},

	// Full turn
	fullMove(){		//run this when roll button is clicked 
		this.calculateNewPosition();
		this.movePiece();
		this.captureStar();
	},

	// Capture a star
	captureStar(){
		if($('#p2Icon').parent().next().attr('id') === 'starspan'){
			this.starCount += 1;
			spawnStar();
		}
	},
	
};

/* ========================== Game Functions ================================ */

// Have star appear on a random spot on the map
function spawnStar(){
	$("#star").parent().remove(); // remove star from board first 
	const randomIndex = Math.floor(Math.random()*40);
	const randomSpot = $(".col-1").eq(randomIndex);
	randomSpot.prepend(star);
}	

// remove the star from the board when it is captured
// function removeStar(){
// 	$("#star").parent().remove();
// }


// Testing
player1.chooseCharacter(0);
player2.chooseCharacter(2);

spawnStar();

