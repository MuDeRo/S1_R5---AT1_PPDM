import api from "./api.js";
import axios from "axios";

export const categoriaRep = {


    async findAll() { 
        try {
            const response = await api.get('/categorias');
            return response.data.resultado;
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
            throw error;
        }
    },

    async create(nomeCategoria) {
        try {
            const response = await api.post('/categorias', { nome: nomeCategoria, descricao: 'teste padrao' });
            return response.data;

        } catch (error) {
            console.error('Erro ao criar categoria:', error);
            throw error;
        }
    },

    async update(categoria) {
        try {

            const response = await api.put( //recebe o objeto categoria com nome e id
                '/categorias',
                {
                    nome: categoria.nome,
                    descricao: 'teste padrao'
                },
                {
                    params: {
                        id: categoria.id
                    }
                }
            );

            return response.data;

        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
            throw error;
        }
    },

    async delete(idCategoria) {
        try {
            const response = await api.delete(`/categorias/${idCategoria}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar categoria:', error);
            throw error;
        }
    }


};