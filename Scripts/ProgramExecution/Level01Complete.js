#pragma strict

var loadingScreen : GameObject;

function Update () {
	WaitPlayerReachStarAndTrashCollected();
}

function WaitPlayerReachStarAndTrashCollected() {
	if (GameObject.FindGameObjectsWithTag("Trash").Length == 0 &&(transform.Find("PlayerM") || transform.Find("PlayerF"))) {
		yield WaitForSeconds(1);
		loadingScreen.SetActive(true);
		Application.LoadLevel(0);
	}
}