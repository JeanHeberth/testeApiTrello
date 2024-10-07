// cypress/integration/api/board/deletarBoard.cy.js
import {deletarBoard} from '../../../support/trelloApi';

describe('Deve apagar o board criado', () => {
    it('Deve apagar o board', () => {
        cy.readFile('cypress/fixtures/board.json').then((dados) => {
            const idBoard = dados.idBoard;
            // Verifica se o board existe antes de deletar
            if (idBoard) {
                deletarBoard(idBoard).then(() => {
                    cy.log(`Board com ID ${idBoard} deletado com sucesso.`);
                });
            } else {
                // Mensagem se não há board para deletar
                cy.log('Nenhum board encontrado para deletar.');

            }
        });
    });
});
