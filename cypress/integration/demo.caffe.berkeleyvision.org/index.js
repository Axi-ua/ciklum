let locators = require("../../../locators/demo.caffe.berkeleyvision.org.json");
let url = "http://demo.caffe.berkeleyvision.org/";
let imgURLjpg = "https://upload.wikimedia.org/wikipedia/commons/8/85/%2710_Chevrolet_Camaro_%28Les_chauds_vendredis_%2710%29.jpg";
let imgURLpng = "http://pngimg.com/uploads/pokemon/pokemon_PNG129.png";
let invalidUrl = "https://upload.wikimedia.org/wikipedia/commons/";
let passToIMG = "images/correct.jpg";
let passTobigSizeIMG = "images/bigSize.jpg";
describe(`Tests for ${url}`, function () {
    it("Visits the Home page", function () {
        cy.visit(url).url().should("eq", url);
    });
    it("Check main elements", function () {
        cy.get(locators.pageHeader).should("be.visible");
        cy.get(locators.headerDescription).should("be.visible");
        cy.get(locators.classification).should("be.visible");
        cy.get(locators.quickExample).should("be.visible");
        cy.get(locators.urlIMGInput).should("be.visible");
        cy.get(locators.classifyURLbtn).should("be.visible");
        cy.get(locators.chooseFilebtn).should("be.visible");
        cy.get(locators.chooseFileLabel).should("be.visible");
        cy.get(locators.footer).should("be.visible");
    });
    describe("Check links", function () {
        it("Header link", function () {
            cy.get(locators.pageHeader).as("headerLink").should("include.text", "Caffe Demos").should("have.attr", "href", "/");
            cy.get("@headerLink").then(function (el) {
                let url = el.attr("href");
                cy.request(url).then(function (xhr) {
                    expect(xhr.status).to.eq(200);
                });
            });
        });
        it("Link in the header text", function () {
            cy.get(locators.headerDescriptionLink).as("headerTextLink").should("have.attr", "href", "http://caffe.berkeleyvision.org");
            cy.get("@headerTextLink").then(function (el) {
                let url = el.attr("href");
                cy.request(url).then(function (xhr) {
                    expect(xhr.status).to.eq(200);
                });
            });
        });
    });
    describe("Check Quick Example.", function () {
        it("Click for Quick Example.", function () {
            cy.get(locators.quickExample).click();
            cy.url().should("include", "demo.caffe.berkeleyvision.org/classify_url");
        });
        it("Check that image is visible.", function () {
            cy.get(locators.image).should("be.visible");
        });
        it("Check that Maximally accurate is opened.", function () {
            cy.get(locators.maximallyAccurateTab).then(function (el) {
                expect(el.attr("class")).to.eq("active");
            });
        });
        it("Check results in Maximally accurate", function () {
            cy.get(locators.accurateListOfItems).should("length", 5);
            cy.get(locators.accurateFirstResultBadge).should("be.visible");
            cy.get(locators.accurateFirstResultText).should("be.visible");
            cy.get(locators.accurateSecondResultBadge).should("be.visible");
            cy.get(locators.accurateSecondResultText).should("be.visible");
            cy.get(locators.accurateThirdResultBadge).should("be.visible");
            cy.get(locators.accurateThirdResultText).should("be.visible");
            cy.get(locators.accurateForthResultBadge).should("be.visible");
            cy.get(locators.accurateForthResultText).should("be.visible");
            cy.get(locators.accurateFifthResultBadge).should("be.visible");
            cy.get(locators.accurateFifthResultText).should("be.visible");
        });
        it("Check results in Maximally specific", function () {
            cy.get(locators.maximallySpecificTab).click()
            cy.get(locators.specificListOfItems).should("length", 5);
            cy.get(locators.specificFirstResultBadge).should("be.visible");
            cy.get(locators.specificFirstResultText).should("be.visible");
            cy.get(locators.specificSecondResultBadge).should("be.visible");
            cy.get(locators.specificSecondResultText).should("be.visible");
            cy.get(locators.specificThirdResultBadge).should("be.visible");
            cy.get(locators.specificThirdResultText).should("be.visible");
            cy.get(locators.specificForthResultBadge).should("be.visible");
            cy.get(locators.specificForthResultText).should("be.visible");
            cy.get(locators.specificFifthResultBadge).should("be.visible");
            cy.get(locators.specificFifthResultText).should("be.visible");
        });
        it("Run time check", function () {
            cy.get(locators.time).should("be.visible");
        });
    });
    describe("Check new image from url in jpg format", function () {
        it("Open home page", function () {
            cy.visit(url).url().should("eq", url);
        });
        it("Open result page with new IMG in jpg format", function () {
            cy.get(locators.urlIMGInput).type(imgURLjpg);
            cy.get(locators.classifyURLbtn).click();
        });
        it("Check that image is visible.", function () {
            cy.get(locators.image).should("be.visible");
        });
        it("Check that Maximally accurate is opened.", function () {
            cy.get(locators.maximallyAccurateTab).then(function (el) {
                expect(el.attr("class")).to.eq("active");
            });
        });
        it("Check results in Maximally accurate", function () {
            cy.get(locators.accurateListOfItems).should("length", 5);
            cy.get(locators.accurateFirstResultBadge).should("be.visible");
            cy.get(locators.accurateFirstResultText).should("be.visible");
            cy.get(locators.accurateSecondResultBadge).should("be.visible");
            cy.get(locators.accurateSecondResultText).should("be.visible");
            cy.get(locators.accurateThirdResultBadge).should("be.visible");
            cy.get(locators.accurateThirdResultText).should("be.visible");
            cy.get(locators.accurateForthResultBadge).should("be.visible");
            cy.get(locators.accurateForthResultText).should("be.visible");
            cy.get(locators.accurateFifthResultBadge).should("be.visible");
            cy.get(locators.accurateFifthResultText).should("be.visible");
        });
        it("Check results in Maximally specific", function () {
            cy.get(locators.maximallySpecificTab).click()
            cy.get(locators.specificListOfItems).should("length", 5);
            cy.get(locators.specificFirstResultBadge).should("be.visible");
            cy.get(locators.specificFirstResultText).should("be.visible");
            cy.get(locators.specificSecondResultBadge).should("be.visible");
            cy.get(locators.specificSecondResultText).should("be.visible");
            cy.get(locators.specificThirdResultBadge).should("be.visible");
            cy.get(locators.specificThirdResultText).should("be.visible");
            cy.get(locators.specificForthResultBadge).should("be.visible");
            cy.get(locators.specificForthResultText).should("be.visible");
            cy.get(locators.specificFifthResultBadge).should("be.visible");
            cy.get(locators.specificFifthResultText).should("be.visible");
        });
        it("Run time check", function () {
            cy.get(locators.time).should("be.visible");
        });
    });
    describe("Check new image from url in png format", function () {
        it("Open home page", function () {
            cy.visit(url).url().should("eq", url);
        });
        it("Open result page with new IMG in jpg format", function () {
            cy.get(locators.urlIMGInput).type(imgURLpng);
            cy.get(locators.classifyURLbtn).click();
        });
        it("Check that alert is displayed", function () {
            cy.get(locators.alert).should("include.text", "Cannot open image from URL. Did you provide a valid URL or a valid image file?");
        });
    });
    describe("Check invalid img url", function () {
        it("Open home page", function () {
            cy.visit(url).url().should("eq", url);
        });
        it("Open result page with invalid url", function () {
            cy.get(locators.urlIMGInput).type(invalidUrl);
            cy.get(locators.classifyURLbtn).click();
        });
        it("Check that alert is displayed", function () {
            cy.get(locators.alert).should("include.text", "Cannot open image from URL. Did you provide a valid URL or a valid image file?");
        });
    });
    describe("Check uploading IMG file from the local folder", function () {
        it("Open home page", function () {
            cy.visit(url).url().should("eq", url);
        });
        it("Open result page with IMG from local memory", function () {
            cy.fixture(passToIMG).then(function (fileContent) {
                cy.get(locators.chooseFilebtn).upload(
                    { fileContent, fileName: passToIMG, mimeType: 'image' }
                );
            });
        });
        it("Check that image is visible.", function () {
            cy.get(locators.image).should("be.visible");
        });
        it("Check that Maximally accurate is opened.", function () {
            cy.get(locators.maximallyAccurateTab).then(function (el) {
                expect(el.attr("class")).to.eq("active");
            });
        });
        it("Check results in Maximally accurate", function () {
            cy.get(locators.accurateListOfItems).should("length", 5);
            cy.get(locators.accurateFirstResultBadge).should("be.visible");
            cy.get(locators.accurateFirstResultText).should("be.visible");
            cy.get(locators.accurateSecondResultBadge).should("be.visible");
            cy.get(locators.accurateSecondResultText).should("be.visible");
            cy.get(locators.accurateThirdResultBadge).should("be.visible");
            cy.get(locators.accurateThirdResultText).should("be.visible");
            cy.get(locators.accurateForthResultBadge).should("be.visible");
            cy.get(locators.accurateForthResultText).should("be.visible");
            cy.get(locators.accurateFifthResultBadge).should("be.visible");
            cy.get(locators.accurateFifthResultText).should("be.visible");
        });
        it("Check results in Maximally specific", function () {
            cy.get(locators.maximallySpecificTab).click()
            cy.get(locators.specificListOfItems).should("length", 5);
            cy.get(locators.specificFirstResultBadge).should("be.visible");
            cy.get(locators.specificFirstResultText).should("be.visible");
            cy.get(locators.specificSecondResultBadge).should("be.visible");
            cy.get(locators.specificSecondResultText).should("be.visible");
            cy.get(locators.specificThirdResultBadge).should("be.visible");
            cy.get(locators.specificThirdResultText).should("be.visible");
            cy.get(locators.specificForthResultBadge).should("be.visible");
            cy.get(locators.specificForthResultText).should("be.visible");
            cy.get(locators.specificFifthResultBadge).should("be.visible");
            cy.get(locators.specificFifthResultText).should("be.visible");
        });
        it("Run time check", function () {
            cy.get(locators.time).should("be.visible");
        });
    });
    describe("Check uploading big size IMG file from the local folder", function () {
        it("Open home page", function () {
            cy.visit(url).url().should("eq", url);
        });
        it("Open result page with IMG from local memory", function () {
            cy.fixture(passTobigSizeIMG).then(function (fileContent) {
                cy.get(locators.chooseFilebtn).upload(
                    { fileContent, fileName: passTobigSizeIMG, mimeType: 'image' }
                );
            });
        });
        it("Check that error response is opened", function(){
            cy.contains("413 Request Entity Too Large");
        });
      
    });
});
