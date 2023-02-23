let playerShipName = 'USS Assembly'
let continueState = null;
let playerShip = null;
let introHeader = null;
const body = document.querySelector('body');
let statusReport = null;
let deathReport = null;
let continueButton = null;
let retreatButton = null;
let battleHeader = null;
let currentEnemy = null;

//Build Player Ship
function buildPlayerShip() {
    
    playerShip = {
    name: playerShipName,
    hull: 20,
    firePower: 5,
    accuracy: .7,
    attack(enemy) {
        let attackTest = Math.random();
        console.log("Firing weapons!")
        if (attackTest < this.accuracy) {
            enemy.hull -= 5;
            if (enemy.hull > 0) {
            console.log(`We've scored a hit on ${enemy.name}, captain!`)
            } else if (enemy.hull <= 0 && enemy.hull > -2) {
                console.log(`Confirmed kill, captain! ${enemy.name} destroyed!`)
            } else if (enemy.hull <= -2) {
                console.log(`That's a critical hit, Captain! ${enemy.name} has been obliterated!`)
            }
        } else {
            console.log("No hit, captain, the shot's gone wide!")
        }
    }
    };
}

//Alien Fleet Array
let alienFleet = [];

//Random Number Generator for Stats
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
//console.log(getRandomInt(4, 7));

//Creating Ship Class
class Ship {
    constructor(name) {
        this.name = name,
        this.hull = getRandomInt(3, 6),
        this.firepower = getRandomInt(2, 4),
        this.accuracy = getRandomInt(6, 8) * .1
    }
        attack(enemy) {
            let attackTest = Math.random();
            if (attackTest < this.accuracy) {
                enemy.hull -= this.firepower
                if (enemy.hull <= 0) {
                    console.log(`She's taken too much damage from ${this.name}, Captain! We need to abandon ship!`)
                    playerDead();
                } else if (enemy.hull > 0) {
                    console.log(`${this.name} landed a hit on the ${enemy.name}! She has ${enemy.hull} hull points left!`)
                }
                
            } else {
                console.log(`We've evaded fire from ${this.name} captain!`)
            }
        }
    };

//Fleet Builder
function createAlienFleet(num) {
    alienFleet = []
    for (let i = 1; i <= num; i++) {
        let vessel = new Ship(`Alien Ship ${i}`);
        alienFleet.push(vessel);
    }
    currentEnemy = alienFleet[0];
}




//Combat Logic
function commenceAssault() {
    let turn = 0
    while (playerShip.hull > 0 && currentEnemy.hull > 0) {
        if (turn == 0) {
            playerShip.attack(currentEnemy);
            //console.log(currentEnemy.hull);
            if (currentEnemy.hull <= 0) {
                    statusReport = document.createElement('h4')
                    statusReport.innerText = `We've defeated ${currentEnemy.name} and the ${playerShip.name} has ${playerShip.hull} hull points left. Shall we press on?`
                    statusReport.className = 'statusReport'
                    body.insertBefore(statusReport, body.children[2])
            }
            
            turn = 1
        } else {
            currentEnemy.attack(playerShip);
            //console.log(playerShip.hull);
            turn = 0
        }
    }
}



//Removes game start button and introduces new window



//Creating battle buttons (continue or retreat)
function makeBattleButtons() {
        continueButton = document.createElement('button')
        continueButton.innerText = 'Continue the fight'
        continueButton.id = 'continue'
        continueButton.addEventListener('click', function() {
            console.log('Aye captain, continuing the fight!')
            statusReport.remove();
            currentEnemy = alienFleet[(alienFleet.indexOf(currentEnemy) + 1)]
            commenceAssault();
        })
        retreatButton = document.createElement('button')
        retreatButton.innerText = 'Retreat!'
        retreatButton.id = "retreat"
        retreatButton.addEventListener('click', function() {
            console.log('stop');
            quitGame();
        })
    document.querySelector('body').appendChild(continueButton)
    document.querySelector('body').appendChild(retreatButton)

}

//Start game logic.
let startButton= null;
function createStartButton() {
    startButton = document.querySelector('.startButton');
    startButton.addEventListener('click', function() {
     //console.log('game start')
     startGame()
    });
}
createStartButton();

let beginState = document.querySelector('body').innerHTML;

function startGame() {
    console.log('Game Start')
    startButton.remove();
    introHeader = document.querySelector('h3');
    introHeader.remove();
    battleHeader = document.createElement('h2')
    battleHeader.innerText = 'The battle for humanity has begun!!!'
    document.querySelector('body').appendChild(battleHeader);
    buildPlayerShip();
    createAlienFleet(20);
    makeBattleButtons();
    commenceAssault();
}

//Reset Function
function reset() {
    body.innerHTML = beginState;
    createStartButton();
}

//Quit Game Logic

function quitGame() {
    alert("Aye captain, there's too many. Full retreat!");
    reset();
}

//Player dead logic

function playerDead() {
    //console.log(`Player is dead`)
    continueButton.remove();
    retreatButton.remove();
    battleHeader.remove();
    deathReport = document.createElement('h1')
    deathReport.innerText = "The USS Assembly has been destroyed with all her crew. Humanity has been left to perish."
    body.appendChild(deathReport);
    setTimeout(reset, 5000)

}
