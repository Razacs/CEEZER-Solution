# CEEZER Signup Flow Testing Validation

## Overview
This project is designed to test the signup flow of CEEZER’s platform using Cypress. The suite covers both functional and visual tests, focusing on key flows such as valid and invalid form
submissions, error handling, and accessibility checks. **Bonus points tasks are already covered and implemented in this solution.** :) 

1) Source Code- Uploaded
2) Test Strategy Document(CEEZER Task Solution.pdf) - I have create test strategy document to explain the approach, framework, methology of the automation task. Also end of this document, i have
   created the bug list that contains all the bugs with proper format & steps (steps to reproduce) and Suggested to be fixed with priortity level.
(https://github.com/Razacs/CEEZER-Solution/blob/master/CEEZER%20Task%20Solution.pdf)

## Project Structure Explain:

CEEZER Solution/
  ├── cypress/
  │   ├── fixtures/
  │   │   └── example.json
  │   ├── support/
  │   │   ├── commands.js
  │   │   └── e2e.js
  │   ├── e2e/
  │   │   └── signup.cy.js
  ├── node_modules/
  ├── package.json
  ├── package-lock.json
  ├── cypress.config.js

![image](https://github.com/user-attachments/assets/c5f5bbe0-f836-443e-bd98-c8afdd5c09cc)

- **cypress/fixtures/**: Contains valid and Invalid test data in JSON format (`example.json`).
- **cypress/e2e/signup.cy.js**: Contains the test cases for the signup form. All the test cases are listed here
- **cypress/support/commands.js**: Contains custom commands for reusability across multiple test cases.
- **cypress/support/e2e.js**: The entry point for configuring and support files.
- **cypress/support/pageObjects/signupPage.js**: That contains all the locators for resuability and maintainability purpose.
- **cypress/screenshots/**: Stores screenshots captured during failed tests.
- **cypress/videos/**: Stores video recordings of the test runs.
- **cypress/report/**: This folder contains execution report (i.e html, Json etc). I have used Mochawesome reports for better visibility. That can give screenshots and Video of execution
  as well.

**Tools & Framework**

- Cypress: For writing and executing E2E tests with POM approach.
- Mochawesome Reporter: For generating detailed test reports.
- Percy: For visual regression testing.
- Axe-core: For accessibility testing, ensuring that the UI complies with accessibility standards.
- Test Automation Framework
- Page Object Model (POM): Implements separation of concerns between test logic and UI interaction. All page elements and actions are encapsulated within reusable page object files.
  This helps reduces code redundancy and complexity with maintanability.
- Data-Driven Testing Approach: Using Cypress fixtures for managing both valid and invalid input data. This allows testing multiple scenarios with minimal code changes.

## Key Features Tested

1. Valid Signup Flow
2. Invalid Input Scenarios
3. Error Handling (500 Server Error)
4. Accessibility Testing
5. Visual Regression Testing (Percy)

**Executition of Test cases:**

Steps to follow:

1) clone the repository
2) Install all dependencies (npm install)
3) Execute test using CLI Execute this command (npx cypress run)
4) Execute using Cypress UI test Runner, execute this command (npx cypress open), this will show Cypress UI so each steps and tests is executed and Visible
5) Execute Visual Tests with Percy (npx percy exec -- cypress run)
(Make sure Percy Token is set in System environment, then Visual UI screenshot is visible in Percy Dashboard)

**--> For Percy VISUAL Execution follow these steps:**

Create a Percy account.
Get Percy token.
Set the Percy token in your environment (export PERCY_TOKEN=<your-percy-token>)
Run Percy tests with visual testing: npx percy exec -- npx cypress run

**Troubleshooting || Common Issues:**

Missing dependencies: Run npm install again if the test suite fails due to missing packages.
Cypress binary issues: If Cypress fails to launch, try running npx cypress install.

**Assumptions made:**

1) The signup process will remain consistent, with no major UI or backend flow changes during the test implementation phase. so that Automation test cases can build and execute.
2) The application should handle typical network delays and respond appropriately with error messages for common server failures (e.g., 500 Internal Server Error).
3) Visual snapshots are captured in a stable environment, ensuring accurate comparisons during visual regression testing.


**Test Coverage:**

The test suite covers form validation,Valid and Invalid data, Error Handling, field constraints, and successful signup scenarios for both Buyer and Project Developer account types.

**Execution Evidence & Artifacts:**

1) Execution Report
![image](https://github.com/user-attachments/assets/0837fd6b-5110-4c7c-91be-7423e7cb6f3b)

2) Execution with Percy
![image](https://github.com/user-attachments/assets/52ca1a2e-38d1-4ab1-9260-657149c70b64)

3) Percy Dashboard for VISUAL testing and UI Regression Artifacts:
![image](https://github.com/user-attachments/assets/d4f3ae4c-6636-4aab-9f04-c59a262f4ac2)

4) Cypress UI test Runner
![image](https://github.com/user-attachments/assets/36024d87-0ec3-488f-b9b2-c73f08107d97)

**Let me know if you need any further information from my side. Thanks!**
