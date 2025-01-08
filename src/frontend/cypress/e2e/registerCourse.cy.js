const cypress_base_url = Cypress.env('CYPRESS_BASE_URL');

describe('Course Registration', () => {
    it('should allow learner to register for a course', () => {
        // Log in first with valid credentials for user2
        cy.visit(`${cypress_base_url}/auth/sign-in`);
        cy.get('input[type="text"]').type('user2'); // Use user2's credentials
        cy.get('input[type="text"]').should('have.value', 'user2');
        cy.get('input[type="password"]').type('user2');
        cy.get('input[type="password"]').should('have.value', 'user2');
        cy.get('button[type="submit"]').contains('Đăng nhập').click();
        cy.url().should('eq', `${cypress_base_url}/`); // Ensure login is successful

        // Now proceed with the course registration
        cy.visit(`${cypress_base_url}/learner/all-courses/course1`);
        cy.contains('Button', 'Đăng ký khóa học').click(); // Click the "Register" button for the first course
        cy.get('.confirmation-dialog').should('be.visible');
        cy.get('.confirmation-dialog button.confirm').click(); // Confirm registration
        cy.get('.notification-success')
            .should('be.visible')
            .and('contain', 'Đăng ký khóa học thành công!');
    });
});
