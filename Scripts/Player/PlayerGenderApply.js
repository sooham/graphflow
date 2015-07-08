#pragma strict
/* This script ensures that the correct gender from the GameMenu
 * toggles will be loaded. (Default)
 *
 * can be changed to set other gender
 *
 * Apply this to all players with genders.
 * you wish to be loaded according to player preference
 *
 * To work, the female players must be named PlayerF, male PlayerM
 * and should be active in the hierarchy. (unwanted players will be removed by script)
 */
 var oppositePlayerGender : boolean = false; 	// do you want the gameObject to be the opposite gender of player selection?

function Awake () {
	/* On awake, check the value of the static variable PlayerGenderSettings.gender 
	 * and Destroy / Keep this GameObject
	 */
	if ((oppositePlayerGender && ("Player" + PlayerGenderSettings.gender == gameObject.name)) || (!oppositePlayerGender && ("Player" + PlayerGenderSettings.gender != gameObject.name))) {
		Destroy(gameObject);
	}
}
