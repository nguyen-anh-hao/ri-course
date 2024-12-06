const cypress_base_url = Cypress.env('CYPRESS_BASE_URL');

describe('Login functionality', () => {
    it('should sign in successfully with valid credentials', () => {
        cy.visit(`${cypress_base_url}/auth/sign-in`);
        cy.get('input[type="text"]').type('user1');
        cy.get('input[type="text"]').should('have.value', 'user1');
        cy.get('input[type="password"]').type('user1');
        cy.get('input[type="password"]').should('have.value', 'user1');
        cy.get('button[type="submit"]').contains('Đăng nhập').click();
        cy.url().should('include', '/');
    });

    it('should display error message with invalid credentials', () => {
        cy.visit(`${cypress_base_url}/auth/sign-in`);
        cy.get('input[type="text"]').type('user1');
        cy.get('input[type="text"]').should('have.value', 'user1');
        cy.get('input[type="password"]').type('wrongpassword');
        cy.get('input[type="password"]').should('have.value', 'wrongpassword');
        cy.get('button[type="submit"]').contains('Đăng nhập').click();
        cy.get('.MuiAlert-message')
            .should('be.visible')
            .and('contain', 'Tên đăng nhập hoặc mật khẩu không đúng!');
    });
});
