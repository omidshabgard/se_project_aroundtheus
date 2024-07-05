import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopoupWithForm.js';
import PopupDelete from '../components/PopupDelete.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
	BASE_URL,
	HEADERS,
	addNewCardButton,
	addNewCardForm,
	avatarEditForm,
	avatarElem,
	avatarInput,
	configValidation,
	eventType,
	profileAboutInput,
	profileEditButton,
	profileEditForm,
	profileTitleInput,
	selectors,
} from '../constants/app-data.js';
import '../pages/index.css';

// --------------------------------------------------------------//
// Variable definitions -----------------------------------------//
// --------------------------------------------------------------//

export const api = new Api({
	baseUrl: BASE_URL,
	headers: HEADERS,
});

const userInfo = new UserInfo({
	nameSelector: selectors.profile.title,
	aboutSelector: selectors.profile.about,
	avatarSelector: selectors.profile.avatar,
});

const section = new Section(
	{
		renderer: (cardData) => {
			const cardElement = renderCard(cardData);
			section.addItem(cardElement);
		},
	},
	selectors.gallery.list
);

const profileEditPopup = new PopupWithForm(
	selectors.modal.profileEdit.modal,
	handleProfileFormSubmit
);

const avatarEditPopup = new PopupWithForm(
	selectors.modal.avatar.modal,
	handleAvatarEditSubmit
);

const addNewCardPopup = new PopupWithForm(
	selectors.modal.cardAdd.modal,
	handleNewCardSubmit
);

const deleteConfirmationPopup = new PopupDelete(
	selectors.modal.deleteConfirmation.modal
);

const profileEditFormValidator = new FormValidator(
	configValidation,
	profileEditForm
);

const addNewCardFormValidator = new FormValidator(
	configValidation,
	addNewCardForm
);

const avatarEditFormValidator = new FormValidator(
	configValidation,
	avatarEditForm
);

const cardPreviewPopup = new PopupWithImage(selectors.modal.image.modal);

// --------------------------------------------------------------//
// Code flow--------- -------------------------------------------//
// --------------------------------------------------------------//

api.getUserInfoAndCards().then(([userData, initialCards]) => {
	userInfo.setUserInfo(userData);
	section.renderItems(initialCards);
});

profileEditPopup.setEventListeners();
avatarEditPopup.setEventListeners();
addNewCardPopup.setEventListeners();
cardPreviewPopup.setEventListeners();
deleteConfirmationPopup.setEventListeners();

profileEditButton.addEventListener(eventType.CLICK, openEditProfileModal);
addNewCardButton.addEventListener(eventType.CLICK, openCardAddModal);
avatarElem.addEventListener(eventType.CLICK, openProfilePicModal);

profileEditFormValidator.enableValidation();
addNewCardFormValidator.enableValidation();
avatarEditFormValidator.enableValidation();

// --------------------------------------------------------------//
// Reusable functions -------------------------------------------//
// --------------------------------------------------------------//
function openCardAddModal() {
	addNewCardFormValidator.resetValidation();
	addNewCardPopup.open();
}

function openProfilePicModal() {
	const { avatar } = userInfo.getUserInfo();
	avatarInput.value = avatar;
	avatarEditFormValidator.resetValidation();
	avatarEditPopup.open();
}

function openEditProfileModal() {
	const { name, about } = userInfo.getUserInfo();
	profileTitleInput.value = name;
	profileAboutInput.value = about;
	profileEditFormValidator.resetValidation();
	profileEditPopup.open();
}

function handleCardPreviewClick(caption, imageUrl) {
	cardPreviewPopup.open(caption, imageUrl);
}

function handleProfileFormSubmit(inputValues) {
	const { name, about } = inputValues;
	const submitButtonElem = profileEditForm.querySelector(
		selectors.modal.button
	);
	const oldButtonLabel = submitButtonElem.textContent;
	submitButtonElem.textContent = 'Saving...';
	api.editUserInfo({ name, about })
		.then((userData) => {
			userInfo.setUserInfo(userData);
			profileEditPopup.close();
			profileEditForm.resetValidation();
		})
		.finally(() => {
			submitButtonElem.textContent = oldButtonLabel;
		});
}

function handleNewCardSubmit(inputValues) {
	const submitButtonElem = addNewCardForm.querySelector(
		selectors.modal.button
	);
	const oldButtonLabel = submitButtonElem.textContent;
	submitButtonElem.textContent = 'Saving...';
	api.addCard(inputValues)
		.then((cardData) => {
			const newCard = renderCard(cardData);
			section.addItem(newCard);
			addNewCardPopup.close();
			addNewCardForm.resetValidation();
		})
		.finally(() => {
			submitButtonElem.textContent = oldButtonLabel;
		});
}

function handleAvatarEditSubmit(inputValues) {
	const { avatar } = inputValues;
	const submitButtonElem = avatarEditForm.querySelector(
		selectors.modal.button
	);
	const oldButtonLabel = submitButtonElem.textContent;
	submitButtonElem.textContent = 'Saving...';
	api.editUserAvatar({ avatar })
		.then((userData) => {
			userInfo.setUserInfo(userData);
			avatarEditPopup.close();
			avatarEditForm.resetValidation();
		})
		.finally(() => {
			submitButtonElem.textContent = oldButtonLabel;
		});
}

function handleDeleteCard(cardId, cardElement) {
	api.removeCard(cardId).then(() => {
		cardElement.remove();
		cardElement = null;
		deleteConfirmationPopup.close();
	});
}

function renderCard(cardData) {
	const card = new Card(
		cardData,
		selectors.cardTemplate.template,
		handleCardPreviewClick,
		openDeleteCardPopup
	);
	return card.getView();
}

function openDeleteCardPopup(cardId, cardElement) {
	deleteConfirmationPopup.open(() => handleDeleteCard(cardId, cardElement));
}
