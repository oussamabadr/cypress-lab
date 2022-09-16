const { before } = require("mocha");

describe("todomvc grouped tests", () => {
  before(() => {
    cy.visit("https://todomvc-app-for-testing.surge.sh/");
    cy.get(".new-todo").type("Clean room{enter}");
    cy.get(".new-todo").type("Learn Javascript{enter}");
    cy.get(".new-todo").type("Learn Cypress{enter}");

    cy.get(".todo-list li:nth-child(2) .toggle").click();
  });

  it.only("should filter [Active] todos", () => {
    cy.contains("Active").click();
    cy.get(".todo-list li").should("have.length", 2);
  });

  it.only("should filter [Completed] todos", () => {
    cy.contains("Completed").click();
    cy.get(".todo-list li").should("have.length", 1);
  });

  it.only("should filter [All] todos", () => {
    cy.contains("All").click();
    cy.get(".todo-list li").should("have.length", 3);
  });
});
