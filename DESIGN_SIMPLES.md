# Prática XP: Design Simples — ESM Forum

Este documento descreve a aplicação do princípio de **Design Simples** no desenvolvimento do projeto **ESM Forum**, alinhado com as práticas da Programação Extrema (XP).

---

## 1. Critérios de Design Simples Aplicados

O código implementado e refatorado no projeto cumpre os quatro critérios fundamentais de design simples, ordenados por prioridade:

1. **Passa em todos os testes:** O código cumpre estritamente os requisitos funcionais propostos, garantindo a integridade das rotas de perguntas e respostas.
2. **Não contém duplicação (DRY - Don't Repeat Yourself):** Lógicas repetidas de acesso à base de dados foram centralizadas em funções utilitárias ou módulos dedicados.
3. **Expressa a intenção do programador:** Nomes de variáveis, funções e rotas (`/perguntas`, `/respostas`) são claros e autoexplicativos, reduzindo a necessidade de comentários excessivos.
4. **Mínimo de classes e métodos (YAGNI - You Aren't Gonna Need It):** Evitou-se a implementação antecipada de frameworks complexos ou camadas de abstração desnecessárias, focando estritamente na simplicidade da arquitetura Node.js com Express e SQLite.

---

## 2. Oportunidades de Refatoração Identificadas

* **Separação de Responsabilidades:** Isolar as consultas SQL dos controladores de rotas, movendo-as para uma camada de repositório dedicada à medida que a aplicação crescer.
* **Validação de Entradas:** Introduzir um middleware simples de validação para garantir que os campos obrigatórios de perguntas e respostas não sejam submetidos vazios.