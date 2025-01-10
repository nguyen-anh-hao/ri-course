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

    it('should display an error if exam registration fails', () => {
        cy.visit(`${cypress_base_url}/learner/exams`);
        cy.get('.exam-card').first().contains('Đăng ký').click();
        cy.get('.confirmation-dialog').should('be.visible');

        // Simulate server failure or rejection
        cy.intercept('POST', '**/exam/register', {
            statusCode: 400,
            body: { message: 'Không thể đăng ký thi. Vui lòng thử lại sau!' },
        });

        cy.get('.confirmation-dialog button.confirm').click();

        cy.get('.notification-error')
            .should('be.visible')
            .and('contain', 'Không thể đăng ký thi. Vui lòng thử lại sau!');
    });

    it('should not allow duplicate exam registration', () => {
        cy.visit(`${cypress_base_url}/learner/exams`);
        cy.get('.exam-card').first().contains('Đăng ký').click();
        cy.get('.confirmation-dialog').should('be.visible');
        cy.get('.confirmation-dialog button.confirm').click();

        // Attempt to register for the same exam again
        cy.get('.exam-card').first().contains('Đăng ký').click();
        cy.get('.notification-error')
            .should('be.visible')
            .and('contain', 'Bạn đã đăng ký thi này trước đó!');
    });

    it('should display exam details before registration', () => {
        cy.visit(`${cypress_base_url}/learner/exams`);

        // Open the first exam card to view details
        cy.get('.exam-card').first().contains('Xem chi tiết').click();
        cy.get('.exam-details').should('be.visible');

        // Verify details are displayed
        cy.get('.exam-details .exam-title').should('exist');
        cy.get('.exam-details .exam-date').should('exist');
        cy.get('.exam-details .exam-duration').should('exist');
    });
});
