# 💬 Me Conta

## ✳️ Sobre
O Me Conta é uma plataforma que une jovens que buscam terapia a profissionais de Psicologia

## 🛠 Ferramentas Utilizadas
- [Node](https://nodejs.dev)
- [NestJS](https://nestjs.com)
- [Jest](https://jestjs.io)

## 💻 Configurando o Ambiente

- Instale o [Node](https://nodejs.org/en/download/)

- Instale o [docker](https://www.docker.com)

- Clone o [monorepo](https://github.com/MeConta/me-conta) do projeto utilizando [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
```bash
git clone --recursive https://github.com/MeConta/me-conta.git
````
- inicie o banco de dados via **docker compose**
```bash
docker compose up -d db
```
- Vá para o repositório do backend
```bash
cd backend
```
- Execute o comando **npm install**:
```bash
npm i
```
- Faça build do projeto
```bash
npm run build
```
- Rode a migração do banco de dados (não obrigatório, mas iniciará o banco de dados com algumas informações)
```bash
npm run typeorm:migration:run
```

## ▶️ Executando o projeto
- Inicie o **Nest** em modo de desenvolvimento (live reload)
```bash
npm run start:dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado

## 🪑 Migrações de banco de dados
- Ao alterar uma entidade é necessário gerar nova migração para o banco de dados
```bash
npm run typeorm:migration:generate [nome da migração]
```
- Se necessário, criar uma migração vazia (caso precise incluir algum dado no banco, por exemplo)
```bash
npm run typeorm:migration:create [nome da migração]
```
- compilar o projeto antes de executar as migrações
```bash
npm run build
```
- rodar as migrações para efetivar no banco
```bash
npm run typeorm:migration:run
```

## 🧪 Testes:
- Testes unitários
```bash
npm run test
```
- Cobertura de testes unitários
```
bash
npm run test:cov
```
- Testes e2e
```bash
npm run test:e2e
```
---

## 🚀 Contribuindo com o projeto

Foi adicionado ao projeto o [husky](https://github.com/typicode/husky) para verificar alguns passos antes de autorizar o commit.

1. Aplicar correções relacionadas à Lint;
3. Validação da mensagem de commit conforme as regras do [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/);
  - Padrão utilizado:
  ```bash
  tipo(#issue-github): descrição
  ```

  > Exemplo de commit válido:
  ```bash
  git commit -m"feat(#18): implementa testes unitários"
  ```
