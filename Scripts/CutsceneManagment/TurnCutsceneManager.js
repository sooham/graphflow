#pragma strict

import UnityEngine.UI;
import UnityEngine.Audio;
/* This script holds many cut scene related functions
* In order for this script to work it should be attached to CutsceneManager
*/

var gamePlayTextBox : GameObject;
var dialogueTextBox : GameObject;
var closeUpTextBox : GameObject;

var functionHUD : GameObject;
var gameCameras : GameObject;
var dialogue : String[];

var femaleVoice: AudioClip[];

private var gamePlayTextField : Transform;
private var dialogueTextField : Transform;
private var closeUpTextField : Transform;

private var stage : int = 0;
private var introCutsceneFinished : boolean = false;
private var audioComponent : AudioSource;

//################## UNITY NATIVE FUNCTIONS ###############################
function Start() {
    audioComponent = GetComponent.<AudioSource>();
    gamePlayTextField = gamePlayTextBox.transform.GetChild(0);
    dialogueTextField = dialogueTextBox.transform.GetChild(0).transform.GetChild(0);    // This textbox has an inner textbox
    closeUpTextField = closeUpTextBox.transform.GetChild(0);
    // Play the first voice clip
    changeText(dialogue[stage], closeUpTextField);
    stage++;
}

function Update() {
	if (stage < dialogue.length) {
		if (Input.GetKeyDown(KeyCode.Space)) {
            // The starting text field is the close up text field for intros
			var textField = closeUpTextField;
            // change the text and views for certain dialogues
			switch (stage) {
                case 0:
                    break;
				case 1:
					// switch view to lab
					transform.GetChild(1).Find("PlayerIntroCam").gameObject.SetActive(false);
					transform.GetChild(1).Find("LabViewCam").gameObject.SetActive(true);
					// set the appropriate dialogue boxes active
					dialogueTextBox.SetActive(true);
					closeUpTextBox.SetActive(false);
					textField = dialogueTextField;
					break;
				case 2:
					// switch view back to player
					transform.GetChild(1).Find("PlayerIntroCam").gameObject.SetActive(true);
					transform.GetChild(1).Find("LabViewCam").gameObject.SetActive(false);
					dialogueTextBox.SetActive(false);
					closeUpTextBox.SetActive(true);
					break;
				case 3:
					// transition to the game view with functionHUD play button disabled
					transform.GetChild(1).Find("PlayerIntroCam").gameObject.SetActive(false);
					gameCameras.SetActive(true);
					closeUpTextBox.SetActive(false);
					gamePlayTextBox.SetActive(true);
					functionHUD.SetActive(true);
					// set the appropriate dialogue boxes active
					textField = gamePlayTextField;
					break;
				case 4:
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
                case 8:
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

    function (){
        if (introCutsceneFinished) {
            yield WaitForSeconds(2);
            // disable all cutscene items
            gamePlayTextBox.SetActive(false);
            gameObject.SetActive(false);
        }
    }();
}


//################## TEXT CHANGING ########################################

function changeText(newText : String, textfield : Transform) {
	/* Changes the textfield's objects text component to newText
	 */
    textfield.GetComponent(UI.Text).text = newText;
    // play the appropriate voice
    audioComponent.clip = femaleVoice[stage];
    audioComponent.Play();
}
