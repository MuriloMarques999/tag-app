import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './lotesAgendados';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';

export default function LotesAgendados() {

  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  const router = useRouter();

  if (!fontsLoaded) return null;

  const lotes = [
    { id: 1, ref: 'ETQ123', modelo: 'X', quantidade: 100, prioridade: 'Baixa' },
    { id: 2, ref: 'ETQ456', modelo: 'X', quantidade: 100, prioridade: 'Baixa' },
    { id: 3, ref: 'ETQ789', modelo: 'X', quantidade: 100, prioridade: 'Baixa' },
    { id: 4, ref: 'ETQ123', modelo: 'Y', quantidade: 150, prioridade: 'Média' },
    { id: 5, ref: 'ETQ456', modelo: 'Y', quantidade: 150, prioridade: 'Média' },
    { id: 6, ref: 'ETQ789', modelo: 'Y', quantidade: 90, prioridade: 'Média' },
    { id: 7, ref: 'ETQ123', modelo: 'Y', quantidade: 80, prioridade: 'Média' },
    { id: 8, ref: 'ETQ456', modelo: 'Y', quantidade: 120, prioridade: 'Média' },
  ];

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>{'‹'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Lote agendados</Text>
      </View>

      {/* LISTA */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {lotes.map((lote) => (
          <View key={lote.id} style={styles.card}>

            {/* FAIXA SUPERIOR */}
            <View style={styles.cardHeader}>
              <Text style={styles.ref}>Ref. Lote: {lote.ref}</Text>
            </View>

            {/* CONTEÚDO */}
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.text}>Modelo: {lote.modelo}</Text>
                <Text style={styles.text}>Quantidade: {lote.quantidade}</Text>
                <Text style={styles.text}>Prioridade: {lote.prioridade}</Text>
              </View>

              {/* BOTÃO SETA */}
              <TouchableOpacity style={styles.arrowButton} onPress={() => router.push('/iniciarProcessamento')}>
                <Text style={styles.arrowText}>→</Text>
              </TouchableOpacity>

            </View>

          </View>
        ))}
      </ScrollView>

    </View>
  );
}