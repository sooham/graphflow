#pragma strict

// Attatch to the camera that follows player, ensure there is correct offset when starting

private var player : GameObject;
private var offset : Vector3;

function Start () {
	/* Get the player and set the offset between the player and camera
	 */
	player = GameObject.FindWithTag("Player");
	if (player == null) {
		Debug.Log("Player Tab missing in heirarchy.");
	}
	
	offset = transform.position - player.transform.position;
	
}

function LateUpdate () {
	/* Change the position of camera to new player postion + offset
	 * Every update of Frame.
	 */
	transform.position = player.transform.position + offset;
}