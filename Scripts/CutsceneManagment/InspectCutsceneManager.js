#pragma strict

import UnityEngine.UI;
import UnityEngine.Audio;
/* This script holds cut scene to the introduction of the inspect function
* In order for this script to work it should be attached to a CutsceneManager
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
		if (Input.GetKeyUp(KeyCode.Space)) {
            // The starting text field is the close up text field for intros
			var textField = closeUpTextField;
			// change the text field for certain situations
			switch (stage) {
                case 0:
                    break;
                case 1:
                    break;
				case 2:
					// transition to the game view with functionHUD play button diabled
					transform.GetChild(1).Find("PlayerIntroCam").gameObject.SetActive(false);
					gameCameras.SetActive(true);
					closeUpTextBox.SetActive(false);
					gamePlayTextBox.SetActive(true);
					functionHUD.SetActive(true);
					// set the appropriate dialogue boxes active
					textField = gamePlayTextField;
					break;
				case 3:
					textField = gamePlayTextField;
					break;
				case 4:
					textField = gamePlayTextField;
					break;
				case 5:
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
            yield WaitForSeconds(4.5);
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
