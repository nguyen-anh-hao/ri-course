const cypress_base_url = Cypress.env('CYPRESS_BASE_URL');

describe('Sign up functionality', () => {
    it('should sign up successfully with valid credentials', () => {
        const datetime = new Date().toISOString().replace(/[-:.]/g, '');
        const user = `testuser${datetime}`;
        const password = user;

        cy.visit(`${cypress_base_url}/auth/sign-up`);
        cy.get('input[type="text"]').type(user);
        cy.get('input[type="text"]').should('have.value', user);
        cy.get('input[type="password"]').type(password);
        cy.get('input[type="password"]').should('have.value', password);
        cy.get('button[type="submit"]').contains('Đăng ký').click();
        cy.url().should('eq', `${cypress_base_url}/auth/sign-in`);
    });

    it('should display error message with invalid credentials', () => {
        cy.visit(`${cypress_base_url}/auth/sign-up`);
        cy.get('input[type="text"]').type('user1');
        cy.get('input[type="text"]').should('have.value', 'user1');
        cy.get('input[type="password"]').type('user1');
        cy.get('input[type="password"]').should('have.value', 'user1');
        cy.get('button[type="submit"]').contains('Đăng ký').click();
        cy.get('.MuiAlert-message')
            .should('be.visible')
            .should('have.text', 'Tên đăng nhập đã được sử dụng!');
    });

    it('should display error message with empty credentials', () => {
        cy.visit(`${cypress_base_url}/auth/sign-up`);
        cy.get('button[type="submit"]').contains('Đăng ký').click();
        cy.get('.MuiAlert-message')
            .should('be.visible')
            .should('have.text', 'Tên đăng nhập không được để trống!');
    });

    it('should display error message with mismatched passwords', () => {
        cy.visit(`${cypress_base_url}/auth/sign-up`);
        cy.get('input[type="text"]').type('user1');
        cy.get('input[type="text"]').should('have.value', 'user1');
        cy.get('input[type="password"]').type('user1');
        cy.get('input[type="password"]').should('have.value', 'user1');
        cy.get('input[type="password"]').eq(1).type('user2');
        cy.get('input[type="password"]').eq(1).should('have.value', 'user2');
        cy.get('button[type="submit"]').contains('Đăng ký').click();
        cy.get('.MuiAlert-message')
            .should('be.visible')
            .should('have.text', 'Mật khẩu và xác nhận mật khẩu không trùng khớp!');
    });
});