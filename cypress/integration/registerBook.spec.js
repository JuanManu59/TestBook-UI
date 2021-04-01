  
const Name = "name";
const Author = "author";

describe('When de user wants to register a book',() => {

    before("Create the book", () => {
        cy.visit("https://books-front-icesi.herokuapp.com/");
        cy.get('.ant-btn-primary > .ng-star-inserted').click();
        cy.wait(1000);
        cy.get("#name").type(Name);
        cy.get("#author").type(Author);
        cy.get('.ant-modal-footer > .ant-btn-primary > .ng-star-inserted').click();
        cy.contains('10 / page').click();
        cy.contains('50 / page').click();
    });

    after("Remove the book created", () =>{
        cy.get("table").contains('tr', Name).invoke("index").then((i) =>{
            cy.get(`:nth-child(${i+1}) > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input`).click();
        })
        cy.get('[nztype="default"]').click();
    });

    it("Then the book should be listed with the right name", () =>{
        cy.get('table').contains('td', Name).should('be.visible');
    });

    it("Then the book should be listed with the right author", () =>{
        cy.get('table').contains('td', Author).should('be.visible');
    });

});

describe("When trying to create a book with no name", () =>{

    before("", () =>{
        cy.clearCookies();
        cy.visit("https://books-front-icesi.herokuapp.com/");
        cy.get('.ant-btn-primary > .ng-star-inserted').click();
        cy.wait(1000);
        cy.get("#author").type(Author); 
    });

    it("Then the save button must be disabled", () =>{
        cy.get('.ant-modal-footer > .ant-btn-primary').should("be.disabled");
    });
});

describe("When trying to create a book with no author", () =>{

    before("", () =>{
        cy.clearCookies();
        cy.visit("https://books-front-icesi.herokuapp.com/");
        cy.get('.ant-btn-primary > .ng-star-inserted').click();
        cy.wait(1000);
        cy.get("#name").type(Name);
    });

    it("Then the save button must be disabled", () =>{
        cy.get('.ant-modal-footer > .ant-btn-primary').should("be.disabled");
    });
});

describe("When to cancel the registration process of a book", () =>{

    before("", () =>{
        cy.visit("https://books-front-icesi.herokuapp.com/");
        cy.get('.ant-btn-primary > .ng-star-inserted').click();
        cy.wait(1000);
        cy.get("#name").type(Name);
        cy.get("#author").type(Author);
        cy.get('.ant-modal-footer > [nztype="default"] > .ng-star-inserted').click();

    });

    it("Then no book should have been registered with the name entered", () =>{
        cy.get('table').contains('td', Name).should('not.exist');
    });

    it("then no book should have been registered with the author entered", () =>{
        cy.get('table').contains('td', Author).should('not.exist');
    });
});