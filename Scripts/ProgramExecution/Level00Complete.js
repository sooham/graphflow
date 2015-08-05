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
        // explode the star
        for (var child : Transform in transform) {
            switch (child.tag) {
                case "Star":
                    // Level finished
                    // play star animation, which in enabled by SetActive the child's sub gameobject
                    // sound plays automatically
                    yield WaitForSeconds(0.4);
                    child.GetChild(1).gameObject.SetActive(true);
                    Destroy(child.GetChild(0).gameObject);
            }
        }
		yield WaitForSeconds(0.5);
		loadingScreen.transform.GetChild(0).gameObject.SetActive(true);
		Application.LoadLevelAsync(Application.loadedLevel + 1);
	}
}
