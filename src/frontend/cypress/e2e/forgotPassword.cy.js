const cypress_base_url = Cypress.env('CYPRESS_BASE_URL');

describe('Forgot Password', () => {
    it('should allow user to reset password', () => {
        cy.visit(`${cypress_base_url}/auth/sign-in`);
        cy.get('input[type="email"]').type('user1@example.com');
        cy.get('button[type="submit"]').contains('Gửi email đặt lại mật khẩu').click();
        cy.get('.notification-success')
            .should('be.visible')
            .and('contain', 'Email đặt lại mật khẩu đã được gửi!');
    });
});