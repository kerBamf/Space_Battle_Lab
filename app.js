
//Build Player Ship
let playerShip = {
    hull: 20,
    firePower: 5,
    accuracy: .7
}

//Creating Alien Fleet
let alienFleet = [];

//Creating Ship Class
class Ship {
        name: 'Alien Ship'
        hull: Math.floor(Math.random() * 4) + 3,
        firepower: Math.floor(Math.random() * 3) + 2,
        accuracy: (Math.floor(Math.random() * 3) + 6) * .1,
        attack(enemy) {
            let attackScore = Math.random();
            if (attackScore < this.accuracy) {


            }
        }
    //console.log(newShip);
    alienFleet.push(newShip);
}

//Fleet Creation Builder
for (let i = 1, i < 7; i++) {
    createAlienShip();
}

//console.log(playerShip);
//console.log(alienFleet);


