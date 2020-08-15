describe('Article creation', () => {
    it('Happy path', () => {
        cy.visit('http://localhost:3000');
        //Go to Login form
        cy.contains('Login').click();
        
        //Select email input and type valid admin email
        cy.get('[data-testid="login-input-email"]').should('be.empty').type("admin@admin.nom");

        //Select email input and type valid admin email
        cy.get('[data-testid="login-input-pass"]').should('be.empty').type("123123");

        //Click login
        cy.get('[data-testid="submit-login"]').click();

        //Click admin dropdown
        cy.contains('Admin').click();

        //Click admin dropdown
        cy.contains('Create Article').click();

        //Should redirect to create article page
        cy.location('pathname').should('eq', '/create/article');

        //Enter article name
        cy.get('[data-testid="article-title-input"]').type('Article created with cypress');

        //Enter article body
        cy.get('[contenteditable]').type(`some article body created by cypress`);
    });
});