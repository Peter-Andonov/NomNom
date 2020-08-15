describe('User registration', () => {
    it('Trigger validation errors', () => {
        cy.visit('http://localhost:3000');
        const registerNav = cy.contains('Register');
        //Go to Register form
        registerNav.click();

        //No errors should be visible
        cy.get('[data-testid="error-input-email"]').should('not.exist');
        cy.get('[data-testid="error-input-pass"]').should('not.exist');
        cy.get('[data-testid="error-input-re-pass"]').should('not.exist');

        //Click register
        cy.get('[data-testid="submit-register"]').click();

        //Invalid messages for email and password should appear
        cy.get('[data-testid="error-input-email"]').should('exist')
            .should('have.text', "Invalid email format");
        cy.get('[data-testid="error-input-pass"]').should('exist')
            .should('have.text', "* Password must be at least 6 characters long");

        //Select email input and type invalid value
        cy.get('[data-testid="input-email"]').should('be.empty').type("This is not a valid mail");

        //Focus on password input
        cy.get('[data-testid="input-pass"]').focus();

        //Invalid email message should appear
        cy.get('[data-testid="error-input-email"]').should('exist')
            .should('have.text', "* This should look like an email");

        //Change email to a correct value
        cy.get('[data-testid="input-email"]').clear().should('be.empty').type("test@test.com");

        //Invalid password message should appear
        cy.get('[data-testid="error-input-pass"]').should('exist');

        //Focus on password field
        cy.get('[data-testid="input-pass"]').focus();

        //Invalid email message should disappear
        cy.get('[data-testid="error-input-email"]').should('not.exist');

        //Type short password
        cy.get('[data-testid="input-pass"]').type('123');

        //Invalid password message should still be visible
        cy.get('[data-testid="error-input-pass"]').should('exist')
            .should('have.text', "* Password must be at least 6 characters long");

        //Type illegal characters in password short password
        cy.get('[data-testid="input-pass"]').type('123&$abc');

        //Focus on re-password field
        cy.get('[data-testid="input-re-pass"]').focus();

        //Invalid password message should still be visible
        cy.get('[data-testid="error-input-pass"]').should('exist')
        .should('have.text', "* Password must contain only digits and english letters");

        //Type valid password
        cy.get('[data-testid="input-pass"]').clear().should('be.empty').type('12345678');

        //Focus on re-password field
        cy.get('[data-testid="input-re-pass"]').focus();
        cy.get('[data-testid="error-input-pass"]').should('not.exist');

        //Type invalid re-password
        cy.get('[data-testid="input-re-pass"]').should('be.empty').type('123456');

        //Click register
        cy.get('[data-testid="submit-register"]').click();

        //Invalid re-password message should still be visible
        cy.get('[data-testid="error-input-re-pass"]').should('exist')
        .should('have.text', "* Passwords don`t match");

        //Type valid re-password
        cy.get('[data-testid="input-re-pass"]').clear().should('be.empty').type('12345678');
        cy.get('[data-testid="submit-register"]').click();

        //Should redirect to home page
        cy.location('pathname').should('eq', '/');
        cy.getCookie('auth-token').should('have.property', 'name', 'auth-token');
    });

    it('Trigger email already in use', () => {
        cy.clearCookies();
        cy.visit('http://localhost:3000');
        const registerNav = cy.contains('Register');
        //Go to Register form
        registerNav.click();

        //Enter existing email
        cy.get('[data-testid="input-email"]').clear().should('be.empty').type("test@test.com");

        //Type valid password
        cy.get('[data-testid="input-pass"]').clear().should('be.empty').type('12345678');

        //Type valid re-password
        cy.get('[data-testid="input-re-pass"]').clear().should('be.empty').type('12345678');
        cy.get('[data-testid="submit-register"]').click();

        //Should not redirect to home page
        cy.location('pathname').should('eq', '/register');
        cy.getCookie('auth-token').should('not.exist');
    });
})