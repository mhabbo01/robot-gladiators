// game states
// "WIN" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
//"Lose" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// you can also log multiple values at once like this
//console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Andorid", "Robo Trumble"]; // the names in the [] are the array elements
var enemyHealth = 50;
var enemyAttack = 12;

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



var fight = function(enemyName) {
  // while loop repeatedly executes the code block only if the condition remains true, in this case its player health greater than zero AND enemy health greater than zero.
  // the code for the fight function is inside the while loop.
  while(playerHealth > 0 && enemyHealth > 0) {
        // Alert players that they are starting the round

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?  Enter 'Fight' or 'SKIP' to choose.");

        if (promptFight === "skip" || promptFight === "SKIP") {
          //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            //if yes(true), leave fight
            if (confirmSkip) {
            window.alert(playerName + " has decided to skip this fight.  Goodbye!");
                //subtract money from playerMoney for skipping
            playerMoney = Math.max(0, playerMoney - 10);
            console.log (playerName + " has " + playerMoney + " player money " + " remaining.");
            break;
            }
          }    
    
        // if player choses to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT") {
        // remove enemy's health by subtracting the amount set in the playerAttack variable
          var damage = randomNumber(playerAttack - 3, playerAttack);
          enemyHealth = Math.max(0, enemyHealth - damage);
          console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");
        // check enemy's health
        if (enemyHealth <= 0) {
          window.alert(enemyName + " has died!");
          playerMoney = playerMoney + 20;
          break;
        } else {
          window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
        
        var damage = randomNumber(enemyAttack - 3, enemyAttack);
        // remove player's health by subtracting the amount set in the enemyAttack variable. math.max(0, variable) makes sure we dont get a negative number.
        playerHealth = Math.max(0, playerHealth - damage);
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");
      
        // check player's health
        if (playerHealth <= 0) {
          window.alert(playerName + " has died!");
          break;
        } else {
          window.alert(playerName + " still has " + playerHealth + " health left.");
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
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

for(var i = 0; i < enemyNames.length; i++) {
  // if player is still alive, keep fighting
  if (playerHealth > 0) {
    // let player know what round this is, arrays start at zero so you need to add 1
    window.alert("Welcome to Robot Gladiators! Round " + ( i + 1) );
    // pick new enemy to fight pased on the index
    var pickedEnemyName = enemyNames[i];
    // reset enemy health will be reset to a random number.  math.random() * 21 gives us 0 to 20, math floor gives us a rounded down number so we dont get a decimal and then we add 40.
    // the highest we can get here is 60.  the least enemy health will be 40.  see function for randomNumber below.
    enemyHealth = randomNumber(40, 60);
    // pass the enemyPickedName variables value into the fight function, where it will assume the value of the enemyName parameter
    fight(pickedEnemyName);
    // if player is still alive and we're not at the last enemy in the array
    if (playerHealth > 0 && i < enemyNames.length - 1) {
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
  if (playerHealth > 0) {
  window.alert("Great job, you've survived the game!  You now have a score of " + playerMoney + ".");
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
      if (playerMoney >=7) {
        window.alert("Refilling players health by 20 for 7 dollars.");

        //increase health and decrease money
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;
        console.log(playerName + " now has " + playerHealth + " health. " + playerName + " now has " + playerMoney + " money left.")
      }
      else {
        window.alert("You don't have enough money!");
      }
      break;
    case "UPGRADE":
    case "upgrade":
      if(playerMoney >=7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.")

        //increase attack and decrease money
        playerAttack = playerAttack +6;
        playerMoney = playerMoney - 7;
        console.log(playerName + " now has " + playerAttack + " attack points. " + playerName + " now has " + playerMoney + " money left.")
      }  
      else {
        window.alert("You don't have enough money!");
      }
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

// math.random() * 21 gives us 0 to 20, math floor gives us a rounded down number so we dont get a decimal and then we add 40.
// the highest we can get here is 60.  the least will be 40.
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}

//start the game when the page loads
startGame();
