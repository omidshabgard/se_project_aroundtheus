import { selectors } from '../constants/app-data';

class UserInfo {
	constructor(initialName, initialAbout, profileContainerSelector) {
		this._name = initialName;
		this._about = initialAbout;
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
			name: this._name,
			about: this._about,
		};
	}

	_updateUI() {
		this._profileContainer.querySelector(
			selectors.profile.title
		).textContent = this._name;

		this._profileContainer.querySelector(
			selectors.profile.description
		).textContent = this._about;
	}
}

export default UserInfo;
