import axe from "axe-core";

function terminalLog(axeResults) {
  const passes = axeResults.passes;
  if (passes.length > 0) {
    cy.task("log", `${passes.length} accessibility rules passed`);
    printAxeResultTable(passes);
  } else {
    cy.task("log", `No passed accessibility rules detected!`);
  }

  const violations = axeResults.violations;
  if (violations.length > 0) {
    cy.task("log", `${violations.length} accessibility violation(s) detected`);
    printAxeResultTable(violations);
  } else {
    cy.task("log", `No accessibility violation detected!`);
  }

  const incomplete = axeResults.incomplete;
  if (incomplete.length > 0) {
    cy.task("log", `${incomplete.length} incomplete accessibility rule(s) detected, manual review needed.`);
    printAxeResultTable(incomplete);
  } else {
    cy.task("log", `No incomplete accessibility rules detected!`);
  }

  const inapplicable = axeResults.inapplicable;
  if (incomplete.length > 0) {
    cy.task("log", `${inapplicable.length} inapplicable accessibility rules detected.`);
    printAxeResultTable(inapplicable);
  } else {
    cy.task("log", `No inapplicable accessibility rules detected!`);
  }
}

function printAxeResultTable(rawResult) {
  const result = rawResult.map(({ id, impact, description, nodes, tags }) => ({
    id,
    impact,
    description,
    nodes: nodes.length,
    tags,
  }));

  cy.task("table", result);
}

describe("axe-core Test", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io");
  });

  it("Visits the Kitchen Sink", async () => {
    const page = document.documentElement;

    const axeResults = await axe.run(page, {
      runOnly: ["wcag2a", "wcag2aa"],
    });

    terminalLog(axeResults);

    expect(axeResults.violations, `${axeResults.violations.length} Accessiblity violation detected`).be.empty();
  });
});
