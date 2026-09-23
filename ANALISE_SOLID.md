# Análise de Princípios SOLID no Código Existente - ESM Forum

## a) Pontos Positivos: Aderência aos Princípios SOLID

### 1. Separação de Rotas e Persistência (Single Responsibility Principle - SRP)
* **Módulo/Trecho:** Divisão estrutural entre `routes/perguntas.js` e `models/Pergunta.js`.
* **Princípio:** **SRP (Single Responsibility Principle)**.
* **Justificativa:** As rotas do Express em `routes/perguntas.js` limitam-se a capturar as requisições HTTP, validar parâmetros de entrada (`req.params`, `req.body`) e devolver a resposta adequada (`res.status(200).json(...)`). A execução de queries e persistência direta são delegadas aos métodos do modelo `Pergunta`. Desta forma, mudanças de protocolo HTTP não afetam a persistência, e alterações no schema do banco não afetam as assinaturas das rotas.

### 2. Funções Especializadas de Busca no Modelo (Interface Segregation Principle - ISP)
* **Módulo/Trecho:** Métodos de consulta granulares em `models/Pergunta.js` (`getPerguntaById`, `listarPerguntasRecentes`).
* **Princípio:** **ISP (Interface Segregation Principle)**.
* **Justificativa:** Em vez de expor uma interface monolítica ou genérica que obrigue os consumidores a passar múltiplos parâmetros nulos ou filtros desnecessários, o modelo expõe funções específicas e enxutas para cada necessidade dos controladores.

### 3. Middleware de Autenticação Desacoplado (Open/Closed Principle - OCP)
* **Módulo/Trecho:** Interceptadores de sessão/token aplicados nas rotas privadas (`authMiddleware`).
* **Princípio:** **OCP (Open/Closed Principle)**.
* **Justificativa:** O comportamento de autorização e proteção das rotas é estendido através do encadeamento de middlewares do Express, sem necessidade de modificar a lógica interna dos manipuladores de rota (`handlers`). Se o mecanismo de autenticação mudar (ex.: cookies para JWT), as rotas permanecem fechadas para modificação e abertas para extensão.

---

## b) Oportunidades de Melhoria: Violações aos Princípios SOLID

### 1. Acoplamento Direto da Conexão da Base de Dados nos Modelos (Violação do DIP)
* **Trecho Analisado:** `models/Pergunta.js` e `models/Resposta.js` importando diretamente a instância concreta do cliente de base de dados:
```javascript
const db = require('../bd/conexao'); // Dependência concreta direta

class Pergunta {
    static async buscarPorId(id) {
        return await db.query('SELECT * FROM perguntas WHERE id = ?', [id]);
    }
}
Princípio Violado: DIP (Dependency Inversion Principle).

Diagnóstico e Melhoria: O módulo de domínio (Pergunta) depende diretamente de um detalhe de infraestrutura (db/conexao). Isso impede a realização de testes unitários isolados com mocks e acopla a aplicação a um driver específico.

Solução: Aplicar a inversão de dependência através de injeção de dependência via construtor ou fábrica (Repository Pattern), fazendo com que o modelo dependa de uma interface ou contrato abstrato de repositório (IPerguntaRepository).

2. Regras de Negócio e Validações Embutidas na Rota (Violação do SRP)
Trecho Analisado: Manipuladores em routes/respostas.js executando validação de regras de domínio diretamente no callback do Express:
router.post('/perguntas/:id/respostas', async (req, res) => {
    const { conteudo, usuarioId } = req.body;
    if (!conteudo || conteudo.length < 10) {
        return res.status(400).json({ erro: 'Conteúdo deve ter ao menos 10 caracteres' });
    }
    const pergunta = await Pergunta.buscarPorId(req.params.id);
    if (pergunta.fechada) {
        return res.status(400).json({ erro: 'Pergunta fechada para respostas' });
    }
    const novaResposta = await Resposta.criar({ conteudo, usuarioId, perguntaId: req.params.id });
    res.status(201).json(novaResposta);
});
Princípio Violado: SRP (Single Responsibility Principle).

Diagnóstico e Melhoria: A rota acumula três responsabilidades distintas: serialização e transporte HTTP, regras de domínio do negócio (verificar se a pergunta aceita respostas e validar tamanho) e orquestração de persistência.

Solução: Extrair uma camada de serviço especializada (RespostaService), deixando a rota responsável estritamente por receber o pedido HTTP e mapear a resposta final.
