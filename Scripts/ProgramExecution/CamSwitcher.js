#pragma strict

var cameras : GameObject[];
private var current : int = 0;

public function CycleCam() {
	// Cycles through camera in cameras[] with button press
	current = current == cameras.length - 1 ? 0: ++current;
	SelectCamera(current);
}

function SelectCamera(index : int) {
	for (var i = 0; i < cameras.length; i++) {
		// Activate the camera with index
		cameras[i].SetActive(i == index);
	}
}
