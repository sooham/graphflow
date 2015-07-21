#pragma strict

var loadingScreen : GameObject;

function Update () {
	WaitPlayerReachStar();
}

function WaitPlayerReachStar() {
	if (transform.Find("PlayerM") || transform.Find("PlayerF")) {
		yield WaitForSeconds(1);
		loadingScreen.SetActive(true);
		Application.LoadLevelAsync(Application.loadedLevel + 1);
	}
}