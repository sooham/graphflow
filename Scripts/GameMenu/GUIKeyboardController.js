#pragma strict
import UnityEngine.EventSystems;

/* This script is used to make a set of GUI buttons keyboard controllable
 * allowing for arrow key traversal and return press activation
 * please attach to the parent of the buttons and then add in all buttons needed
 *
 */

public var buttons : Button[]; // List of buttons to be keyboard iterated - in correct order
public var updown : boolean = true;  // Is this navigation style up to down , left to right if false
public var moveRate : float = 0.5f;

private var current : int = 0;
private var direction: int;
private var nextPress : float = 0.05f;
function Update() {
	/* Uses the listeners for the Keyboard up and down presses
	 * and activates the correct focus animation
	 */
	var pointer = new PointerEventData(EventSystem.current);
    if (updown) {
	// Check if keyboard input and increase / decrease the current button
        if ((Input.GetKey(KeyCode.UpArrow) || Input.GetKey(KeyCode.W)) && Time.time > nextPress)
        {
            direction = -1;
            nextPress = Time.time + moveRate;
        }
        if ((Input.GetKey(KeyCode.DownArrow) || Input.GetKey(KeyCode.S)) && Time.time > nextPress) {
            direction = 1;
            nextPress = Time.time + moveRate;
        }
    } else {
        if ((Input.GetKey(KeyCode.LeftArrow) || Input.GetKey(KeyCode.A)) && Time.time > nextPress) {
            direction = -1;
            nextPress = Time.time + moveRate;
        }
        if ((Input.GetKey(KeyCode.RightArrow) || Input.GetKey(KeyCode.D)) && Time.time > nextPress) {
            direction = 1;
            nextPress = Time.time + moveRate;
        }
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
     var temp: Button;
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
