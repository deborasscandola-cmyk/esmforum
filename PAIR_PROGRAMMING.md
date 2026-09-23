# Prática XP: Pair Programming (Programação em Par) — ESM Forum

Este documento relata a aplicação da prática de **Pair Programming** no desenvolvimento das funcionalidades e configuração do projeto **ESM Forum**.

---

## 1. Definição dos Papéis

Durante as sessões de desenvolvimento, foram adotados os dois papéis clássicos do Extreme Programming:

* **Piloto (Driver):** Responsável por escrever o código, interagir com o editor e o terminal, implementar a lógica imediata e garantir a execução sintática dos comandos.
* **Copiloto (Navigator):** Responsável por rever o código em tempo real, identificar erros de compatibilidade de bibliotecas, propor refatorações e assegurar o cumprimento dos critérios de aceitação e dos princípios de Design Simples.

Os papéis foram alternados periodicamente para manter o alinhamento técnico e a partilha constante de contexto sobre o repositório.

---

## 2. Ferramentas e Dinâmica de Colaboração

* **Ambiente de Trabalho:** Utilização do Visual Studio Code com suporte para partilha remota em tempo real via **VS Code Live Share**.
* **Comunicação:** Sessões síncronas de discussão arquitetural antes da escrita de código, garantindo consenso prévio sobre a estrutura das rotas e a persistência na base de dados SQLite.
* **Benefícios Observados:** Resolução imediata de conflitos de dependências nativas (ex.: atualização do `better-sqlite3`), redução de retrabalho e validação contínua da integração entre backend e frontend.