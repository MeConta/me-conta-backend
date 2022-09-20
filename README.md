# 💬 Me Conta

## ✳️ Sobre
O **Me Conta** é uma plataforma que une jovens que buscam terapia a profissionais de Psicologia

---

## 🛠 Ferramentas Utilizadas
- [Node](https://nodejs.dev)
- [NestJS](https://nestjs.com)
- [Jest](https://jestjs.io)

---
## 💻 Configurando o Ambiente

- Instale o [NVM](https://github.com/nvm-sh/nvm) (Gerenciador de versão do Node) e adicione a versão LTS do [node](https://nodejs.org/en/) ao nvm

- Instale o [Docker CLI através do Colima](https://github.com/abiosoft/colima) (Executador de containers com mínimo setup)

  - Observação: Com a alteração dos termos de uso do Docker Desktop aconselhamos o uso do Colima nas máquinas. Qualquer outro executador de containers Docker pode ser utilizado.
  
---

## 💻 Clonando o repositório

- Clone o projeto

  ```bash
  git clone https://github.com/MeConta/me-conta-backend
  ````
---

## 🏠 Adicionando variáveis de ambiente (.env.local)
Existe o arquivo `.env` com todas as variáveis utilizadas para rodar o sistema. Para desenvolvimento local, é preciso criar o arquivo `.env.local` na raiz do projeto e adicionar algumas variáveis, conforme abaixo:

> Adicione as seguintes variáveis para login como admin no sistema:
> - ADMIN_EMAIL=\<seu-email>
> - ADMIN_PASSWORD=\<senha-qualquer>

> Caso seja necessário simular as funcionalidades de envio de email, adicionar as seguintes variáveis:
> - EMAIL_SMTP_HOST=\<host-smtp>
> - EMAIL_SMTP_PORT=\<porta-smtp>
> - EMAIL_SMTP_USERNAME=\<usuario-smtp>
> - EMAIL_SMTP_PASSWORD=\<senha-smtp>
> - EMAIL_FROM=\<email-origem>
> - EMAIL_CONTACT_TO=\<email-contato>

---

## ▶️ Executando o projeto
- inicie o banco de dados via **docker compose**
  ```bash
  docker-compose up -d db
  ```
- Instale as dependências **npm i**:
  ```bash
  npm i
  ```

- Se necessário, rode a migração do banco de dados
  ```bash
  npm run typeorm:migration:run
  ```

- Inicie o [**Nest**](http://nestjs.com) em modo de desenvolvimento
  ```bash
  npm run start:dev
  ```

- O Backend iniciará em [http://localhost:3000](http://localhost:3000)

---
## 🧩 Swagger
É possível acessar a documentação da API pelo [Swagger da API](http://localhost:3000/api) e simular os endpoints

---

## 🐳 Iniciando com o Docker
Atualmente, é possível rodar o sistema utilizando Docker. Porém, ele não reage em tempo real as alterações feitas no projeto, como acontece ao subir utilizando o nestJS em modo de desenvolvimento.

Para rodar a aplicação, siga os passos abaixo: 
- Deve-se ter o arquivo `.env.local` criado e as variáveis preenchidas
> O `.env` não possuí os dados de **ADMIN** nem **SMTP**
- Se necessário, realize as migrações do banco de dados com o **docker compose**
  ```bash
  docker compose run --rm migration
  ```
- Inicie o container do docker.
  ```bash
  docker compose run -d api
  ```

- Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado

---

## :warning: Começando a desenvolver - Conheça o Check in Dance 👣 

O "Check in dance" é uma prática usada para garantir que nosso código esteja sempre atualizado e seguindo os padrões de desenvolvimento definidos pela equipe. Veja o [Passo-a-passo](https://github.com/MeConta/me-conta-backend/blob/main/check-in-dance.md).

---

## 🎲 Migrações de banco de dados
- Ao alterar uma entidade é necessário gerar nova migração para o banco de dados
  ```bash
  npm run typeorm:migration:generate [nome da migração]
  ```
- Se necessário criar uma migração vazia (por exemplo: caso precise incluir uma nova tabela no banco)
  ```bash
  npm run typeorm:migration:create [nome da migração]
  ```

- Rodar as migrações para efetivar alterações no banco
  ```bash
  npm run typeorm:migration:run
  ```
---

## 🧪 Testes:
- Rodar todos os testes
  ```bash
  npm run test
  ```
- Rodar apenas testes unitários
  ```bash
  npm run test:cov
  ```
- Rodar apenas testes de integração
  ```bash
  npm run test:e2e
  ```
---

## 🚀 Commits no projeto

O projeto possui [husky](https://github.com/typicode/husky) para verificar alguns passos antes de autorizar o commit.

1. Aplicar correções relacionadas à **Lint**;
3. Validação da mensagem de commit conforme as regras do [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/);
  - Padrão no desenvolvimento de um card:
  > tipo(#numero_do_card): descrição em inglês (em letras minúsculas)
  - Padrão de desenvolvimento não relacionado a cards
  > tipo(escopo): descrição em inglês (em letras minúsculas)

Exemplos de tipos:
  - feat: introduz uma nova funcionalidade à base de código;
  - fix: correção de um bug na base de código;
  - build: Introduz uma mudança que afeta o build do sistema ou alguma dependência externa (exemplos de escopos: gulp, broccoli, npm);
  - chore: atualização de ferramentas, configurações e bibliotecas 
  - ci: Introduz uma mudança aos arquivos e scripts de configuração do CI/CD (exemplos de escopos: Travis, Circle, BrowserStack, SauceLabs)
  - docs: Alterações na documentação 
  - style: Introduz uma mudança que não afeta o significado do código (remoção de espaços em branco, formatação, ponto e virgula faltando, etc)
  - refactor: Uma mudança no código que nem corrige um bug nem adiciona uma nova funcionalidade
  - perf: Um mundança no código que melhora a performance
  - test: Adicionar testes faltando ou corrigir testes existentes

Exemplos de commits válidos:
  ```bash
  git commit -m "feat(#300): creating auth service"
  git commit -m "fix(#30): correcting volunteer filter by type"
  git commit -m "style(lint): removing some lint warnings"
  git commit -m "docs(readme): removing deploy section from readme"
  ```
---

## 🔗	 Ambiente de desenvolvimento ###

O ambiente de desenvolvimento está no Heroku, e seguem os links abaixo:

| Backend                                  | Swagger                                  | Frontend                                  | Storybook                                  |
|------------------------------------------|-------------------------------------------|------------------------------------------|-------------------------------------------|
| [Backend](https://me-conta-backend.herokuapp.com)| [Swagger](https://me-conta-backend.herokuapp.com/api)| [Frontend](https://me-conta-frontend.herokuapp.com) | [Storybook](https://me-conta-story-book.herokuapp.com) | 

---
