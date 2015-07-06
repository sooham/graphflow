#pragma strict
/* Attatch to player gameObject
 *
 * This script allows the player to traverse the LevelGraph object as though it is traversing
 * a linked list. A level graph object is a Node containing a) nothing b) another node
 *
 * traversal forwards happens by chaning the parent of the player object to the destination node
 * and lerping the player's local position to zero.
 *
 * The player must always be a child of a node object in the LevelGraph object
 */


var movementTime : float = 0.5f;			// The time to conduct a move

/* Compass directions
 * North is the direction towards the robot arm and the gantry
 */ 
 
private var playerRotation : String = "F";	// The direction the player is facing acording to compass "NSEW"

function movePlayer() {
	/* To be used after the player has changed parent in the LevelGraph
	 * 
	 * Lerps the player over movement time from current position to (0, 0, 0) relative to new position.
	 */

	var startPos : Vector3 = transform.localPosition;	// get localPosition
	var movingStartTime : float = Time.time;
	var timeDiff : float = 0f;
	while (timeDiff < movementTime) {
		timeDiff = Time.time - movingStartTime;
		transform.localPosition = Vector3.Lerp(startPos, Vector3.zero, timeDiff / movementTime);
		yield;
	}
}

public function moveOneUnit() {
	// move to the next node in the graph if available
	// We check if there is a forward node using a proper naming schema in LevelGraph
	// NodeF - Node in front
	// NodeL - Node to left
	// NodeR - Node to right
	var currentNode : Transform = transform.parent;	
	Debug.Log(currentNode.name);
	if (currentNode.childCount > 1) {
		// Has a child node, check for child nodes of right orientations.
		for (var i = 0; i < currentNode.childCount; i++) {
			if (currentNode.GetChild(i).name == "Node" + playerRotation) {
				// move to current node
				transform.parent = currentNode.GetChild(i);
				// Lerp to the next nodes position that is [0,0,0]
				movePlayer();
				return;
			}
		}
		
		Debug.Log("Change orientation of robot");
		
	} else { // Leaf Node, do not move
		Debug.Log("You are on a leaf node");
	}
	
}

function Turn(angle : float) {
	// turn the player by angle degrees
	var curEuler = transform.localEulerAngles;
	var newAngle = curEuler.y + angle;
	var startTime = Time.time;
	while ((Time.time - startTime) < movementTime) {
		curEuler.y = Mathf.MoveTowards(curEuler.y, newAngle, 100 * (Time.time - startTime) / movementTime);
		transform.eulerAngles = curEuler;
		yield;
	}
}

public function TurnLeft() {
	playerRotation = (playerRotation == "F") ? "L": (playerRotation == "R" ? "F" : (playerRotation == "B" ? "R" : "B"));
	Turn(-90.0f);
}

public function TurnRight() {
	// turn the player by 90 degrees to the right
	playerRotation = (playerRotation == "F") ? "R": (playerRotation == "L" ? "F" : (playerRotation == "B" ? "L" : "B"));
	Turn(90.0f);
}