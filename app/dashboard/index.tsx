import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './dashboard';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';

export default function Dashboard() {

  const [fontsLoaded] = useFonts({
    Notable: require('../../assets/fonts/Notable-Regular.ttf'),
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) return null;

  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.welcome}>Bem vindo(a), [nome]!</Text>

      {/* Card produtividade */}
      <View style={styles.cardMain}>
        <View style={styles.titleContainer}>
        <Text style={styles.date}>Segunda-feira, 13</Text>
        <Text style={styles.title}>Produtividade do dia</Text>
      </View>

        <View style={styles.circle}>
          <Text style={styles.circleText}>90%</Text>
        </View>
      </View>

      {/* Dashboard */}
      <Text style={styles.sectionTitle}>Dashboard</Text>

      {/* Lotes */}
      <View style={styles.cardMedium}>
        <Text style={styles.cardMediumLabel}>Lotes agendados</Text>
        <Text style={styles.cardMediumNumber}>30</Text>
      </View>

      {/* Cards pequenos */}
      <View style={styles.row}>
        <View style={styles.cardSmall}>
          <Text style={styles.cardLabel}>To do</Text>
          <Text style={styles.cardNumber}>20</Text>
        </View>

        <View style={styles.cardSmall}>
          <Text style={styles.cardLabel}>Doing</Text>
          <Text style={styles.cardNumber}>3</Text>
        </View>

        <View style={styles.cardSmall}>
          <Text style={styles.cardLabel}>Done</Text>
          <Text style={styles.cardNumber}>7</Text>
        </View>
      </View>

      {/* Botão */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}
        onPress={() => router.push ('/dashboard2')}>Registrar novo lote</Text>
      </TouchableOpacity>

    </View>
  );
}