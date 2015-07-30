#pragma strict

import UnityEngine.Audio;
// Attatch this script to GameMenu object, which is the root of the Main Menu UI

private var mask : GameObject;
private var homeMenu : GameObject;
private var settingsMenu : GameObject;
private var loadingScreen : GameObject;

var loadingSound : AudioClip;

function Awake() {
	mask = transform.Find("Mask").gameObject;
	homeMenu = transform.Find("HomeMenu").gameObject;
	settingsMenu = transform.Find("SettingsMenu").gameObject;
	loadingScreen = transform.Find("LoadingScreen").gameObject;
}


//################## RETURN TO HOME MENU ######################

public function activateHomeMenu() {
	 /* goes through and sets GameMenu (gameObject) back to initial state.
	 * called by pressing the back button.
	 *
	 * Initial State: HomeMenu active , Title active, Arrow Keys and Mask active
	 */
	 mask.GetComponent(Animator).SetTrigger('show');
	 for (var childComponent: Transform in transform) {
	 	childComponent.gameObject.SetActive(childComponent.name in ["HomeMenu", "Mask", "ArrowKeys", "Title"]);
	 }
}

//################## HOME MENU BUTTON NAVIGATION ######################

public function activateSettingsMenu() {
	/* Activates the settings menu
	 *
	 * Called by pressing the play button in HomeMenu
	 */
	mask.GetComponent(Animator).SetTrigger('hide');
	homeMenu.SetActive(false);
	settingsMenu.SetActive(true);
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
	 loadingScreen.SetActive(true);
	 yield WaitForSeconds(0.5f);
	 Application.LoadLevelAsync(name);		// Load Level Asynchornously to keep the background music playing
	 }();
}

