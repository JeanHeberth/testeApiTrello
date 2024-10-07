// cypress/integration/api/board/criarBoard.cy.js
import { faker } from "@faker-js/faker/locale/pt_BR";
import { criarBoard, obterIdListEGravarEmArquivo } from '../../../support/trelloApi';

describe('Criar Board no Trello', () => {
    it('Deve criar um board e salvar o idBoard e idList', () => {
        const boardName = faker.company.name();

        criarBoard(boardName).then((idBoard) => {
            cy.log(`Board ${boardName} criado com sucesso ID: ${idBoard}`);
            return obterIdListEGravarEmArquivo(idBoard);
        }).then(() => {
            cy.log(`Lista associada ao board criada com sucesso.`);
        });
    });
});
