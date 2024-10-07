describe('Deve apagar o board criado', () => {
    it('Deve apagar o board', () => {
        cy.readFile('cypress/fixtures/board.json').then((dados) => {
            const idBoard = dados.idBoard;
            expect(idBoard).to.exist;
            cy.request({
                method: 'DELETE',
                url: `https://api.trello.com/1/boards/${idBoard}`,
                qs: {
                    key: Cypress.env('apiKey'),
                    token: Cypress.env('apiToken')
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
            });
        });
    });
});
