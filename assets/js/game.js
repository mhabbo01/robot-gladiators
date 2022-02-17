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
            playerMoney = playerMoney - 10;
            console.log (playerName + " has " + playerMoney + " player money " + " remaining.");
            break;
            }
          }    
    
        // if player choses to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT") {
        // remove enemy's health by subtracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");
        // check enemy's health
        if (enemyHealth <= 0) {
          window.alert(enemyName + " has died!");
          playerMoney = playerMoney + 20;
          break;
        } else {
          window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
      
        // remove player's health by subtracting the amount set in the enemyAttack variable
        playerHealth = playerHealth - enemyAttack;
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

for(var i = 0; i < enemyNames.length; i++) {
  if (playerHealth > 0) {
    window.alert("Welcome to Robot Gladiators! Round " + ( i + 1) );
    var pickedEnemyName= enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
  }
}

