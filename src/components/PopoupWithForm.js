import { eventType, selectors } from '../constants/app-data.js';
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor(popupSelector, handleFormSubmit) {
		super({ popupSelector });
		this._formElement = this._popupElement.querySelector(
			selectors.modal.form
		);
		this._formInputs = this._formElement.querySelectorAll(
			selectors.modal.input
		);
		this._handleFormSubmit = handleFormSubmit;
	}

	close() {
		this._formElement.reset();
		this._formElement.removeEventListener(
			eventType.SUBMIT,
			this._submitForm
		);
		super.close();
	}

	_getInputValues() {
		const inputs = {};
		this._formInputs.forEach((input) => {
			inputs[input.name] = input.value;
		});

		return inputs;
	}

	_submitForm = (e) => {
		e.preventDefault();
		const inputValues = this._getInputValues();
		this._handleFormSubmit(inputValues);
	};

	setEventListeners() {
		super.setEventListeners();
		this._formElement.addEventListener(eventType.SUBMIT, this._submitForm);
	}
}
