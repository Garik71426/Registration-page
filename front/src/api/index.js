import axios from 'axios';

import config from '../config';

const sendData = res => res.data;

const { serverPath } = config;

export default {
    auth: {
        login: user => axios.post(`${serverPath}/jwt`, user).then(sendData),
        register: user => axios.post(`${serverPath}/users/create`, user).then(sendData),
        refreshToken: token => axios.post(`${serverPath}/jwt/refresh`, { token }).then(sendData),
    },
    user: {
        currentUser: () => axios.get(`${serverPath}/users/my`).then(sendData),
    }
};
