import {faker} from "@faker-js/faker/locale/pt_BR";

describe('Criar Board no Trello', () => {
    it('Deve criar um board e salvar o idBoard e idList', () => {
        const boardName = faker.company.name();

        cy.request({
            method: 'POST',
            url: `https://api.trello.com/1/boards/`,
            qs: {
                name: "Board " + boardName,
                key: Cypress.env('apiKey'),
                token: Cypress.env('apiToken')
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            const idBoard = response.body.id;

            cy.writeFile('cypress/fixtures/board.json', {idBoard, name: boardName});
            cy.log(`Board ${boardName} criado com sucesso ID: ${idBoard}`);

            cy.request({
                method: 'GET',
                url: `https://api.trello.com/1/boards/${idBoard}/lists`,
                qs: {
                    key: Cypress.env('apiKey'),
                    token: Cypress.env('apiToken')
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                const idList = response.body[0].id;
                cy.readFile('cypress/fixtures/board.json').then((data) => {
                    data.idList = idList;
                    cy.writeFile('cypress/fixtures/board.json', data);
                });

                cy.log(`Board e lista criados com sucesso: Board: ${boardName}`);
            });
        });
    });
});