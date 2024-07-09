export const eventType = {
	CLICK: 'click',
	SUBMIT: 'submit',
	INPUT: 'input',
	KEY_DOWN: 'keydown',
	MOUSE_DOWN: 'mousedown',
};

export const selectors = {
	profile: {
		container: '.profile__info',
		title: '.profile__title',
		about: '.profile__about',
		avatar: '.profile__avatar',
		avatarSection: '.profile__avatar-section',
		editButton: '.profile__edit-button',
		addButton: '.profile__add-button',
	},
	gallery: {
		list: '#gallery-list',
	},
	cardTemplate: {
		template: '#card-template',
		card: '.card',
		image: '.card__image',
		deleteButton: '.card__delete-button',
		info: '.card__info',
		title: '.card__title',
		likeButton: '.card__like-button',
	},
	modal: {
		profileEdit: {
			modal: '#profile-edit-modal',
			titleInput: '#profile-title-input',
			aboutInput: '#profile-about-input',
			titleInputError: '#profile-title-input-error',
			aboutInputError: '#profile-about-input-error',
			submitButton: '#profile-edit-modal .modal__button',
		},
		deleteConfirmation: {
			modal: '#delete-confirmation-modal',
			submitButton: '#delete-confirmation-modal .modal__button',
		},
		avatar: {
			modal: '#avatar-modal',
			avatarInput: '#avatar-input',
			submitButton: '#avatar-modal .modal__button',
		},
		cardAdd: {
			modal: '#card-add-modal',
			titleInputError: '#card-title-input-error',
			urlInputError: '#card-url-input-error',
			submitButton: '#card-add-modal .modal__button',
		},
		image: {
			modal: '#image-modal',
			preview: '.modal__image-preview',
			caption: '.modal__caption',
			submitButton: '#image-modal .modal__button',
		},
		button: '.modal__button',
		close: '.modal__close',
		form: '.modal__form',
		input: '.modal__input',
	},
};

export const configValidation = {
	formSelector: '.modal__form',
	inputSelector: '.modal__input',
	submitButtonSelector: '.modal__button',
	inactiveButtonClass: 'modal__button_disabled',
	inputErrorClass: 'modal__input_type_error',
	errorClass: 'modal__error_visible',
};

export const profileEditModal = document.querySelector(
	selectors.modal.profileEdit.modal
);

export const addNewCardModal = document.querySelector(
	selectors.modal.cardAdd.modal
);

export const avatarEditModal = document.querySelector(
	selectors.modal.avatar.modal
);

export const profileEditButton = document.querySelector(
	selectors.profile.editButton
);

export const profileTitleInput = document.querySelector(
	selectors.modal.profileEdit.titleInput
);
export const profileAboutInput = document.querySelector(
	selectors.modal.profileEdit.aboutInput
);
export const avatarInput = document.querySelector(
	selectors.modal.avatar.avatarInput
);

export const profileTitleElem = document.querySelector(selectors.profile.title);
export const profileAboutElem = document.querySelector(selectors.profile.about);
export const avatarElem = document.querySelector(
	selectors.profile.avatar + ', ' + selectors.profile.avatarSection
);

export const addNewCardButton = document.querySelector(
	selectors.profile.addButton
);

export const profileEditForm = profileEditModal.querySelector(
	selectors.modal.form
);

export const addNewCardForm = addNewCardModal.querySelector(
	selectors.modal.form
);

export const avatarEditForm = avatarEditModal.querySelector(
	selectors.modal.form
);

const AUTHORIZATION = '9843ab97-45b7-4d5b-9906-4067b257c6ed';
const CONTENT_TYPE = 'application/json';

export const BASE_URL = 'https://around-api.en.tripleten-services.com/v1';
export const HEADERS = {
	authorization: AUTHORIZATION,
	'Content-Type': CONTENT_TYPE,
};
