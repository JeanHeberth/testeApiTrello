
## Configuração Inicial

Antes de executar os testes, é necessário configurar as credenciais de autenticação do Trello. Siga os passos abaixo para configurar seu ambiente.


### Arquivo de Configuração

1. Crie um arquivo chamado `cypress.env.json` na raiz do projeto.
2. Insira suas chaves de API e Token no arquivo, conforme mostrado abaixo:

```
{
    "apiKey": "coloque_aqui_sua_chave_de_api",
    "apiToken": "coloque_aqui_seu_token_de_api"
}
```

Substitua `coloque_aqui_sua_chave_de_api` e `coloque_aqui_seu_token_de_api` pelas suas credenciais reais do Trello.


## Instalação de Dependências

Para instalar todas as dependências necessárias para rodar os testes, execute o seguinte comando no terminal:

```bash
npm install
```

Certifique-se de que você está no diretório raiz do projeto ao executar este comando.


### Executar Todos os Testes

Para executar todos os testes automatizados, utilize o comando:

```bash
npx cypress open
```
