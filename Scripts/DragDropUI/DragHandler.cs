using UnityEngine;
using System.Collections;
using UnityEngine.EventSystems;
using System.Collections.Generic;

/* This is the draggin and dropping interaface for functions
 * in GraphFlow
 */
public class DragHandler : MonoBehaviour, IBeginDragHandler, IDragHandler, IEndDragHandler {
	// Implement the 3 interfaces for begin, during and end of dragging
	// These three functions will be called on the gameobject if this script is attatched
	// Attach this to all movable items in MoveTray, make sure they have a canvas group.

	public static GameObject itemBeingDragged;		// The item being dragged
	public Transform FunctionHUD;					// the function HUD Canvas Transform
	public Transform MoveTray;						// the MoveTray transform
	bool isChildOfMoveTray;							// is the item being dragged, a child of MoveTray

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

		for(int i = 0; i < FunctionHUD.childCount; i++) {
			GameObject child = FunctionHUD.GetChild(i).gameObject;
			string childName = child.name;
			if (!keepComponents.Contains(childName)) {
				// delete that child
				Destroy (child);
			}
		}
	}


	void Switch (Transform slotObject) {
		/* Helper function
		 * Moves the closest item in a slot to the closest empty slot
         */
		Transform firstEmptySlot = null;
		Transform firstMoveAfterEmptySlot = null;
		int emptySlotPos = slotObject.childCount;
		for (int i = 0; i < slotObject.childCount; i++) {
			// for every child in the slotObject ascending
			if (slotObject.GetChild(i).childCount == 0 && !firstEmptySlot) {
				firstEmptySlot = slotObject.GetChild(i);
				emptySlotPos = i;
			}

			if (i > emptySlotPos && slotObject.GetChild(i).childCount > 0) {
				// found non-empty slot
				firstMoveAfterEmptySlot = slotObject.GetChild(i).GetChild(0);
			}

			if (firstMoveAfterEmptySlot && firstEmptySlot) {
				firstMoveAfterEmptySlot.SetParent(firstEmptySlot, true);
				break;
			}
		}
	}

	#region IBeginDragHandler implementation
	public void OnBeginDrag (PointerEventData eventData)
	{	// Called whenever a drag event is started on gameObject

		// for items that are children of MoveTray we want to create a duplicate in same position as gameObject
		// allowing for infinite supply of moves
		isChildOfMoveTray = transform.IsChildOf(MoveTray);

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
			for (int slotnum = 0; slotnum < originalParent.parent.childCount; slotnum++) {
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
