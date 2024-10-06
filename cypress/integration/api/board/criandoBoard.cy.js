// cypress/integration/api/board/criarBoard.cy.js
describe('Criar Board no Trello', () => {


    it('Deve criar um board e salvar o idBoard e idList', () => {
        // Passo 1: Criar um board
        cy.request({
            method: 'POST',
            url: `https://api.trello.com/1/boards/`,
            qs: {
                name: 'MeuNovoBoard',
                key: Cypress.env('apiKey'),
                token: Cypress.env('apiToken')
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            const idBoard = response.body.id; // Captura o ID do board

            // Salva o idBoard em um arquivo fixture
            cy.writeFile('cypress/fixtures/board.json', { idBoard });

            // Passo 2: Obter as listas do board
            cy.request({
                method: 'GET',
                url: `https://api.trello.com/1/boards/${idBoard}/lists`,
                qs: {
                   key: Cypress.env('apiKey'),
                   token: Cypress.env('apiToken')
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                const idList = response.body[0].id; // Captura o ID da primeira lista

                // Adiciona o idList ao arquivo fixture
                cy.readFile('cypress/fixtures/board.json').then((data) => {
                    data.idList = idList;
                    cy.writeFile('cypress/fixtures/board.json', data);
                });

                cy.log('Board e lista criados com sucesso');
            });
        });
    });
});
