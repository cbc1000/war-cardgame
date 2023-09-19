// Kortspillet Krig med OOP

class Card {
    constructor(suit, rank, value, imagePath) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
    this.imagePath = imagePath;
    }
}

class Deck {
    constructor() {
        this.cards = [];
    }
    createDeck() {
    let suits = ["clubs", "diamonds", "hearts", "spades"];
    let ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];
    let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
            this.cards.push(new Card(suits[i], ranks[j], values[j], `../Aflevering OOP/Kort/${ranks[j]}_of_${suits[i]}.png`))
            }
        }
    }
    shuffleDeck() {
    for (let i = this.cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let temp = this.cards[i];
        this.cards[i] = this.cards[j];
        this.cards[j] = temp;
        }
    }
}

class Player {
    constructor(name) {
        this.playerName = name;
        this.playerCards = [];
    }
}

class Board {
    constructor() {
        this.players = [];
    }
    start(playerOne, playerTwo) {
        this.players.push(new Player(playerOne));
        this.players.push(new Player(playerTwo));
        let d = new Deck();
        d.createDeck();
        d.shuffleDeck();
        this.players[0].playerCards = d.cards.slice(0, 26);
        this.players[1].playerCards = d.cards.slice(26, 52);
    }
}

let gameBoard = new Board();
gameBoard.start("Alex", "Oli");

console.log(gameBoard.players);

let playerOneTopCardValue = gameBoard.players[0].playerCards[0].value;
let playerTwoTopCardValue = gameBoard.players[1].playerCards[0].value;
let playerOneTopCard = gameBoard.players[0].playerCards[0];
let playerTwoTopCard = gameBoard.players[1].playerCards[0];
let playerOneCards = gameBoard.players[0].playerCards;
let playerTwoCards = gameBoard.players[1].playerCards;

let count = 0;

function randonIntFromInteger(min, max) {
return Math.floor(Math.random() * (max - min + 1) + min)
}

function getCard() {
    checkWin();
    if (playerOneTopCardValue > playerTwoTopCardValue) {
        let randomInt = randonIntFromInteger(1, 2);
        if (randomInt === 1) {
            playerOneCards.push(playerTwoTopCard);
            playerOneCards.push(playerOneTopCard);
        }

        if (randomInt === 2) {
            playerOneCards.push(playerOneTopCard);
            playerOneCards.push(playerTwoTopCard);
        }

        playerOneCards.shift();
        playerTwoCards.shift();

        playerOneTopCardValue = gameBoard.players[0].playerCards[0].value;
        playerTwoTopCardValue = gameBoard.players[1].playerCards[0].value;

        playerOneTopCard = gameBoard.players[0].playerCards[0];
        playerTwoTopCard = gameBoard.players[1].playerCards[0];

        document.getElementById('P1Img').src = playerOneTopCard.imagePath
        document.getElementById('P2Img').src = playerTwoTopCard.imagePath
    }
    else if (playerOneTopCardValue < playerTwoTopCardValue) {
        let randomInt = randonIntFromInteger(1, 2);
        if (randomInt === 1) {
            playerTwoCards.push(playerTwoTopCard);
            playerTwoCards.push(playerOneTopCard);
        }

        if (randomInt === 2) {
            playerTwoCards.push(playerOneTopCard);
            playerTwoCards.push(playerTwoTopCard);
        }

        playerOneCards.shift();
        playerTwoCards.shift();

        playerOneTopCardValue = gameBoard.players[0].playerCards[0].value;
        playerTwoTopCardValue = gameBoard.players[1].playerCards[0].value;

        playerOneTopCard = gameBoard.players[0].playerCards[0];
        playerTwoTopCard = gameBoard.players[1].playerCards[0];

        document.getElementById('P1Img').src = playerOneTopCard.imagePath
        document.getElementById('P2Img').src = playerTwoTopCard.imagePath

    }
    else if (playerOneTopCardValue === playerTwoTopCardValue) {
        war();
    }
    count++
    document.getElementById("text").innerHTML = "Antal runder spillet: " + count;
    document.getElementById("P1RemainingCards").innerHTML = "Kort i bunken: " + playerOneCards.length;
    document.getElementById("P2RemainingCards").innerHTML = "Kort i bunken: " + playerTwoCards.length;
    checkWin();
}


let warArray = [];

function war() {
    if (playerOneCards.length < 5 || playerTwoCards.length < 5) {

        if (playerOneCards.length > playerTwoCards.length) {
            for (let i = 0; i < playerTwoCards.length - 1; i++) {
                warArray.push(playerOneCards[i]);
                playerOneCards.shift();
                warArray.push(playerTwoCards[i]);
                playerTwoCards.shift();
                playerOneTopCardValue = gameBoard.players[0].playerCards[0].value;
                playerTwoTopCardValue = gameBoard.players[1].playerCards[0].value;
                playerOneCards = gameBoard.players[0].playerCards;
                playerTwoCards = gameBoard.players[1].playerCards;
            }
            compareWar();
        }
        else if (playerOneCards.length < playerTwoCards.length) {
            for (let i = 0; i < playerTwoCards.length - 1; i++) {
                warArray.push(playerOneCards[i]);
                playerOneCards.shift();
                warArray.push(playerTwoCards[i]);
                playerTwoCards.shift();
                playerOneTopCardValue = gameBoard.players[0].playerCards[0].value;
                playerTwoTopCardValue = gameBoard.players[1].playerCards[0].value;
                playerOneCards = gameBoard.players[0].playerCards;
                playerTwoCards = gameBoard.players[1].playerCards;
        }
            compareWar();
    }
}
    else {
        for (let i = 0; i < 3; i++) {
        warArray.push(playerOneCards[i]);
        playerOneCards.shift();
        warArray.push(playerTwoCards[i]);
        playerTwoCards.shift();
    }

    playerOneTopCardValue = gameBoard.players[0].playerCards[0].value;
    playerTwoTopCardValue = gameBoard.players[1].playerCards[0].value;

    playerOneTopCard = gameBoard.players[0].playerCards[0];
    playerTwoTopCard = gameBoard.players[1].playerCards[0];

    document.getElementById('P1Img').src = playerOneTopCard.imagePath
    document.getElementById('P2Img').src = playerTwoTopCard.imagePath
    document.getElementById("P1RemainingCards").innerHTML = "Kort i bunken: " + playerOneCards.length;
    document.getElementById("P2RemainingCards").innerHTML = "Kort i bunken: " + playerTwoCards.length;
    compareWar();
    }
}

function compareWar() {
    if (playerOneTopCardValue > playerTwoTopCardValue) {
        for (let i = 0; i < warArray.length; i++) {
            playerOneCards.push(warArray[i]);
        }
        alert("Player 1 won the war!")
        warArray.length = 0;
        checkWin();
    }
    else if (playerOneTopCardValue < playerTwoTopCardValue) {
        for (let i = 0; i < warArray.length; i++) {
            playerTwoCards.push(warArray[i]);
        }
        alert("Player 2 won the war!")
        warArray.length = 0;
        checkWin();
    }
    else if (playerOneTopCardValue === playerOneTopCardValue) {
        war();
    }
}

function checkWin() {
    if (playerOneCards.length < 1 || playerTwoCards.length < 1) {
        if (playerOneTopCardValue > playerTwoTopCardValue) {
           alert("Player 1 Wins")
        }
        else if (playerOneTopCardValue < playerTwoTopCardValue) {
           alert("Player 2 Wins")
        }
       }
}
