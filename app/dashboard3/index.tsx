import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from './dashboard3';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import api from '../api';

export default function LotesAgendados() {

  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  const router = useRouter();
  const [lotes, setLotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data: any = await api.getRequests();
        setLotes(Array.isArray(data) ? data : []);
      } catch (e) {
        setLotes([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!fontsLoaded) return null;

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
        {loading ? <ActivityIndicator size="large" /> : null}
        {lotes.map((lote) => (
          <View key={lote.request_id} style={styles.card}>

            <Text style={styles.ref}>Ref. Lote: {lote.reference_code || lote.ref}</Text>

            <Text style={styles.text}>Itens: {lote.total_items ?? '—'}</Text>
            <Text style={styles.text}>Operador: {lote.operator_name || 'N/A'}</Text>
            <Text style={styles.text}>Status: {lote.status}</Text>

            <View style={[
              styles.badge,
              lote.status === 'completed' ? styles.badgeDone : styles.badgeWaiting
            ]}>
              <Text style={styles.badgeText}>{lote.status}</Text>
            </View>

          </View>
        ))}
      </ScrollView>

      {/* Botões */}
      <TouchableOpacity style={styles.buttonPrimary} onPress={() => router.push('/dashboard')}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>

    </View>
  );
}