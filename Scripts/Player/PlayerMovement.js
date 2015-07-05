#pragma strict
// Attatch to player

// Uses the level graph object as a tree - where child nodes are the next nodes like a linked list
// and all other children are objects on that tile
// allows for easy and graph resitricted navigation
// make sure the player is always a child of a specific node in the LevelGraph
// and that the root node is always the starting node

var movementTime : float;					// The time to conduct a move
private var playerRotation : String = "F";	// The direction player faces, Forward, Left or Right or Back

function movePlayer() {
	// Lerps the player to dest (0,0,0) from current position
	var startPos : Vector3 = transform.localPosition;
	var movingStartTime = Time.time;
	while ((Time.time - movingStartTime) < movementTime) {
		transform.localPosition = Vector3.Lerp(startPos, Vector3.zero, Mathf.Clamp((Time.time - movingStartTime) / movementTime,0 , 1));
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