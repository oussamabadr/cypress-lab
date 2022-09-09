/// <reference types="cypress" />

function terminalLog(violations) {
  cy.task("log", `${violations.length} accessibility violation${violations.length === 1 ? "" : "s"} ${violations.length === 1 ? "was" : "were"} detected`);

  const violationData = violations.map(({ id, impact, description, nodes, tags }) => ({
    id,
    impact,
    description,
    nodes: nodes.length,
    tags,
  }));

  cy.task("table", violationData);
}

describe("My First Test", () => {
  beforeEach(() => {
    cy.visit("https://the-internet.herokuapp.com/basic_auth", {
      auth: {
        username: "admin",
        password: "admin",
      },
    });
    cy.injectAxe();
    cy.configureAxe({
      // reportName: "kitchen",
      // scopeName: "page",
    });
  });

  it("Check basic auth", () => {
    cy.get("p").contains("Congratulations").should("be.visible");
    cy.checkA11y(null, null, terminalLog);
  });
});
