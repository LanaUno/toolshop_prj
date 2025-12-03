import * as data from "../utils/testData";

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
        ...overrides,
    };
}
