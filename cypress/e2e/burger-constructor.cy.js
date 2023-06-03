import { BASE_URL } from "../../src/utils/consts";

describe("testing burger constructor", () => {
  beforeEach(() => {
    cy.viewport(1400, 800);
    cy.visit("http://localhost:3000/");
    cy.intercept("GET", `${BASE_URL}ingredients`, {
      fixture: "ingredients.json",
    });
    cy.intercept("POST", `${BASE_URL}auth/login`, { fixture: "login.json" }).as(
      "postLogin"
    );
    cy.intercept("POST", `${BASE_URL}orders`, { fixture: "order.json" });
  });

  it("check ingrediet modal", () => {
    cy.wait(1000);
    cy.get("[data-testid=dragElement]").eq(0).click();
    cy.get("[data-testid=modal]").should("be.visible");
    cy.url().should("include", "/ingredients/60d3b41abdacab0026a733c6");
    cy.get("[data-testid=modalTitle]").should(
      "have.text",
      "Детали ингредиента"
    );
    cy.get("[data-testid=ingredientImage]").should("be.visible");
    cy.get("[data-testid=ingredientName]").should("not.be.empty");
    cy.get("[data-testid=calories]").should("not.be.empty");
    cy.get("[data-testid=proteins]").should("not.be.empty");
    cy.get("[data-testid=fat]").should("not.be.empty");
    cy.get("[data-testid=carbohydrates]").should("not.be.empty");

    cy.get("[data-testid=btnCloseModal]").click();
    cy.get("[data-testid=modal]").should("not.exist");
  });

  it("login, drag and drop and make an order", () => {
    //login
    cy.visit("http://localhost:3000/login");
    cy.get("[data-testid=testInputEmail]").type("test@test.ru");
    cy.get("[data-testid=testInputPassword]").type("test");
    cy.get("[data-testid=testBtnLogin]").click();

    // drag and drop
    cy.get("[data-testid=dragElement]").should("exist");
    cy.get("[data-testid=dragElement]").eq(0).trigger("dragstart");
    cy.get("[data-testid=constructorContainer]").should("exist");
    cy.get("[data-testid=constructorContainer]").trigger("drop");

    cy.get("[data-testid=dragElement]").eq(3).trigger("dragstart");
    cy.get("[data-testid=constructorContainer]").trigger("drop");

    cy.get("[data-testid=dragElement]").eq(6).trigger("dragstart");
    cy.get("[data-testid=constructorContainer]").trigger("drop");

    cy.get("[data-testid=dragElement]").eq(10).trigger("dragstart");
    cy.get("[data-testid=constructorContainer]").trigger("drop");

    // make an order and close modal
    cy.get(`[data-testid=btnMakeOrder]`)
      .should("exist")
      .and("contain", "Оформить заказ")
      .click();
    cy.get("[data-testid=modal]").should("be.visible");
    cy.get("[data-testid=orderNumber]").should("not.be.empty");
    cy.get("[data-testid=btnCloseModal]").click();
    cy.get("[data-testid=modal]").should("not.exist");
  });
});
