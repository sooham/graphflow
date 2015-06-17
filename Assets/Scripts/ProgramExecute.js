#pragma strict

var waitTime : float = 1f;				// The time between each instruction
private var player : GameObject;		// The player

function Awake() {
	player = GameObject.FindWithTag("Player");
}

public function Execute(panel : GameObject) {
	ProgramExecute(panel);
}

function ProgramExecute( functionPanel : GameObject) 
{	// Execute all the steps in the functionPanel Panel, one by one
	// The function is a coroutine to make life easier
	var slotManager : Transform = functionPanel.transform.GetChild(0);
	var numSlots = slotManager.childCount;
	var i : int = 0;
	
	while (i < numSlots)
	{
		// Access the function name
		var slot : Transform = slotManager.GetChild(i);
		
		
		if (slot.childCount > 0) {
			// The slot is non empty
			var functionName = slot.GetChild(0).name;
			// call the appropriate function from the PlayerMovement script
			switch (functionName)
			{
    			case "Forward":
    				print("Told to move forward");
    				player.GetComponent(PlayerMovement).moveForwardOneUnit();
        			break;
        		case "TurnLeft":
        			print("Told to turn left");
        			break;
        		case "TurnRight":
        			print("Told to turn right");
        			break;
        		case "Recurse":
        			print("Told to turn recurse");
        			break;
    			default:
        			break;
    		}
    		
    		yield WaitForSeconds(waitTime);
			
		}
		i++;	
	}
}
