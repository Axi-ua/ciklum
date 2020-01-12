let locators = require("../../../locators/github.com.json");
let testAccount = {
    email:"kifil13952@onmail.top",
    pass:"test-22TEST",
    name:"test-22"
};
let name, value;
describe("Tests for sign in page", () => {
    before("Set all necessary parameters", function () {
        //for prevent redirect
        Cypress.on('window:before:load', (win) => {
            Object.defineProperty(win, 'self', {
                get: () => {
                    return window.top;
                }
            });
        });
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });
        cy.request("https://github.com/login").then(res => {
            [name, value] = res.headers["set-cookie"].find(el => el.includes("_gh_sess")).split(";").find(el => el.includes("_gh_sess")).split("=");
            cy.setCookie(name, value);
        });
    });
    it("Open home github page", () => {
        cy.visit("https://github.com/").url().should("eq", "https://github.com/");
    });
    it("Move to Sign In page", function () {
        cy.get(locators.homePage.signIn).click().url().should("eq", "https://github.com/login");
    });
    it("Check that elements are present on the page", function () {
        let elements = [locators.signInPage.logo,
        locators.signInPage.header,
        locators.signInPage.loginLabel,
        locators.signInPage.loginField,
        locators.signInPage.passwordLabel,
        locators.signInPage.forgotPassLink,
        locators.signInPage.passwordField,
        locators.signInPage.signInBtn,
        locators.signInPage.createAccLink,
        locators.signInPage.terms,
        locators.signInPage.privacy,
        locators.signInPage.security,
        locators.signInPage.contact
        ];
        elements.forEach(function (el) {
            cy.get(el).should("be.visible");
        });
    });
    describe("Check links", function () {
        it("Forgot password link", function () {
            cy.get(locators.signInPage.forgotPassLink).as("forgotPassLink").should("include.text", "Forgot password?");
            cy.get("@forgotPassLink").then(function (el) {
                let url = el.attr("href");
                cy.request(url).then(function (xhr) {
                    expect(xhr.status).to.eq(200);
                });
            });
        });
        it("Create an account link", function () {
            cy.get(locators.signInPage.createAccLink).as("createAnAccount").should("include.text", "Create an account");
            cy.get("@createAnAccount").then(function (el) {
                let url = el.attr("href");
                cy.request(url).then(function (xhr) {
                    expect(xhr.status).to.eq(200);
                });
            });
        });
        it("Terms link", function () {
            cy.get(locators.signInPage.terms).as("terms").should("include.text", "Terms");
            cy.get("@terms").then(function (el) {
                let url = el.attr("href");
                cy.request(url).then(function (xhr) {
                    expect(xhr.status).to.eq(200);
                });
            });
        });
        it("Privacy link", function () {
            cy.get(locators.signInPage.privacy).as("privacy").should("include.text", "Privacy");
            cy.get("@privacy").then(function (el) {
                let url = el.attr("href");
                cy.request(url).then(function (xhr) {
                    expect(xhr.status).to.eq(200);
                });
            });
        });
        it("Security link", function () {
            cy.get(locators.signInPage.security).as("security").should("include.text", "Security");
            cy.get("@security").then(function (el) {
                let url = el.attr("href");
                cy.request(url).then(function (xhr) {
                    expect(xhr.status).to.eq(200);
                });
            });
        });
        it("Contact GitHub link", function () {
            cy.get(locators.signInPage.contact).as("contact").should("include.text", "Contact GitHub");
            cy.get("@contact").then(function (el) {
                let url = el.attr("href");
                cy.request(url).then(function (xhr) {
                    expect(xhr.status).to.eq(200);
                });
            });
        });
    });
});

describe("Check login with empty password and login fields", function () {
    before("Set Cookie", function(){
        cy.setCookie(name, value);
    });
    it("Open sign in page", () => {
        cy.visit("https://github.com/login").url().should("eq", "https://github.com/login");
    });
    it("Login with empty password and login fields", function () {
        cy.get(locators.signInPage.signInBtn).click().url().should("eq", "https://github.com/session");
    });
    it("Check that alert message is displayed", function () {
        cy.get(locators.signInPage.alert).contains("Incorrect username or password.");
    });
    it("Check that alert message is closed after click on the close button", function () {
        cy.get(locators.signInPage.closeAlertBtn).click();
        cy.get(locators.signInPage.alert).should("not.be.visible");
    });
});
describe("Check login with correct emain and empty password field", function () {
    before("Set Cookie", function(){
        cy.setCookie(name, value);
    });
    it("Open sign in page", () => {
        cy.visit("https://github.com/login").url().should("eq", "https://github.com/login");
    });
    it("Login with correct emain and empty password field", function () {
        cy.get(locators.signInPage.loginField).type(testAccount.email);
        cy.get(locators.signInPage.signInBtn).click().url().should("eq", "https://github.com/session");
    });
    it("Check that alert message is displayed", function () {
        cy.get(locators.signInPage.alert).contains("Incorrect username or password.");
    });
    it("Check that alert message is closed after click on the close button", function () {
        cy.get(locators.signInPage.closeAlertBtn).click();
        cy.get(locators.signInPage.alert).should("not.be.visible");
    });
});
describe("Check login with correct username and empty password field", function () {
    before("Set Cookie", function(){
        cy.setCookie(name, value);
    });
    it("Open sign in page", () => {
        cy.visit("https://github.com/login").url().should("eq", "https://github.com/login");
    });
    it("Login with correct username and empty password field", function () {
        cy.get(locators.signInPage.loginField).type(testAccount.name);
        cy.get(locators.signInPage.signInBtn).click().url().should("eq", "https://github.com/session");
    });
    it("Check that alert message is displayed", function () {
        cy.get(locators.signInPage.alert).contains("Incorrect username or password.");
    });
    it("Check that alert message is closed after click on the close button", function () {
        cy.get(locators.signInPage.closeAlertBtn).click();
        cy.get(locators.signInPage.alert).should("not.be.visible");
    });
});
describe("Check login with password and empty username field", function () {
    before("Set Cookie", function(){
        cy.setCookie(name, value);
    });
    it("Open sign in page", () => {
        cy.visit("https://github.com/login").url().should("eq", "https://github.com/login");
    });
    it("Login with password and empty username field", function () {
        cy.get(locators.signInPage.passwordField).type(testAccount.pass);
        cy.get(locators.signInPage.signInBtn).click().url().should("eq", "https://github.com/session");
    });
    it("Check that alert message is displayed", function () {
        cy.get(locators.signInPage.alert).contains("Incorrect username or password.");
    });
    it("Check that alert message is closed after click on the close button", function () {
        cy.get(locators.signInPage.closeAlertBtn).click();
        cy.get(locators.signInPage.alert).should("not.be.visible");
    });
});
describe("Check login with correct email and incorrect password", function () {
    before("Set Cookie", function(){
        cy.setCookie(name, value);
    });
    it("Open sign in page", () => {
        cy.visit("https://github.com/login").url().should("eq", "https://github.com/login");
    });
    it("Login with correct email and incorrect password", function () {
        cy.get(locators.signInPage.passwordField).type("test123");
        cy.get(locators.signInPage.loginField).type(testAccount.email);
        cy.get(locators.signInPage.signInBtn).click().url().should("eq", "https://github.com/session");
    });
    it("Check that alert message is displayed", function () {
        cy.get(locators.signInPage.alert).contains("Incorrect username or password.");
    });
    it("Check that alert message is closed after click on the close button", function () {
        cy.get(locators.signInPage.closeAlertBtn).click();
        cy.get(locators.signInPage.alert).should("not.be.visible");
    });
});

describe("Check login with correct name and incorrect password", function () {
    before("Set Cookie", function(){
        cy.setCookie(name, value);
    });
    it("Open sign in page", () => {
        cy.visit("https://github.com/login").url().should("eq", "https://github.com/login");
    });
    it("Login with correct name and incorrect password", function () {
        cy.get(locators.signInPage.passwordField).type("test123");
        cy.get(locators.signInPage.loginField).type(testAccount.name);
        cy.get(locators.signInPage.signInBtn).click().url().should("eq", "https://github.com/session");
    });
    it("Check that alert message is displayed", function () {
        cy.get(locators.signInPage.alert).contains("Incorrect username or password.");
    });
    it("Check that alert message is closed after click on the close button", function () {
        cy.get(locators.signInPage.closeAlertBtn).click();
        cy.get(locators.signInPage.alert).should("not.be.visible");
    });
});
describe("Check login with correct name and password", function () {
    before("Set Cookie", function(){
        cy.setCookie(name, value);
    });
    it("Open sign in page", () => {
        cy.visit("https://github.com/login").url().should("eq", "https://github.com/login");
    });
    it("Login with correct name and password", function () {
        cy.get(locators.signInPage.passwordField).type(testAccount.pass);
        cy.get(locators.signInPage.loginField).type(testAccount.name);
        cy.get(locators.signInPage.signInBtn).click().url().should("eq", "https://github.com/");
    });
});
describe("Check login with correct email and password", function () {
    before("Set Cookie", function(){
        cy.setCookie(name, value);
    });
    it("Open sign in page", () => {
        cy.visit("https://github.com/login").url().should("eq", "https://github.com/login");
    });
    it("Login with correct name and password", function () {
        cy.get(locators.signInPage.passwordField).type(testAccount.pass);
        cy.get(locators.signInPage.loginField).type(testAccount.email);
        cy.get(locators.signInPage.signInBtn).click().url().should("eq", "https://github.com/");
    });
});