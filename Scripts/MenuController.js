#pragma strict
// Attatch this script to GameMenu, the root of the UI

var mask : GameObject;
var backButton : GameObject;
var homeMenu : GameObject;
var settingsMenu : GameObject;
var aboutMenu : GameObject;

public function ActivateHomeMenu() {
	// Deactivates all unnecessary components and activates home menu
	for (var i = 0; i < transform.childCount; i++) {
		var menuComponent = transform.GetChild(i).gameObject;
		if (menuComponent.name == "HomeMenu" || menuComponent.name == "Mask") {
			menuComponent.SetActive(true);
		} else {
			menuComponent.SetActive(false);
		}
	}
}

public function ActivateSettingsMenu() {
	// Activates the settings menu
	backButton.SetActive(true);
	mask.SetActive(false);
	settingsMenu.SetActive(true);
	homeMenu.SetActive(false);
}

public function ActivateAboutMenu() {
	// Activates the about menu
	backButton.SetActive(true);
	aboutMenu.SetActive(true);
	homeMenu.SetActive(false);
}

public function SetGender(gender : String) {
	// Set the gender for the player character "M" or "F"
}

public function QuitGame() {
	// Quits the game 
	Application.Quit();
}
