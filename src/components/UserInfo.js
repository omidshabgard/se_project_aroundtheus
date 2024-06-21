import { selectors } from '../constants/app-data';

class UserInfo {
	constructor(initialName, initialAbout, profileContainerSelector) {
		this._name = document.querySelector(initialName);
		this._about = document.querySelector(initialAbout);
		this._profileContainer = document.querySelector(
			profileContainerSelector
		);
		this._updateUI();
	}

	setUserInfo(newName, newAbout) {
		this._name = newName;
		this._about = newAbout;
		this._updateUI();
	}

	getUserInfo() {
		return {
			name: this._name.textContent,
			about: this._about.textContent,
		};
	}

	_updateUI() {
		this._profileContainer.querySelector(
			selectors.profile.title
		).textContent = this._name.textContent;

		this._profileContainer.querySelector(
			selectors.profile.description
		).textContent = this._about.textContent;
	}
}

export default UserInfo;
