using UnityEngine;
using System.Collections;
using UnityEngine.EventSystems;

public class DragHandler : MonoBehaviour, IBeginDragHandler, IDragHandler, IEndDragHandler {
	// Implement the 3 interfaces for begin, during and end of dragging
	// attatch to draggable items in the MoveTray
	public static GameObject itemBeingDragged;
	Vector3 startPosition;		// The starting position
	Transform startParent;		// The starting parent
	Transform FunctionHUD;		// the function HUD Canvas Transform
	bool isChildOfMoveTray;		// is the originally the child of MoveTray

	void CleanFunctionHUD () {
		// Remove all first generation children from FunctionHUD
		// that are not MoveTray, MainProgram, Function 0, Function 1
		int i = 0;
		while (i < FunctionHUD.childCount) {
			GameObject child = FunctionHUD.GetChild(i).gameObject;
			string childName = child.name;
			if (childName != "MoveTray" && childName != "MainProgram" && childName != "Function 0" && childName != "Function 1") {
				// delete that child
				Destroy (child);
			}
			i++;
		}
	}

	#region IBeginDragHandler implementation
	public void OnBeginDrag (PointerEventData eventData)
	{	// Called whenever a drag event start on gameObject

		// for items that are children of MoveTray we want to create a duplicate in same position as gameObject
		isChildOfMoveTray = transform.IsChildOf(GameObject.Find("MoveTray").transform);

		// Get the FunctionHUD Transform
		FunctionHUD = GameObject.Find("FunctionHUD").transform;

		if (isChildOfMoveTray) {
			// create a copy
			GameObject gameObjectCopy = Instantiate(gameObject, transform.position, transform.rotation) as GameObject;
			// rename
			gameObjectCopy.name = gameObject.name;
			// position in the same place in hierarcy
			gameObjectCopy.transform.SetParent(transform.parent, true);
			// Set the start parent
			startParent = gameObjectCopy.transform.parent;
		} else {
			startParent = transform.parent;
		}

		// make this gameObject a child of FunctionHUD (in order to render UI) and allow deletion if misplaced
		transform.SetParent(FunctionHUD, true);
		itemBeingDragged = gameObject;
		startPosition = transform.position;
		GetComponent<CanvasGroup>().blocksRaycasts = false;
	}
	#endregion


	#region IDragHandler implementation

	public void OnDrag (PointerEventData eventData)
	{	// will be called evertime cursor moves during drag
		// set the position of the dragged gameObject to mouse's positoon
		transform.position = Input.mousePosition;
	}

	#endregion


	#region IEndDragHandler implementation
	public void OnEndDrag (PointerEventData eventData)
	{	// Called when drag ends
		itemBeingDragged = null;
		GetComponent<CanvasGroup>().blocksRaycasts = true;
		// Clean FunctionHUD of all added children in OnBeginDrag to remove failed drag and drops
		CleanFunctionHUD();
	}
	#endregion
}
