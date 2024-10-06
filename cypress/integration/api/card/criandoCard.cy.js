describe('Deve criar um card no Trello', () => {
    it('Deve criar um card em board existente.', () => {
        cy.readFile('cypress/fixtures/board.json').then((dados) => {
            cy.fixture('board.json').then((boardInfo) => {
                const listId = boardInfo.idList;
                cy.request({
                    method: 'POST',
                    url: `https://api.trello.com/1/cards`,
                    qs: {
                        idList: listId,
                        name: 'MeuNovoCard',
                        key: Cypress.env('apiKey'),
                        token: Cypress.env('apiToken')
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.writeFile('cypress/fixtures/card.json', {...dados, cardId: response.body.id});
                });
            });
        });
    });
});
