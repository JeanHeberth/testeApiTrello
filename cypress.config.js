const {defineConfig} = require("cypress");
const fs = require('fs');

module.exports = defineConfig({
    e2e: {
        specPattern: [
            'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
            'cypress/integration/api/**/*.cy.{js,jsx,ts,tsx}'
        ],
        supportFile: 'cypress/support/e2e.js',
        setupNodeEvents(on, config) {
            // Registra a tarefa fileExists
            on('task', {
                arquivoExiste(filepath) {
                    return fs.existsSync(filepath);
                }
            });
        },
    },
});
