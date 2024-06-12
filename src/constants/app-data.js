
import UserInfo from '../components/UserInfo.js';
export const initialCards = [
	{
		name: 'Yosemite Valley',
		url: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg',
	},
	{
		name: 'Lake Louise',
		url: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg',
	},
	{
		name: 'Bald Mountains',
		url: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg',
	},
	{
		name: 'Latemar',
		url: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg',
	},
	{
		name: 'Vanoise National Park',
		url: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg',
	},
	{
		name: 'Lago di Braies',
		url: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg',
	},
];

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
		description: '.profile__description',
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
			descriptionInput: '#profile-description-input',
			titleInputError: '#profile-title-input-error',
			descriptionInputError: '#profile-description-input-error',
		},
		cardAdd: {
			modal: '#card-add-modal',
			titleInputError: '#card-title-input-error',
			urlInputError: '#card-url-input-error',
		},
		image: {
			modal: '#image-modal',
			preview: '.modal__image-preview',
			caption: '.modal__caption',
		},
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
export const profileEditButton = document.querySelector(
	selectors.profile.editButton
);

export const profileTitleInput = document.querySelector(
	selectors.modal.profileEdit.titleInput
);
export const profileDescriptionInput = document.querySelector(
	selectors.modal.profileEdit.descriptionInput
);

export const profileTitleElem = document.querySelector(selectors.profile.title);
export const profileDescriptionElem = document.querySelector(
	selectors.profile.description
);

export const addNewCardModal = document.querySelector(
	selectors.modal.cardAdd.modal
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

export const userInfo = new UserInfo(
	'Jacques Cousteau',
	'Explorer',
	selectors.profile.container
);
