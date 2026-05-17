// página Inicial 

import { View, Text, Image, ImageStyle, TouchableOpacity } from 'react-native';
import { styles } from './stylesIndex'
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

export default function Index() {
    // importando fontes que quero utilizar no projeto
    const [fontsLoaded] = useFonts({
        Notable: require('../assets/fonts/Notable-Regular.ttf'),
        Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
        PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    const router = useRouter();

    return(
        <View style={styles.container}>

            {/* Bloco do logo + nome app */}
            <View style={styles.centerContent}>
                <Image style={styles.logotipo as ImageStyle}
                source={require('../assets/images/logotipo_4.png')} />
                <Text style={styles.naming}>SCANTAG</Text>
            </View>


            {/* Bloco do cta fixo embaixo */}
            <Text style={styles.ctaInfo}>O aplicativo de contagem inteligente para o seu negocio.</Text>

            <TouchableOpacity style={styles.button1} 
            onPress={() => router.push('/enter/choose')} // pasta ENTER 
            >
                <Text style={styles.buttonFont}>Iniciar</Text> {/* para iniciar o fluxo e ir para a tela de escolha Empresa ou Operador */}
            </TouchableOpacity>

        </View>
    )   
}