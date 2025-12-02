import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { BasePage } from '../pages/basePage';
import { RegisterPage } from '../pages/registerPage';
import  *  as data from '../utils/testData';
import { registerNewUser } from '../utils/helpers';
import { generateUser } from '../utils/helpers'

let loginPage: any;
let registerPage: any;
let newUser: any;

test.describe('Register new user', async() => {

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page);
        const basePage = new BasePage(page);
        registerPage = new RegisterPage(page);
        
        await basePage.goto('/');
        await loginPage.clickSignInLink();
        await expect(loginPage.loginModal).toBeVisible();
        await loginPage.clickRegisterLink();
    })
    test('C001 Register/login user', async({ page }) => {
        newUser = await registerNewUser(registerPage);

        await registerPage.fillRegisterForm(newUser);
        await registerPage.clickRegisterButton();
        await expect(registerPage.loginForm).toBeVisible();
        await registerPage.fillEmail(data.testData.email)
        await registerPage.fillPassword(data.password)
        await registerPage.clickLoginButton();
        const navMenuFirstName: any = await registerPage.profileName.textContent()
        const menuName = navMenuFirstName.trim().split(' ')[0]
        console.log(menuName)
        expect (menuName).toEqual(data.testData.firstName);
        await registerPage.profileName.click()
        await registerPage.clickSignOutLink();
        await expect(registerPage.loginForm).toBeVisible();
    });
    test('C002 Verify register form', async() => {
        await expect(registerPage.registerForm).toBeVisible();
        await expect(registerPage.registerTitle).toBeVisible();
        await expect(registerPage.registerTitle).toContainText('Customer registration');

        await expect(registerPage.firstNameTitle).toBeVisible();
        await expect(registerPage.firstNameTitle).toContainText('First name');
        await expect(registerPage.firstName).toHaveAttribute('placeholder','First name *');

        await expect(registerPage.lastNameTitle).toBeVisible();
        await expect(registerPage.lastNameTitle).toContainText('Last name');
        await expect(registerPage.lastName).toHaveAttribute('placeholder','Your last name *');

        await expect(registerPage.birthDateTitle).toBeVisible();
        await expect(registerPage.birthDateTitle).toContainText('Date of Birth *');
        await expect(registerPage.birthDate).toHaveAttribute('placeholder','YYYY-MM-DD');

        await expect(registerPage.streetTitle).toBeVisible();
        await expect(registerPage.streetTitle).toContainText('Street');
        await expect(registerPage.street).toHaveAttribute('placeholder','Your Street *');

        await expect(registerPage.postcodeTitle).toBeVisible();
        await expect(registerPage.postcodeTitle).toContainText('Postal code');
        await expect(registerPage.postcode).toHaveAttribute('placeholder','Your Postcode *');

        await expect(registerPage.cityTitle).toBeVisible();
        await expect(registerPage.cityTitle).toContainText('City');
        await expect(registerPage.city).toHaveAttribute('placeholder','Your City *');

        await expect(registerPage.stateTitle).toBeVisible();
        await expect(registerPage.stateTitle).toContainText('State');
        await expect(registerPage.state).toHaveAttribute('placeholder','Your State *');

        await expect(registerPage.countryTitle).toBeVisible();
        await expect(registerPage.countryTitle).toContainText('Country');
        await expect(registerPage.countryFieldText).toHaveText('Your country *');

        await expect(registerPage.phoneTitle).toBeVisible();
        await expect(registerPage.phoneTitle).toContainText('Phone');
        await expect(registerPage.phone).toHaveAttribute('placeholder','Your phone *');

        await expect(registerPage.emailTitle).toBeVisible();
        await expect(registerPage.emailTitle).toContainText('Email address');
        await expect(registerPage.email).toHaveAttribute('placeholder','Your email *');

        await expect(registerPage.passwordTitle).toBeVisible();
        await expect(registerPage.passwordTitle).toContainText('Password');
        await expect(registerPage.password).toHaveAttribute('placeholder','Your password');

    })

    test('C003 Registration with empty fields', async({ page }) => {
        await registerPage.clickRegisterButton();
        await expect(registerPage.firstNameErrMsg).toHaveText(data.texts.requiredFirstName);
        await expect(registerPage.firstName).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.lastNameErrMsg).toHaveText(data.texts.requiredLastName);
        await expect(registerPage.lastName).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.streetErrMsg).toHaveText(data.texts.requiredStreet);
        await expect(registerPage.street).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.postcodeErrMsg).toHaveText(data.texts.requiredPostcode);
        await expect(registerPage.postcode).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.cityErrMsg).toHaveText(data.texts.requiredCity);
        await expect(registerPage.city).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.stateErrMsg).toHaveText(data.texts.requiredState);
        await expect(registerPage.state).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.countryErrMsg).toHaveText(data.texts.requiredCountry);
        await expect(registerPage.country).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.phoneErrMsg).toHaveText(data.texts.requiredPhone);
        await expect(registerPage.phone).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.emailErrMsg).toHaveText(data.texts.requiredEmail);
        await expect(registerPage.email).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.passwordErrMsg).toHaveText(data.texts.requiredPassword);
        await expect(registerPage.password).toHaveCSS('border-color',data.color.error);
    });

    test('C004 Registration with already registered email', async({ page }) => {
        newUser = await generateUser({});

        await registerPage.fillRegisterForm(newUser);
        await registerPage.clickRegisterButton();
        await expect(registerPage.loginForm).toBeVisible();
        await registerPage.fillEmail(data.testData.email)
        await registerPage.fillPassword(data.password)
        await registerPage.clickLoginButton();
        await registerPage.profileName.click();
        await registerPage.clickSignOutLink();
        await expect(registerPage.loginForm).toBeVisible();

        await loginPage.clickSignInLink();
        await expect(loginPage.loginModal).toBeVisible();
        await loginPage.clickRegisterLink();
        await registerPage.fillRegisterForm(newUser);
        await registerPage.clickRegisterButton();
        await expect(registerPage.registerErrMsg).toHaveText(data.texts.existingEmail);
    });
    test('C005 Registration with invalid email', async({ page }) => {
        await registerPage.clearRegisterForm()
        const invalidUser = generateUser({ userEmail: data.invalidEmail.withSpace });
        await registerPage.fillRegisterForm(invalidUser);
        await registerPage.clickRegisterButton();
        await expect(registerPage.email).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.emailErrMsg).toHaveClass('alert alert-danger mt-3');

        await registerPage.clearRegisterForm()
        const invalidUser1 = generateUser({ userEmail: data.invalidEmail.cyrillic });
        await registerPage.fillRegisterForm(invalidUser1);
        await registerPage.clickRegisterButton();
        await expect(registerPage.email).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.emailErrMsg).toHaveClass('alert alert-danger mt-3');

        await registerPage.clearRegisterForm()
        const invalidUser2 = generateUser({ userEmail: data.invalidEmail.withoutAtSymbol });
        await registerPage.fillRegisterForm(invalidUser2);
        await registerPage.clickRegisterButton();
        await expect(registerPage.email).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.emailErrMsg).toHaveClass('alert alert-danger mt-3');

        // This check is skipped - you can register a user with an email that does not contain a dot.
        await registerPage.clearRegisterForm()
        const invalidUser3 = generateUser({ userEmail: data.invalidEmail.withoutDot });
        await registerPage.fillRegisterForm(invalidUser3);
        await registerPage.clickRegisterButton();

        // This check is skipped - you can register a user with an email that does not contain a dot and a suffix.
        await registerPage.clearRegisterForm()
        const invalidUser4 = generateUser({ userEmail: data.invalidEmail.withoutDotAndSuffix });
        await registerPage.fillRegisterForm(invalidUser4);
        await registerPage.clickRegisterButton();
        
        // This check is skipped - you can register a user with an email that does not contain domain.
        await registerPage.clearRegisterForm()
        const invalidUser5 = generateUser({ userEmail: data.invalidEmail.withoutDomain });
        await registerPage.fillRegisterForm(invalidUser5);
        await registerPage.clickRegisterButton();

        await registerPage.clearRegisterForm()
        const invalidUser6 = generateUser({ userEmail: data.invalidEmail.withoutDomainDotCom });
        await registerPage.fillRegisterForm(invalidUser6);
        await registerPage.clickRegisterButton();
        await expect(registerPage.email).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.emailErrMsg).toHaveClass('alert alert-danger mt-3');

        await registerPage.clearRegisterForm()
        const invalidUser7 = generateUser({ userEmail: data.invalidEmail.withTwoAtSymbols });
        await registerPage.fillRegisterForm(invalidUser7);
        await registerPage.clickRegisterButton();
        await expect(registerPage.email).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.emailErrMsg).toHaveClass('alert alert-danger mt-3');
       
    });
    test('C006 Registration with invalid password', async({ page }) => {
        await registerPage.clearRegisterForm()
        const invalidUser = generateUser({ userPassword: data.invalidPswd.lessThan8characters });
        await registerPage.fillRegisterForm(invalidUser);
        console.log(invalidUser)
        await registerPage.clickRegisterButton();
        await expect(registerPage.password).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.passwordErrMsg).toHaveText(data.texts.notLess8Characters);

        await registerPage.clearRegisterForm()
        const invalidUser1 = generateUser({ userPassword: data.invalidPswd.pswdNoUppercase });
        await registerPage.fillRegisterForm(invalidUser1);
        console.log(invalidUser1)
        await registerPage.clickRegisterButton();
        await expect(registerPage.password).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.containUpperAndLowerMsg).toHaveText(data.texts.containUpperAndLowerCase);
        await expect(registerPage.containUpperAndLowerMsg).toHaveCSS('color', data.color.unfulfilledCondition);
        
        await registerPage.clearRegisterForm()
        const invalidUser2 = generateUser({ userPassword: data.invalidPswd.pswdNoLowercase });
        await registerPage.fillRegisterForm(invalidUser2);
        console.log(invalidUser2)
        await registerPage.clickRegisterButton();
        await expect(registerPage.password).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.containUpperAndLowerMsg).toHaveText(data.texts.containUpperAndLowerCase);
        await expect(registerPage.containUpperAndLowerMsg).toHaveCSS('color', data.color.unfulfilledCondition);

        await registerPage.clearRegisterForm()
        const invalidUser3 = generateUser({ userPassword: data.invalidPswd.pswdNoNumbers });
        await registerPage.fillRegisterForm(invalidUser3);
        console.log(invalidUser3)
        await registerPage.clickRegisterButton();
        await expect(registerPage.password).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.containNumberMsg).toHaveText(data.texts.containNumber);
        await expect(registerPage.containNumberMsg).toHaveCSS('color', data.color.unfulfilledCondition);

        await registerPage.clearRegisterForm()
        const invalidUser4 = generateUser({ userPassword: data.invalidPswd.pswdNoSymbols });
        await registerPage.fillRegisterForm(invalidUser4);
        console.log(invalidUser4)
        await registerPage.clickRegisterButton();
        await expect(registerPage.password).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.containSymbolsMsg).toHaveText(data.texts.mustBeSymbol);
        await expect(registerPage.containSymbolsMsg).toHaveCSS('color', data.color.unfulfilledCondition);

        await registerPage.clearRegisterForm()
        const invalidUser5 = generateUser({ userPassword: data.invalidPswd.cyrillicPswd });
        await registerPage.fillRegisterForm(invalidUser5);
        console.log(invalidUser5)
        await registerPage.clickRegisterButton();
        await expect(registerPage.password).toHaveCSS('border-color',data.color.error);
        await expect(registerPage.passwordErrMsg).toHaveText(data.texts.invalidCharacters);
    });
    test('C007 Register with invalid first name', async() => {
        const tooLongFName = generateUser({ userFirstName: data.testData.letters(41) });
        await registerPage.fillRegisterForm(tooLongFName);
        console.log(tooLongFName)
        await registerPage.clickRegisterButton();
        await expect(registerPage.registerErrMsg).toHaveText(data.texts.tooLongFNameErrMsg);

        const cyrillicFName = generateUser({ userFirstName: data.testData.cyrillic });
        await registerPage.fillRegisterForm(cyrillicFName);
        console.log(cyrillicFName)
        await registerPage.clickRegisterButton();
        await expect(registerPage.registerErrMsg).toHaveClass('alert alert-danger');

        const symbolsFName = generateUser({ userFirstName: data.testData.symbols(8) });
        await registerPage.fillRegisterForm(symbolsFName);
        console.log(symbolsFName)
        await registerPage.clickRegisterButton();
        await expect(registerPage.registerErrMsg).toHaveClass('alert alert-danger');
    });
    test('C008 Register with invalid last name', async() => {
        const tooLongLName = generateUser({ userLastName: data.testData.letters(21) });
        await registerPage.fillRegisterForm(tooLongLName);
        console.log(tooLongLName)
        await registerPage.clickRegisterButton();
        await expect(registerPage.registerErrMsg).toHaveText(data.texts.tooLongLNameErrMsg);

        const cyrillicLName = generateUser({ userLastName: data.testData.cyrillic });
        await registerPage.fillRegisterForm(cyrillicLName);
        console.log(cyrillicLName)
        await registerPage.clickRegisterButton();
        await expect(registerPage.registerErrMsg).toHaveClass('alert alert-danger');

        const symbolsLName = generateUser({ userLastName: data.testData.symbols(8) });
        await registerPage.fillRegisterForm(symbolsLName);
        console.log(symbolsLName)
        await registerPage.clickRegisterButton();
        await expect(registerPage.registerErrMsg).toHaveClass('alert alert-danger');
    });
})