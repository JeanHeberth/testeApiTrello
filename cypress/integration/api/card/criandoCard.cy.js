// cypress/integration/api/card/criarCard.cy.js
import {faker} from "@faker-js/faker/locale/pt_BR";
import {criarCard} from '../../../support/trelloApi';

describe('Criar Cards no Trello', () => {
    it('Deve criar cards no Trello', () => {
        cy.readFile('cypress/fixtures/board.json').then((dados) => {
            const idList = dados.idList;
            const cardName = `Card: ${faker.commerce.productName()}`; // Nome único usando Faker

            criarCard(cardName, idList).then((card) => {
                cy.log(`Card ${card.name} criado com sucesso: ID ${card.id}`);
                return cy.readFile('cypress/fixtures/board.json').then((data) => {
                    // Cria 1 ou N cards
                    const numeroDeCards = 1;
                    let cardsId = dados.cardsId || [];
                    for (let i = 0; i < numeroDeCards; i++) {
                        cardsId.push(card.id);
                    }
                    data.cardsId = cardsId;

                    return cy.writeFile('cypress/fixtures/card.json', data);
                });
            });
        });
    });
});
