// cypress/integration/api/card/criarCard.cy.js
import { faker } from "@faker-js/faker/locale/pt_BR";
import { criarCard } from '../../../support/trelloApi';

describe('Criar cards no Trello', () => {
    it('Deve criar cards no Trello', () => {

        // Verificar se o arquivo card.json existe
        cy.task('arquivoExiste', 'cypress/fixtures/card.json').then((exists) => {
            if (!exists) {
                // Se o arquivo não existir, criar com um formato inicial
                cy.writeFile('cypress/fixtures/card.json', {
                    cardsId: []
                }).then(() => {
                    cy.log('Arquivo card.json criado com sucesso');
                });
            }
        });

        cy.readFile('cypress/fixtures/board.json').then((dados) => {
            const idList = dados.idList;
            const numeroDeCards = 1;

            for (let i = 0; i < numeroDeCards; i++) {
                const cardName = `Card: ${faker.commerce.productName()}`; // Nome único usando Faker

                criarCard(cardName, idList).then((card) => {
                    cy.log(`Card ${card.name} criado com sucesso: ID ${card.id}`);

                    // Lê o arquivo card.json e adiciona o novo idCard
                    cy.readFile('cypress/fixtures/card.json').then((dataCard) => {
                        if (!dataCard.cardsId) {
                            dataCard.cardsId = [];
                        }

                        // Adiciona o novo idCard no array cardsId do card.json
                        dataCard.cardsId.push(card.id);

                        // Escreve os dados atualizados no arquivo card.json
                        cy.writeFile('cypress/fixtures/card.json', dataCard);
                    });
                });
            }
        });
    });
});
