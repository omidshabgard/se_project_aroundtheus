import { Card } from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
const initialCards = [
	{
		name: 'Yosemite Valley',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg',
	},
	{
		name: 'Lake Louise',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg',
	},
	{
		name: 'Bald Mountains',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg',
	},
	{
		name: 'Latemar',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg',
	},
	{
		name: 'Vanoise National Park',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg',
	},
	{
		name: 'Lago di Braies',
		link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg',
	},
];

//----------------------------------------------------------------//
//--------------Element selectors for EDIT PROFILE----------------//
//----------------------------------------------------------------//
const profileEditButton = document.querySelector('#profile__edit-button');
const profileEditModal = document.querySelector('#profile-edit-modal');
const editProfileCloseBtn = profileEditModal.querySelector('#modal__close');
const titleInputElement = profileEditModal.querySelector(
	'#profile-title-input'
);
const descriptionInputElement = profileEditModal.querySelector(
	'#profile-description-input'
);
const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector(
	'.profile__description'
);
const profileEditForm = profileEditModal.querySelector('.modal__form');
const templateCard =
	document.querySelector('#templateCard').content.firstElementChild;

//----------------------------------------------------------------//
//--------------Main Logic for EDIT PROFILE-----------------------//
//----------------------------------------------------------------//
profileEditButton.addEventListener('click', openEditProfileModal);
editProfileCloseBtn.addEventListener('click', closeEditProfileModal);
profileEditForm.addEventListener('submit', handleEditProfileFormSubmit);
const profileEditContainer =
	profileEditModal.querySelector('.modal__container');
profileEditModal.addEventListener('click', () => closeModal(profileEditModal));
profileEditContainer.addEventListener('click', (evt) => evt.stopPropagation());
//----------------------------------------------------------------------------------//
//--------------reusable methods for edit profile modal EDIT PROFILE----------------//
//----------------------------------------------------------------------------------//
function openEditProfileModal() {
	titleInputElement.value = profileTitleElement.textContent;
	descriptionInputElement.value = profileDescriptionElement.textContent;
	openModal(profileEditModal);
}
function closeEditProfileModal() {
	closeModal(profileEditModal);
}

function handleEditProfileFormSubmit(e) {
	e.preventDefault();
	profileTitleElement.textContent = titleInputElement.value;
	profileDescriptionElement.textContent = descriptionInputElement.value;
	closeEditProfileModal();
}

//------------------------------------------------------------------//
//--------------Element selectors for ADD PLACE CARD----------------//
//------------------------------------------------------------------//
const cardAddButtonElement = document.querySelector('.profile__add-button');
const cardAddModal = document.querySelector('#add-card-modal');
const cardAddForm = cardAddModal.querySelector('.modal__form');
const cardTitleInputElement = cardAddModal.querySelector('#card-title-input');
const cardUrlInputElement = cardAddModal.querySelector('#card-url-input');
const cardAddCloseBtn = cardAddModal.querySelector('#modal__close');

const galleryCardsElement = document.querySelector('.gallery__cards');
const imageModal = document.querySelector('#image-modal');
const imageModalImage = imageModal.querySelector('.modal__image');
const imageModalCloseBtn = imageModal.querySelector('#modal__close');
const imageModalCaption = imageModal.querySelector('.modal__caption');

//------------------------------------------------------------------//
//--------------Main Logic for ADD PLACE CARD-----------------------//
//------------------------------------------------------------------//
cardAddButtonElement.addEventListener('click', openAddPlaceModal);
cardAddCloseBtn.addEventListener('click', closeAddPlaceModal);
cardAddForm.addEventListener('submit', handleAddCardFormSubmit);
imageModalCloseBtn.addEventListener('click', cloaseImageModal);
const cardAddContainer = cardAddModal.querySelector('.modal__container');
cardAddModal.addEventListener('click', () => closeModal(cardAddModal));
cardAddContainer.addEventListener('click', (evt) => evt.stopPropagation());

const imageContainer = imageModal.querySelector('.image-modal__container');
imageModal.addEventListener('click', () => closeModal(imageModal));
imageContainer.addEventListener('click', (evt) => evt.stopPropagation());

initialCards.forEach((data) => {
	const cardElement = getCardElement(data);
	galleryCardsElement.appendChild(cardElement);
});

//------------------------------------------------------------------------------------//
//--------------reusable methods for ADD PLACE CARD-----------------------------------//
//------------------------------------------------------------------------------------//
function openAddPlaceModal() {
	openModal(cardAddModal);
}

function closeAddPlaceModal() {
	closeModal(cardAddModal);
}

function cloaseImageModal() {
	closeModal(imageModal);
}

function handleAddCardFormSubmit(e) {
	const cardData = {
		name: cardTitleInputElement.value,
		link: cardUrlInputElement.value,
	};
	const cardElement = getCardElement(cardData);
	galleryCardsElement.prepend(cardElement);
	e.target.reset();
	const submitButton = e.target.querySelector('.modal__button');
	submitButton.classList.add('modal__button_disabled');
	submitButton.disabled = true;

	closeAddPlaceModal();
}

function openModalImage(cardData) {
	imageModalImage.src = cardData.link;
	imageModalImage.alt = cardData.name;
	imageModalCaption.textContent = cardData.name;
	openModal(imageModal);
}

function getCardElement(cardData) {
	const imageClickHandler = function () {
		openModalImage(cardData);
	};
	const newCard = new Card(cardData, '#templateCard', imageClickHandler);
	const cardElement = newCard.getView();

	return cardElement;
}

//------------------------------------------------//
//--------------reusable methods------------------//
//------------------------------------------------//

function openModal(modal) {
	modal.classList.add('modal_opened');
	document.addEventListener('keydown', closeModalWithEscapeKey);
}

function closeModal(modal) {
	modal.classList.remove('modal_opened');
	document.removeEventListener('keydown', closeModalWithEscapeKey);
}

function closeModalWithEscapeKey(evt) {
	const isScapeKeyPressed = evt.key === 'Escape';
	if (isScapeKeyPressed) {
		const openedPopup = document.querySelector('.modal_opened');

		closeModal(openedPopup);
	}
}

//------------------------------------------------//
//--------------FormValidation------------------//
//------------------------------------------------//

const config = {
	formSelector: '.modal__form',
	inputSelector: '.modal__input',
	submitButtonSelector: '.modal__button',
	inactiveButtonClass: 'modal__button_disabled',
	inputErrorClass: 'modal__input_type_error',
	errorClass: 'modal__error_visible',
};

const profileFormValidator = new FormValidator(config, profileEditForm);
profileFormValidator.enableValidation();

const cardAddFormValidator = new FormValidator(config, cardAddForm);
cardAddFormValidator.enableValidation();
