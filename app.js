let playerShipName = 'USS Assembly'

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
    for (let i = 1; i <= num; i++) {
        let vessel = new Ship(`Alien Ship ${i}`);
        alienFleet.push(vessel);
    }
}


createAlienFleet(10);
//console.log(alienFleet[0])

let currentEnemy = alienFleet[0];
//console.log(alienFleet.indexOf(currentEnemy))

//Combat Logic
function commenceAssault() {
    let turn = 0
    while (playerShip.hull > 0 && currentEnemy.hull > 0) {
        if (turn == 0) {
            playerShip.attack(currentEnemy);
            //console.log(currentEnemy.hull);
            if (currentEnemy.hull <= 0 && alienFleet.indexOf(currentEnemy) < 9) {
                currentEnemy = alienFleet[(alienFleet.indexOf(currentEnemy) + 1)]
            }
            turn = 1
        } else {
            currentEnemy.attack(playerShip);
            //console.log(playerShip.hull);
            turn = 0
        }
    }
}

commenceAssault();