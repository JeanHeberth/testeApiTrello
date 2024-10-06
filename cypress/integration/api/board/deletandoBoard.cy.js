describe('Deve apagar o board criado', () => {
    it('should delete the board', () => {
        cy.readFile('cypress/api/dados/dados.json').then((dados) => {
            cy.request({
                method: 'DELETE',
                url: `https://api.trello.com/1/boards/${dados.boardId}?key=${Cypress.env('apiKey')}&token=${Cypress.env('apiToken')}`,
            }).then((response) => {
                expect(response.status).to.eq(200);
            });
        });
    });
});
