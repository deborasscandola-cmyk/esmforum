class VotoRepository {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async buscarVoto(usuarioId, perguntaId) {
        const [rows] = await this.db.query(
            'SELECT * FROM votos WHERE usuario_id = ? AND pergunta_id = ?',
            [usuarioId, perguntaId]
        );
        return rows ? rows[0] : null;
    }

    async criarVoto(usuarioId, perguntaId, tipo) {
        const [resultado] = await this.db.query(
            'INSERT INTO votos (usuario_id, pergunta_id, tipo, data_voto) VALUES (?, ?, ?, NOW())',
            [usuarioId, perguntaId, tipo]
        );
        return resultado.insertId;
    }

    async atualizarTipoVoto(votoId, novoTipo) {
        await this.db.query('UPDATE votos SET tipo = ? WHERE id = ?', [novoTipo, votoId]);
    }

    async removerVoto(votoId) {
        await this.db.query('DELETE FROM votos WHERE id = ?', [votoId]);
    }

    async atualizarPontuacaoPergunta(perguntaId, variacao) {
        await this.db.query(
            'UPDATE perguntas SET pontuacao = pontuacao + ? WHERE id = ?',
            [variacao, perguntaId]
        );
    }

    async buscarPergunta(perguntaId) {
        const [rows] = await this.db.query('SELECT * FROM perguntas WHERE id = ?', [perguntaId]);
        return rows ? rows[0] : null;
    }
}

module.exports = VotoRepository;
