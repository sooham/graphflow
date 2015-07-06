#pragma strict
/* This script ensures that the correct gender from the GameMenu
 * toggles will be loaded.
 *
 * Apply this to all players with genders.
 * you wish to be loaded according to player preference
 *
 * To work, the female players must be named PlayerF, male PlayerM
 * and should be active in the hierarchy. (unwanted players will be removed by script)
 */

function Awake () {
	/* On awake, check the value of the static variable PlayerGenderSettings.gender 
	 * and activate or deactivate this GameObject
	 */
	gameObject.SetActive("Player" + PlayerGenderSettings.gender == gameObject.name);
}
