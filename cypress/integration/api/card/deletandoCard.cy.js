// cypress/integration/api/card/deletarCard.cy.js
import {deletarCard} from '../../../support/trelloApi';

describe('Deletar  card no Trello', () => {
    it('Deve deletar um card por vez até que todos sejam deletados', () => {
        cy.readFile('cypress/fixtures/card.json').then((dados) => {
            let cardsId = dados.cardsId;

            if (cardsId && cardsId.length > 0) {
                const idCard = cardsId.shift();
                cy.writeFile('cypress/fixtures/card.json', {...dados, cardsId});
                deletarCard(idCard);
            } else {
                cy.log('Nenhum card encontrado para deletar');
            }
        });
    });
});
