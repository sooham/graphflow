#pragma strict

// Attach to the camera that follows player, ensure there is correct offset when starting

private var player : GameObject;
private var offset : Vector3;
private var found : boolean = false;

function LateUpdate () {
	/* Change the position of camera to new player position + offset
	 * Every update of Frame.
	 */
    if (!found) {
        player = GameObject.FindGameObjectsWithTag('Player')[0];
        offset = transform.position - player.transform.position;
        found = true;
    }

	transform.position = player.transform.position + offset;
}
