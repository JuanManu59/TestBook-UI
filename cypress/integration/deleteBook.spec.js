  
const Name = "name";
const Author = "author";

describe('When de user wants to delete a book',() => {

    before("Create and remove the book", () => {
        cy.visit("https://books-front-icesi.herokuapp.com/");
        cy.get('.ant-btn-primary > .ng-star-inserted').click();
        cy.wait(1000);
        cy.get("#name").type(Name);
        cy.get("#author").type(Author);
        cy.get('.ant-modal-footer > .ant-btn-primary > .ng-star-inserted').click();
        cy.contains('10 / page').click();
        cy.contains('50 / page').click();
    
        cy.get("table").contains('tr', Name).invoke("index").then((i) =>{
            cy.get(`:nth-child(${i+1}) > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input`).click();
        })
        cy.get('[nztype="default"]').click();
    });

    it("Then the name of the book that was registered is no longer found", ()=>{
        cy.get('table').contains('td', Name).should('not.exist');
    });

});