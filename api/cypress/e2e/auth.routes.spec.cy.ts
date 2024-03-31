const apiUrl = Cypress.env("CY_ENV_API_URL");

describe("AUTHENTICATION", () => {
  context("LOGIN ROUTES", () => {
    it("should FAIL as user is 404", () => {
      cy.fixture("users/user.404").then((user) => {
        cy.request({
          method: "POST",
          url: `${apiUrl}/login`,
          body: user,
          failOnStatusCode: false, // Set failOnStatusCode to false to allow non-2xx status codes
        }).then((res) => {
          expect(res.status).to.eq(400);
          expect(res.body.status).to.eq(false);
        });
      });
    });

    it("should FAIL as user EXISTS but BAD FORMATTED password", () => {
      cy.fixture("users/user.401-pwd_format").then((user) => {
        cy.request({
          method: "POST",
          url: `${apiUrl}/login`,
          body: user,
          failOnStatusCode: false, // Set failOnStatusCode to false to allow non-2xx status codes
        }).then((res) => {
          expect(res.status).to.eq(400);
          expect(res.body.status).to.eq(false);
          expect(res.body.error.message).to.contain("Invalid Payload");
        });
      });
    });

    it("should FAIL as user EXISTS but INCRORRECT password", () => {
      cy.fixture("users/user.401-pwd_wrong").then((user) => {
        cy.request({
          method: "POST",
          url: `${apiUrl}/login`,
          body: user,
          failOnStatusCode: false, // Set failOnStatusCode to false to allow non-2xx status codes
        }).then((res) => {
          expect(res.status).to.eq(401);
          expect(res.body.status).to.eq(false);
        });
      });
    });

    it("should successfully login an existed user and providing a token", () => {
      cy.fixture("users/user.default").then((user) => {
        cy.request({
          method: "POST",
          url: `${apiUrl}/login`,
          body: user,
          failOnStatusCode: false, // Set failOnStatusCode to false to allow non-2xx status codes
        }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.status).to.eq(true);
          expect(res.body.token).to.be.not.null;
        });
      });
    });
  });
});

describe("AUTHENTICATION reliability", () => {
  context("TOKEN RELIABILITY", () => {});

  context("PROTECTED/USERS ROUTES", () => {});

  context("PROTECTED/POSTS ROUTES", () => {});
});
