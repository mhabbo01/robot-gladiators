// game states
// "WIN" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
//"Lose" - Player robot's health is zero or less

// math.random() * 21 gives us 0 to 20, math floor gives us a rounded down number so we dont get a decimal and then we add 40.
// the highest we can get here is 60.  the least will be 40.
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}

var getPLayerName = function() {
  var name = "";
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
}

var playerInfo = {
  name: getPLayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() { // we are setting a function to reset the values when the startgame() function is called.  the word this will point to the reset values in the object
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20; //shorthand for this.health = this.health + 20 and so on below.
      this.money -= 7;
  }
  else {
    window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
  }
  else {
    window.alert("You don't have enough money!");
  }
 }
};
// you can also log multiple values at once like this
//console.log(playerName, playerAttack, playerHealth);


// we created var enemy info instead of using the array before, this is still an array but it is easier for us to use.
var enemyInfo = [
  {
    name: "Roberto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

// var enemyNames = ["Roborto", "Amy Andorid", "Robo Trumble"]; // the names in the [] are the array elements
// var enemyHealth = 50;
// var enemyAttack = 12;

// console.log(enemyNames);
// console.log(enemyNames[0]);
// console.log(enemyNames[1]);
// console.log(enemyNames[2]);
// console.log(enemyNames.length);
// for(var i = 0; i < enemyNames.length; i++) {
//   console.log(enemyNames[i]);
//   console.log(i);
//   console.log(enemyNames[i] + " is at " + i + "index");
// }



var fight = function(enemy) {
  // while loop repeatedly executes the code block only if the condition remains true, in this case its player health greater than zero AND enemy health greater than zero.
  // the code for the fight function is inside the while loop.
  while(playerInfo.health > 0 && enemy.health > 0) {
        // Alert players that they are starting the round

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?  Enter 'Fight' or 'SKIP' to choose.");

        if (promptFight === "skip" || promptFight === "SKIP") {
          //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            //if yes(true), leave fight
            if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight.  Goodbye!");
                //subtract money from playerMoney for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log (playerInfo.name + " has " + playerInfo.money + " player money " + " remaining.");
            break;
            }
          }    
    
        // if player choses to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT") {
        // remove enemy's health by subtracting the amount set in the playerAttack variable
          var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
          enemy.health = Math.max(0, enemy.health - damage);
          console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");
        // check enemy's health
        if (enemy.health <= 0) {
          window.alert(enemy.name + " has died!");
          playerInfo.money = playerInfo.money + 20;
          break;
        } else {
          window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
        
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        // remove player's health by subtracting the amount set in the enemyAttack variable. math.max(0, variable) makes sure we dont get a negative number.
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
      
        // check player's health
        if (playerInfo.health <= 0) {
          window.alert(playerInfo.name + " has died!");
          break;
        } else {
          window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
        // if player choses to skip
        } 
          //if no (false), ask question again by running fight() again
          else {
              fight();
          }
        }  
};

// function to start a new game
var startGame = function() {
  //reset player stats
  playerInfo.reset();

for(var i = 0; i < enemyInfo.length; i++) {
  // if player is still alive, keep fighting
  if (playerInfo.health > 0) {
    // let player know what round this is, arrays start at zero so you need to add 1
    window.alert("Welcome to Robot Gladiators! Round " + ( i + 1) );
    // pick new enemy to fight pased on the index
    var pickedEnemyObj = enemyInfo[i];
    // reset enemy health will be reset to a random number.  math.random() * 21 gives us 0 to 20, math floor gives us a rounded down number so we dont get a decimal and then we add 40.
    // the highest we can get here is 60.  the least enemy health will be 40.  see function for randomNumber below.
    pickedEnemyObj.health = randomNumber(40, 60);
    // pass the enemyPickedName variables value into the fight function, where it will assume the value of the enemyName parameter
    fight(pickedEnemyObj);
    // if player is still alive and we're not at the last enemy in the array
    if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
      // ask if player wants to use the store before the next round
      var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

      //if yes, take them to the store() function
      if (storeConfirm) {
        shop();
      }
    }
  }
  else {
    window.alert("You have lost your robot in battle! Game Over!");
    break;
  }
 }
 // after loop ends, we are either out of playerHealth or enemies to right, so run the endGame function.  Function can be called even though we delcared it after calling it.
  endGame();
};

var endGame = function() {
  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
  window.alert("Great job, you've survived the game!  You now have a score of " + playerInfo.money + ".");
} else {
  window.alert("You've lost your robot in battle.");
}
  var playAgainConfirm = window.confirm("Would you like to play again?");
  if (playAgainConfirm) {
    //restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
}

// shop between battles function
var shop = function() {
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store?  Please enter one 'REFILL', 'UPGRADE', OR 'LEAVE' to make a choice."
  );

  // use switch case to carry out action
  switch (shopOptionPrompt) {
    case "refill":
    case "REFILL":
      playerInfo.refillHealth();
      break;
    case "UPGRADE":
    case "upgrade":
      playerInfo.upgradeAttack(); 
      break;
    case "LEAVE":
    case "leave":
      window.alert("Leaving the store.");
      
      //do nothing, function will end
      break;
     default:
       window.alert('You did not pick a valid option. Try again.')
       
       //call shop() again to force player to pick a valid option
       shop();
       break;
  }
};



//start the game when the page loads
startGame();
