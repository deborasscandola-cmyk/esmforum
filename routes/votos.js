const express = require('express');
const router = express.Router();
const VotoRepository = require('../repositories/VotoRepository');
const VotoService = require('../services/VotoService');
const db = require('../bd/conexao');

// Injeção de dependência explícita
const votoRepository = new VotoRepository(db);
const votoService = new VotoService(votoRepository);

router.post('/perguntas/:id/voto', async (req, res) => {
    try {
        const perguntaId = parseInt(req.params.id, 10);
        const { tipo } = req.body;
        const usuarioId = req.usuario ? req.usuario.id : req.body.usuarioId;

        if (!usuarioId) {
            return res.status(401).json({ erro: 'Usuário não autenticado.' });
        }

        const resultado = await votoService.processarVoto({
            usuarioId,
            perguntaId,
            tipo
        });

        return res.status(200).json({
            sucesso: true,
            mensagem: `Voto processado com sucesso: ${resultado.acao}`,
            dados: resultado
        });
    } catch (erro) {
        if (erro.message.includes('Não é permitido')) {
            return res.status(403).json({ erro: erro.message });
        }
        if (erro.message.includes('não encontrada')) {
            return res.status(404).json({ erro: erro.message });
        }
        return res.status(400).json({ erro: erro.message });
    }
});

module.exports = router;
