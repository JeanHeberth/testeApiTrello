// cypress/integration/api/card/deletarCard.cy.js
import { deletarCard } from '../../../support/trelloApi';

describe('Deletar o primeiro Card no Trello', () => {
    it('Deve deletar o primeiro card da lista', () => {
        cy.readFile('cypress/fixtures/card.json').then((dados) => {
            const cardsId = dados.cardsId;

            // Verifica se há algum card na lista para deletar
            if (cardsId && cardsId.length > 0) {
                const idCard = cardsId[0]; // Pega o primeiro card

                deletarCard(idCard).then(() => {
                    cy.log(`Card com ID ${idCard} deletado com sucesso`);
                    dados.cardsId = cardsId.filter(card => card !== idCard);
                    cy.writeFile('cypress/fixtures/card.json', dados);
                });
            } else {
                cy.log('Nenhum card encontrado para deletar.');
            }
        });
    });
});
