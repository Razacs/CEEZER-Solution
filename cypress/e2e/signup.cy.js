// cypress/e2e/signup.cy.js

/// <reference types="cypress" />

import SignupPage from "../support/pageObjects/signupPage";

const signupPage = new SignupPage();

describe("CEEZER Signup Flow", () => {
  beforeEach(() => {
    cy.visitSignupPage();
    cy.injectAxe(); // Inject the axe-core library for accessibility testing
  });

  context("Valid Signup Flow", () => {
    it("Should successfully complete the signup process with valid data", () => {
      cy.fixture("example").then((data) => {
        // Fill the first signup form
        cy.fillFirstSignupForm(data.valid.user);
        // Visual snapshot after filling the first form
        cy.percySnapshot("Signup Form - Step 1");

        //cy.injectAxe(); // Inject the axe-core library for accessibility testing
        cy.checkA11y(null, {
          // Perform accessibility check on the first form
          includedImpacts: ["critical", "serious"], // checking for critical issues
        });

        // Verify navigation to the second page
        cy.url().should("include", "/sign-up/create"); // Update with the actual URL if different
        cy.location("pathname").should("eq", "/sign-up/create"); // Ensuring the full path is correct
        cy.get(signupPage.successHeading).should(
          "contain",
          "Enter company details"
        );
        cy.get("p.chakra-text").should(
          "contain",
          `Provide the information for your ${data.valid.user.companyName} account.`
        );

        // Fill the company details form
        cy.fillCompanyDetailsForm(
          data.valid.companyDetails,
          data.valid.user.accountType
        );

        // Perform accessibility check on the second form
        cy.checkA11y(null, {
          includedImpacts: ["critical"], // Again, only report critical issues
        });

        // Visual snapshot after filling the company details form
        cy.percySnapshot("Signup Form - Step 2");

        // Verify success message
        cy.verifySuccessMessage();

        // intercept the POST request when the company details are submitted
        //handle a slow network response gracefully after company details submission
        cy.intercept("POST", "/api/v1/open/auth/sign-up", {
          delayMs: 5000, // Simulate a 5-second delay
          statusCode: 201, // Simulate a successful response
          body: {}, // Simulate an empty body
        }).as("signupRequest");
      });
    });

    it("Should successfully complete the signup process as a Project Developer with valid data", () => {
      cy.fixture("example").then((data) => {
        // Fill the first signup form for Project Developer
        cy.fillFirstSignupForm(data.valid.developerUser);
        cy.percySnapshot("Signup Form - Step 1 (Project Developer)");

        // Perform accessibility check on the first form
        cy.checkA11y(null, { includedImpacts: ["critical"] });

        // Verify navigation to the second page
        cy.url().should("include", "/sign-up/create");
        cy.location("pathname").should("eq", "/sign-up/create");
        cy.get(signupPage.successHeading).should(
          "contain",
          "Enter company details"
        );
        cy.get("p.chakra-text").should(
          "contain",
          `Provide the information for your ${data.valid.developerUser.companyName} account.`
        );

        // Fill the company details form for Project Developer
        cy.fillCompanyDetailsForm(
          data.valid.companyDetails,
          data.valid.developerUser.accountType
        );

        // Perform accessibility check on the second form
        cy.checkA11y(null, { includedImpacts: ["critical"] });

        // Visual snapshot after filling the company details form
        cy.percySnapshot("Signup Form - Step 2 (Project Developer)");

        // Verify success message
        cy.verifySuccessMessage();

        // Intercept the POST request when the company details are submitted
        cy.intercept("POST", "/api/v1/open/auth/sign-up", {
          delayMs: 5000,
          statusCode: 201,
          body: {},
        }).as("signupRequest");
      });
    });
  });

  // Simulate server error (500 Internal Server Error) after company details submission
  it("Should handle server error during company details submission gracefully", () => {
    cy.fixture("example").then((data) => {
      // Fill the first signup form
      cy.fillFirstSignupForm(data.valid.user);

      // Perform accessibility check on the first form for critical issues
      cy.checkA11y(null, { includedImpacts: ["critical"] });

      // Verify navigation to the second page (company details)
      cy.url().should("include", "/sign-up/create"); // Adjust based on the actual URL
      cy.location("pathname").should("eq", "/sign-up/create"); // Ensuring the full path is correct
      cy.get(signupPage.successHeading).should(
        "contain",
        "Enter company details"
      );
      cy.get("p.chakra-text").should(
        "contain",
        `Provide the information for your ${data.valid.user.companyName} account.`
      );

      // Intercept the POST request and simulate a server error
      cy.intercept("POST", "/api/v1/open/auth/sign-up", {
        statusCode: 500, // Simulate a 500 error
        body: { error: "Internal Server Error" },
      }).as("signupRequest"); // Ensure intercept is before submission

      // Fill the company details form
      cy.fillCompanyDetailsForm(
        data.valid.companyDetails,
        data.valid.user.accountType
      );

      // Perform accessibility check on the company details form for critical issues
      cy.checkA11y(null, { includedImpacts: ["critical"] });

      // Submit the form and wait for the signup request
      cy.get(signupPage.createAccountButton).click();

      // Wait for the intercepted request and verify the response is 500
      cy.wait("@signupRequest").then((interception) => {
        // Assert the response status code is 500
        expect(interception.response.statusCode).to.eq(500);
      });

      // Verify that the error message is displayed
      cy.contains("Something went wrong. Please try again later.").should(
        "be.visible"
      );

      // Visual snapshot for Simulation Server error
      cy.percySnapshot("Something went wrong- Server error");
    });
  });

  context("Invalid Signup Flow", () => {
    it("Should display error messages when required fields are empty on first form", () => {
      cy.fixture("example").then((data) => {
        // Attempt to submit the first form without filling any fields
        cy.get(signupPage.signupButton).click();

        // Assert error messages
        cy.contains("Please enter your company name").should("be.visible");
        cy.contains("Please select account type").should("be.visible");
        cy.contains("Please enter your email address").should("be.visible");
        cy.contains("Please enter your first name").should("be.visible");
        cy.contains("Please enter your last name").should("be.visible");

        // Perform accessibility check on the form with missing fields
        cy.checkA11y(null, { includedImpacts: ["critical"] });

        // Visual snapshot for invalid signup attempt
        cy.percySnapshot("Signup Form - Invalid Input");
      });
    });

    it("Should display error for invalid email format", () => {
      cy.fixture("example").then((data) => {
        // Fill the first signup form with invalid email
        cy.fillFirstSignupForm({
          ...data.valid.user,
          email: data.invalid.user.email,
        });

        // Assert email error
        cy.contains("Please enter a company email address").should(
          "be.visible"
        );

        // Perform accessibility check after invalid email input
        cy.checkA11y(null, { includedImpacts: ["critical"] });

        // Visual snapshot for invalid email format
        cy.percySnapshot("Signup Form - Invalid email format");
      });
    });

    it("Should display error for invalid email format with various patterns", () => {
      const invalidEmails = [
        "invalid-email",
        "test@",
        "test@domain",
        "test@domain.",
        "test@.com",
      ];

      cy.fixture("example").then((data) => {
        invalidEmails.forEach((email) => {
          // Fill the form with invalid email patterns
          cy.fillFirstSignupForm({ ...data.valid.user, email });
          // Assert email error
          cy.contains("Please enter a company email address").should(
            "be.visible"
          );

          // Perform accessibility check for each invalid email attempt
          cy.checkA11y(null, { includedImpacts: ["critical"] });

          // Visual snapshot for invalid email formats
          cy.percySnapshot("Signup- different email formats");
        });
      });
    });

    it("Should display error messages when required fields are empty on company details form", () => {
      cy.fixture("example").then((data) => {
        // Fill the first signup form
        cy.fillFirstSignupForm(data.valid.user);

        // Navigate to company details page
        cy.url().should("include", "/sign-up/create"); // Update with the actual URL if different

        // Attempt to submit the company details form without filling any fields
        cy.get(signupPage.createAccountButton).click();

        // Assert error messages
        cy.contains("Please enter registration number").should("be.visible");
        cy.contains("Enter company address and number").should("be.visible");
        cy.contains("Please enter city").should("be.visible");
        cy.contains("Please enter postal code").should("be.visible");
        cy.contains("Please select country").should("be.visible");
        cy.contains("Please select industry").should("be.visible");

        // Perform accessibility check on the incomplete company details form
        cy.checkA11y(null, { includedImpacts: ["critical"] });

        // Visual snapshot for incomplete company details form
        cy.percySnapshot("Signup Form - incomplete the mandatory fields");
        cy.screenshot();
      });
    });
  });
});
