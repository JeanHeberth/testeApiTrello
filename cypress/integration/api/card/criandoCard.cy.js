// cypress/integration/api/card/criarCard.cy.js
import {faker} from "@faker-js/faker/locale/pt_BR";

describe('Criar Cards no Trello', () => {
    it('Deve cards no trello', () => {
        cy.readFile('cypress/fixtures/board.json').then((dados) => {
            const idList = dados.idList;
            const nameBoard = faker.company.name();

            // Cria 1 ou N cards
            const numeroDeCards = 1;
            let cardsId = dados.cardsId || [];

            // Função para criar um card
            for (let i = 0; i < numeroDeCards; i++) {
                cy.request({
                    method: 'POST',
                    url: `https://api.trello.com/1/cards`,
                    qs: {
                        idList: idList,
                        name: `Card: ${nameBoard}`, // Nome único usando Faker
                        key: Cypress.env('apiKey'),
                        token: Cypress.env('apiToken')
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    const cardId = response.body.id; // Captura o ID do card

                    // Adiciona o novo cardId ao array
                    cardsId.push(cardId);

                    // Atualiza o arquivo com os novos cardsId
                    cy.writeFile('cypress/fixtures/card.json', {...dados, cardsId});
                });
            }
        });
    });
});









