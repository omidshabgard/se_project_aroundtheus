class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	// GET /cards – Get all cards
	async getInitialCards() {
		const res = await fetch(`${this._baseUrl}/cards`, {
			headers: this._headers,
		});
		if (res.ok) {
			return res.json();
		}
		return await Promise.reject(`Error: ${res.status}`);
	}

	// GET /users/me – Get the current user’s info
	async getUserInfo() {
		const res = await fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers,
		});
		if (res.ok) {
			return res.json();
		}
		return await Promise.reject(`Error: ${res.status}`);
	}

	// PATCH /users/me – Update your profile information
	async editUserInfo(data) {
		const res = await fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				about: data.about,
			}),
		});
		if (res.ok) {
			return res.json();
		}
		return await Promise.reject(`Error: ${res.status}`);
	}

	// PATCH /users/me/avatar – Update avatar
	async editUserAvatar(data) {
		const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: data.avatar,
			}),
		});
		if (res.ok) {
			return res.json();
		}
		return await Promise.reject(`Error: ${res.status}`);
	}

	// POST /cards – Create a card
	async addCard(data) {
		const res = await fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				link: data.link,
			}),
		});
		if (res.ok) {
			return res.json();
		}
		return await Promise.reject(`Error: ${res.status}`);
	}

	// DELETE /cards/:cardId – Delete a card
	async removeCard(cardId) {
		const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._headers,
		});
		if (res.ok) {
			return res.json();
		}
		return await Promise.reject(`Error: ${res.status}`);
	}

	// PUT /cards/:cardId/likes – Like a card
	async likeCard(cardId) {
		const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: 'PUT',
			headers: this._headers,
		});
		if (res.ok) {
			return res.json();
		}
		return await Promise.reject(`Error: ${res.status}`);
	}

	// DELETE /cards/:cardId/likes – Dislike a card
	async dislikeCard(cardId) {
		const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: this._headers,
		});
		if (res.ok) {
			return res.json();
		}
		return await Promise.reject(`Error: ${res.status}`);
	}
	
	// Fetch user info and cards concurrently
	async getUserInfoAndCards() {
		return Promise.all([this.getUserInfo(), this.getInitialCards()]);
	}
}

export default Api;
