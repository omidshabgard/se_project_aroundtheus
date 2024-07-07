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

api.getUserInfoAndCards()
	.then(([userData, initialCards]) => {
		userInfo.setUserInfo(userData);
		section.renderItems(initialCards);
	})
	.catch((err) => {
		console.error(err);
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
	profileEditPopup.renderLoading(true);
	api.editUserInfo({ name, about })
		.then((userData) => {
			userInfo.setUserInfo(userData);
			profileEditPopup.close();
			profileEditFormValidator.resetValidation();
			profileEditPopup.renderLoading(false);
		})
		.catch((err) => {
			console.error(err);
		});
}

function handleNewCardSubmit(inputValues) {
	addNewCardPopup.renderLoading(true);
	api.addCard(inputValues)
		.then((cardData) => {
			const newCard = renderCard(cardData);
			section.addItem(newCard);
			addNewCardPopup.close();
			addNewCardFormValidator.resetValidation();
			addNewCardPopup.renderLoading(false);
		})
		.catch((err) => {
			console.error(err);
		});
}

function handleAvatarEditSubmit(inputValues) {
	const { avatar } = inputValues;
	avatarEditPopup.renderLoading(true);
	api.editUserAvatar({ avatar })
		.then((userData) => {
			userInfo.setUserInfo(userData);
			avatarEditPopup.close();
			avatarEditFormValidator.resetValidation();
			avatarEditPopup.renderLoading(false);
		})
		.catch((err) => {
			console.error(err);
		});
}

function handleDeleteCard(cardId, cardElement) {
	api.removeCard(cardId)
		.then(() => {
			cardElement.remove();
			cardElement = null;
			deleteConfirmationPopup.close();
		})
		.catch((err) => {
			console.error(err);
		});
}

function handleLikeClick(cardId) {
	return api.likeCard(cardId);
}

function handleDislikeClick(cardId) {
	return api.dislikeCard(cardId);
}

function renderCard(cardData) {
	const card = new Card(
		cardData,
		selectors.cardTemplate.template,
		handleCardPreviewClick,
		openDeleteCardPopup,
		handleLikeClick,
		handleDislikeClick
	);
	return card.getView();
}

function openDeleteCardPopup(cardId, cardElement) {
	deleteConfirmationPopup.open(() => handleDeleteCard(cardId, cardElement));
}
