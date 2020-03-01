import Constants from './../Constants';

const { firstName, lastName, email, password } = Constants.registrationFieldNames;

module.exports = {
    [firstName]: name => {
        const regex = /^[a-zA-Z ]{2,20}$/;
        return regex.test(String(name));
    },
    [lastName]: surname => {
        const regex = /^[a-zA-Z ]{3,30}$/;
        return regex.test(String(surname));
    },
    [email]: email => {
        const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regex.test(String(email).toLowerCase());
    },
    [password]: password => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,25}$/;
        return regex.test(String(password));
    },
};