# Padrões de Projeto Existentes no ESM Forum

## 1. Padrão Front Controller / Router (Arquitetural / GoF Comportamental)
* **Onde está aplicado:** Diretoria `routes/` (ex.: `routes/perguntas.js`, `routes/respostas.js`, `routes/usuarios.js`) e no ponto de entrada `server.js` / `app.js`.
* **Descrição no Sistema:** O Express centraliza o recebimento de todos os pedidos HTTP numa única rota principal e despacha a execução para manipuladores específicos com base no verbo HTTP (GET, POST, etc.) e na URI solicitada.
* **Avaliação da Implementação:** Está implementado de forma funcional através do `express.Router()`. Contudo, poderia ser melhorado isolando as funções de callback em classes de controlo dedicadas (`Controllers`), evitando misturar validação de dados de entrada com despacho de rotas.

---

## 2. Padrão Chain of Responsibility (GoF Comportamental)
* **Onde está aplicado:** Mecanismo de Middlewares do Express (`app.use()`, `authMiddleware`, tratamento de CORS e analisadores de JSON).
* **Descrição no Sistema:** Os pedidos HTTP atravessam uma cadeia sequencial de funções intermediárias antes de atingirem o manipulador final da rota. Cada middleware pode processar a requisição, rejeitá-la (ex.: retornar HTTP 401 por falta de autenticação) ou passá-la ao próximo elo da cadeia através da invocação de `next()`.
* **Avaliação da Implementação:** Implementação idiomática e robusta do ecossistema Node.js. Facilita o desacoplamento de responsabilidades transversais, como autorização, registo de logs e tratamento global de exceções.

---

## 3. Padrão Data Mapper / Active Record Simplificado (Padrão de Dados / GoF Estrutural)
* **Onde está aplicado:** Diretoria `models/` (ex.: `models/Pergunta.js`, `models/Resposta.js`).
* **Descrição no Sistema:** As classes representam entidades do domínio de perguntas e respostas e contêm métodos estáticos (`buscarPorId`, `listar`, `criar`) que mapeiam registos relacionais da base de dados para objetos JavaScript consumíveis pela aplicação.
* **Avaliação da Implementação:** Implementação parcial. Atualmente, os métodos estáticos acoplam a execução de queries SQL concretas diretamente ao modelo de domínio, sem uma interface abstrata de repositório (Repository Pattern), o que dificulta a realização de testes unitários isolados com recurso a mocks.
