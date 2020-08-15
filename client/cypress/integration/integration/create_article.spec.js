import 'cypress-file-upload';

describe('Article creation', () => {
    const articleTitle = 'Article created with cypress';
    const articleBody = `some longer article body created by cypress in order to wait for image upload to finish`;
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
        
        cy.get('[data-testid="article-title-input"]').type(articleTitle);

        //Upload picture
        const imagePath = 'cypress.jpg';
        cy.get('[data-testid="image-upload"]').attachFile(imagePath);

        //Enter article body
       cy.get('[contenteditable]').type(articleBody);

        //Save article
        cy.get('[data-testid="submit-article"]').click();

        //Should redirect to admin page
        cy.location('pathname').should('eq', '/admin');
    });

    it('Check if new article is correctly created', () => {
        cy.visit('http://localhost:3000/articles');
        //Go to Articles page
        cy.contains('Articles').click();

        //Search for new article
        cy.get('[data-testid="search-input"]').type(articleTitle);
        cy.get('[data-testid="search-submit"]').click();

        //Select the first and hopefully only result
        cy.get('[data-testid="articles-list"] div').first().click();

        //Check if the article title matches
        cy.get('h1').should('have.text', articleTitle);
    });

    it('Should fail if another article with the same name tries to be created', () => {
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
        cy.get('[data-testid="article-title-input"]').type(articleTitle);

        //Save article
        cy.get('[data-testid="submit-article"]').click();

        //Check if the error message appears
        cy.get('[data-testid="article-editor-error"]').should('have.text', 'There is already an article with that title');
    })
});