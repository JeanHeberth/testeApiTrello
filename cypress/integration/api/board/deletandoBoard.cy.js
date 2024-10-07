// cypress/integration/api/board/deletarBoard.cy.js
import { deletarBoard } from '../../../support/trelloApi';

describe('Deve apagar o board criado', () => {
    it('Deve apagar o board', () => {
        cy.readFile('cypress/fixtures/card.json').then((dados) => {
            const idBoard = dados.idBoard;
            expect(idBoard).to.exist;
            deletarBoard(idBoard).then(() => {
                cy.log(`Board ${idBoard} deletado com sucesso.`);
            });
        });
    });
});
