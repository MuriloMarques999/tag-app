// página para escolher entre empresa ou operador

import { View, Text, Image, ImageStyle, TouchableOpacity } from 'react-native';
import { styles } from './stylesChoose';
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
          style={styles.logotipo}
          source={require('../../assets/images/logotipo_4.png')} 
        />
        <Text style={styles.naming}>SCANTAG</Text>
      </View>

      {/* -------- CTA + buttons*/}
      <Text style={styles.ctaInfo}>Como você vai utilizar o app?</Text>
      <View>
        <TouchableOpacity style={styles.buttonEmpresa} 
          onPress={() => router.push('/choice/choice')}>
          <Text style={styles.buttonFont}>Empresa</Text>
        </TouchableOpacity>
      </View>
      <View>  
      <TouchableOpacity style={styles.buttonOperador} 
        onPress={() => router.push('/operator')}>
        <Text style={styles.buttonFont}>Operador</Text>
      </TouchableOpacity>
      </View>

    </View>
  );
}