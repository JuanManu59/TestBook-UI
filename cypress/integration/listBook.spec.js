
describe("When registered books are listed", () =>{

    before("", ()=>{
        cy.visit("https://books-front-icesi.herokuapp.com/");
    });

    it("At least one book should be listed", () =>{
        cy.get('table').find('tr').should('have.length.greaterThan', 0);
    });

});