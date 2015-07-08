#pragma strict

import UnityEngine.UI;
/* This script holds many cutscene related funcitons
 * In order for this script to work it should be attatched to CutsceneManager
 */
 
 var gamePlayTextField : Transform;
 var dialogueTextField : Transform;
 var closeUpTextField : Transform;
 var gamePlayTextBox : GameObject;
 var dialogueTextBox : GameObject;
 var closeUpTextBox : GameObject;
 var functionHUD : GameObject;
 var gameCameras : GameObject;
 var dialogue : String[];
 
 private var stage : int = 0;
 private var introCutsceneFinished : boolean = false;
//################## UNITY NATIVE FUNCTIONS ###############################

function Update() {
	if (stage < dialogue.length) {
		if (Input.GetKeyDown(KeyCode.Space)) {
			var textField = closeUpTextField;
			// change the text field for certain situations
			switch (stage) {
				case 0:
					// switch view to lab
					transform.GetChild(1).Find("PlayerIntroCam").gameObject.SetActive(false);
					transform.GetChild(1).Find("LabViewCam").gameObject.SetActive(true);
					// set the appropriate dialogue boxes active
					dialogueTextBox.SetActive(true);
					closeUpTextBox.SetActive(false);
					textField = dialogueTextField;
					break;
				case 1:
					// switch view back to player
					transform.GetChild(1).Find("PlayerIntroCam").gameObject.SetActive(true);
					transform.GetChild(1).Find("LabViewCam").gameObject.SetActive(false);
					dialogueTextBox.SetActive(false);
					closeUpTextBox.SetActive(true);
					break;
				case 4:
					// transition to the game view with functionHUD play button diabled
					transform.GetChild(1).Find("PlayerIntroCam").gameObject.SetActive(false);
					gameCameras.SetActive(true);
					closeUpTextBox.SetActive(false);
					gamePlayTextBox.SetActive(true);
					functionHUD.SetActive(true);
					// set the appropriate dialogue boxes active
					textField = gamePlayTextField;
					break;
				case 5:
					textField = gamePlayTextField;
					break;
				case 6:
					textField = gamePlayTextField;
					break;
				case 7:
					textField = gamePlayTextField;
					break;
				default:
					break;
		
			}
			changeText(dialogue[stage], textField);
			stage++;
		}
	} else {
		introCutsceneFinished = true;
	}
	
	if (introCutsceneFinished) {
		// disable all cutscene items
		gamePlayTextBox.SetActive(false);
		gameObject.SetActive(false);
	}
}


//################## TEXT CHANGING ########################################

function changeText(newText : String, textfield : Transform) {
	/* Goes through the tex object, gets its text component
	 * and changes it.
	 */
	 
	 textfield.GetComponent(UI.Text).text = newText;
	 // play the corresponding mp3
}
