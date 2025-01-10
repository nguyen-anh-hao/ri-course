const cypress_base_url = Cypress.env('CYPRESS_BASE_URL');

describe('Learning - My Courses', () => {
    it('should display the list of enrolled courses', () => {
        cy.visit(`${cypress_base_url}/learner/my-courses`);

        // Verify the page title
        cy.get('h1').should('contain', 'Khóa học của tôi');

        // Ensure the course list is visible
        cy.get('.course-list').should('be.visible');

        // Check that at least one course is displayed
        cy.get('.course-item').should('have.length.greaterThan', 0);

        // Verify details of the first course
        cy.get('.course-item').first().within(() => {
            cy.get('.course-title').should('exist');
            cy.get('.course-progress').should('exist');
            cy.contains('Tiếp tục học').should('be.visible');
        });
    });

    it('should allow learner to continue learning a course', () => {
        cy.visit(`${cypress_base_url}/learner/my-courses`);

        // Click "Continue Learning" button for the first course
        cy.get('.course-item').first().contains('Tiếp tục học').click();

        // Verify redirection to the course learning page
        cy.url().should('include', '/learner/my-courses/');
        cy.get('.learning-content').should('be.visible');
    });
});
