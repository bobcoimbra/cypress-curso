/// <reference types="cypress" />

describe("Ticktes", () => {
    beforeEach(() => cy.visit("http://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));

    it("Fills all the text input fields", () => {
        const firstName = "Alexandre";
        const lastName = "Coimbra";

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("alexcc@gmail.com");
        cy.get("#requests").type("Hello");
        cy.get(".signature").type(`${firstName} ${lastName}`); // Usando class
    });

    it("Select two tickets", () => {
        cy.get("#ticket-quantity").select("2");
    });

    it("Interact with radio buttons", () => {
        cy.get("#vip").click();
        cy.get("#general").check(); // Utilização do check no botão rádio
    });

    it("Selecting Social Media in menu 'checkbox'", () => {
        cy.get("#social-media").check();
    });

    it("Select Friend and Publication, then uncheck Social Media", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#social-media").uncheck(); // Uncheck desmarca 
    });

    it("has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
    });

    it("Testing invalid e-mail", () => {
        cy.get("#email")
            .as("email") // salvando o seletor CSS, criando um alias
            .type("alexcc-gmail.com");

        cy.get("#email.invalid")
            .should("exist");

        cy.get("@email") // usando o alias de #email descrito na linha 45
            .clear()
            .type("alexcc@gmail.com");
        cy.get("#email.invalid").should("not.exist");
    });

    it("fills and reset the form", () => {
        const firstName = "Alexandre";
        const lastName = "Coimbra";
        const fullName = `${firstName} ${lastName}`;
        cy.reload();

        cy.get(".agreement p").should("contain", "I, , wish to buy 1 General Admission ticket"); // verifiquei os campos vazios
        cy.get("button[type='submit']")
            .as("submitButton")
            .should("be.disabled"); // verificação de botão 'confirm' esta desabilitado

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("alexcc@gmail.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("Hello");

        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets.` // modelo Walmir
        );
        cy.get(".agreement p").should("contain", `${fullName}`); // meu

        cy.get("#agree").check();
        cy.get(".signature").type(`${fullName}`);
        cy.get("@submitButton").should("not.be.disabled");

        cy.get(".reset").click();

    })

    it("Fills mandatory fields using support command", () => {

        const customer = {
            firstName: "João",
            lastName: "Silva",
            email: "jsilva@gmail.com"
        };

        cy.fillMandatoryFields(customer);

        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");
        cy.get("#agree").uncheck();
        cy.get("@submitButton").should("be.disabled");
    })

})