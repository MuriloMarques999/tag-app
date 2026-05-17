import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './dashboard3';
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
    { id: 1, ref: 'ETQ123', modelo: 'X', quantidade: 100, prioridade: 'Baixa', status: 'Completo' },
    { id: 2, ref: 'ETQ123', modelo: 'X', quantidade: 100, prioridade: 'Baixa', status: 'Em espera' },
    { id: 3, ref: 'ETQ123', modelo: 'X', quantidade: 100, prioridade: 'Baixa', status: 'Em espera' },
    { id: 4, ref: 'ETQ456', modelo: 'Y', quantidade: 150, prioridade: 'Média', status: 'Completo' },
    { id: 5, ref: 'ETQ789', modelo: 'Z', quantidade: 80, prioridade: 'Alta', status: 'Em espera' },
    { id: 6, ref: 'ETQ321', modelo: 'W', quantidade: 200, prioridade: 'Baixa', status: 'Completo' },
    { id: 7, ref: 'ETQ654', modelo: 'V', quantidade: 120, prioridade: 'Média', status: 'Em espera' },
  ];

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>{'‹'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Lote agendados</Text>
      </View>

      {/* Lista */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {lotes.map((lote, index) => (
          <View key={lote.id} style={styles.card}>

            <Text style={styles.ref}>Ref. Lote: {lote.ref}</Text>

            <Text style={styles.text}>Modelo: {lote.modelo}</Text>
            <Text style={styles.text}>Quantidade: {lote.quantidade}</Text>
            <Text style={styles.text}>Prioridade: {lote.prioridade}</Text>

            <View style={[
              styles.badge,
              lote.status === 'Completo' ? styles.badgeDone : styles.badgeWaiting
            ]}>
              <Text style={styles.badgeText}>{lote.status}</Text>
            </View>

            

          </View>
        ))}
      </ScrollView>

      {/* Botões */}
      <TouchableOpacity style={styles.buttonPrimary} onPress={() => router.push('/')}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>

    </View>
  );
}