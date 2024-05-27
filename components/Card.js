export class Card {
	constructor(data, cardSelector, handleImageClick) {
		this._name = data.name;
		this._link = data.link;
		this._cardSelector = cardSelector;
		this._handleImageClick = handleImageClick;
	}
	_setEventListeners() {
		const likeButtonElement = this._cardElement.querySelector(
			'button.card__like-button'
		);
		likeButtonElement.addEventListener('click', () => {
			this._handleLikeButton(likeButtonElement);
		});

		const deleteButtonElement = this._cardElement.querySelector(
			'button.card__delete-button'
		);
		deleteButtonElement.addEventListener('click', () => {
			this._handleDeleteButton();
		});

		const imageElement = this._cardElement.querySelector('.card__image');
		imageElement.addEventListener('click', this._handleImageClick);
	}

	getView() {
		this._cardElement = document
			.querySelector(this._cardSelector)
			.content.querySelector('.card')
			.cloneNode(true);

		// add title to the card
		this._cardElement.querySelector('.card__title').textContent =
			this._name;

		// add image to the card

		const imageElement = this._cardElement.querySelector('.card__image');
		imageElement.src = this._link;
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
