# CondominioConectado

CondominioConectado é um projeto desenvolvido com Angular e Firebase para gerenciar anúncios e usuários em um condomínio. Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 18.2.10.

## Descrição do Projeto

O CondominioConectado é uma aplicação PWA que permite aos moradores de um condomínio criar, listar e gerenciar anúncios. A aplicação utiliza Angular no frontend e Firebase no backend, aproveitando os serviços de autenticação, Firestore, Functions e hospedagem do Firebase.

## Estrutura do Projeto

- **frontend/**: Contém o código fonte do frontend desenvolvido em Angular.
- **firebase/**: Contém as funções do Firebase, regras de segurança do Firestore e configurações de hospedagem.

## Funcionalidades

- **Autenticação de Usuários**: Utiliza Firebase Authentication para gerenciar o login e registro de usuários.
- **Gerenciamento de Anúncios**: Permite aos usuários criar, listar, editar e deletar anúncios.

## Servidor de Desenvolvimento

Execute `ng serve` para iniciar um servidor de desenvolvimento. Navegue até `http://localhost:4200/`. A aplicação será recarregada automaticamente se você alterar qualquer um dos arquivos de origem.

## Scaffold de Código

Execute `ng generate component component-name` para gerar um novo componente. Você também pode usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Execute `ng build` para compilar o projeto. Os artefatos de build serão armazenados no diretório `dist/`.

## Executando Testes Unitários

Execute `ng test` para executar os testes unitários via [Karma](https://karma-runner.github.io).

## Executando Testes End-to-End

Execute `ng e2e` para executar os testes end-to-end via uma plataforma de sua escolha. Para usar este comando, você precisa primeiro adicionar um pacote que implemente capacidades de teste end-to-end.

## Ajuda Adicional

Para obter mais ajuda sobre o Angular CLI, use `ng help` ou consulte a [Visão Geral e Referência de Comandos do Angular CLI](https://angular.dev/tools/cli).

## Configuração do Firebase

- **Autenticação**: Configurada para permitir login com email e senha.
- **Firestore**: Utilizado para armazenar dados dos anúncios e usuários.
- **Hospedagem**: Configurada para hospedar a aplicação Angular.

## Estrutura de Diretórios do Firebase

- **functions/**: Contém as funções do Firebase para manipulação de dados.
  - `createAds.js`: Função para criar anúncios.
  - `createUser.js`: Função para criar usuários.
  - `deleteAds.js`: Função para deletar anúncios.
  - `getAds.js`: Função para obter anúncios.
  - `getUserAds.js`: Função para obter anúncios de um usuário.
  - `listAds.js`: Função para listar todos os anúncios.
  - `listAdsByTitle.js`: Função para listar anúncios por título.
  - `listUserAds.js`: Função para listar anúncios de um usuário.

## Licença

Este projeto está licenciado sob a licença MIT.
