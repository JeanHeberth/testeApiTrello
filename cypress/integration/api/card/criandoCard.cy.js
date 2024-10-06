describe('Deve criar um card no Trello', () => {
    it('Deve criar um card', () => {
        cy.readFile('cypress/fixtures/board.json').then((dados) => {
            cy.fixture('boardInfo.json').then((boardInfo) => {
                const listId = boardInfo.idList;
                cy.request({
                    method: 'POST',
                    url: `https://api.trello.com/1/cards?idList=${dados.listId}&name=MeuCard&key=${Cypress.env('apiKey')}&token=${Cypress.env('apiToken')}`,
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.writeFile('cypress/fixtures/card.json', {...dados, cardId: response.body.id});
                });
            });
        });
    });
});
