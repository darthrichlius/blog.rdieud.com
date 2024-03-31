// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

/*
// Closure as a Global store helping us to manage data
const dataStore = (() => {
  let storedData: Record<string, Function> = {};

  return {
    getStore: () => storedData,
    setData: (key: string, value: any) => {
      storedData[key] = value;
    },
    getData: (key: string) => {
      return storedData[key];
    },
  };
})();

Cypress.Commands.add("actionStoreGetData", (key: string) => {
  cy.log("Current Store", dataStore.getStore());

  cy.wrap(dataStore.getData(key)).as("storedData"); // Alias the retrieved data
});

Cypress.Commands.add("actionStoreSetData", (key: string, value: any) => {
  dataStore.setData(key, value);

  cy.log("Current Store", dataStore.getStore());
});

//*/

const apiUrl = Cypress.env("CY_ENV_API_URL");

Cypress.Commands.add("actionAuthenticateDefaultUser", () => {
  cy.log("Setup for protected routes executed");

  cy.fixture("users/user.default").then((user) => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/login`,
      body: user,
      failOnStatusCode: false, // Set failOnStatusCode to false to allow non-2xx status codes
    }).then((res) => {
      // We could have used the store, but this is just a demonstration of using another way
      cy.wrap(res.body.token).as("authToken"); // Alias the authToken
    });
  });
});

/**
 * Fetch the default Cypress test user from the database
 * Context:
 *  - Ensure the user exists before DROP, UPDATE, ...
 */
Cypress.Commands.add(
  "actionFetchAppDefaultPlayableUser",
  (callback: Function, username?: string) => {
    cy.log("actionFetchAppDefaultPlayableUser: Launched");

    cy.actionAuthenticateDefaultUser();

    cy.get("@authToken").then((authToken) => {
      cy.fixture("users/user.new").then((user) => {
        cy.request({
          method: "GET",
          url: `${apiUrl}/users/username/${username || user.username}`,
          headers: {
            authorization: `Bearer ${authToken}`,
          },
          failOnStatusCode: false,
        }).then((res) => {
          const test_playable_user = res.body.data ?? res.body.status;

          callback(test_playable_user);

          cy.log(
            "actionFetchAppDefaultPlayableUser: executed",
            res.body,
            test_playable_user
          );
        });
      });
    });
  }
);

// Create the user for testing
Cypress.Commands.add("actionSetupAppDefaultPlayableUser", () => {
  cy.log("Setup for setup playable test user launched");

  cy.actionAuthenticateDefaultUser();

  cy.actionFetchAppDefaultPlayableUser((user_already_exist) => {
    if (!user_already_exist) {
      cy.fixture("users/user.new").then((default_playable_user) => {
        cy.get("@authToken").then((authToken) => {
          cy.log(default_playable_user, authToken);
          cy.request({
            method: "POST",
            url: `${apiUrl}/users/`,
            body: default_playable_user,
            headers: {
              authorization: `Bearer ${authToken}`,
            },
          }).then((res) => {});
        });
      });
    }
  });
});

Cypress.Commands.add(
  "actionResetAppDefaultPlayableUser",
  (username?: string) => {
    cy.log("Setup for drop test user launched");

    cy.actionAuthenticateDefaultUser();

    cy.actionFetchAppDefaultPlayableUser((default_test_user) => {
      if (default_test_user) {
        cy.get("@authToken").then((authToken) => {
          cy.request({
            method: "DELETE",
            url: `${apiUrl}/users/${default_test_user.id}`,
            headers: {
              authorization: `Bearer ${authToken}`,
            },
            failOnStatusCode: false,
          }).then((res) => {});
        });
      }
    }, username);
  }
);
