# Desafio - Consulta de CPF

Este projeto foi desenvolvido como parte de um teste para uma empresa, e consiste na implementação de uma página de consulta de CPF e de exibição de dados do cooperado.

## Funcionalidades

- O usuário pode inserir um CPF no formulário de consulta.
  - Caso o CPF inserido não seja válido, uma mensagem de erro é exibida na tela.
  - Caso o CPF seja válido, o usuário é direcionado para a segunda página.
  
- Em seguida após inserir um CPF válido, os dados do cooperado são carregados e exibidos.

## Tecnologias Utilizadas

- Angular: 14.2.0
- cpf-cnpj-validator
- bootstrap
- @fortawesome/fontawesome-free
- json-server

## Executando o Projeto

Para executar o projeto em seu ambiente local, siga as instruções abaixo:

1. Faça o clone deste repositório.
2. Instale as dependências utilizando o comando npm i.
3. Execute o projeto utilizando o comando ng serve.
4. Acesse o aplicativo no navegador através da URL local.
5. Execute na paste mock o comando json-server --watch mock-cooperado.json

**Observação:** Para testar a funcionalidade de consulta de CPF, utilize um dos seguintes CPFs que estão disponíveis no mock de dados: `186.729.437-08` ou `178.756.627-70`.
