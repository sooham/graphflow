#pragma strict

/* This script controls insertion of icons into the every MainProgram slot
 * when any valid moveTray move icon is selected and pressed.
 *
 * Attach this script to the MainProgram in FunctionHUD
 */

static var cursor : Transform;
static var cursorPos : int = 0;
/******************** HELPER FUNCTIONS********************/
public function insertIntoProgram(button: GameObject) {
    /* To be called by every button in moveTray upon button press
     * This function takes the calling gameObject as argument
     * and inserts it into MainProgram's first slot
     *
     * Ensures that cursor is always at the end unless it is
     * at the last position, then it is removed
     */

    if (cursorPos < transform.childCount) {
        // make a copy of the button
        var buttonCopy = Instantiate(button) as GameObject;
        buttonCopy.name = button.name;
        // remove the cursor from current index
        // and give it to button
        transform.GetChild(cursorPos).GetChild(0).SetParent(null);
        buttonCopy.transform.SetParent(transform.GetChild(cursorPos));

        if (cursorPos < transform.childCount - 1) {
            // add cursor if enough space
            cursor.SetParent(transform.GetChild(cursorPos + 1));
        }
        cursorPos++;
    }
}

public function removeFromProgram() {
    /* To be called by pressing the backspace key or pressing
     * the dedicated moveTray delete button. Removes the
     * last slot's item from mainProgram unless it is empty
     * Also adds in cursor if needed.
     */
    if (cursorPos > 0) {
        // move the cursor back one step
        Destroy(transform.GetChild(cursorPos - 1).GetChild(0).gameObject);
        cursor.SetParent(transform.GetChild(cursorPos - 1));
        cursorPos--;
    }
}

/******************** NATIVE FUNCTIONS********************/
function Start() {
    cursor = transform.GetChild(cursorPos).GetChild(0);
}

function Update () {
    if (Input.GetKeyUp(KeyCode.Backspace)) {
        print('pressed');
        removeFromProgram();
    }
}
