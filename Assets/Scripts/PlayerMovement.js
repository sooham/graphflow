#pragma strict

var moveDistance : float = 4f;				// a unit of movement for the player
var speed: float = 2f;						// the speed in Unity units per second for the player
var moveAudio : AudioClip;					// The audio to play when moving

private var moving: boolean = false; 		// is the player currently moving?
private var playerRigidbody : Rigidbody;

public function moveForwardOneUnit() {
	// moves the player forwad by one unit
	// check the moving boolean to check if the player is still moving before calling
	// Use a couroutine that Lerps between the current position and the final position to allow for successive function calls
	if (moving) return; // ignore other function calls while moving
	moving = true;
	var startPos : Vector3 = playerRigidbody.position;
	var endPos : Vector3 = startPos + transform.forward * moveDistance;
	var curDistTravelled : float = 0f;
	
	// play the moving sound
	AudioSource.PlayClipAtPoint(moveAudio, transform.position, 0.2);	
	while (curDistTravelled < moveDistance)
	{
		curDistTravelled += Time.deltaTime * speed;
		playerRigidbody.position = Vector3.Lerp(startPos, endPos, Mathf.Clamp(curDistTravelled / moveDistance, 0, 1));
		yield;
	}
	moving = false; // finished moving
}


/***************************** UNITY BUILTIN FUNCTIONS *****************************/

function Start () {
	playerRigidbody = GetComponent.<Rigidbody>();
	if (playerRigidbody == null) {
		Debug.Log("Your player needs a rigidbody attatched!");
	}
}

//function FixedUpdate() {
//	// call the moveForwardOneUnit iff the spacebar key is pressed
//	if (Input.GetKeyDown("space") && !moving) {
//		moveForwardOneUnit();
//	}
//}

