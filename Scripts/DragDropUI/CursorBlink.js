#pragma strict
import UnityEngine.UI;

// Attach this script to the cursor object
// Works by enabling and disabling the gameobject's image component
var blinkSpeed:int = 16;

private var counter:int = 0;
private var selfImage : RawImage;

function Start() {
    selfImage = gameObject.GetComponent(RawImage);
}

function OnGUI()
{
  if (counter == blinkSpeed) {
      counter = 0;
      selfImage.enabled = !selfImage.enabled;
  } else {
      counter++;
  }
}
