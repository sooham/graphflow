#pragma strict

// Attach to any object in scene to disable cursor

function Start () {
    // set cursor to be invisible
    Cursor.visible = false;
    Cursor.lockState = CursorLockMode.Locked;
}
