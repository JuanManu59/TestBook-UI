const Name = "name";
const Author = "author";

describe('When de user wants to modify a book',() => {

    before("Create and modify the book", () => {
        cy.visit("https://books-front-icesi.herokuapp.com/");
        cy.get('.ant-btn-primary > .ng-star-inserted').click();
        cy.wait(1000);
        cy.get("#name").type(Name);
        cy.get("#author").type(Author);
        cy.get('.ant-modal-footer > .ant-btn-primary > .ng-star-inserted').click();
        cy.contains('10 / page').click();
        cy.contains('50 / page').click();

        cy.get("table").contains('tr', Name).invoke("index").then((i) =>{
            cy.get(`:nth-child(${i+1}) > :nth-child(4) > .ant-btn`).click();
        });

        cy.get("#name").clear().type(Name+"Update");
        cy.get("#author").clear().type(Author+"Update");    
        cy.get('.ant-modal-footer > .ant-btn-primary > .ng-star-inserted').click();    
    });

    after("Remove the book created", () =>{
        cy.get("table").contains('tr', Name+"Update").invoke("index").then((i) =>{
            cy.get(`:nth-child(${i+1}) > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input`).click();
        })
        cy.get('[nztype="default"]').click();
    });

    it("So the book with the old name doesn't exist", ()=>{
        cy.get('table').contains('td', Name).should('not.exist');
    });

    it("So the book with the old author doesn't exist", ()=>{
        cy.get('table').contains('td', Author).should('not.exist');
    });
    
    it("So the book has the new name", ()=>{
        cy.get('table').contains('td', Name+"Update").should('be.visible');
    });

    it("So the book has the new author", ()=>{
        cy.get('table').contains('td', Author+"Update").should('be.visible');
    });

});