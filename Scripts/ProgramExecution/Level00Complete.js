#pragma strict

private var loadingScreen : GameObject;
private var levelEnd : boolean = true;    // Kept because during async loading the next scene is inited more than once, this leads to stutter for the next scene intro

function Update () {
	WaitPlayerReachStar();
}

function WaitPlayerReachStar() {
	if (levelEnd && (transform.Find("PlayerM") || transform.Find("PlayerF"))) {
        levelEnd = false;
        loadingScreen = GameObject.Find('/FunctionHUD/LoadingScreen');
		yield WaitForSeconds(1);
		loadingScreen.transform.GetChild(0).gameObject.SetActive(true);
		Application.LoadLevelAsync(Application.loadedLevel + 1);
	}
}
