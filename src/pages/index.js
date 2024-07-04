import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopoupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
	BASE_URL,
	HEADERS,
	addNewCardButton,
	addNewCardForm,
	configValidation,
	eventType,
	profileAboutInput,
	avatarElem,
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

const profileEditFormValidator = new FormValidator(
	configValidation,
	profileEditForm
);
const profileEditPopup = new PopupWithForm(
	selectors.modal.profileEdit.modal,
	handleProfileFormSubmit
);

const avatarEditPopup = new PopupWithForm(
	selectors.modal.profilePic.modal,
	handleAvatarEdit
);

const addNewCardFormValidator = new FormValidator(
	configValidation,
	addNewCardForm
);

const addNewCardPopup = new PopupWithForm(
	selectors.modal.cardAdd.modal,
	handleNewCardSubmit
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

profileEditButton.addEventListener(eventType.CLICK, openEditProfileModal);
avatarElem.addEventListener(eventType.CLICK, openProfilePicModal);
addNewCardButton.addEventListener(eventType.CLICK, openCardAddModal);

profileEditFormValidator.enableValidation();
addNewCardFormValidator.enableValidation();

// --------------------------------------------------------------//
// Reusable functions -------------------------------------------//
// --------------------------------------------------------------//
function openCardAddModal() {
	addNewCardFormValidator.resetValidation();
	addNewCardPopup.open();
}

function handleCardPreviewClick(caption, imageUrl) {
	cardPreviewPopup.open(caption, imageUrl);
}

function renderCard(cardData) {
	const card = new Card(
		cardData,
		selectors.cardTemplate.template,
		handleCardPreviewClick
	);
	return card.getView();
}

function handleProfileFormSubmit(inputValues) {
	const { name, about } = inputValues;
	api.editUserInfo({ name, about }).then((userData) => {
		userInfo.setUserInfo(userData);
		profileEditPopup.close();
	});
}

function openProfilePicModal() {
	avatarEditPopup.open();
}

function handleAvatarEdit(inputValues) {
	const { avatar } = inputValues;
	api.editUserAvatar({ avatar }).then((userData) => {
		userInfo.setUserInfo(userData);
		avatarEditPopup.close();
	});
}

function openEditProfileModal() {
	const { name, about } = userInfo.getUserInfo();
	profileTitleInput.value = name;
	profileAboutInput.value = about;
	profileEditFormValidator.resetValidation();
	profileEditPopup.open();
}

function handleNewCardSubmit(inputValues) {
	api.addCard(inputValues).then((cardData) => {
		const newCard = renderCard(cardData);
		section.addItem(newCard);
		addNewCardPopup.close();
	});
}
