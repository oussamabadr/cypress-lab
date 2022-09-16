describe("todomvc testing", () => {
  it("Just select the input ", () => {
    const task = "Clean room";
    cy.visit("https://todomvc-app-for-testing.surge.sh/");
    cy.get(".new-todo").type(task + "{enter}");
    cy.get("label").should("have.text", task);
    cy.get(".toggle").should("not.be.checked");

    cy.get(".toggle").click();
    cy.get("label").should("have.css", "text-decoration-line", "line-through");

    cy.contains("Clear").click();
    cy.get(".todoapp").should("not.have.descendants", "li");
  });

  it("With expired timeout", () => {
    cy.visit("https://todomvc-app-for-testing.surge.sh/?delay-new-todo=5000");
    cy.get(".new-todo", { timeout: 3000 }).type("Clean room{enter}");
  });

  it("With custom get timeout", () => {
    cy.visit("https://todomvc-app-for-testing.surge.sh/?delay-new-todo=5000");
    cy.get(".new-todo", { timeout: 6000 }).type("Clean room{enter}");
  });

  it("mark new todo completed", () => {
    cy.visit("https://todomvc-app-for-testing.surge.sh/");
    cy.get(".new-todo").type("Clean room{enter}");
    cy.get(".toggle").click();
  });

  it("clear completed tasks", () => {
    cy.visit("https://todomvc-app-for-testing.surge.sh/");
    cy.get(".new-todo").type("Clean room{enter}");
    cy.get(".toggle").click();
    cy.get(".clear-completed").click();
  });
});

describe("todomvc grouped tests", () => {
  const task = "Clean room";

  beforeEach(() => {
    cy.visit("https://todomvc-app-for-testing.surge.sh/");
    cy.get(".new-todo").type(task + "{enter}");
  });

  it.only("should add a new todo to the list ", () => {
    cy.get("label").should("have.text", task);
    cy.get(".toggle").should("not.be.checked");
  });

  it.only("should mark a todo as completed", () => {
    cy.get(".toggle").click();
    cy.get("label").should("have.css", "text-decoration-line", "line-through");
  });

  it.only("should clear compeleted todos", () => {
    cy.get(".toggle").click();
    cy.contains("Clear").click();
    cy.get(".todoapp").should("not.have.descendants", "li");
  });
});
