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
