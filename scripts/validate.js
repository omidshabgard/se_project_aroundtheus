const config = {
	formSelector: '.modal__form',
	inputSelector: '.modal__input',
	submitButtonSelector: '.modal__button',
	inactiveButtonClass: 'modal__button_disabled',
	inputErrorClass: 'modal__input_type_error',
	errorClass: 'modal__error_visible',
};

enableValidation(config);

function checkInputValidity(formEl, inputEl, options) {
	const { inputErrorClass, errorClass } = options;
	const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
	console.log(`#${inputEl.id}-error`);
	const isInputValid = inputEl.validity.valid;
	if (isInputValid) {
		inputEl.classList.remove(inputErrorClass);
		errorEl.textContent = '';
		errorEl.classList.remove(errorClass);
	} else {
		inputEl.classList.add(inputErrorClass);
		errorEl.textContent = inputEl.validationMessage;
		errorEl.classList.add(errorClass);
	}
}

function hasInvalidInput(inputEls) {
	return inputEls.some((inputEl) => {
		const isInputNotValid = !inputEl.validity.valid;
		return isInputNotValid;
	});
}

function toggleButtonState(formEl, options) {
	const { submitButtonSelector, inactiveButtonClass } = options;
	const buttonEl = formEl.querySelector(submitButtonSelector);
	const inputEls = [...formEl.querySelectorAll(options.inputSelector)];

	if (hasInvalidInput(inputEls)) {
		buttonEl.classList.add(inactiveButtonClass);
		buttonEl.disabled = true;
	} else {
		buttonEl.classList.remove(inactiveButtonClass);
		buttonEl.disabled = false;
	}
}

function setEventListeners(formEl, options) {
	const { inputSelector } = options;
	const inputEls = [...formEl.querySelectorAll(inputSelector)];
	inputEls.forEach((inputEl) => {
		inputEl.addEventListener('input', (evt) => {
			checkInputValidity(formEl, inputEl, options);
			toggleButtonState(formEl, options);
		});
	});
}

function enableValidation(options) {
	const formEls = [...document.querySelectorAll(options.formSelector)];

	formEls.forEach((formEl) => {
		formEl.addEventListener('submit', (evt) => {
			evt.preventDefault();
		});

		// look for all inputs inside of form
		// loop through all the inputs to see if all are valid
		// if input is not valid
		// get validation message
		// add error classs to input
		// display error message
		// disable buton
		// if all inputs are valid
		// enable button
		// reset error messages

		setEventListeners(formEl, options);
	});
}
