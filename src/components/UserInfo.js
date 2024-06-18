import { selectors } from '../constants/app-data';

class UserInfo {
	
	constructor(initialName, initialAbout, profileContainerSelector) {
		this._name = "Jacques Cousteau";
		this._about = "Explorer";
		this._profileContainer = document.querySelector(
			selectors.profile.container
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
		console.log("The ")
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
