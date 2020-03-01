import { observable, action, decorate, computed } from 'mobx';

import validators from './../helpers/Validator';
import api from '../api';
import storage from '../api/localStorage';
import userStore from './userStore';

class AuthStore {
    inProgress = false;
    errors = undefined;
    token = '';
    registerValidCount = 0;
    loginValidCount = 0;
    values = {
        login: {},
        register: {},
    };

    setAccessToken = (token) => {
        this.token = token;
    };

    setToken = (token) => {
        this.setAccessToken(token.accessToken);
        storage.saveToken(token);
    };

    setField = (page, field, value) => {
        const tmp = this.values;
        tmp[page][field] = value;
        this.values = Object.assign({}, tmp);
    };

    reset = () => {
        const tmp = {
            login: {},
            register: {},
        };
        this.values = Object.assign({}, tmp);
        this.errors = undefined;
        this.registerValidCount = 0;
        this.loginValidCount = 0;
    }

    testInput(event, count, page) {
        const { name, value } = event.target;
        if (validators[name](value)) {
            if (!this.values[page][name]) {
                count++;
                event.target.className = 'form-control is-valid';
            }
            this.setField(page, name, value);
        } else {
            if (this.values[page][name]) {
                event.target.className = 'form-control is-invalid';
                count--;
                this.values[page][name] = null;
            } else if (event.target.className === 'form-control') {
                event.target.className = 'form-control is-invalid';
            };
        };
        return count;
    };

    changeInput = (event, page) => {
        this[`${page}ValidCount`] = this.testInput(event, this[`${page}ValidCount`], page);
    };

    get registerDone() {
        return this.registerValidCount === 4;
    };

    get loginDone() {
        return this.loginValidCount === 2;
    };

    refreshToken = token => {
        this.inProgress = true;
        this.errors = undefined;
        return api.auth.refreshToken(token)
            .then(data => {
                if (data) {
                    this.setToken(data.updatedToken);
                }
            })
            .then(() => {
                userStore.pullUser();
            })
            .catch(this.logout())
            .finally(action(() => { this.inProgress = false; }));
    };

    login = () => {
        this.inProgress = true;
        this.errors = undefined;
        return api.auth.login(this.values.login)
            .then(data => {
                if (data.token.accessToken) {
                    this.setToken(data.token);
                    userStore.setUser(data.user);
                    this.reset();
                }
            })
            .then(() => {
                userStore.pullUser();
            })
            .catch(action(err => {
                this.errors = err.response && err.response.data && err.response.data.message;
                throw err;
            }))
            .finally(action(() => { this.inProgress = false; }));
    };

    register = () => {
        this.inProgress = true;
        this.errors = undefined;
        return api.auth.register(this.values.register)
            .then(data => {
                if (data) {
                    this.setToken(data.token);
                    userStore.setUser(data.user);
                    this.reset();
                }
            })
            .catch(action(err => {
                this.errors = err.response && err.response.data && err.response.data.message;
                throw err;
            }))
            .finally(action(() => { this.inProgress = false; }));
    };

    logout = () => {
        this.token = undefined;
        userStore.setUser(undefined);
        storage.clearStorage();
        return Promise.resolve();
    };
};

decorate(AuthStore, {
    inProgress: observable,
    errors: observable,
    values: observable,
    registerValidCount: observable,
    loginValidCount: observable,
    token: observable,
    setField: action,
    reset: action,
    setAccessToken: action,
    setToken: action,
    testInput: action,
    changeInput: action,
    login: action,
    loginDone: computed,
    register: action,
    registerDone: computed,
    refreshToken: action,
    logout: action,
});

export default new AuthStore();