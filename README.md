# 💬 Me Conta

## ✳️ Sobre
O **Me Conta** é uma plataforma que une jovens que buscam terapia a profissionais de Psicologia

## 🛠 Ferramentas Utilizadas
- [Node](https://nodejs.dev)
- [NestJS](https://nestjs.com)
- [Jest](https://jestjs.io)

## 💻 Configurando o Ambiente

- Instale o [NVM](https://github.com/nvm-sh/nvm) (Gerenciador de versão do Node)

- Instale o [Docker CLI através do Colima](https://github.com/abiosoft/colima) (Executador de containers com mínimo setup)

  - Observação: Com a alteração dos termos de uso do Docker Desktop aconselhamos o uso do Colima nas máquinas. Qualquer outro executador de containers Docker pode ser utilizado.

## 💻 Clonando o repositório

- Clone o [projeto](https://github.com/MeConta/me-conta-backend)

```bash
git clone https://github.com/MeConta/me-conta-backend
````

## 🏠 Adicionando variáveis de ambiente (.env.local)
Para desenvolvimento local, é necessário criar o arquivo `.env.local` na raiz do projeto e adicionar as variáveis necessárias.

> Preencha os seguintes campos para login como admin no sistema:
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

### 🎲 Banco de dados
- inicie o banco de dados via **docker compose**
```bash
docker compose up -d db
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

## 🧩 Swagger
É possível acessar a documentação da API pelo [Swagger da API](http://localhost:3000/api) e simular os endpoints


## 🔗	 Ambiente de desenvolvimento ###

O ambiente de desenvolvimento está no Heroku, e seguem os links abaixo:

| Backend                                  | Swagger                                  | Frontend                                  | Storybook                                  |
|------------------------------------------|-------------------------------------------|------------------------------------------|-------------------------------------------|
| [Backend](https://me-conta-backend.herokuapp.com)| [Swagger](https://me-conta-backend.herokuapp.com/api)| [Frontend](https://me-conta-frontend.herokuapp.com) | [Storybook](https://me-conta-storybook.herokuapp.com) | 

---

---

## 🐳 Iniciando com o Docker
- Crie o arquivo `.env.local` preenchendo as variáveis faltantes no `.env`
> O `.env` não possuí os dados de **ADMIN** nem **SMTP**
- Se necessário, realize as migrações do banco de dados com o **docker compose**
```bash
docker compose run --rm migration
```
- Inicie o container do docker.
```bash
docker compose run -d api
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado

---

## 🎲 Migrações de banco de dados
- Ao alterar uma entidade é necessário gerar nova migração para o banco de dados
```bash
npm run typeorm:migration:generate [nome da migração]
```
- Se necessário, criar uma migração vazia (caso precise incluir algum dado no banco, por exemplo)
```bash
npm run typeorm:migration:create [nome da migração]
```

- rodar as migrações para efetivar alterações no banco
```bash
npm run typeorm:migration:run
```
---

## 🧪 Testes:
- Testes unitários
```bash
npm run test
```
- Cobertura de testes unitários
```bash
npm run test:cov
```
- Testes e2e
```bash
npm run test:e2e
```
---

## 🚀 Commits no projeto

O projeto possui [husky](https://github.com/typicode/husky) para verificar alguns passos antes de autorizar o commit.

1. Aplicar correções relacionadas à **Lint**;
3. Validação da mensagem de commit conforme as regras do [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/);
  - Padrão utilizado:
  > tipo(#issue): descrição

Exemplo de commit válido:
  ```bash
  git commit -m "feat(#xx): implementa testes unitários"
  ```
## 👣 Check in dance
[Passos](https://github.com/MeConta/me-conta/blob/main/check-in-dance.md) para atualizar as mudanças locais no github 