import { eventType } from '../constants/app-data.js';

class FormValidator {
	constructor(settings, formElement) {
		this._inputSelector = settings.inputSelector;
		this._submitButtonSelector = settings.submitButtonSelector;
		this._inactiveButtonClass = settings.inactiveButtonClass;
		this._inputErrorClass = settings.inputErrorClass;
		this._errorClass = settings.errorClass;

		this._formElement = formElement;
	}

	_showInputError(inputElement, errorMessage) {
		const errorElement = this._formElement.querySelector(
			`#${inputElement.id}-error`
		);
		console.log("🚀 ~ FormValidator ~ _showInputError ~ errorElement:", errorElement)
		inputElement.classList.add(this._inputErrorClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.add(this._errorClass);
	}

	_hideInputError(inputElement) {
		const errorElement = this._formElement.querySelector(
			`#${inputElement.id}-error`
		);
		console.log("🚀 ~ FormValidator ~ _hideInputError ~ errorElement:", errorElement)
		inputElement.classList.remove(this._inputErrorClass);
		errorElement.classList.remove(this._errorClass);
		errorElement.textContent = '';
	}

	_toggleButtonState() {
		if (this._hasInvalidInput(this._inputList)) {
			this._buttonElement.classList.add(this._inactiveButtonClass);
			this._buttonElement.disabled = true;
		} else {
			this._buttonElement.classList.remove(this._inactiveButtonClass);
			this._buttonElement.disabled = false;
		}
	}

	_hasInvalidInput(inputEls) {
		return inputEls.some((inputEl) => {
			const isInputNotValid = !inputEl.validity.valid;
			return isInputNotValid;
		});
	}

	_checkInputValidity(formEl, inputEl) {
		const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
		const isInputValid = inputEl.validity.valid;
		if (isInputValid) {
			inputEl.classList.remove(this._inputErrorClass);
			errorEl.textContent = '';
			errorEl.classList.remove(this._errorClass);
		} else {
			inputEl.classList.add(this._inputErrorClass);
			errorEl.textContent = inputEl.validationMessage;
			errorEl.classList.add(this._errorClass);
		}
	}

	_setEventListeners() {
		this._inputList = Array.from(
			this._formElement.querySelectorAll(this._inputSelector)
		);
		this._buttonElement = this._formElement.querySelector(
			this._submitButtonSelector
		);

		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener(eventType.INPUT, () => {
				this._checkInputValidity(this._formElement, inputElement);
				this._toggleButtonState();
			});
		});
	}

	enableValidation() {
		this._formElement.addEventListener(eventType.SUBMIT, (evt) => {
			evt.preventDefault();
			this._toggleButtonState();
			evt.target.reset();
		});

		this._setEventListeners();
	}

	resetValidation() {
		this._toggleButtonState();

		this._inputList.forEach((inputElement) => {
			this._hideInputError(inputElement);
		});
	}
}

export default FormValidator;
