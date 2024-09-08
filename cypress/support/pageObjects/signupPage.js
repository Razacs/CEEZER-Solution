// cypress/support/pageObjects/signupPage.js

class SignupPage {
  // Selectors for the first signup form
  get accountTypeBuyer() {
    return '[data-testid="account-type-buyer"]';
  }

  get accountTypeProjectDeveloper() {
    return '[data-testid="account-type-project-developer"]';
  }

  get descriptionTextBox() {
    return '[data-testid="description-textarea"]';
  }

  get companyNameInput() {
    return '[data-testid="company-name-input"]';
  }

  get emailInput() {
    return '[data-testid="email-input"]';
  }

  get firstNameInput() {
    return '[data-testid="first-name-input"]';
  }

  get lastNameInput() {
    return '[data-testid="last-name-input"]';
  }

  get signupButton() {
    return '[data-testid="signup-button"]';
  }

  // Selectors for the company details form
  get registrationNumberInput() {
    return '[data-testid="registration-number-input"]';
  }

  get vatNumberInput() {
    return '[data-testid="vat-number-input"]';
  }

  get addressInput() {
    return '[data-testid="address-input"]';
  }

  get cityInput() {
    return '[data-testid="city-input"]';
  }

  get zipInput() {
    return '[data-testid="zip-input"]';
  }

  getCountryDropdown() {
    //return 'div[aria-describedby="react-select-6-placeholder"]';
    return 'div[data-testid="country-select"]';
  }
  // Selector for the country input
  getCountryInput() {
    return 'input[aria-autocomplete="list"]'; // The input field after opening the dropdown
  }

  get industryDropdown() {
    return 'div[data-testid="industry-select"]';
  }

  // Selector for the industry input
  getIndustryInput() {
    return 'input[aria-describedby="react-select-7-placeholder"]'; // The input field for the industry dropdown
  }

  get createAccountButton() {
    return '[data-testid="create-account-button"]';
  }

  get successHeading() {
    return "h2.chakra-heading";
  }

  get successMessage() {
    return "p.chakra-text";
  }
}

export default SignupPage;
