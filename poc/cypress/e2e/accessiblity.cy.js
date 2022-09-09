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
    cy.visit("https://example.cypress.io");
    cy.injectAxe();
    cy.configureAxe({
      reportName: "kitchen",
      scopeName: "page",
    });
  });

  it("Visits the Kitchen Sink", () => {
    cy.checkA11y(
      null,
      {
        runOnly: {
          type: "tag",
          values: ["wcag2a"],
        },
      },
      terminalLog
    );
  });
});
