/*
    When Cypress is installed, it generates several files and folders within the project. 
    The command.ts and e2e.ts files within the cypress/support directory are often created 
    when using certain plugins or generators. They might contain specific commands or configurations that are used for test automation.

    For organizing custom commands and ensuring that they're available to all test files, it's recommended to use the cypress/support/index.ts file. 
*/

Cypress.Commands.add("actionAuthenticateDefaultUser", () => {
  // Logic to perform setup actions for delete user route
  cy.log("Setup for delete user route executed");
  // Add your setup logic for the delete user route here
  // ...
});
