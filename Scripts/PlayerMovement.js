#pragma strict
// Attatch to player

// Uses the level graph object as a tree - where child nodes are the next nodes like a linked list
// and all other children are objects on that tile
// allows for easy and graph resitracted navigation
// make sure the player is always a child of a specific node in the LevelGraph
// and that the first node is always the starting node

var movementTime : float;					// The time to conduct a move
private var playerRotation : String = "F";	// The direction player faces, forward, left or right

function movePlayer() {
	// Lerps the player to dest from current position
	var startPos : Vector3 = transform.localPosition;
	var movingStartTime = Time.time;
	while ((Time.time - movingStartTime) < movementTime) {
		transform.localPosition = Vector3.Lerp(startPos, Vector3(0.0f, 0.1f, 0.0f), Mathf.Clamp((Time.time - movingStartTime) / movementTime,0 , 1));
		yield;
	}
}

public function moveForwardOneUnit() {
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
