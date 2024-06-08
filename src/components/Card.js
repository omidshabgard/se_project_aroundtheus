import { eventType, selectors } from '../constants/app-data.js';

class Card {
	constructor(data, cardSelector, handleImageClick) {
		this._name = data.name;
		this._url = data.url;
		this._cardSelector = cardSelector;
		this._handleImageClick = handleImageClick;
	}

	_handleImagePreview() {
		return this._handleImageClick(this._name, this._url);
	}

	_setEventListeners() {
		const likeButtonElement = this._cardElement.querySelector(
			selectors.cardTemplate.likeButton
		);
		likeButtonElement.addEventListener(eventType.CLICK, () => {
			this._handleLikeButton(likeButtonElement);
		});

		const deleteButtonElement = this._cardElement.querySelector(
			selectors.cardTemplate.deleteButton
		);
		deleteButtonElement.addEventListener(eventType.CLICK, () => {
			this._handleDeleteButton();
		});

		const imageElement = this._cardElement.querySelector(
			selectors.cardTemplate.image
		);
		imageElement.addEventListener(eventType.CLICK, () =>
			this._handleImagePreview()
		);
	}

	getView() {
		this._cardElement = document
			.querySelector(this._cardSelector)
			.content.querySelector(selectors.cardTemplate.card)
			.cloneNode(true);

		// add title to the card
		this._cardElement.querySelector(
			selectors.cardTemplate.title
		).textContent = this._name;

		// add image to the card

		const imageElement = this._cardElement.querySelector(
			selectors.cardTemplate.image
		);
		imageElement.src = this._url;
		imageElement.alt = this._name;

		this._setEventListeners();
		return this._cardElement;
	}

	_handleLikeButton(element) {
		element.classList.toggle('card__like-button_active');
	}
	_handleDeleteButton() {
		this._cardElement.remove();
		this._cardElement = null;
	}
}

export default Card;
