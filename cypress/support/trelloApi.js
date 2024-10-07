// trelloApi.js
const TRELLO_API_KEY = Cypress.env('apiKey');
const TRELLO_TOKEN = Cypress.env('apiToken');


function criarBoard(boardName) {
    return cy.request({
        method: 'POST',
        url: `https://api.trello.com/1/boards/`,
        qs: {
            name: `Board ${boardName}`,
            key: TRELLO_API_KEY,
            token: TRELLO_TOKEN
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        const idBoard = response.body.id;

        // Salva o idBoard e o nome do board no arquivo
        return cy.writeFile('cypress/fixtures/board.json', { idBoard, name: boardName }).then(() => idBoard);
    });
}

function obterIdListEGravarEmArquivo(idBoard) {
    return cy.request({
        method: 'GET',
        url: `https://api.trello.com/1/boards/${idBoard}/lists`,
        qs: {
            key: TRELLO_API_KEY,
            token: TRELLO_TOKEN
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        const idList = response.body[0]?.id;
        if (!idList) {
            throw new Error('Nenhuma lista encontrada no quadro.');
        }

        return cy.readFile('cypress/fixtures/board.json').then((data) => {
            data.idList = idList;
            return cy.writeFile('cypress/fixtures/board.json', data).then(() => idList);
        });
    });
}


function criarCard(cardName, idList) {
    if (!idList) {
        throw new Error('idList não pode ser vazio. Por favor, forneça um ID de lista válido.');
    }

    return cy.request({
        method: 'POST',
        url: `https://api.trello.com/1/cards`,
        qs: {
            idList: idList,
            name: cardName,
            key: TRELLO_API_KEY,
            token: TRELLO_TOKEN
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        return response.body;
    });
}

function deletarCard(idCard) {
    return cy.request({
        method: 'DELETE',
        url: `https://api.trello.com/1/cards/${idCard}`,
        qs: {
            key: TRELLO_API_KEY,
            token: TRELLO_TOKEN
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(`Card ${idCard} deletado com sucesso`);
    });
}


function deletarBoard(idBoard) {
    return cy.request({
        method: 'DELETE',
        url: `https://api.trello.com/1/boards/${idBoard}`,
        qs: {
            key: TRELLO_API_KEY,
            token: TRELLO_TOKEN
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(`Board ${idBoard} deletado com sucesso`);
    });
}

// Exportando as funções para uso em outros arquivos
export { criarBoard, obterIdListEGravarEmArquivo, criarCard, deletarCard, deletarBoard };
