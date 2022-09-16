import * as todoPage from "../page-objects/todo-page";
const { before } = require("mocha");

describe("todomvc grouped tests", () => {
  before(() => {
    todoPage.navigate();
    todoPage.addTodo("Clean room{enter}");
    todoPage.addTodo("Learn Javascript{enter}");
    todoPage.addTodo("Learn Cypress{enter}");

    todoPage.toggleTodo(1);
  });

  it.only("should filter [Active] todos", () => {
    todoPage.showOnlyActiveTodos();

    todoPage.validateNumberOfTodosShown(2);
  });

  it.only("should filter [Completed] todos", () => {
    todoPage.showOnlyCompletedTodos();

    todoPage.validateNumberOfTodosShown(1);
  });

  it.only("should filter [All] todos", () => {
    todoPage.showAllTodos();

    todoPage.validateNumberOfTodosShown(3);
  });
});
