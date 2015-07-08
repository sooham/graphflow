#pragma strict

/* This script must be attatched to dialogue boxes that follow the Player
 * on screen. As some players are destroyed at the beginning of the GameObject,
 * this can deal with that, you can tell it to follow male or female bots in the
 * start function.
 */

var xOffset : float = 0.0f;
var yOffset : float = 0.0f;
var wantOppositePlayerGender : boolean = false;
var findString : String;
private var playerToFollow : GameObject;


function Awake() {
	/* Gets the player in heirarchy to follow, taking
	 * into account the player gender settings
	 * from the human player
	 */
	 
	var getGender : String = PlayerGenderSettings.gender;
	if (wantOppositePlayerGender) {
		getGender = (getGender == "F" ? "M" : "F");
	}
	playerToFollow = GameObject.Find(findString + "Player" + getGender);
}

function OnGUI() {
	/* Sets the position of the transform to the player's position + offset 
	 * as given in by the player.
	 */
	 var screenPos : Vector3;
	try {
		// to prevent fatal errors when switching between cameras
		screenPos = GetComponent.<Camera>().current.WorldToScreenPoint(playerToFollow.transform.position);
	} catch (e) {
	    screenPos = transform.position;
	}
	// normalise the vector relative to the screen size
	screenPos.x += xOffset;
	screenPos.y += yOffset;
	screenPos.z = 0.0f;
	// Set the transform position to screenPos
	transform.position =  screenPos;
	
}