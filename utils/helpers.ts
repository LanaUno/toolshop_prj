import { RegisterPage } from '../pages/registerPage';
import  *  as data from '../utils/testData';

export async function registerNewUser(registerPage: RegisterPage) {
    const userFirstName = data.testData.firstName;
    const userLastName = data.testData.lastName;
    const userDateOfBirth = data.dateOfBirth;
    const userStreet = data.testData.street;
    const userPostcode = data.testData.digit(5)
    const userCity = data.testData.city;
    const userState = data.testData.state;
    const userPhone = data.testData.digit(12);
    const userEmail = data.testData.email;
    const userPassword = data.password;

    await registerPage.fillRegisterForm({
        userFirstName,
        userLastName,
        userDateOfBirth,
        userStreet,
        userPostcode,
        userCity,
        userState,
        userPhone,
        userEmail,
        userPassword,
    })
    return {
        userFirstName, userLastName, userDateOfBirth, userStreet, userPostcode, 
        userCity, userState, userPhone, userEmail, userPassword
    }
}

export function generateUser(overrides = {}) {
  return {
    userFirstName: data.testData.firstName,
    userLastName: data.testData.lastName,
    userDateOfBirth: data.dateOfBirth,
    userStreet: data.testData.street,
    userPostcode: data.testData.digit(5),
    userCity: data.testData.city,
    userState: data.testData.state,
    userPhone: data.testData.digit(12),
    userEmail: data.testData.email,
    userPassword: data.password,
    ...overrides
  };
}