import {
	BASE_URL,
	HEADERS,
	eventType,
	selectors,
} from '../constants/app-data.js';
import Api from './Api.js';
import PopupDelete from './PopupDelete.js';

export const api = new Api({
	baseUrl: BASE_URL,
	headers: HEADERS,
});
class Card {
	constructor(data, cardSelector, handleImageClick) {
		this._name = data.name;
		this._link = data.link;
		this._id = data._id;
		this._isLiked = data.isLiked;
		this._cardSelector = cardSelector;
		this._handleImageClick = handleImageClick;
	}

	_handleImagePreview() {
		return this._handleImageClick(this._name, this._link);
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
		imageElement.src = this._link;
		imageElement.alt = this._name;

		//fill like button
		const likeButtonElement = this._cardElement.querySelector(
			selectors.cardTemplate.likeButton
		);
		if (this._isLiked) {
			likeButtonElement.classList.add('card__like-button_active');
		}

		this._setEventListeners();
		return this._cardElement;
	}

	_handleLikeButton(element) {
		const likeClass = 'card__like-button_active';
		const isCardLiked = element.classList.contains(likeClass);

		if (isCardLiked) {
			api.dislikeCard(this._id).then(() => {
				element.classList.remove(likeClass);
			});
		} else {
			api.likeCard(this._id).then(() => {
				element.classList.add(likeClass);
			});
		}
	}

	_handleDeleteButton() {
		const deleteHandler = (e) => {
			e.preventDefault();
			api.removeCard(this._id).then(() => {
				this._cardElement.remove();
				this._cardElement = null;
				deleteConfirmationPopup.close();
			});
		};
		const deleteConfirmationPopup = new PopupDelete(
			selectors.modal.deleteConfirmation.modal,
			selectors.modal.button
		);
		deleteConfirmationPopup.setEventListeners(deleteHandler);
		deleteConfirmationPopup.open();
	}
}

export default Card;
