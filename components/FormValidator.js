class FormValidator {
	constructor(settings, formElement) {
		this._inputSelector = settings.inputSelector;
		this._submitButtonSelector = settings.submitButtonSelector;
		this._inactiveButtonClass = settings.inactiveButtonClass;
		this._inputErrorClass = settings.inputErrorClass;
		this._errorClass = settings.errorClass;

		this._form = formElement;
	}

	_showInputError(inputElement, errorMessage) {
		const errorElement = this._form.querySelector(
			`#${inputElement.id}` - error
		);
		inputElement.classList.add(this._inputErrorClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.add(this._errorClass);
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
		console.log(`#${inputEl.id}-error`);
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
		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(this._form, inputElement);
				this._toggleButtonState();
			});
		});
	}

	enableValidation() {
		this._buttonElement = this._form.querySelector(
			this._submitButtonSelector
		);
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._buttonElement.classList.add('modal__button_disabled');
			this._buttonElement.disabled = true;
			evt.target.reset();
		});

		this._inputList = Array.from(
			this._form.querySelectorAll(this._inputSelector)
		);

		this._setEventListeners();
	}
}

export default FormValidator;
