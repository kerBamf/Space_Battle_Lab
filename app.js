//Build Player Ship
let playerShip = {
    name: 'USS Assembly',
    hull: 20,
    firePower: 5,
    accuracy: .7,
    attack(enemy) {
        let attackScore = Math.random();
        if (attackScore < this.accuracy) {
            enemy.hull -= 5;
            if (enemy.hull > 0) {
            console.log(`We've scored a hit on ${enemy.name}, captain!`)
            } else if (enemy.hull = 0) {
                console.log(`Confirmed kill, captain! ${enemy.name} destroyed!`)
            } else if (enemy.hull < 0 ) {
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
            let attackScore = Math.random();
            if (attackScore < this.accuracy) {
                enemy.hull -= this.firepower
                console.log(`${this.name} landed a hit on the ${enemy.name}! She has ${enemy.hull} hull points left!`)
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


createAlienFleet(6);
console.log(alienFleet)

//Combat Logic
function commenceAssault() {

}
