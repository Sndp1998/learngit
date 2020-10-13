// age in days
function ageInDays() {
    var birthyear = prompt('Your born year?')
    agedays = (2020 - birthyear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + agedays + ' days old.');
    h1.setAttribute('id', 'agedays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);



}

function reset() {
    document.getElementById('agedays').remove();
}

// for cat generator
function catGenerator() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = 'https://thecatapi.com/api/images/get?format=src&type=gif&size=small'
    div.appendChild(image)
}

//for rock, paper and scissors
function rpsGame(yourChoice) {
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    results = dicideWinner(humanChoice, botChoice);

    message = finalMessage(results);
    rpsFrontEnd(humanChoice, botChoice, message);

}


function randToRpsInt() {
    return Math.floor(Math.random() * 3);

}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];

}

function dicideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'rock': 1, 'paper': 0.5, 'scissors': 0 },
        'scissors': { 'paper': 1, 'scissors': 0.5, 'rock': 0 }
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice]
    var computerScore = rpsDatabase[computerChoice][yourChoice]

    return [yourScore, computerScore]
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return { 'message': 'You lost!', 'color': 'red' };
    } else if (yourScore === 1) {
        return { 'message': 'You won!', 'color': 'green' };
    } else {
        return { 'message': 'You tied!', 'color': 'yellow' };
    }
}

function rpsFrontEnd(humagImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src,

    }

    // remove all images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humagImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233,1);'>";
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size:60px; padding:30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24,1);'>";

    document.getElementById('flex-box-rps-div').append(humanDiv);

    document.getElementById('flex-box-rps-div').append(messageDiv);

    document.getElementById('flex-box-rps-div').append(botDiv);

}

// buttons random color generators
var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}

console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
        buttonsRed();
    } else if (buttonThingy.value === 'green') {
        buttonsGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonColorReset();
    } else if (buttonThingy.value === 'random') {
        randomColors();
    }
}

function buttonsRed() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }

}

function buttonsGreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }

}

function buttonColorReset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }

}

function randomColors() {
    var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];

    for (let i = 0; i < all_buttons.length; i++) {
        var randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }


}


// for blackjack games




let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');


document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);


document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);


function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        console.log(card);
        showCard(card, YOU);
        updateScore(card, YOU)
        showScore(YOU);
    }
}



function showCard(card, activePlayer) {

    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = 'static/images/' + card + '.png';
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }

}


function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['isStand'] = false;
    }




}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        // if adding 11 keeps me below 21 add 11, otherwise add 1
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1]
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0]
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card]


    }



}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';



    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];


    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));

}

async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        // showResult();
        await sleep(1000);
    }

    // if (DEALER['score'] > 15) {
    //     blackjackGame['turnsOver'] = true;

    //     let winner = computeWinner();
    //     showResult(winner);

    // }
    blackjackGame['turnsOver'] = true;

    let winner = computeWinner();
    showResult(winner);
}

// compute the winner and who just win the game
// update wins, draws and loses
function computeWinner() {
    let winner;
    if (YOU['score'] <= 21) {
        //condition:  higher score than dealer or when dealer busts but you're 21 or under
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackGame['wins']++;
            console.log('You won!');
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            console.log('You lost!');
            blackjackGame['losses']++;

            winner = DEALER;

        } else if (YOU['score'] === DEALER['score']) {
            console.log('You drew!');
            blackjackGame['draws']++;



        }
    }
    // condition when you busts but dealer doesn't
    else if (YOU['score'] > 21 || DEALER['score'] <= 21) {
        console.log('You lost!');
        blackjackGame['losses']++;

        winner = DEALER;
    }
    // when you and dealer both busts
    else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        console.log('You drew!');
        blackjackGame['draws']++;

    }

    console.log('winner is', winner);
    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true) {
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = "You won";
            messageColor = 'green';
            winSound.play();

        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];

            message = "You loss";
            messageColor = 'red';
            lossSound.play();

        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];

            message = 'You drew';

        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }

}