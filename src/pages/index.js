import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopoupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
// import UserInfo from '../constants/app-data.js';
import UserInfo from '../components/UserInfo.js';
import {
	addNewCardButton,
	addNewCardForm,
	configValidation,
	eventType,
	initialCards,
	profileDescriptionElem,
	profileDescriptionInput,
	profileEditButton,
	profileEditForm,
	profileTitleElem,
	profileTitleInput,
	selectors,
} from '../constants/app-data.js';
import '../pages/index.css';

let userInfo = new UserInfo()
// SECTION: CARD LIST

const section = new Section(
	{
		items: initialCards,
		renderer: (cardData) => {
			const cardElement = renderCard(cardData);
			section.addItem(cardElement);
		},
	},
	selectors.gallery.list
);

section.renderItems();

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

// POPUP: PROFILE EDIT FORM
const profileEditFormValidator = new FormValidator(
	configValidation,
	profileEditForm
);
const profileEditPopup = new PopupWithForm(
	selectors.modal.profileEdit.modal,
	handleProfileFormSubmit
);

function handleProfileFormSubmit(inputValues) {
	const { name, about } = inputValues;
	userInfo.setUserInfo(name, about);
	profileEditPopup.close();
}

profileEditPopup.setEventListeners();
profileEditButton.addEventListener(eventType.CLICK, openEditProfileModal);
profileEditFormValidator.enableValidation();

function openEditProfileModal() {
	profileEditPopup.open();
	const { name, about } = userInfo.getUserInfo();
	console.log("The Data got ", name, about);
	
	// Setting default values if name or about is not set
	if(!name){
		profileTitleInput.value = "Jacques Cousteau";
		profileDescriptionInput.value = "Explorer";
	} else {
		profileTitleInput.value = name;
		profileDescriptionInput.value = about;
	}
	
	profileEditFormValidator.resetValidation();
}

// POPUP: CARD ADD FORM
const addNewCardFormValidator = new FormValidator(
	configValidation,
	addNewCardForm
);

const addNewCardPopup = new PopupWithForm(
	selectors.modal.cardAdd.modal,
	handleNewCardSubmit
);

function handleNewCardSubmit(inputValues) {
	const { name, url } = inputValues;
	const newElementData = renderCard({ name, url });
	section.addItem(newElementData);
	addNewCardPopup.close();
}

addNewCardPopup.setEventListeners();
addNewCardButton.addEventListener(eventType.CLICK, openCardAddModal);
addNewCardFormValidator.enableValidation();

function openCardAddModal() {
	addNewCardFormValidator.resetValidation();
	addNewCardPopup.open();
}

// POPUP: IMAGE PREVIEW
const cardPreviewPopup = new PopupWithImage(selectors.modal.image.modal);
cardPreviewPopup.setEventListeners();
