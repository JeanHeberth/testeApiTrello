describe('Deve criar um board no Trello', () => {
    it('should create a board', () => {
        cy.request({
            method: 'POST',
            url: `https://api.trello.com/1/boards/?name=MeuBoard&key=${Cypress.env('apiKey')}&token=${Cypress.env('apiToken')}`,
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.writeFile('cypress/api/dados/dados.json', { boardId: response.body.id });
        });
    });
});
