import api from "./api.js";
import axios from "axios";

export const produtoRep = {


    async findAll() {
        try {
            const response = await api.get('/produtos');


            return response.data.resultado;

        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            throw error;
        }
    },

    async create(categoriaId, nomeProduto, valorProduto, imagem) {

        try {

            const formData = new FormData();

            formData.append('idCategoria', String(categoriaId));
            formData.append('nome', nomeProduto);
            formData.append('valor', String(valorProduto));

            formData.append('image', {
                uri: imagem.uri,
                name: imagem.fileName || 'produto.jpg',
                type: imagem.mimeType || 'image/jpeg'
            });

            const response = await api.post(
                '/produtos',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            return response.data;

        } catch (error) {
            console.error('Erro ao criar produto:', error);
            throw error;
        }
    },

    async update(produto) {
        try {
            const response = await api.put( //recebe o objeto categoria com nome e id
                '/produtos',
                {
                    nome: produto.nome,
                    valor: produto.valor
                },
                {
                    params: {
                        id: produto.id
                    }
                }
            ); 

            return response.data;
        
        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
            throw error;
        }
    },

    async delete(idProduto) {
        try {
            const response = await api.delete(`/produtos/${idProduto}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            throw error;
        }
    }
}