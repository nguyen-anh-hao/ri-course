describe('Connect to backend', () => {
    it('Connect to backend', () => {
        cy.request('GET', 'http://localhost:3123/api/')
            .then((response) => {
                expect(response.status).to.eq(200);
            });
    });
});