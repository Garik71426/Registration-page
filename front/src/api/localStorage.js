import axios from 'axios';

export const storageKey = 'my-user';

class LocalStorage {
	constructor() {
		this.storage = this.__supportsHtml5Storage() ? localStorage : null;
	}

	__supportsHtml5Storage() {
		try {
			return 'localStorage' in window && window.localStorage !== null;
		} catch (error) {
			return false;
		}
	}

	saveToken(token) {
		if (!this.storage) {
			return null;
		}
		this.storage.setItem(`${storageKey}-accessToken`, token.accessToken);
		this.storage.setItem(`${storageKey}-refreshToken`, token.refreshToken);
		axios.defaults.headers.common.Authorization = token.accessToken;
	}

	fetchAccessToken() {
		const token = this.storage && this.storage.getItem(`${storageKey}-accessToken`);
		if (token) {
			return token;
		}
		return null;
	}

	fetchRefreshToken() {
		const token = this.storage && this.storage.getItem(`${storageKey}-refreshToken`);
		if (token) {
			return token;
		}
		return null;
	}

	clearStorage() {
		this.storage.clear();
		axios.defaults.headers.common.Authorization = undefined;
	}
}

export default new LocalStorage();
