import axios from 'axios';
import { stringify } from 'qs';

import config from '../config';
import storage from './localStorage';
import authStore from '../stores/authStore';
import userStore from '../stores/userStore';

export default () => {
	axios.defaults.baseURL = `${config.urlBackend}`;
	axios.defaults.paramsSerializer = params => stringify(params, { encode: false });
	axios.interceptors.response.use(
		response => {
			return response;
		},
		error => {
			if (error.response.status === 401) {
				const token = storage.fetchRefreshToken();
				authStore.refreshToken(token);
			}
			return Promise.reject(error);
		},
	);

	const token = storage.fetchAccessToken();
	if (token) {
		axios.defaults.headers.common.Authorization = token;
		authStore.setAccessToken(token);
		userStore.pullUser();
	}
};
