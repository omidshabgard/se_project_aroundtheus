const initialCards = [{
    name:"Yosemite Valley",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
},
{
    name:"Lake Louise",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
},
{
    name:"Bald Mountains",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
},
{
    name:"Latemar",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
},
{
    name:"Vanoise National Park",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
},
{
    name:"Lago di Braies",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
}
];


const profileEditButton = document.querySelector('#profile__edit-button');
const profileEditModal = document.querySelector('#profile-edit-modal');
const editProfileCloseBtn = document.querySelector('#modal__close');
const titleInputElement = document.querySelector('#profile-title-input');
const descriptionInputElement = document.querySelector('#profile-description-input');
const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
const profileEditForm = profileEditModal.querySelector('.modal__form');
const templateCard = document.querySelector("#templateCard").content.firstElementChild;
const galleryCardsElement = document.querySelector(".gallery__cards");


function closePopop(){
    profileEditModal.classList.remove('modal_opened');
}

profileEditButton.addEventListener('click', () => {
    titleInputElement.value = profileTitleElement.textContent;
    descriptionInputElement.value = profileDescriptionElement.textContent;
    profileEditModal.classList.add('modal_opened');
});

editProfileCloseBtn.addEventListener('click', () => {
    closePopop();
});

profileEditForm.addEventListener('submit', (e) => {
    e.preventDefault();
    profileTitleElement.textContent = titleInputElement.value;
    profileDescriptionElement.textContent = descriptionInputElement.value;
    closePopop();
});

const getCardElement = (cardData) => {
    // clone the template 
    const clonedCardElement = templateCard.cloneNode(true);
    // get the image element 
    const imageElement = clonedCardElement.querySelector(".card__image");
    // update src and alt of iamge  
    imageElement.src = cardData.link; 
    imageElement.alt = cardData.name;

    // get the title element 
    const titleElement = clonedCardElement.querySelector(".card__title");
    // change the title 
    titleElement.textContent = cardData.name;
    return clonedCardElement;
    
}

initialCards.forEach((card) => {
    const cardElement = getCardElement(card);
    galleryCardsElement.appendChild(cardElement);
});




