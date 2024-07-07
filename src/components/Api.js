class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	_apiCall(url, method, body) {
		return fetch(`${this._baseUrl}${url}`, {
			method,
			headers: this._headers,
			body: JSON.stringify(body),
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Error: ${res}`);
		});
	}

	// GET /cards – Get all cards
	async getInitialCards() {
		const res = await this._apiCall('/cards', 'GET');
		return res;
	}

	// GET /users/me – Get the current user’s info
	async getUserInfo() {
		const res = await this._apiCall('/users/me', 'GET');
		return res;
	}

	// PATCH /users/me – Update your profile information
	async editUserInfo(data) {
		const res = await this._apiCall('/users/me', 'PATCH', data);
		return res;
	}

	// PATCH /users/me/avatar – Update avatar
	async editUserAvatar(data) {
		const res = await this._apiCall('/users/me/avatar', 'PATCH', data);
		return res;
	}

	// POST /cards – Create a card
	async addCard(data) {
		const res = await this._apiCall('/cards', 'POST', data);
		return res;
	}

	// DELETE /cards/:cardId – Delete a card
	async removeCard(cardId) {
		const res = await this._apiCall(`/cards/${cardId}`, 'DELETE');
		return res;
	}

	// PUT /cards/:cardId/likes – Like a card
	async likeCard(cardId) {
		const res = await this._apiCall(`/cards/${cardId}/likes`, 'PUT');
		return res;
	}

	// DELETE /cards/:cardId/likes – Dislike a card
	async dislikeCard(cardId) {
		const res = await this._apiCall(`/cards/${cardId}/likes`, 'DELETE');
		return res;
	}

	// Fetch user info and cards concurrently
	async getUserInfoAndCards() {
		return Promise.all([this.getUserInfo(), this.getInitialCards()]);
	}
}

export default Api;
