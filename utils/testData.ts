import { faker} from "@faker-js/faker";

export const testData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    digit: (i: number) => faker.string.numeric(i),
    digits: ({ length }: { length?: number | { min: number; max: number } }) => {
        return faker.string.numeric({ length });
    },
    street: faker.location.street(),
    city: faker.location.city(),
    state: faker.location.state(),
    email: faker.internet.email(),
    symbols: (i: number) => faker.string.fromCharacters("!?$#&%@"),
    letters: (i: number) => faker.string.alpha({ length: i, casing: "lower" }),
    lettersUp: (i: number) => faker.string.alpha({ length: i, casing: "upper" }),
    domain: faker.internet.domainName(),
    domainSuffix: faker.internet.domainSuffix(),
    domainWord: faker.internet.domainWord(),
    cyrillic: faker.string.fromCharacters("йцукенгшщзхъфывапролджэячсмитьбю", 8),
};

const year = faker.number.int({ min: 1951, max: 2006 });
const month = faker.number.int({ min: 1, max: 12 });
const day = faker.number.int({ min: 1, max: 31 });
let yourDate = new Date(year, month, day);
export const dateOfBirth: string = yourDate.toISOString().split("T")[0];

export const password = `${testData.symbols(1)}${testData.lettersUp(1)}${testData.letters(1)}${testData.digit(5)}`;

export const texts = {
    requiredFirstName: /First name is required/,
    requiredLastName: /Last name is required/,
    requiredDateOfBirht: /Date of Birth is required/,
    requiredStreet: /Street is required/,
    requiredPostcode: /Postcode is required/,
    requiredCity: /City is required/,
    requiredState: /State is required/,
    requiredCountry: /Country is required/,
    requiredPhone: /Phone is required/,
    requiredEmail: /Email is required/,
    requiredPassword: /Password is required/,
    existingEmail: /A customer with this email address already exists./,
    invalidCharacters: /Password can not include invalid characters./,
    notLess8Characters: /Password must be minimal /,
    mustBeSymbol: / Have at least one special symbol /,
    containUpperAndLowerCase: / Contain both uppercase and lowercase letters/,
    containNumber: / Include at least one number/,
    tooLongFNameErrMsg: /The first name field must not be greater than 40 characters./,
    tooLongLNameErrMsg: /The last name field must not be greater than 20 characters./,
    requiredDateFormat: /Please enter a valid date in YYYY-MM-DD format./,
};

export const color = {
    error: "rgb(220, 53, 69)",
    backgroundColorErr: "rgb(248, 215, 220)",
    unfulfilledCondition: "rgba(33, 37, 41, 0.75)",
};

export const invalidEmail = {
    withSpace: testData.firstName + " @" + testData.domain,
    cyrillic: faker.string.fromCharacters("йцукенгшщзхъфывапролджэячсмитьбю", 12),
    withoutAtSymbol: testData.firstName + testData.domain,
    withoutDot: testData.firstName + "@" + testData.domainWord + testData.domainSuffix,
    withoutDotAndSuffix: testData.firstName + "@" + testData.domainWord,
    withoutDomain: testData.firstName + "@." + testData.domainSuffix,
    withoutDomainDotCom: testData.firstName + "@",
    withTwoAtSymbols: testData.firstName + "@@" + testData.domain,
};

export const invalidPswd = {
    lessThan8characters: `${testData.symbols(1)}${testData.lettersUp(1)}${testData.letters(1)}${testData.digit(4)}`,
    pswdNoUppercase: `${testData.symbols(1)}${testData.letters(2)}${testData.digit(5)}`,
    pswdNoLowercase: `${testData.symbols(1)}${testData.lettersUp(2)}${testData.digit(5)}`,
    pswdNoNumbers: `${testData.symbols(1)}${testData.lettersUp(3)}${testData.letters(5)}`,
    pswdNoSymbols: `${testData.lettersUp(2)}${testData.letters(1)}${testData.digit(5)}`,
    cyrillicPswd: faker.string.fromCharacters("йцукенгшщзхъфывапролджэячсмитьбю", 8),
};

export const invalidBirthDate = {
    onlyYear: year.toString(),
    withDots: year + "." + month + "." + day,
    withSlashes: year + "/" + month + "/" + day,
    withSpaces: year + " " + month + " " + day,
    withoutSeparators: year.toString() + month.toString() + day.toString(),
    cyrillic: testData.cyrillic,
    letters: testData.letters(6),
    symbols: testData.symbols(6),
};
