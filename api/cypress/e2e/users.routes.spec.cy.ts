describe("USERS routes", () => {
  const apiUrl = Cypress.env("CY_ENV_API_URL");
  let _authToken: string;

  before(() => {
    // Apply setup logic only for this specific test file
    // @ts-ignore
    cy.actionAuthenticateDefaultUser();

    cy.get("@authToken").then((authToken) => {
      // Work with the authToken value here

      // @ts-ignore
      _authToken = authToken;
      // cy.log(authToken);
      expect(_authToken).to.exist;
    });
  });

  context("FIND", () => {
    it("GET /users -- Fetching all users should WORK", () => {
      cy.request({
        method: "GET",
        url: `${apiUrl}/users/`,
        headers: {
          Authorization: `Bearer ${_authToken}`,
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        // expect(res.body.data.length).to.eq(3);
      });
    });

    it("GET /users/:id -- Fetching USER with expected _ID_ should WORK", () => {
      cy.fixture("users/user.default").then((user) => {
        const param = 1;
        cy.log(user);
        cy.request({
          method: "GET",
          url: `${apiUrl}/users/${param}`,
          headers: {
            Authorization: `Bearer ${_authToken}`,
          },
        }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.data.username).to.eq(user.username);
        });
      });
    });

    it("GET /users/:id -- Fetching unknown USER by  _ID_ should FAIL", () => {
      const param = 0;
      cy.request({
        method: "GET",
        url: `${apiUrl}/users/${param}`,
        headers: {
          Authorization: `Bearer ${_authToken}`,
        },
        failOnStatusCode: false, // Set failOnStatusCode to false to allow non-2xx status codes
      }).then((res) => {
        expect(res.status).to.eq(404);
      });
    });
  });

  context("CREATE", () => {
    let test_user: any;
    before(() => {
      cy.actionResetAppDefaultPlayableUser();
    });
    after(() => {
      cy.actionResetAppDefaultPlayableUser();
      cy.actionResetAppDefaultPlayableUser("cypress");
    });

    it("POST /users/ -- Creating a new User (wrong JSON format) ", () => {
      cy.fixture("users/user.new").then((newUser) => {
        if (!test_user) {
          cy.request({
            method: "POST",
            url: `${apiUrl}/users/`,
            body: {
              usernam: "cypress1", // should have been "username"
              email: "cypress1@domain.tld",
              password: "Pwd.12345678",
              firstname: "Baby",
              lastname: "Cypress",
            },
            headers: {
              authorization: `Bearer ${_authToken}`,
            },
            failOnStatusCode: false, // Set failOnStatusCode to false to allow non-2xx status codes
          }).then((res) => {
            expect(res.status).to.eq(400);
            cy.log(res.body.error);
          });
        }
      });
    });

    it("POST /users/ -- Creating a new User (wrong PATTERN: username) ", () => {
      cy.fixture("users/user.new").then((newUser) => {
        if (!test_user) {
          cy.request({
            method: "POST",
            url: `${apiUrl}/users/`,
            body: {
              username: "cypress", // Doesn't match the correct pattern
              email: "cypress1@domain.tld",
              password: "Pwd.123456789",
              firstname: "Baby",
              lastname: "Cypress",
            },
            headers: {
              authorization: `Bearer ${_authToken}`,
            },
            failOnStatusCode: false, // Set failOnStatusCode to false to allow non-2xx status codes
          }).then((res) => {
            expect(res.status).to.eq(400);
            cy.log(res.body.error);
          });
        }
      });
    });

    it("POST /users/ -- Creating a new User (wrong PATTERN: password) ", () => {
      cy.fixture("users/user.new").then((newUser) => {
        if (!test_user) {
          cy.request({
            method: "POST",
            url: `${apiUrl}/users/`,
            body: {
              username: "cypress1",
              email: "cypress1@domain.tld",
              password: "wrong_password_format", // Doesn't match the correct pattern
              firstname: "Baby",
              lastname: "Cypress",
            },
            headers: {
              authorization: `Bearer ${_authToken}`,
            },
            failOnStatusCode: false, // Set failOnStatusCode to false to allow non-2xx status codes
          }).then((res) => {
            expect(res.status).to.eq(400);
            cy.log(res.body.error);
          });
        }
      });
    });

    it("POST /users/ -- Creating a new User (wrong PATTERN: email) ", () => {
      cy.fixture("users/user.new").then((newUser) => {
        if (!test_user) {
          cy.request({
            method: "POST",
            url: `${apiUrl}/users/`,
            body: {
              username: "cypress1",
              email: "cypress1domain.tld",
              password: "wrong_password_format", // Doesn't match the correct pattern
              firstname: "Baby",
              lastname: "Cypress",
            },
            headers: {
              authorization: `Bearer ${_authToken}`,
            },
            failOnStatusCode: false, // Set failOnStatusCode to false to allow non-2xx status codes
          }).then((res) => {
            expect(res.status).to.eq(400);
            cy.log(res.body.error);
          });
        }
      });
    });

    it("POST /users/ -- Creating a new User ", () => {
      cy.fixture("users/user.new").then((newUser) => {
        if (!test_user) {
          cy.request({
            method: "POST",
            url: `${apiUrl}/users/`,
            body: newUser,
            headers: {
              authorization: `Bearer ${_authToken}`,
            },
          }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.data.id).to.exist;
            cy.log(res.body);
          });
        }
      });
    });
  });

  context("UPDATE", () => {
    let default_playable_user: any;
    before(() => {
      cy.actionResetAppDefaultPlayableUser();
      cy.actionSetupAppDefaultPlayableUser();
      cy.actionFetchAppDefaultPlayableUser(
        (_default_playable_user) =>
          (default_playable_user = _default_playable_user)
      );
    });
    after(() => {
      cy.actionResetAppDefaultPlayableUser();
    });

    it("PATCH /users/:id - Updating an unknown user should FAIL", () => {
      cy.request({
        method: "PATCH",
        url: `${apiUrl}/users/0`,
        headers: {
          authorization: `Bearer ${_authToken}`,
        },
        body: {
          firstname: "Mommy",
        },
        failOnStatusCode: false, // Set failOnStatusCode to false to allow non-2xx status codes
      }).then((res) => {
        expect(res.status).to.eq(404);
      });
    });

    it("PATCH /users/:id - Updating with wrongly formatted Payload should FAIL", () => {
      cy.fixture("users/user.new").then((user) => {
        cy.request({
          method: "PATCH",
          url: `${apiUrl}/users/${default_playable_user.id}`, // This user doesn't exist but it doesn't matter as the test is about checking the schelma
          headers: {
            authorization: `Bearer ${_authToken}`,
          },
          body: {
            firstnam: "Mommy", // Note: Here, "firstnam" will be considered as a new feature
          },
          failOnStatusCode: false, // Set failOnStatusCode to false to allow non-2xx status codes
        }).then((res) => {
          expect(res.status).to.eq(400);
        });
      });
    });

    it("PATCH /users/:id - Updating with additionnal payload property should FAIL", () => {});

    it("PATCH /users/:id - Updating with wrongly pattern _USERNAME_ should FAIL", () => {});

    it("PATCH /users/:id - Updating with wrongly pattern _PASSWORD_ should FAIL", () => {});

    it("PATCH /users/:id - Updating with correct _USERNAME_ should PASS", () => {});

    it("PATCH /users/:id - Updating with correct _PASSWORD_ should PASS", () => {});
  });

  context("DELETE", () => {
    it("", () => {
      it("PATCH /users/:id - badly format _USERNAME_ should FAIL", () => {});
    });
  });
});
