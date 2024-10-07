// cypress/integration/api/card/deletarCard.cy.js
describe('Deletar múltiplos cards no Trello', () => {
    it('Deve deletar um card por vez até que todos sejam deletados', () => {
        cy.readFile('cypress/fixtures/card.json').then((dados) => {
            let cardsId = dados.cardsId; // Pega o array de cardsId

            if (cardsId && cardsId.length > 0) {
                const idCard = cardsId.shift(); // Remove o primeiro card do array

                // Atualiza o arquivo JSON removendo o card deletado
                cy.writeFile('cypress/fixtures/card.json', { ...dados, cardsId });

                // Faz a requisição para deletar o card
                cy.request({
                    method: 'DELETE',
                    url: `https://api.trello.com/1/cards/${idCard}`,
                    qs: {
                        key: Cypress.env('apiKey'),
                        token: Cypress.env('apiToken')
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    cy.log(`Card ${idCard} deletado com sucesso`);
                });
            } else {
                cy.log('Nenhum card encontrado para deletar');
            }
        });
    });
});
