# Guia de Instalação e Execução — ESM Forum

Este documento descreve os passos para instalar e executar localmente o ambiente de desenvolvimento do **ESM Forum** (Backend Node.js/Express/SQLite e Frontend React).

---

## 1. Pré-requisitos
* Node.js (versão LTS) e npm instalados.
* Git configurado.
* PowerShell com permissão de execução de scripts habilitada na sessão (`Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`).

---

## 2. Configuração do Backend (`esmforum`)

1. Clonar o repositório a partir do fork:
   ```bash
   git clone [https://github.com/deborasscandola-cmyk/esmforum.git](https://github.com/deborasscandola-cmyk/esmforum.git)
   cd esmforum