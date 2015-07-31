using UnityEngine;
using System.Collections;
using UnityEngine.EventSystems;
using System.Collections.Generic;

/* This file is one used to implement the dragging interface
 * from the item being dragged side, as such, it should be attatched to all draggable
 * items in MoveTray (or somewhere else). Make sure they have a canvas group.
 *
 * The functions inlude, OnDrag, OnPointerMovement, OnDrop
 */

public class DragHandler : MonoBehaviour, IBeginDragHandler, IDragHandler, IEndDragHandler {

	public static GameObject itemBeingDragged;		// The item being dragged
	public Transform FunctionHUD;					// the function HUD Canvas Transform
	public Transform MoveTray;						// the MoveTray transform

	void CleanFunctionHUD () {
		/* Helper function
		 * Remove all extraneous first generation children object
		 * from FunctionHUD coming from failed drag and drop operations
		 * Allows for deletion of invalidly placed items
		 */
		List<string> keepComponents = new List<string>();

		keepComponents.Add("MoveTray");
		keepComponents.Add("MainProgram");
		keepComponents.Add("CamChangeBtn");
		keepComponents.Add("PlayBtn");
		keepComponents.Add("ResetBtn");
		keepComponents.Add("GameplayPlayerBox");
		keepComponents.Add("LoadingScreen");
		keepComponents.Add("MoveKeyboard");
		keepComponents.Add("Instructions");


		foreach (Transform child in FunctionHUD) {
			if (!keepComponents.Contains (child.name)) {
				Destroy (child.gameObject);
			}
		}
	}


	void Switch (Transform slotObject) {
		/* Helper function
		 * Moves the closest move object in MainProgram into the first empty slot
		 * for slotObject
         */
		Transform firstEmptySlot = null;
		Transform firstMoveAfterEmptySlot = null;

		foreach (Transform slot in slotObject) {
			if (firstEmptySlot && slot.childCount > 0) {
				// found first non-empty slot after the empty slot
				firstMoveAfterEmptySlot = slot.GetChild(0);
			}
			if (slot.childCount == 0 && !firstEmptySlot) {
				// found first empty slot in slotObject
				firstEmptySlot = slot;
			}

			if (firstEmptySlot && firstMoveAfterEmptySlot) {
				// set the move into the empty slot
				firstMoveAfterEmptySlot.SetParent(firstEmptySlot, true);
				break;
			}

		}

	}

	#region IBeginDragHandler implementation
	public void OnBeginDrag (PointerEventData eventData)
	{	/* Called whenever a drag event is started on gameObject
		 * for items that are children of MoveTray we want to create a duplicate in same position as gameObject
		 * allowing for infinite supply of moves
		 */
		bool isChildOfMoveTray = transform.IsChildOf(MoveTray);

		if (isChildOfMoveTray) {
			// create a copy
			GameObject gameObjectCopy = Instantiate(gameObject, transform.position, transform.rotation) as GameObject;
			// rename
			gameObjectCopy.name = gameObject.name;
			// position in the same place in hierarcy
			gameObjectCopy.transform.SetParent(transform.parent, true);
			// Set the start parent
		}


		// make the moving gameObject a child of FunctionHUD (in order to render UI) and allow deletion if misplaced
		Transform originalParent = transform.parent;
		transform.SetParent(FunctionHUD, true);

		// now that we have removed the move from its original place, we should check if origin was not move tray
		// and reorganise its slots
		if (!isChildOfMoveTray) {
			// reorganise orignalParent
			foreach (Transform _ in originalParent.parent) {
				Switch(originalParent.parent);
			}
		}
		itemBeingDragged = gameObject;
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
