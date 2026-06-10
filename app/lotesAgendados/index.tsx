import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from './lotesAgendados';
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

  if (!fontsLoaded) return null;

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
      } finally { setLoading(false); }
    })();
  }, []);

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
        {loading ? <ActivityIndicator size="large" /> : null}
        {lotes.map((lote) => (
          <View key={lote.request_id} style={styles.card}>

            {/* FAIXA SUPERIOR */}
            <View style={styles.cardHeader}>
              <Text style={styles.ref}>Ref. Lote: {lote.ref}</Text>
            </View>

            {/* CONTEÚDO */}
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.text}>Ref: {lote.reference_code || lote.ref}</Text>
                <Text style={styles.text}>Itens: {lote.total_items ?? '—'}</Text>
                <Text style={styles.text}>Status: {lote.status}</Text>
              </View>

              {/* BOTÃO SETA */}
              <TouchableOpacity style={styles.arrowButton} onPress={() => router.push('/iniciarProcessamento')}>
                <Text style={styles.arrowText}>→</Text>
              </TouchableOpacity>

            </View>

          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/operator')}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>

    </View>
  );
}