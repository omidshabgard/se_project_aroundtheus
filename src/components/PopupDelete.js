import { eventType, selectors } from '../constants/app-data.js';
import Popup from './Popup.js';

export default class PopupDelete extends Popup {
	constructor(popupSelector) {
		super({ popupSelector });
		this._formElement = this._popupElement.querySelector(
			selectors.modal.form
		);
	}

	close() {
		this._formElement.removeEventListener(
			eventType.SUBMIT,
			this._deleteHandler
		);
		super.close();
	}

	setEventListeners(deleteHandler) {
		super.setEventListeners();
		this._deleteHandler = deleteHandler;
		this._formElement.addEventListener(eventType.SUBMIT, deleteHandler);
	}
}
