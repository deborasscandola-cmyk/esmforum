class VotoService {
    constructor(votoRepository) {
        if (!votoRepository) {
            throw new Error('votoRepository é obrigatório (DIP)');
        }
        this.votoRepository = votoRepository;
    }

    async processarVoto({ usuarioId, perguntaId, tipo }) {
        const TIPO_UPVOTE = 'UPVOTE';
        const TIPO_DOWNVOTE = 'DOWNVOTE';

        if (![TIPO_UPVOTE, TIPO_DOWNVOTE].includes(tipo)) {
            throw new Error('Tipo de voto inválido.');
        }

        const pergunta = await this.votoRepository.buscarPergunta(perguntaId);
        if (!pergunta) {
            throw new Error('Pergunta não encontrada.');
        }

        // Regra de domínio: autor não pode votar na própria publicação
        if (pergunta.usuario_id === usuarioId) {
            throw new Error('Não é permitido votar na sua própria publicação.');
        }

        const votoExistente = await this.votoRepository.buscarVoto(usuarioId, perguntaId);

        // Caso 1: Primeiro voto
        if (!votoExistente) {
            await this.votoRepository.criarVoto(usuarioId, perguntaId, tipo);
            const delta = tipo === TIPO_UPVOTE ? 1 : -1;
            await this.votoRepository.atualizarPontuacaoPergunta(perguntaId, delta);
            return { acao: 'REGISTRADO', tipo, delta };
        }

        // Caso 2: Cancelamento (clicou no mesmo tipo de voto ativo)
        if (votoExistente.tipo === tipo) {
            await this.votoRepository.removerVoto(votoExistente.id);
            const delta = tipo === TIPO_UPVOTE ? -1 : 1;
            await this.votoRepository.atualizarPontuacaoPergunta(perguntaId, delta);
            return { acao: 'CANCELADO', tipo: null, delta };
        }

        // Caso 3: Troca de voto (Upvote para Downvote ou vice-versa)
        await this.votoRepository.atualizarTipoVoto(votoExistente.id, tipo);
        const delta = tipo === TIPO_UPVOTE ? 2 : -2;
        await this.votoRepository.atualizarPontuacaoPergunta(perguntaId, delta);
        return { acao: 'ALTERADO', tipo, delta };
    }
}

module.exports = VotoService;
