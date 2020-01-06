console.log("Star Chasers up and running...")

// Player Objects

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
// 	}
// }

// player1 = new Player;
// player2 = new Player;

const player1 = {
	character: "",
	diceBlock: [],
	currentPosition: 1,
	coinCount: 0,
	starCount: 0,
	chooseCharacter(i){
		this.character = characters[i];
	}
};

const player2 = {
	character: "",
	diceBlock: [],
	currentPosition: 1,
	coinCount: 0,
	starCount: 0,
	chooseCharacter(i){
		this.character = characters[i];
	}
};

// Characters
const characters = ["Axel", "Bolt", "Iggy", "Speedy"];

// Dice blocks
const diceBlocks = [
[1, 2, 3, 4, 5, 6],
[0, 2, 4, 4, 4, 6],
[1, 3, 3, 3, 5, 6],
[3, 3, 3, 4, 4, 4]
];

// const diceBlock1 = [1, 2, 3, 4, 5, 6];
// const diceBlock2 = [0, 2, 4, 4, 4, 6];
// const diceBlock3 = [1, 3, 3, 3, 5, 6];
// const diceBlock4 = [3, 3, 3, 4, 4, 4];

// Star
const star = `<img id="star" src="star.png">`;

