#pragma strict

private var loadingScreen : GameObject;
private var endLevel : boolean = true;      // for managing async loading

function Update () {
    WaitPlayerReachStarAndTrashCollected();
}

function WaitPlayerReachStarAndTrashCollected() {
	if (endLevel && GameObject.FindGameObjectsWithTag("Trash").Length == 0 && (transform.Find("PlayerM") || transform.Find("PlayerF"))) {
        endLevel = false;
        loadingScreen = GameObject.Find('/FunctionHUD/LoadingScreen');
		yield WaitForSeconds(1);
		loadingScreen.transform.GetChild(0).gameObject.SetActive(true);
		Application.LoadLevel(Application.loadedLevel + 1);
	}
}
