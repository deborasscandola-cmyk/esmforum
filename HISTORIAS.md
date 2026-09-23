# Histórias de Usuário - ESM Forum

## História 1: Sistema de Votação (Upvote/Downvote)

**Como** usuário do fórum,  
**Eu quero** votar positivamente ou negativamente em perguntas e respostas,  
**Para** destacar o conteúdo mais relevante e de alta qualidade para a comunidade.

**Critérios de Aceitação:**
- [ ] Cada pergunta e resposta deve exibir os botões de upvote (voto positivo) e downvote (voto negativo) com o total consolidado de votos.
- [ ] O usuário deve estar autenticado para conseguir registrar um voto.
- [ ] O usuário pode alterar seu voto (ex: mudar de upvote para downvote) a qualquer momento, atualizando a contagem.
- [ ] O usuário pode cancelar seu voto clicando novamente no mesmo botão já selecionado.
- [ ] O sistema não deve permitir que um usuário vote mais de uma vez simultaneamente no mesmo item.

---

## História 2: Marcação de Melhor Resposta

**Como** autor de uma pergunta,  
**Eu quero** marcar uma das respostas recebidas como a "Melhor Resposta",  
**Para** indicar a solução definitiva do meu problema e ajudar futuros leitores.

**Critérios de Aceitação:**
- [ ] Apenas o autor da pergunta deve visualizar a opção de selecionar a "Melhor Resposta".
- [ ] Apenas uma resposta por pergunta pode ser marcada como a melhor resposta por vez.
- [ ] A resposta marcada como "Melhor Resposta" deve ser fixada no topo da lista de respostas, logo abaixo da pergunta principal.
- [ ] A resposta selecionada deve exibir um selo visual indicativo (ex: ícone de verificação verde).
- [ ] O autor da pergunta pode desmarcar ou alterar a melhor resposta a qualquer momento.

---

## História 3: Categorização por Tags

**Como** usuário do fórum,  
**Eu quero** associar tags (etiquetas) às perguntas ao criá-las,  
**Para** organizar o conteúdo por tópicos de interesse e facilitar a busca por outros usuários.

**Critérios de Aceitação:**
- [ ] Ao criar uma pergunta, o usuário deve ser obrigado a incluir entre 1 e 5 tags.
- [ ] O sistema deve sugerir tags existentes enquanto o usuário digita.
- [ ] Se a tag informada não existir no sistema, ela deve ser criada automaticamente.
- [ ] Cada tag deve ser exibida como um rótulo clicável na visualização da pergunta.
- [ ] Ao clicar em uma tag, o sistema deve redirecionar para uma listagem com todas as perguntas associadas a ela.

---

## Priorização das Histórias

| Ordem de Prioridade | História de Usuário | Justificativa |
| :---: | :--- | :--- |
| **1º** | História 1: Sistema de Votação | **Alta Prioridade**: É o mecanismo central de curadoria da comunidade. Sem votação, o fórum não possui filtro social de qualidade do conteúdo publicado. |
| **2º** | História 2: Marcação de Melhor Resposta | **Média Prioridade**: Resolve diretamente o objetivo de uma plataforma Q&A, indicando se a dúvida foi sanada e valorizando quem respondeu. |
| **3º** | História 3: Categorização por Tags | **Baixa Prioridade**: Funcionalidade de organização e navegação. Importante para escala, mas secundária para o ciclo básico de perguntas e respostas. |
