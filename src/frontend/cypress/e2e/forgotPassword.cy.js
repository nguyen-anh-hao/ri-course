const cypress_base_url = Cypress.env('CYPRESS_BASE_URL');

describe('Forgot Password', () => {
    it('should allow user to reset password', () => {
        cy.visit(`${cypress_base_url}/auth/sign-in`);
        cy.contains('Quên mật khẩu?').click(); // Navigate to forgot password page
        cy.url().should('include', '/auth/forgot-password');

        // Enter email and submit the form
        cy.get('input[type="email"]').type('user1@example.com');
        cy.get('button[type="submit"]').contains('Gửi email đặt lại mật khẩu').click();

        // Verify success notification
        cy.get('.notification-success')
            .should('be.visible')
            .and('contain', 'Email đặt lại mật khẩu đã được gửi!');
    });

    it('should display error for invalid email format', () => {
        cy.visit(`${cypress_base_url}/auth/forgot-password`);

        // Enter invalid email and submit the form
        cy.get('input[type="email"]').type('invalid-email');
        cy.get('button[type="submit"]').contains('Gửi email đặt lại mật khẩu').click();

        // Verify error message
        cy.get('.notification-error')
            .should('be.visible')
            .and('contain', 'Vui lòng nhập địa chỉ email hợp lệ!');
    });

    it('should display error if email does not exist', () => {
        cy.visit(`${cypress_base_url}/auth/forgot-password`);

        // Enter non-existent email and submit the form
        cy.get('input[type="email"]').type('nonexistent@example.com');
        cy.get('button[type="submit"]').contains('Gửi email đặt lại mật khẩu').click();

        // Verify error message
        cy.get('.notification-error')
            .should('be.visible')
            .and('contain', 'Email không tồn tại trong hệ thống!');
    });
});
