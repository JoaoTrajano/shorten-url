# Shorten URL

## Descrição

Este é um projeto desenvolvido com o framework Nest.js. O projeto visa a contrução de uma API para encurtar URL's

## Documentação

Caso haja dúvidas, é só acessar a documentação através do /doc:

```
http://localhost:3000/doc
```

A API retorna a URL sem precisar de autenticação. No entanto, para acessar as URLs geradas por você e usar outras funcionalidades, é necessário estar autenticado.

Se você não tiver um usuário, pode criá-lo por meio da rota:

```
http://localhost:3000/doc
```

e em seguida:

```
POST /user
```

## Pré-requisitos

Certifique-se de ter o seguinte instalado em sua máquina:

- Node.js (v20.12.2 LTS)
- Yarn (v1.22.22)

## Instalação

1. Caso não tenha instalado o Nest.js, execute o seguinte comando: `npm i -g @nestjs/cli`

2. Instale as dependências do projeto:

   ```
   yarn install
   ```

   ou simplesmente

   ```
   yarn
   ```

## Uso

1. Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

   ```
   yarn start:dev
   ```

2. Acesse a aplicação em `http://localhost:3000`

## Testes

1. Para executar os testes unitários, utilize o comando:

   ```
   yarn test
   ```

## Autores

- João Trajano de Souza Neto (@JoaoTrajano)

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
