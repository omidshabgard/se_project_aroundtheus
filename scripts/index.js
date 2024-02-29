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

initialCards.forEach((card) => {
	const cardElement = getCardElement(card);
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
	e.preventDefault();
	const cardData = {
		name: cardTitleInputElement.value,
		link: cardUrlInputElement.value,
	};
	const cardElement = getCardElement(cardData);
	galleryCardsElement.prepend(cardElement);
	e.target.reset();
	closeAddPlaceModal();
}

function openModalImage(cardData) {
	imageModalImage.src = cardData.link;
	imageModalImage.alt = cardData.name;
	imageModalCaption.textContent = cardData.name;
	openModal(imageModal);
}

function getCardElement(cardData) {
	const clonedCardElement = templateCard.cloneNode(true);
	const imageElement = clonedCardElement.querySelector('.card__image');
	const titleElement = clonedCardElement.querySelector('.card__title');

	const likeButton = clonedCardElement.querySelector(
		'button.card__like-button'
	);
	const deleteButton = clonedCardElement.querySelector(
		'button.card__delete-button'
	);

	imageElement.src = cardData.link;
	imageElement.alt = cardData.name;
	titleElement.textContent = cardData.name;

	likeButton.addEventListener('click', function (e) {
		e.target.classList.toggle('card__like-button_active');
	});

	deleteButton.addEventListener('click', function (e) {
		clonedCardElement.remove();
	});

	imageElement.addEventListener('click', function () {
		openModalImage(cardData);
	});

	return clonedCardElement;
}

//------------------------------------------------//
//--------------reusable methods------------------//
//------------------------------------------------//
function openModal(modal) {
	modal.classList.add('modal_opened');
}

function closeModal(modal) {
	modal.classList.remove('modal_opened');
}
