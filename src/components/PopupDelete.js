import { eventType, selectors } from '../constants/app-data.js';
import Popup from './Popup.js';

export default class PopupDelete extends Popup {
	constructor(popupSelector) {
		super({ popupSelector });
		this._formElement = this._popupElement.querySelector(
			selectors.modal.form
		);
	}

	setEventListeners(deleteHandler) {
		super.setEventListeners();
		this._formElement.addEventListener(eventType.SUBMIT, deleteHandler);
	}
}
