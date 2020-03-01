import { observable, action, decorate } from 'mobx';
import api from '../api';

class UserStore {

    currentUser;
    isLoading = false;
    errors;

    pullUser = () => {
        this.isLoading = true;
        return api.user.currentUser()
            .then(user => {
                this.currentUser = user;
            })
            .finally(action(() => { this.isLoading = false; }));
    };

    setUser = user => {
        this.currentUser = user;
    };

};

decorate(UserStore, {
    currentUser: observable,
    errors: observable,
    isLoading: observable,
    pullUser: action,
    setUser: action,
});

export default new UserStore();
