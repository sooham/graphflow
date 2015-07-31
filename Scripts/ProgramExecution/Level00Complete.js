#pragma strict

private var loadingScreen : GameObject;

function Start() {
    loadingScreen = GameObject.Find('/FunctionHUD/LoadingScreen');
}

function Update () {
	WaitPlayerReachStar();
}

function WaitPlayerReachStar() {
	if (transform.Find("PlayerM") || transform.Find("PlayerF")) {
		yield WaitForSeconds(1);
		loadingScreen.transform.GetChild(0).gameObject.SetActive(true);
		Application.LoadLevelAsync(Application.loadedLevel + 1);
	}
}
