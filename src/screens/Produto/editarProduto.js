import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

import { produtoRep } from '../../api/produtoRep.js';

export default function ProdutoScreenEditar() {

  const route = useRoute();
  const navigation = useNavigation();

  const [idProduto, setIdProduto] = useState(null);
  const [nomeProduto, setNomeProduto] = useState('');
  const [valorProduto, setValorProduto] = useState('');

  useEffect(() => {

    if (route.params) {

      setIdProduto(route.params.Id);
      setNomeProduto(route.params.NomeProduto);
      setValorProduto(String(route.params.Valor));

    }

  }, [route.params]);

  async function salvar() {

    if (!nomeProduto || nomeProduto.trim().length < 3) {
      Alert.alert(
        'Atenção',
        'Informe corretamente o nome do produto'
      );
      return;
    }

    if (!valorProduto || Number(valorProduto) <= 0) {
      Alert.alert(
        'Atenção',
        'Informe um valor válido'
      );
      return;
    }

    if (!idProduto || idProduto <= 0) {
      Alert.alert(
        'Atenção',
        'ID do produto inválido'
      );
      return;
    }

    try {

      const resultado = await produtoRep.update({
        id: idProduto,
        nome: nomeProduto,
        valor: Number(valorProduto)
      });

      console.log(resultado);

      navigation.goBack();

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível atualizar o produto'
      );
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Editar Produto
      </Text>

      <StatusBar style="auto" />

      <TextInput
        value={idProduto ? String(idProduto) : ''}
        // Converte texto digitado para número
        onChangeText={(text) => setIdProduto(Number(text))}
        style={styles.input}
      />

      <TextInput
        placeholder="Digite o nome do produto"
        value={nomeProduto}
        onChangeText={setNomeProduto}
        style={styles.input}
      />

      <TextInput
        placeholder="Digite o valor"
        value={valorProduto}
        keyboardType="numeric"
        style={styles.input}
        onChangeText={(text) => {

          const cleaned =
            text.replace(/[^0-9.]/g, '');

          const parts = cleaned.split('.');

          if (parts.length > 2) return;

          setValorProduto(cleaned);
        }}
      />

      <View style={styles.actions}>

        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={salvar}
        >
          <Text style={{ color: '#fff' }}>
            Salvar
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  titulo: {
    marginTop: 25,
    marginBottom: 25,
    fontSize: 18,
    fontWeight: 'bold',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    width: '95%',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginLeft: 8,
  },

  cancelButton: {
    backgroundColor: '#eee',
  },

  saveButton: {
    backgroundColor: '#4CAF50',
  },
});