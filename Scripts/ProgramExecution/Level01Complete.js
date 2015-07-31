#pragma strict

private var loadingScreen : GameObject;

function Start() {
    loadingScreen = GameObject.Find('/FunctionHUD/LoadingScreen');
}

function Update () {
	WaitPlayerReachStarAndTrashCollected();
}

function WaitPlayerReachStarAndTrashCollected() {
	if (GameObject.FindGameObjectsWithTag("Trash").Length == 0 && (transform.Find("PlayerM") || transform.Find("PlayerF"))) {
		yield WaitForSeconds(1);
		loadingScreen.transform.GetChild(0).gameObject.SetActive(true);
		Application.LoadLevel(0);
	}
}
