#pragma strict

import UnityEngine.UI;
import UnityEngine.Audio;

// Contains functions related to the programExecturer object
// which will read through a function tray and execute orders

var waitTime : float = 0.5f;				// The time between each instruction
var nyanCat : AudioClip;					// The nyan cat audio clip
private var player : GameObject;			// The player
private var nyanCatLength : float = 7.2f;
private var playTime : float = -nyanCatLength;		// Intentionally negative

function Awake() {
	player = GameObject.FindWithTag("Player");
}

public function Execute(panel : Transform) {
	// This is the function called by the button press
//	if (Time.time > playTime + nyanCatLength) {
//	playTime = Time.time;
//	AudioSource.PlayClipAtPoint(nyanCat, Vector3.zero, 0.3);
//	}
	ProgramExecute(panel);
	// Someway to stop it
}

function ProgramExecute( functionPanel : Transform) 
{	// Execute all the steps in the functionPanel Panel, one by one
	// The function is a coroutine to make life easier
	var numSlots = functionPanel.childCount;
	var i : int = 0;
	
	while (i < numSlots)
	{
		// Access the function name
		var slot : Transform = functionPanel.GetChild(i);
		
		
		if (slot.childCount > 0) {
			// color the slot object green while executing
			slot.gameObject.GetComponent(Image).color = new Color(1, 0, 0, 0.75);
			
			// The slot is non empty
			var functionName = slot.GetChild(0).name;
			// call the appropriate function from the PlayerMovement script
			switch (functionName)
			{
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
			slot.gameObject.GetComponent(Image).color = new Color(1, 1, 1, 0.75);
		}
		i++;	
	}
}
