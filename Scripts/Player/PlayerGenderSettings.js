#pragma strict
// Attatch this script to a PlayerGenderSettings Object in Hierarchy

public static var gender : String = "F";  // default settings is female

function Awake() {
	/* Makes sure the gameOBject is not destroyed between scene transitions.
	 */
	 
	 DontDestroyOnLoad(gameObject);
}

public function toggleGender(genderCode : String) {
	/* Toggles the public static variable used to set the player gender in all scenes
	 * 
	 * The static value of gender in this script is to be read by setup functions in other scenes
	 * and applied to player.
	 *
	 * Called by gender toggles under SettingsMenu in GameMenu scene
	 *
	 * Acceptable values for genderCode paramter are "M" or "F"
	 */
	 gender = genderCode;
}



