import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { UserFormData } from "../utils/types";

export class RegisterPage extends BasePage {
    registerForm: Locator;
    registerTitle: Locator;
    firstNameTitle: Locator;
    firstName: Locator;
    lastNameTitle: Locator;
    lastName: Locator;
    birthDateTitle: Locator;
    birthDateField: Locator;
    street: Locator;
    streetTitle: Locator;
    postcodeTitle: Locator;
    postcode: Locator;
    cityTitle: Locator;
    city: Locator;
    stateTitle: Locator;
    state: Locator;
    countryTitle: Locator;
    country: Locator;
    countryFieldText: Locator;
    countryUS: Locator;
    phoneTitle: Locator;
    phone: Locator;
    emailTitle: Locator;
    email: Locator;
    passwordTitle: Locator;
    password: Locator;
    registerBtn: Locator;
    loginBtn: Locator;
    profileName: Locator;
    signOutLink: Locator;
    loginForm: Locator;
    firstNameErrMsg: Locator;
    lastNameErrMsg: Locator;
    dateOfBirthErrMsg: Locator;
    streetErrMsg: Locator;
    postcodeErrMsg: Locator;
    cityErrMsg: Locator;
    stateErrMsg: Locator;
    countryErrMsg: Locator;
    phoneErrMsg: Locator;
    emailErrMsg: Locator;
    passwordErrMsg: Locator;
    registerErrMsg: Locator;
    containSymbolsMsg: Locator;
    containUpperAndLowerMsg: Locator;
    containNumberMsg: Locator;

    constructor(page: Page) {
        super(page);

        this.registerForm = page.locator('[class="col-lg-8 auth-form"]');
        this.registerTitle = page.locator('[class="col-lg-8 auth-form"]>h3');
        this.firstNameTitle = page.locator('[for="first_name"]');
        this.firstName = page.locator('[id="first_name"]');
        this.lastNameTitle = page.locator('[for="last_name"]');
        this.lastName = page.locator('[id="last_name"]');
        this.birthDateTitle = page.locator('[for="dob"]');
        this.birthDateField = page.locator('[id="dob"]');
        this.streetTitle = page.locator('[for="street"]');
        this.street = page.locator('[id="street"]');
        this.postcodeTitle = page.locator('[for="postal_code"]');
        this.postcode = page.locator('[id="postal_code"]');
        this.cityTitle = page.locator('[for="city"]');
        this.city = page.locator('[id="city"]');
        this.stateTitle = page.locator('[for="state"]');
        this.state = page.locator('[id="state"]');
        this.countryUS = page.locator('//select[@id="country"]/option[@value="US"]');
        this.countryTitle = page.locator('[for="country"]');
        this.country = page.locator('[data-test="country"]');
        this.countryFieldText = page.locator("//select/option[1]");
        this.phoneTitle = page.locator('[for="phone"]');
        this.phone = page.locator('[id="phone"]');
        this.emailTitle = page.locator('[for="email"]');
        this.email = page.locator('[id="email"]');
        this.passwordTitle = page.locator('[for="password"]');
        this.password = page.locator('[id="password"]');
        this.registerBtn = page.locator('[data-test="register-submit"]');
        this.loginBtn = page.locator('[data-test="login-submit"]');
        this.profileName = page.locator('[data-test="nav-menu"]');
        this.signOutLink = page.locator('[data-test="nav-sign-out"]');
        this.loginForm = page.locator('[class="col-lg-6 auth-form"]');
        this.firstNameErrMsg = page.locator('[data-test="first-name-error"]');
        this.lastNameErrMsg = page.locator('[data-test="last-name-error"]');
        this.dateOfBirthErrMsg = page.locator('[data-test="dob-error"]');
        this.streetErrMsg = page.locator('[data-test="street-error"]');
        this.postcodeErrMsg = page.locator('[data-test="postal_code-error"]');
        this.cityErrMsg = page.locator('[data-test="city-error"]');
        this.stateErrMsg = page.locator('[data-test="state-error"]');
        this.countryErrMsg = page.locator('[data-test="country-error"]');
        this.phoneErrMsg = page.locator('[data-test="phone-error"]');
        this.emailErrMsg = page.locator('[data-test="email-error"]');
        this.passwordErrMsg = page.locator('[data-test="password-error"]');
        this.registerErrMsg = page.locator('[data-test="register-error"]');
        this.containSymbolsMsg = page.locator("//li[@_ngcontent-ng-c1437189899][4]");
        this.containUpperAndLowerMsg = page.locator("//li[@_ngcontent-ng-c1437189899][2]");
        this.containNumberMsg = page.locator("//li[@_ngcontent-ng-c1437189899][3]");
    }

    async fillRegisterForm(userData: UserFormData) {
        const { userFirstName, userLastName, userDateOfBirth, userStreet, userPostcode, userCity, userState, userPhone, userEmail, userPassword } =
            userData;
        await this.firstName.fill(userFirstName);
        await this.lastName.fill(userLastName);
        await this.birthDateField.fill(userDateOfBirth);
        await this.street.fill(userStreet);
        await this.postcode.fill(userPostcode);
        await this.city.fill(userCity);
        await this.state.fill(userState);
        await this.country.click();
        await this.country.selectOption("US");
        await this.phone.fill(userPhone);
        await this.email.fill(userEmail);
        await this.password.fill(userPassword);
    }

    async clearRegisterForm() {
        await this.firstName.clear();
        await this.lastName.clear();
        await this.birthDateField.clear();
        await this.street.clear();
        await this.postcode.clear();
        await this.city.clear();
        await this.state.clear();
        await this.phone.clear();
        await this.email.clear();
        await this.password.clear();
    }

    async clickRegisterButton() {
        await this.registerBtn.click();
    }

    async clickLoginButton() {
        await this.loginBtn.click();
    }

    async fillEmail(name: string) {
        await this.email.fill(name);
    }

    async fillPassword(name: string) {
        await this.password.fill(name);
    }

    async clickSignOutLink() {
        await this.signOutLink.click();
    }
}
