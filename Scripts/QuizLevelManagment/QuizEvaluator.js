#pragma strict

import UnityEngine.Audio;
import UnityEngine.UI;
/* Attach this script to the Question menu object in a Quiz level
 * the script will activate and deactivate questions from the level
 * and will show user feedback.
 */

public var answers : int[];         // An array of ints 0 - 3, where each index represent question
                                    // and value of int represents correct answer
public var correct : AudioClip;
public var incorrect : AudioClip;
public var loadingScreen : GameObject;
public var nextScene : int = 4;

private var stage: int = 0;
private var audioComponent : AudioSource;
private var levelEnd : boolean = true;

function Awake() {
    audioComponent = GetComponent.<AudioSource>();
}

public function provideUserFeedback(button : Transform) {
    /* To be called by all buttons from all questions with the calling
     * button as argument.
     *
     * Checks the calling button's index, if the buttons is correct goes to next
     * question, else colors wrong button red.
     * Provides feedback in both cases
     */
        var next : boolean = false;

        if (transform.childCount != answers.length) {
            print('Hello, you seems to have incorrect number of questions');
        }

        var question = button.parent;
        if (question.GetChild(answers[stage] + 1).GetChild(0).GetComponent(UI.Text).text == button.GetChild(0).GetComponent(UI.Text).text) {
            // correct answer
            audioComponent.clip = correct;
            next = true;
        } else {
            // incorrect answer
            audioComponent.clip = incorrect;
            button.GetChild(0).GetComponent(UI.Text).color = Color.red;
        }

        audioComponent.Play();

        if (next) {
            if (stage != transform.childCount - 1) {
                transform.GetChild(stage).gameObject.SetActive(false);
                stage++;
                transform.GetChild(stage).gameObject.SetActive(true);
            } else {
                // load the next level
                if (levelEnd) {
                    levelEnd = false;
                    loadingScreen.SetActive(true);
                    Application.LoadLevelAsync(nextScene);
                }

            }
        }
}

