import { eventType, selectors } from '../constants/app-data.js';
import Popup from './Popup.js';

export default class PopupDelete extends Popup {
	constructor(popupSelector) {
		super({ popupSelector });
		this._formElement = this._popupElement.querySelector(
			selectors.modal.form
		);
	}

	open(deleteHandler) {
		this._deleteHandler = deleteHandler;
		super.open();
	}

	close() {
		this._formElement.removeEventListener(
			eventType.SUBMIT,
			this._deleteHandler
		);
		super.close();
	}

	_submitForm(e) {
		e.preventDefault();
		this._deleteHandler();
	}

	setEventListeners() {
		super.setEventListeners();
		this._formElement.addEventListener(
			eventType.SUBMIT,
			this._submitForm.bind(this)
		);
	}
}
