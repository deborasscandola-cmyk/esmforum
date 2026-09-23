# Implementação com Princípios SOLID - ESM Forum

## 1. Funcionalidade Implementada
Foi implementado o mecanismo de **Sistema de Votação (Upvote / Downvote)** em perguntas, contemplando:
- Registro de novos votos (+1 ou -1)
- Cancelamento de voto existente ao clicar repetidamente no mesmo botão
- Alternância de voto (de Downvote para Upvote compensando 2 pontos, e vice-versa)
- Regra de exceção impedindo auto-voto (o autor não vota na própria publicação)

---

## 2. Aplicação dos Princípios SOLID

### Single Responsibility Principle (SRP)
A implementação foi desacoplada em três camadas com responsabilidades únicas:
- **`routes/votos.js`**: Responsável exclusivamente pela interface de transporte HTTP (extração de parâmetros e serialização de respostas e códigos de status).
- **`services/VotoService.js`**: Centraliza estritamente as regras de negócio e cálculo de domínios da votação.
- **`repositories/VotoRepository.js`**: Cuida unicamente das consultas e persistência direta na base de dados.

### Dependency Inversion Principle (DIP)
O serviço de domínio `VotoService` não instancia conexões com a base de dados nem depende de implementações concretas de baixo nível. O repositório é injetado via construtor:
- Permite substituir a persistência por mocks para testes automatizados.
- Desacopla o núcleo da aplicação da biblioteca de base de dados.

### Open/Closed Principle (OCP)
A estrutura do serviço de votação foi concebida para suportar extensões sem necessitar de alteração do seu núcleo operacional. A adição de novas entidades votáveis (respostas ou comentários) ou de novos pesos de voto (por reputação de utilizador) é feita estendendo os métodos do repositório e regras polimórficas sem alterar o fluxo base do serviço.
