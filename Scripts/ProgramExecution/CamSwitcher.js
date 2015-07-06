#pragma strict

//	Attatch this Script to the GameCameras object, which will hold only game related cams

public function CycleCam() {
	/* To be called by the switch camera button in FunctionHUD
	 *
	 * Cycles through the child cameras of GameCameras and sets the next one active
	 */
	 for (var camNum = 0; camNum < transform.childCount; camNum++) {
	 	// Get the background camera and disable it (the child of the child), as it allows movement
	 	var cam : GameObject = transform.GetChild(camNum).GetChild(0).gameObject;
	 	if (cam.activeSelf) {
	 		cam.SetActive(false);
	 		transform.GetChild(camNum == transform.childCount - 1 ? 0 : ++camNum).GetChild(0).gameObject.SetActive(true);
	 		break;
	 	}
	 }
}
