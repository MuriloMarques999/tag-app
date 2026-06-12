import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { styles } from './dashboard2';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { SetStateAction, useState, useEffect } from 'react';
import api from '../api';

export default function NovoAgendamento() {

  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('Prioridade');

  const [refLote, setRefLote] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [tipo, setTipo] = useState('');
  const [operatorName, setOperatorName] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<any[]>([]);

  const priorities = ['Alta', 'Média', 'Baixa'];

  useEffect(() => {
    (async () => {
      try {
        const tagsData = await api.getTags();
        if (Array.isArray(tagsData)) setTags(tagsData);
      } catch (err) {}
    })();
  }, []);

  const handlePrioritySelect = (priority: SetStateAction<string>) => {
    setSelectedPriority(priority);
    setShowDropdown(false);
  };

  const handleConfirm = async () => {
    if (!refLote || !quantidade || !operatorName) {
      Alert.alert('Erro', 'Preencha a referência, quantidade e o nome do operador.');
      return;
    }
    setLoading(true);
    try {
      // Usar a primeira tag disponível ou mock tag_id 1
      const tagId = tags.length > 0 ? tags[0].tag_id : 1;
      
      const res = await api.createRequest({
        reference_code: refLote,
        custom_operator_name: operatorName,
        items: [{ tag_id: tagId, quantity_requested: parseInt(quantidade) || 1 }]
      });

      if (res && res.request_id) {
        Alert.alert('Sucesso', 'Lote criado com sucesso!');
        router.push('/dashboard3');
      } else {
        Alert.alert('Erro', res.message || 'Falha ao criar lote');
      }
    } catch (e) {
      Alert.alert('Erro', 'Ocorreu um erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>{'‹'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Novo agendamento</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>

        <TextInput
          style={styles.input}
          placeholder="Ref. Lote: ETQ123"
          placeholderTextColor="#555"
          value={refLote}
          onChangeText={setRefLote}
        />

        <TextInput
          style={styles.input}
          placeholder="Quantidade:"
          placeholderTextColor="#555"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={setQuantidade}
        />

        <TextInput
          style={styles.input}
          placeholder="Tipo (ex: Produto X):"
          placeholderTextColor="#555"
          value={tipo}
          onChangeText={setTipo}
        />

        <TextInput
          style={styles.input}
          placeholder="Nome do Operador:"
          placeholderTextColor="#555"
          value={operatorName}
          onChangeText={setOperatorName}
        />

        <View style={styles.selectContainer}>
          <TouchableOpacity 
            style={styles.select}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={styles.selectText}>{selectedPriority}</Text>
            <Text style={styles.arrow}>⌄</Text>
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdown}>
              {priorities.map((priority) => (
                <TouchableOpacity
                  key={priority}
                  style={styles.dropdownItem}
                  onPress={() => handlePrioritySelect(priority)}
                >
                  <Text style={styles.dropdownText}>{priority}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

      </View>

      {/* Botões */}
      <TouchableOpacity style={styles.buttonPrimary} onPress={handleConfirm} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Confirmar</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={() => router.push('/dashboard')}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>

    </View>
  );
}