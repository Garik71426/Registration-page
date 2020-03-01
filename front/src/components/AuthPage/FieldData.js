import Constants from '../../Constants';

const { firstName, lastName, email, password } = Constants.registrationFieldNames;

const FieldData = [
    {
        name: firstName,
        error: 'Name must contain no more than 20 letters and can not be empty',
        placeholder: 'First Name'
    },
    {
        name: lastName,
        error: 'Last Name must contain no more than 30 letters and can not be empty',
        placeholder: 'Last Name'
    },
    {
        name: email,
        type: 'email',
        error: 'The input value is not email and can not be empty',
        placeholder: 'Email'
    },
    {
        type: 'password',
        name: password,
        error: 'Password must be contain minimum 8 sibols, letters, numbers, and special symbols.',
        placeholder: 'Password'
    }
];

export default FieldData;
