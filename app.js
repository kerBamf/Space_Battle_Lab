let playerShipName = 'USS Assembly'
let beginState = document.querySelector('body').innerHTML;

//Build Player Ship
let playerShip = {
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
                } else if (enemy.hull > 0) {
                    console.log(`${this.name} landed a hit on the ${enemy.name}! She has ${enemy.hull} hull points left!`)
                }
                
            } else {
                console.log(`We've evaded fire from ${this.name} captain!`)
            }
        }
    };

//Fleet Creation Builder
function createAlienFleet(num) {
    alienFleet = []
    for (let i = 1; i <= num; i++) {
        let vessel = new Ship(`Alien Ship ${i}`);
        alienFleet.push(vessel);
    }
}


//createAlienFleet(10);
//console.log(alienFleet[0])

let currentEnemy = null;
//console.log(alienFleet.indexOf(currentEnemy))

//Combat Logic
function commenceAssault() {
    currentEnemy = alienFleet[0];
    let turn = 0
    while (playerShip.hull > 0 && currentEnemy.hull > 0) {
        if (turn == 0) {
            playerShip.attack(currentEnemy);
            //console.log(currentEnemy.hull);
            if (currentEnemy.hull <= 0) {
                let proceed = confirm(`Captain, we've destroyed  ${currentEnemy.name} and the Assembly has ${playerShip.hull} hull points left. Shall we continue the operation?`);
                if (proceed === true) {
                    currentEnemy = alienFleet[(alienFleet.indexOf(currentEnemy) + 1)]
                    console.log("Aye captain, continuing the operation!")
                } else { 
                    quitGame();
                    return false
                }
            }
            turn = 1
        } else {
            currentEnemy.attack(playerShip);
            //console.log(playerShip.hull);
            turn = 0
        }
    }
}

//Start game logic.
let startButton = document.querySelector('.startButton');
startButton.addEventListener('click', function() {
     //console.log('game start')
     startGame()
    });

//Removes game start button and introduces new window
function startGame() {
    document.querySelector('.startButton').remove;
    document.querySelector('h3').remove;
    const battleHeader = document.createElement('h2')
    battleHeader.innerText = 'The battle for humanity has begun!!!'
    document.querySelector('Body').appendChild(battleHeader);
    createAlienFleet(6);
    commenceAssault();
}

//Quit Game Logic
 function quitGame() {
    alert("Aye captain, there's too many. Full retreat!")
    document.querySelector('body').innerHTML = beginState
 }
// });