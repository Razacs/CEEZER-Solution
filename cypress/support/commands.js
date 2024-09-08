// cypress/support/commands.js

// Custom command to visit the signup page
Cypress.Commands.add("visitSignupPage", () => {
  cy.visit("/sign-up/create");
});

// Custom command to fill the first signup form
Cypress.Commands.add("fillFirstSignupForm", (user) => {
  if (user.accountType === "buyer") {
    cy.get('[data-testid="select-buyer-button"]').click(); // Select Buyer option
  } else if (user.accountType === "project developer") {
    cy.get('[data-testid="select-supplier-button"]').click(); // Select Project Developer option
    cy.get('[data-testid="select-supplier-button"]').should(
      "have.class",
      "css-yjcvqi"
    );
  }
  //cy.get('[data-testid="account-type-buyer"]').click(); // data-testid for buyer
  //cy.get('[data-testid="select-buyer-button"]').click();
  cy.get('[data-testid="company-name-input"]').clear().type(user.companyName);
  cy.get('[data-testid="email-input"]').clear().type(user.email);
  cy.get('[data-testid="first-name-input"]').clear().type(user.firstName);
  cy.get('[data-testid="last-name-input"]').clear().type(user.lastName);
  cy.get('[data-testid="signup-button"]').click();
});

// Custom command to fill the second company details form
Cypress.Commands.add("fillCompanyDetailsForm", (details, accountType) => {
  // Check for Project Developer or Buyer and fill the respective fields
  if (accountType === "project developer") {
    // Project Developer form fields
    cy.get('[data-testid="address-input"]').clear().type(details.address); // Street address
    cy.get('[data-testid="city-input"]').clear().type(details.city); // City
    cy.get('[data-testid="zip-input"]').clear().type(details.postalCode); // Postal code

    // Select Country from dropdown
    cy.get('div[data-testid="country-select"]').click();
    cy.get('input[aria-describedby="react-select-2-placeholder"]').type(
      `${details.country}`,
      { force: true }
    );
    cy.get('div[id^="react-select"]')
      .contains(details.country)
      .click({ force: true });
    cy.get('div[data-testid="country-select"]').should(
      "contain",
      details.country
    ); // Ensure Country is selected

    cy.get('[data-testid="vat-number-input"]').clear().type(details.vatId); // VAT ID
    // Only type into the description field if it is defined
    if (details.description) {
      cy.get('[data-testid="description-textarea"]')
        .should("be.visible")
        .clear()
        .type(details.description)
        .should("have.value", details.description); // Ensure the field contains the typed description
    }
  } else if (accountType === "buyer") {
    // Buyer form fields
    cy.get('[data-testid="registration-number-input"]')
      .clear()
      .type(details.registrationNumber); // Registration number
    cy.get('[data-testid="address-input"]').clear().type(details.address); // Street address
    cy.get('[data-testid="city-input"]').clear().type(details.city); // City
    cy.get('[data-testid="zip-input"]').clear().type(details.postalCode); // Postal code

    // Select Country from dropdown
    cy.get('div[data-testid="country-select"]').click();
    cy.get('input[aria-describedby="react-select-2-placeholder"]').type(
      `${details.country}`,
      { force: true }
    );
    cy.get('div[id^="react-select"]')
      .contains(details.country)
      .click({ force: true });
    cy.get('div[data-testid="country-select"]').should(
      "contain",
      details.country
    ); // Ensure Country is selected
    // Select Industry from dropdown
    cy.get('div[data-testid="industry-select"] input').type(
      `${details.industry}{enter}`
    );
    cy.get('[data-testid="vat-number-input"]').clear().type(details.vatId); // VAT ID
  }

  // Submit the form
  cy.get('[data-testid="create-account-button"]').click();
});

// Custom command to verify success message
Cypress.Commands.add("verifySuccessMessage", () => {
  cy.get("h2.chakra-heading").should(
    "contain",
    "Thanks for signing up to CEEZER."
  );
  cy.get("p.chakra-text").should(
    "contain",
    "We are reviewing your company information and will get back to you shortly with an invitation to access the platform."
  );
});

// command to check error messages
Cypress.Commands.add("checkErrorMessage", (field, message) => {
  cy.get(field).then(($input) => {
    expect($input).to.have.attr("aria-invalid", "true");
    cy.get(`#${$input.attr("id")}-feedback`).should("contain", message);
  });
});
