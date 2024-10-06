describe('Deve deletar um card no Trello', () => {
    it('Deve deletar um card', () => {
        cy.readFile('cypress/fixtures/card.json').then((dados) => {
            cy.request({
                method: 'DELETE',
                url: `https://api.trello.com/1/cards/${dados.cardId}?key=${Cypress.env('apiKey')}&token=${Cypress.env('apiToken')}`,
            }).then((response) => {
                expect(response.status).to.eq(200);
            });
        });
    });
});
