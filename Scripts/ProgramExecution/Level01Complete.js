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
        // explode the star
        for (var child : Transform in transform) {
            switch (child.tag) {
                case "Star":
                    yield WaitForSeconds(0.4);
                    child.GetChild(1).gameObject.SetActive(true);
                    Destroy(child.GetChild(0).gameObject);
                    break;
                default:
                    break;
            }
        }
		yield WaitForSeconds(0.5);
		loadingScreen.transform.GetChild(0).gameObject.SetActive(true);
		Application.LoadLevel(Application.loadedLevel + 1);
	}
}
