const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://staging.ceezer.com',  // Base URL for the application
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',  // Test files location
    video: true, 
    supportFile: 'cypress/support/e2e.js',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',  // Output directory for reports
      overwrite: true,
      html: true,
      json: true,
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,  // Include inline assets for the report
      timestamp: 'mmddyyyy_HHMMss',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);

      // Take screenshots for both failed and passed tests
      on('after:screenshot', (details) => {
        console.log('Screenshot taken:', details);
      });
    },
  },
});
