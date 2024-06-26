import { selectors } from '../constants/app-data.js';
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super({ popupSelector });
		this._previewImageTitle = this._popupElement.querySelector(
			selectors.modal.image.caption
		);
		this._previewImageModal = this._popupElement.querySelector(
			selectors.modal.image.preview
		);
	}

	open(caption, imageUrl) {
		this._previewImageModal.src = imageUrl;
		this._previewImageModal.alt = caption;
		this._previewImageTitle.textContent = caption;
		super.open();
	}
}
