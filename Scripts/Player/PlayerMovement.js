#pragma strict

import UnityEngine.Audio;
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
var blockedSound : AudioClip;

/* Compass directions
 * North is the direction towards the robot arm and the gantry
 */ 
 
private var playerFacing : String = "N";	// The direction the player is facing acording to compass "NSEW"


//#################### MOVEMENT FUNCTIONS #########################

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

function getChildWithName(objName: String, object : Transform) : Transform {
	/* Helper function
	 * returns first Transform with name objName that is child of object. Otherwise return null
	 */
	 for (var i = 0; i < object.childCount; i++) {
	 	if (object.GetChild(i).name == objName)
	 		return object.GetChild(i);
	 }
	 return null;
}

public function moveOneUnit() {
	/* move to the next / previous node if available and player is facing correct direction
	 * We use naming schema as follows to understand the position of node relative to parents
	 *
	 * Called by the programExecuter when it see the forward button
	 *
	 * NodeE - node going eastwards
	 * NodeW - node going westwards
	 * NodeN - node going northwards (towards robot arm)
	 * There are no such things as south nodes - they will not work with this movement method
	 *
	 * NOTE: THIS WILL NOT WORK WORK WITH GRAPHS, ONLY WITH TREES, make a graph data type for graph
	 */
	var currentNode : Transform = transform.parent;	
	var blocked : boolean = true;
	
	switch (playerFacing) {
		case "S":
			if (currentNode.name == "NodeN" && currentNode.parent.name == "NodeN") {
				blocked = false;
				transform.SetParent(currentNode.parent, true);
			} 
			break;
		case "E":
			// here if we are going up or down the linked list / tree is ambiguous
			if (currentNode.name == "NodeW") {
				blocked = false;
				transform.SetParent(currentNode.parent, true);
			} else if (getChildWithName("NodeE", currentNode)) {
				// move to that 
				blocked = false;
				transform.SetParent(getChildWithName("NodeE", currentNode), true);
			}
			break;
		case "W":
			// here if we are going up or down the linked list / tree is ambiguous
			if (currentNode.name == "NodeE") {
				blocked = false;
				transform.SetParent(currentNode.parent, true);
			} else if (getChildWithName("NodeW", currentNode)) {
				// move to that 
				blocked = false;
				transform.SetParent(getChildWithName("NodeW", currentNode), true);
			}
			break;
		default: // N
			if (getChildWithName("NodeN", currentNode)) {
				blocked = false;
				transform.SetParent(getChildWithName("NodeN", currentNode), true);
			}
			break;
	}
	
	// play blocked sound if there is no way to go
	if (blocked) {
		AudioSource.PlayClipAtPoint(blockedSound, Vector3.zero, 1.0f);
	} else {
		// move and update current node
		movePlayer();
	}
	
}

function Turn(angle : float) {
	/* Helper function
	 * Turns the player by angle degrees relative to the parent
	 */
	var curEuler = transform.localEulerAngles;
	var newAngle = curEuler.y + angle;
	var rotationStartTime = Time.time;
	var timeDiff = 0f;
	while (timeDiff < movementTime) {
		timeDiff = Time.time - rotationStartTime;
		curEuler.y = Mathf.MoveTowards(curEuler.y, newAngle, 50 * timeDiff / movementTime);
		transform.eulerAngles = curEuler;
		yield;
	}
}

public function TurnLeft() {
	/* Turn the player -90 degrees (from North to West)
	 * This function is called by program executer when it sees the turnleft sign
	 */
	playerFacing = (playerFacing == "N") ? "W": (playerFacing == "W" ? "S" : (playerFacing == "S" ? "E" : "N"));
	Turn(-90.0f);
}

public function TurnRight() {
	/* Turn the player 90 degrees (from North to East)
	 * This function is called by program executer when it sees the turnright sign
	 */
	playerFacing = (playerFacing == "N") ? "E": (playerFacing == "E" ? "S" : (playerFacing == "S" ? "W" : "N"));
	Turn(90.0f);
}