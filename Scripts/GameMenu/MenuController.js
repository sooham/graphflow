#pragma strict

import UnityEngine.Audio;
// Attatch this script to GameMenu object, which is the root of the Main Menu UI 

var mask : GameObject;
var backButton : GameObject;
var homeMenu : GameObject;
var playMenu : GameObject;
var settingsMenu : GameObject;
var aboutMenu : GameObject;
var loadingScreen : GameObject;

var loadingSound : AudioClip;


//################## RETURN TO HOME MENU ######################

public function activateHomeMenu() {
	 /* and sets GameMenu (gameObject) back to initial state.
	 * called by pressing the back button.
	 *
	 * Initial State: HomeMenu active and Mask active
	 */
	 
	for (var i : int = 0; i < transform.childCount; i++) {
		var menuComponent : GameObject = transform.GetChild(i).gameObject;
		if (menuComponent.name in ["HomeMenu", "Mask"]) {
			menuComponent.SetActive(true);
		} else {
			menuComponent.SetActive(false);
		}
	}
}

//################## HOME MENU BUTTON NAVIGATION ######################

private function gotoMenuComponent(component : GameObject) {
	/* Helper function
	 * Deactivates the homeMenu
	 * Activates the backButton
	 * and activates component
	 */

	homeMenu.SetActive(false);
	backButton.SetActive(true);
	component.SetActive(true);
}

public function activatePlayMenu() {
	/* Activates the play menu
	 *
	 * called by pressing the play button in HomeMenu
	 */
	 
	 gotoMenuComponent(playMenu);
}

public function activateSettingsMenu() {
	/* Activates the settings menu
	 *
	 * Called by pressing the settings button in HomeMenu
	 */
	
	mask.SetActive(false);
	gotoMenuComponent(settingsMenu);
}

public function activateAboutMenu() {
	/* Activates the about menu
	 *
	 * Called by pressing the about button in HomeMenu
	 */

	gotoMenuComponent(aboutMenu);
}

public function quitGame() {
	/* Quits the GameObject
	 * 
	 * Called by pressing the quit button in HomeMenu
	 */

	Application.Quit();
}


//################## LEVEL BUTTON SCENE LOADING ######################

public function loadScene(name : String) {
	/* Loads the Scene with name name and enables the loading screen.
	 *
	 * Called by pressing one of the level buttons in PlayMenu
	 */
	 function() {
	 AudioSource.PlayClipAtPoint(loadingSound, Vector3.zero, 0.1);
	 // Show the loading screen
	 yield WaitForSeconds(0.5f);
	 loadingScreen.SetActive(true);
	 Application.LoadLevelAsync(name);		// Load Level Asynchornously to keep the background music playing
	 }();
}

