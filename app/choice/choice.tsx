// tela de escolha da empresa. Escolher entre Login ou Criar Conta

import { View, Text, Image, ImageStyle, TouchableOpacity } from 'react-native';
import { styles } from './stylesChoice';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';

export default function Choose() {
  const [fontsLoaded] = useFonts({
    Notable: require('../../assets/fonts/Notable-Regular.ttf'),
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* -------- logotipo + name */}
      <View style={styles.centerContent}>
      <Image 
        style={styles.logotipo as ImageStyle}
        source={require('../../assets/images/logotipo_4.png')} />
        <Text style={styles.naming}>SCANTAG</Text>
      </View>

      {/* -------- CTA + buttons*/}
      <Text style={styles.ctaInfo}>Você já possui conta?</Text>
      <View>
        {/* Botão para login na conta */}
        <TouchableOpacity style={styles.buttonEmpresa} 
          onPress={() => router.push('/companyLogin/companyLogin')}>
          <Text style={styles.buttonFont}>Login</Text>
        </TouchableOpacity>
      </View>
      <View>  
      {/* Botão para cadastrar na conta */}
      <TouchableOpacity style={styles.buttonOperador} 
        onPress={() => router.push('/companyRegister')}>
        <Text style={styles.buttonFont}>Criar conta</Text>
      </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
        <Text style={styles.backButtonFont}>Back</Text>
      </TouchableOpacity>

    </View>
  );
}