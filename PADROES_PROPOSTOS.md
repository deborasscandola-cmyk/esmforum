# Proposta de Aplicação de Padrões de Projeto - ESM Forum

Este documento apresenta propostas detalhadas de aplicação de três padrões de projeto orientados a objetos (um Comportamental, um Estrutural/Comportamental e um Criacional), acompanhados da respetiva justificação, diagramas UML em Mermaid e exemplos práticos de implementação.

---

## Padrão 1: Observer (Comportamental)

### a) Justificativa e Contexto
* **Funcionalidade:** Sistema de Notificações em Tempo Real (Funcionalidade 5 da Parte 1).
* **Problema a Resolver:** Quando uma nova resposta é submetida ou uma pergunta é marcada como melhor resposta, múltiplos interessados precisam de ser notificados (o autor da pergunta, utilizadores inscritos no tópico e o sistema de métricas), sem que o serviço de criação de respostas fique fortemente acoplado a esses serviços externos.
* **Por que é adequado:** O padrão Observer estabelece uma dependência de um-para-muitos, permitindo que o sujeito (`NotificationPublisher`) notifique múltiplos observadores (`InAppNotificationObserver`, `EmailNotificationObserver`) sem conhecer as suas implementações concretas, respeitando o princípio Open/Closed.

### b) Proposta de Solução
* **Classes e Papéis:**
  * `ISubject`: Interface com as operações de subscrição (`attach`, `detach`) e notificação (`notify`).
  * `NotificationPublisher`: Implementação concreta do sujeito que gere os subscritores e despacha eventos.
  * `IObserver`: Interface comum que define o método `update(event, payload)`.
  * `InAppNotificationObserver`: Observador que grava a notificação na base de dados para leitura na aplicação web.
  * `EmailNotificationObserver`: Observador que formata e despacha notificações para o serviço de e-mail.

#### Diagrama de Classes UML:
```mermaid
classDiagram
    class ISubject {
        <<interface>>
        +attach(observer: IObserver)
        +detach(observer: IObserver)
        +notify(event: String, payload: Object)
    }

    class NotificationPublisher {
        -observers: List~IObserver~
        +attach(observer: IObserver)
        +detach(observer: IObserver)
        +notify(event: String, payload: Object)
    }

    class IObserver {
        <<interface>>
        +update(event: String, payload: Object)
    }

    class InAppNotificationObserver {
        -notificationRepo
        +update(event: String, payload: Object)
    }

    class EmailNotificationObserver {
        -mailerService
        +update(event: String, payload: Object)
    }

    ISubject <|.. NotificationPublisher
    IObserver <|.. InAppNotificationObserver
    IObserver <|.. EmailNotificationObserver
    NotificationPublisher o--> IObserver
c) Exemplo de Código
class NotificationPublisher {
    constructor() {
        this.observers = [];
    }

    attach(observer) {
        this.observers.push(observer);
    }

    detach(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(evento, dados) {
        for (const observer of this.observers) {
            observer.update(evento, dados);
        }
    }
}

class InAppNotificationObserver {
    constructor(notificacaoRepo) {
        this.repo = notificacaoRepo;
    }

    async update(evento, dados) {
        if (evento === 'NOVA_RESPOSTA') {
            await this.repo.criar({
                usuarioId: dados.autorPerguntaId,
                mensagem: `A sua pergunta recebeu uma nova resposta de ${dados.autorRespostaNome}.`
            });
        }
    }
}
Padrão 2: Strategy (Comportamental)
a) Justificativa e Contexto
Funcionalidade: Sistema de Reputação e Cálculo de Pontuação (Funcionalidade 4 da Parte 1).

Problema a Resolver: Diferentes ações no fórum atribuem pontos com regras distintas: receber um upvote em pergunta vale 10 pontos, downvote penaliza em 2 pontos, e ter uma resposta aceite como melhor resposta confere 15 pontos de reputação. Novas campanhas ou níveis de privilégio podem alterar essas regras.

Por que é adequado: Evita estruturas condicionais extensas (switch/case ou sequências de if/else) no serviço de domínio. Cada algoritmo de cálculo de pontuação fica isolado na sua própria classe intercambiável em tempo de execução.

b) Proposta de Solução
Classes e Papéis:

IReputationStrategy: Interface com a operação comum calculate(contextData).

QuestionUpvoteStrategy: Estratégia concreta para votos positivos em perguntas (+10 pontos).

AnswerUpvoteStrategy: Estratégia concreta para votos positivos em respostas (+10 pontos).

BestAnswerStrategy: Estratégia para bonificação de melhor resposta (+15 pontos).

ReputationEngine: Contexto que recebe a estratégia selecionada e aplica a pontuação no repositório de utilizadores.

Diagrama de Classes UML:
Padrão 2: Strategy (Comportamental)
a) Justificativa e Contexto
Funcionalidade: Sistema de Reputação e Cálculo de Pontuação (Funcionalidade 4 da Parte 1).

Problema a Resolver: Diferentes ações no fórum atribuem pontos com regras distintas: receber um upvote em pergunta vale 10 pontos, downvote penaliza em 2 pontos, e ter uma resposta aceite como melhor resposta confere 15 pontos de reputação. Novas campanhas ou níveis de privilégio podem alterar essas regras.

Por que é adequado: Evita estruturas condicionais extensas (switch/case ou sequências de if/else) no serviço de domínio. Cada algoritmo de cálculo de pontuação fica isolado na sua própria classe intercambiável em tempo de execução.

b) Proposta de Solução
Classes e Papéis:

IReputationStrategy: Interface com a operação comum calculate(contextData).

QuestionUpvoteStrategy: Estratégia concreta para votos positivos em perguntas (+10 pontos).

AnswerUpvoteStrategy: Estratégia concreta para votos positivos em respostas (+10 pontos).

BestAnswerStrategy: Estratégia para bonificação de melhor resposta (+15 pontos).

ReputationEngine: Contexto que recebe a estratégia selecionada e aplica a pontuação no repositório de utilizadores.

Diagrama de Classes UML:
classDiagram
    class IReputationStrategy {
        <<interface>>
        +calculate(dados: Object) int
    }

    class QuestionUpvoteStrategy {
        +calculate(dados: Object) int
    }

    class AnswerUpvoteStrategy {
        +calculate(dados: Object) int
    }

    class BestAnswerStrategy {
        +calculate(dados: Object) int
    }

    class ReputationEngine {
        -usuarioRepo
        +aplicarPontuacao(usuarioId: int, strategy: IReputationStrategy, dados: Object)
    }

    IReputationStrategy <|.. QuestionUpvoteStrategy
    IReputationStrategy <|.. AnswerUpvoteStrategy
    IReputationStrategy <|.. BestAnswerStrategy
    ReputationEngine --> IReputationStrategy
c) Exemplo de Código
class QuestionUpvoteStrategy {
    calculate() {
        return 10;
    }
}

class BestAnswerStrategy {
    calculate() {
        return 15;
    }
}

class ReputationEngine {
    constructor(usuarioRepository) {
        this.usuarioRepo = usuarioRepository;
    }

    async aplicarPontuacao(usuarioId, strategy, dados = {}) {
        const deltaPontos = strategy.calculate(dados);
        await this.usuarioRepo.incrementarReputacao(usuarioId, deltaPontos);
        return deltaPontos;
    }
}
Padrão 3: Factory Method (Criacional)
a) Justificativa e Contexto
Funcionalidade: Categorização e Criação de Publicações (Perguntas, Respostas e Comentários).

Problema a Resolver: Todos os conteúdos do fórum partilham atributos base (autor, texto, data de criação), mas exigem validações e estruturas distintas: perguntas exigem título e tags obrigatórias; respostas exigem associação ao ID da pergunta correspondente; comentários exigem limites restritos de carateres.

Por que é adequado: Encapsula e centraliza a lógica de instanciação e validação prévia de cada tipo de publicação, desacoplando os controladores das regras de criação de cada subtipo de postagem.

b) Proposta de Solução
Classes e Papéis:

Post: Classe base com propriedades partilhadas e método abstrato validar().

QuestionPost, AnswerPost: Subclasses com regras e atributos específicos.

PostFactory: Classe abstrata que define o método fábrica createPost(tipo, dados).

CommunityPostFactory: Fábrica concreta que valida e devolve a instância apropriada conforme o tipo especificado.

Diagrama de Classes UML:
classDiagram
    class Post {
        <<abstract>>
        +id: int
        +autorId: int
        +corpo: String
        +dataCriacao: Date
        +validar()*
    }

    class QuestionPost {
        +titulo: String
        +tags: List~String~
        +validar()
    }

    class AnswerPost {
        +perguntaId: int
        +validar()
    }

    class PostFactory {
        <<abstract>>
        +createPost(tipo: String, dados: Object) Post*
    }

    class CommunityPostFactory {
        +createPost(tipo: String, dados: Object) Post
    }

    Post <|-- QuestionPost
    Post <|-- AnswerPost
    PostFactory <|-- CommunityPostFactory
    CommunityPostFactory ..> Post : instancia
c) Exemplo de Código
class PostFactory {
    createPost(tipo, dados) {
        throw new Error('Método createPost() deve ser implementado pelas subclasses.');
    }
}

class CommunityPostFactory extends PostFactory {
    createPost(tipo, dados) {
        switch (tipo) {
            case 'QUESTION':
                if (!dados.titulo || !dados.tags || dados.tags.length === 0) {
                    throw new Error('Perguntas requerem título e pelo menos uma tag.');
                }
                return { tipo: 'QUESTION', ...dados, criadoEm: new Date() };

            case 'ANSWER':
                if (!dados.perguntaId) {
                    throw new Error('Respostas requerem a referência à pergunta.');
                }
                return { tipo: 'ANSWER', ...dados, criadoEm: new Date() };

            default:
                throw new Error(`Tipo de publicação desconhecido: ${tipo}`);
        }
    }
}
