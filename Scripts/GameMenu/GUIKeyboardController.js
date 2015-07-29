#pragma strict
import UnityEngine.EventSystems;

/* This script is used to make a set of GUI buttons keyboard controllable
 * allowing for arrow key traversal and return press activation
 * please attach to the parent of the buttons and then add in all buttons needed
 *
 */

public var buttons : Button[]; // List of buttons to be keyboard iterated - in correct order
public var updown : boolean = true;  // Is this naviagtion style up to down , left to right if false
private var current : int = 0;
private var direction: int;
function Update() {
	/* Uses the listeners for the Keyboard up and down presses
	 * and activates the correct focus animation
	 */
	var pointer = new PointerEventData(EventSystem.current);

    if (updown) {
	// Check if keyboard input and increase / decrease the current button
        if (Input.GetKeyUp(KeyCode.UpArrow) || Input.GetKeyUp(KeyCode.W)) {direction = -1;}
        if (Input.GetKeyUp(KeyCode.DownArrow) || Input.GetKeyUp(KeyCode.S)) {direction = 1;}
    } else {
        if (Input.GetKeyUp(KeyCode.LeftArrow) || Input.GetKeyUp(KeyCode.A)) {direction = -1;}
        if (Input.GetKeyUp(KeyCode.RightArrow) || Input.GetKeyUp(KeyCode.D)) {direction = 1;}
    }

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

public function dealWithPlayPauseHighlighting(pressed: String) {
    // Changes the index of the play pasuse button in buttons[]
    // Thereby highlighting it instead
    // To be only use for moveTray
     var temp;
    if (pressed == 'Play') {
        temp = buttons[7];
        buttons[7] = buttons[8];
        buttons[8] = temp;
    }
    if (pressed == 'Pause') {
        temp = buttons[8];
        buttons[8] = buttons[7];
        buttons[7] = temp;
    }
}
