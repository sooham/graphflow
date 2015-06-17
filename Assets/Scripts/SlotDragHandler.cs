using UnityEngine;
using System.Collections;
using UnityEngine.EventSystems;

public class SlotDragHandler : MonoBehaviour, IDropHandler {
	// attach this script to all non-movetray slots
	// here gameObject refers to the slot

	// make a property to get this slot's contents easily
	// return null if slot empty else the child GameObject
	public GameObject item {
		get {
			if (transform.childCount > 0) {
				return transform.GetChild(0).gameObject;
			}
			return null;
		}
	}

	#region IDropHandler implementation
	public void OnDrop (PointerEventData eventData)
	{	// called by the slot whenever something is dropped on it

		// if the current gameObject (the slot) has an item we delete it
		// and replace with itemBeingDragged
		if (item) {
			// delete
			Destroy (item);
		}
		// accessing the static varaible in the DragHandler script
		DragHandler.itemBeingDragged.transform.SetParent(transform);
	}
	#endregion
}
