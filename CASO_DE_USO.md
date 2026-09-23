# Caso de Uso Detalhado - ESM Forum

## Caso de Uso: Votar em Pergunta

**Atores:** Usuário Autenticado

**Pré-condições:**
- O usuário está autenticado no sistema.
- A pergunta na qual o usuário deseja votar está visível na interface.

**Fluxo Principal:**
1. O usuário visualiza uma pergunta na tela e clica no botão de voto ("Upvote" ou "Downvote").
2. O sistema envia a requisição de voto contendo o ID da pergunta, o ID do usuário e o tipo de voto.
3. O sistema valida se o usuário possui sessão ativa válida.
4. O sistema verifica se o usuário é o próprio autor da pergunta.
5. O sistema valida que o usuário não possui voto ativo do mesmo tipo nessa pergunta.
6. O sistema registra o novo voto no banco de dados.
7. O sistema recalcula a pontuação total da pergunta.
8. O sistema atualiza o contador de votos na interface gráfica para o usuário.
9. O sistema destaca visualmente o botão do voto selecionado.

**Fluxo Alternativo 1: Troca de Voto**
- 5a. O sistema detecta que o usuário já possui um voto do tipo oposto registrado para esta pergunta (ex: tinha dado *downvote* e clicou em *upvote*).
- 5b. O sistema atualiza o registro do voto existente no banco de dados para o novo tipo.
- 5c. O sistema recalcula a pontuação total ajustando o valor proporcionalmente (+2 ou -2 pontos).
- 5d. O sistema atualiza a interface destacando o novo botão e removendo o destaque do anterior.
- 5e. O fluxo retorna ao passo 8 do Fluxo Principal.

**Fluxo Alternativo 2: Cancelamento de Voto**
- 5a. O sistema detecta que o usuário clicou no mesmo botão de voto que já estava ativo (ex: *upvote* em uma pergunta que ele já tinha dado *upvote*).
- 5b. O sistema remove o registro do voto no banco de dados.
- 5c. O sistema decrementa ou incrementa a pontuação para anular o voto anterior.
- 5d. O sistema remove o destaque visual do botão.
- 5e. O caso de uso é encerrado.

**Fluxo de Exceção 1: Usuário tenta votar na própria pergunta**
- 4a. O sistema identifica que o ID do autor da pergunta é igual ao ID do usuário logado.
- 4b. O sistema impede o registro do voto.
- 4c. O sistema exibe uma mensagem de aviso: "Você não pode votar em suas próprias perguntas."
- 4d. O caso de uso é encerrado sem alterações no banco de dados.

**Pós-condições:**
- A pontuação total da pergunta é atualizada corretamente e visível para a comunidade.
- O estado do voto do usuário fica persistido para acessos futuros.
