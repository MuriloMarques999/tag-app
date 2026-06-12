import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from './dashboard';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import api from '../api';

export default function Dashboard() {

  const [fontsLoaded] = useFonts({
    Notable: require('../../assets/fonts/Notable-Regular.ttf'),
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  const router = useRouter();

  const [lotesCount, setLotesCount] = useState(0);
  const [todoCount, setTodoCount] = useState(0);
  const [doingCount, setDoingCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data: any = await api.getRequests();
        if (Array.isArray(data)) {
          setLotesCount(data.length);
          setTodoCount(data.filter(r => r.status === 'pending').length);
          setDoingCount(data.filter(r => r.status === 'processing').length);
          setDoneCount(data.filter(r => r.status === 'completed').length);
        }
      } catch (e) {
        // Ignorar erros silenciosamente ou tratar
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.welcome}>Bem vindo(a)!</Text>

      {/* Card produtividade */}
      <View style={styles.cardMain}>
        <View style={styles.titleContainer}>
        <Text style={styles.date}>Visão Geral</Text>
        <Text style={styles.title}>Produtividade do dia</Text>
      </View>

        <View style={styles.circle}>
          <Text style={styles.circleText}>
            {lotesCount > 0 ? Math.round((doneCount / lotesCount) * 100) : 0}%
          </Text>
        </View>
      </View>

      {/* Dashboard */}
      <Text style={styles.sectionTitle}>Dashboard</Text>

      {/* Lotes */}
      <View style={styles.cardMedium}>
        <Text style={styles.cardMediumLabel}>Lotes agendados</Text>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.cardMediumNumber}>{lotesCount}</Text>}
      </View>

      {/* Cards pequenos */}
      <View style={styles.row}>
        <View style={styles.cardSmall}>
          <Text style={styles.cardLabel}>To do</Text>
          <Text style={styles.cardNumber}>{todoCount}</Text>
        </View>

        <View style={styles.cardSmall}>
          <Text style={styles.cardLabel}>Doing</Text>
          <Text style={styles.cardNumber}>{doingCount}</Text>
        </View>

        <View style={styles.cardSmall}>
          <Text style={styles.cardLabel}>Done</Text>
          <Text style={styles.cardNumber}>{doneCount}</Text>
        </View>
      </View>

      {/* Botão */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/dashboard2')}>
        <Text style={styles.buttonText}>Registrar novo lote</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => { api.logout(); router.replace('/companyLogin/companyLogin'); }}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>

    </View>
  );
}