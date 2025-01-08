const cypress_base_url = Cypress.env('CYPRESS_BASE_URL');

describe('Exam Registration', () => {
    it('should allow learner to register for an exam', () => {
        cy.visit(`${cypress_base_url}/learner/exams`);
        cy.get('.exam-card').first().contains('Đăng ký').click(); // Click the "Register" button for the first exam
        cy.get('.confirmation-dialog').should('be.visible');
        cy.get('.confirmation-dialog button.confirm').click(); // Confirm registration
        cy.get('.notification-success')
            .should('be.visible')
            .and('contain', 'Đăng ký thi thành công!');
    });
});