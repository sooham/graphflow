#pragma strict

import UnityEngine.UI;

// Contains functions related to the programExecturer object
// which will read through a function tray and execute orders

var waitTime : float = 0.5f;				// The time between each instruction

private var player : GameObject;			// The player
private var nyanCat : AudioSource;			// The nyanCat audio to play

//################## UNITY NATIVE FUNCTIONS #########################

function Awake() {
	// Gets all needed variables before hand to optimise
	
	player = GameObject.FindWithTag("Player");
	nyanCat = gameObject.GetComponent(AudioSource);
}

//################## EXECUTION FUNCTIONS #############################

public function ProgramExecute(functionPanel : Transform) {
	/* To be called by the play button in FunctionHUD
	 *
	 * This function takes in a functionPanel and goes through the panels
	 * slots, identifying each symbol and executing the corresponding function
	 * as a Coroutine to create artificial step like delays.
	 *
	 */
	 
	// call an inner anonymous function so that this function can be called via
	// Unity on Button Press event
	function () {
		var numSlots = functionPanel.childCount;
		
		for (var i = 0; i < numSlots; i++) {
			// Access the slot Item
			var slot : Transform = functionPanel.GetChild(i);
			// color the slot green to show its executing
			slot.gameObject.GetComponent(Image).color = new Color(0, 1, 0, 0.75);
			
			if (slot.childCount > 0) {
				// Start playing nyanCat if it is not playing when we see full slots
				if (!nyanCat.isPlaying) {
					nyanCat.Play();
				}
				// the slot is non-empty, get the function 
				var slotItemName : String = slot.GetChild(0).name;
				
				switch (slotItemName) {
				// call the appropriate function from the PlayerMovement script
    			case "Forward":
    				print("Told to move forward");
    				player.GetComponent(PlayerMovement).moveOneUnit();
        			break;
        		case "TurnLeft":
        			print("Told to turn left");
    				player.GetComponent(PlayerMovement).TurnLeft();
        			break;
        		case "TurnRight":
        			print("Told to turn right");
    				player.GetComponent(PlayerMovement).TurnRight();
        			break;
        		case "Inspect":
        			print("Told to inspect");
        			break;
        		case "Recurse":
        			print("Told to turn recurse");
        			break;
    			default:
        			break;
				}
    			yield WaitForSeconds(waitTime);
			} else {
				// terminate nyan cat upon the all occurrences of empty slots
				nyanCat.Stop();
			}
    		// remove the color
			slot.gameObject.GetComponent(Image).color = new Color(1, 1, 1, 0.75);
		}
	}();
}


//################## RESET FUNCTIONS #############################

public function resetProgramState(levelGraphPrefab : GameObject) {
	/* To be called by the stop button (which only shows during and after play button is pressed)
	 *
	 * Resets the stage to it's initial settings. The coroutine programExecute is stopped by the button press.
	 * This is done by hiding the object GraphLevel in heirarchy and replacing its prefab levelGraphPrefab.
	 *
	 * The graphflow prefab MUST NOT contain any players.
	 * The function will check the reset the state of the current player in heirarchy
	 * place him in the correct position in the GraphLevel.
	 */
	 
	 // there is an issue, we cannot delete the previous graph object as it is made using prototype
	 // I found out that prototype objects mess up the system when deleted
	 
	 // get the old prefab
	 var oldLevel : GameObject = GameObject.Find("LevelGraph");
	 // Instantiate the prefab
	 var newLvlGraph = Instantiate(levelGraphPrefab, oldLevel.transform.position, oldLevel.transform.rotation) as GameObject;
	 // Child the player into the new levelGraph
	 player.transform.SetParent(newLvlGraph.transform.GetChild(0));
	 // Reset the player's state i.e facing direction and transform
	 player.GetComponent(PlayerMovement).playerFacing = "N";
	 player.transform.localPosition = Vector3.zero;
	 player.transform.localRotation = Quaternion.identity;
	 oldLevel.SetActive(false);
	 // rename the new level
	 newLvlGraph.name = "LevelGraph";
	 
	 // deactivation of calling button, activation of play button is done in button interface, so is stopping all coroutines
}
