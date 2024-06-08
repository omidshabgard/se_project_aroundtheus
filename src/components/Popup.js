import { eventType, selectors } from '../constants/app-data.js';

export default class Popup {
	constructor({ popupSelector }) {
		this._popupElement = document.querySelector(popupSelector);
		this._closeByEscapeButton = this._closeByEscapeButton.bind(this);
		this._popupCloseButon = this._popupElement.querySelector(
			selectors.modal.close
		);
	}

	open() {
		this._popupElement.classList.add('modal_opened');
		document.addEventListener(
			eventType.KEY_DOWN,
			this._closeByEscapeButton
		);
	}

	close() {
		this._popupElement.classList.remove('modal_opened');
		document.removeEventListener(
			eventType.KEY_DOWN,
			this._closeByEscapeButton
		);
	}

	_closeByEscapeButton = (e) => {
		if (e.key === 'Escape') {
			this.close();
		}
	};

	setEventListeners() {
		this._popupElement.addEventListener(eventType.MOUSE_DOWN, (e) => {
			if (
				//removed '.' in front of target
				e.target.classList.contains('modal') ||
				e.target.classList.contains('modal__close')
			) {
				this.close(e.currentTarget);
			}
		});

		this._popupCloseButon.addEventListener(eventType.CLICK, (e) => {
			this.close();
		});
	}
}
