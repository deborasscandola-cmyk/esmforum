# Planejamento do Processo Ágil e Backlog do Produto — ESM Forum

Este documento formaliza o planejamento do ciclo de desenvolvimento do **ESM Forum**, detalhando o fluxo de trabalho Kanban, o Backlog priorizado do produto, os critérios de aceitação e as estimativas de esforço baseadas em Planning Poker.

---

## 1. Quadro de Acompanhamento (GitHub Projects)

O fluxo de trabalho e o ciclo de vida das funcionalidades são geridos visualmente através do quadro Kanban público:

* **Link do Board no GitHub Projects:** [https://github.com/users/deborasscandola-cmyk/projects/]

---

## 2. Fluxo de Trabalho (Workflow Kanban)

O fluxo adota as seguintes etapas/colunas para garantir visibilidade, controlo do Trabalho em Progresso (WIP) e qualidade na entrega contínua:

1. **Backlog:** Itens priorizados com base no valor de negócio entregue ao utilizador final.
2. **Ready for Dev:** Histórias refinadas com critérios de aceitação claros, prontas para serem puxadas pelos desenvolvedores.
3. **In Progress:** Tarefas ativamente em desenvolvimento (com limite sugerido de WIP para manter o foco).
4. **Code Review:** Código submetido via Pull Request para revisão por pares e validação dos critérios de aceitação antes da integração.
5. **Done:** Funcionalidade testada, integrada na branch principal e validada em ambiente local.

---

## 3. Backlog do Produto: Priorização, Histórias e Critérios de Aceitação

A priorização foi orientada pelo impacto direto na experiência central do fórum (descoberta e organização de conteúdo antes de funcionalidades auxiliares de perfil e notificação).

---

### [US01] Busca de perguntas por palavra-chave
* **Prioridade:** 1 (Alta — Essencial para a usabilidade e navegação básica)
* **Estimativa:** 5 Story Points
* **Descrição:** 
  > Como utilizador do ESM Forum,  
  > Quero pesquisar perguntas através de palavras-chave no título ou conteúdo,  
  > Para encontrar rapidamente tópicos e dúvidas existentes sem ter de percorrer toda a lista.
* **Critérios de Aceitação:**
  * Deve existir uma barra de pesquisa visível na página principal de perguntas.
  * A filtragem deve ocorrer em tempo real ou mediante submissão do formulário de pesquisa.
  * Devem ser retornadas apenas as perguntas cujo título ou descrição contenham os termos pesquisados (sem diferenciação de maiúsculas/minúsculas).
  * Caso não existam resultados compatíveis, deve ser exibida uma mensagem amigável informativa (ex.: *"Nenhuma pergunta encontrada"*).

---

### [US02] Categorização de perguntas (tags)
* **Prioridade:** 2 (Alta — Estruturação do repositório de conhecimento)
* **Estimativa:** 3 Story Points
* **Descrição:** 
  > Como utilizador que submete ou consulta dúvidas,  
  > Quero associar tags (etiquetas) às perguntas e filtrar perguntas por tags,  
  > Para agrupar tópicos relacionados por temas e tecnologias.
* **Critérios de Aceitação:**
  * O formulário de criação de pergunta deve permitir adicionar uma ou mais tags separadas por vírgula.
  * As tags devem ser exibidas visualmente como chips/etiquetas em cada item da listagem.
  * Ao clicar numa tag, o utilizador deve ser redirecionado para a lista de perguntas associadas a essa mesma tag.

---

### [US03] Sistema de votação em perguntas (upvote/downvote)
* **Prioridade:** 3 (Média — Engajamento comunitário e relevância)
* **Estimativa:** 5 Story Points
* **Descrição:** 
  > Como membro da comunidade,  
  > Quero votar positiva ou negativamente nas perguntas,  
  > Para destacar as dúvidas mais relevantes e úteis para a comunidade.
* **Critérios de Aceitação:**
  * Cada pergunta na listagem e na página de detalhes deve apresentar botões de upvote e downvote com o contador total de votos.
  * O contador deve atualizar imediatamente na interface após o registo do voto.
  * Deve existir persistência na base de dados SQLite do total consolidado de votos.

---

### [US04] Perfil de usuário com histórico de perguntas e respostas
* **Prioridade:** 4 (Média — Identidade e acompanhamento de contribuições)
* **Estimativa:** 8 Story Points
* **Descrição:** 
  > Como utilizador registado,  
  > Quero aceder a uma página de perfil pessoal,  
  > Para consultar o histórico consolidado de todas as perguntas que formulei e respostas que publiquei.
* **Critérios de Aceitação:**
  * Deve existir um menu/rota `/perfil` acessível a partir da barra de navegação.
  * A página deve exibir as informações do autor e duas abas/listagens separadas: "Minhas Perguntas" e "Minhas Respostas".
  * Cada item listado deve possuir um link direto para a respetiva página de detalhes da pergunta.

---

### [US05] Notificação de novas respostas
* **Prioridade:** 5 (Baixa — Refinamento de retenção e experiência adicional)
* **Estimativa:** 8 Story Points
* **Descrição:** 
  > Como autor de uma pergunta,  
  > Quero receber uma notificação visual quando outro utilizador responder ao meu tópico,  
  > Para acompanhar as soluções e interagir em tempo oportuno.
* **Critérios de Aceitação:**
  * A barra superior de navegação deve apresentar um ícone de sino com contador numérico de respostas não lidas.
  * Ao clicar no sino, deve abrir-se uma listagem suspensa com as notificações recentes.
  * Clicar numa notificação deve marcar o item como lido e redirecionar para a resposta correspondente.