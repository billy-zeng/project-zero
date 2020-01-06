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
// 		this.charIcon = charIcons[i];
// 		this.diceBlock = diceBlocks[i];
// 	}
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
	chooseCharacter(i){
		this.character = characters[i];
		this.charIcon = `<span><img id="p1Icon" class="pIcon" src=${charIcons[i]}></span>`;
		this.diceBlock = diceBlocks[i];
	},
	rollDice(){
		const randomIdx = (Math.floor(Math.random()*6));
		return this.diceBlock[randomIdx];
	}
};

const player2 = {
	character: "",
	charIcon: "",
	diceBlock: [],
	currentPosition: 1,
	coinCount: 0,
	starCount: 0,
	chooseCharacter(i){
		this.character = characters[i];
		this.charIcon = `<span><img id="p2Icon" class="pIcon" src=${charIcons[i]}></span>`;
		this.diceBlock = diceBlocks[i];
	},
	rollDice(){
		const randomIdx = (Math.floor(Math.random()*6));
		return this.diceBlock[randomIdx];
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

// 8biticon.com icons
const charIcons = [
"images/icon0.jpg",
"images/icon1.jpg",
"images/icon2.jpg",
"images/icon3.jpg"
];

// Star element
const star = `<span><img id="star" src="images/star.png"></span>`;

// Have star appear on a random spot on the map
function spawnStar(){
	const randomIndex = Math.floor(Math.random()*40);
	const randomSpot = $(".col-1").eq(randomIndex);
	randomSpot.append(star);
}	

// remove the star from the board when it is captured
function removeStar(){
	$("#star").parent().remove();
}




