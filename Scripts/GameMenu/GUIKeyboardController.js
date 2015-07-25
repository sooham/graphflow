#pragma strict
import UnityEngine.EventSystems;

/* This script is used to make a set of GUI buttons keyboard controllable
 * please attatch to the parent of the buttons and then add in all buttons needed
 */ 

public var buttons : Button[]; // List of buttons to be keyboard iterated - in correct order
private var current : int = 0;
private var direction: int;
function Update() {
	/* Uses the listeners for the Keyboard up and down presses
	 * and activates the correct focus animation
	 */
	var pointer = new PointerEventData(EventSystem.current);
	
	// Check if keyboard input and increase / decrease the current button
	if (Input.GetKeyUp(KeyCode.UpArrow) || Input.GetKeyUp(KeyCode.W)) {direction = 1;}
	if (Input.GetKeyUp(KeyCode.DownArrow) || Input.GetKeyUp(KeyCode.S)) {direction = -1;}
	
	// if keyboard input stop highlighting old button
	if (direction != 0) {
		ExecuteEvents.Execute(buttons[current].gameObject, pointer, ExecuteEvents.pointerExitHandler);
	}
	
	
	// get and highlight new buttons
	if (current == 0 && direction < 0) {
		current = buttons.Length - 1;
	} else if (current == (buttons.Length - 1) && direction > 0){
		current = 0;
	} else {
		current += direction;
	}
	
	ExecuteEvents.Execute(buttons[current].gameObject, pointer, ExecuteEvents.pointerEnterHandler);
	
	// add return listener and execute button press
	if (Input.GetKeyUp(KeyCode.Return)) {
		ExecuteEvents.Execute(buttons[current].gameObject, pointer, ExecuteEvents.submitHandler);
	}
	// reset the direction	
	direction = 0;
	 
}