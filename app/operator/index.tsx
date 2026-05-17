// tela de Login do Operador 

import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, ImageStyle } from 'react-native';
import { styles } from './stylesOperator';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { useState } from 'react'; // importando para utilizar 
import { Ionicons } from '@expo/vector-icons'; // para icons


export default function Operator() {

    const [fontsLoaded] = useFonts({
        Notable: require('../../assets/fonts/Notable-Regular.ttf'),
        Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
        PoppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
         });
    
        if (!fontsLoaded) {
        return null;
        }
        const router = useRouter();
    
        const [mostrarSenha, setMostrarSenha] = useState(false); // para mostrar a senha

    return (
        <View style={styles.container}>

            <View style={styles.title}>
                <Text style={styles.titleFont}>Operador</Text>
            </View>

            <View style={styles.centerContent}>
                <Image 
                    style={styles.logotipo as ImageStyle}
                    source={require('../../assets/images/logotipo_4.png')} />
                <Text style={styles.naming}>SCANTAG</Text>
            </View>

            <Text style={styles.subTitle}>Login</Text>


        {/* ---- formulário para preenchimento ---- */}
        <ScrollView style={styles.formContainer}>

        <View style={styles.inputGroup}>
            <Text style={styles.titleFormInput}>Email</Text>
            <TextInput 
            style={styles.formInput} 
            placeholder='Ex.:name@company.com'/>
        </View>

        <View style={styles.inputGroup}>
            
            <Text style={styles.titleFormInput}>Senha</Text>
            <View style={styles.inputWrapper}>
                <TextInput 
                    style={styles.formInput} 
                    placeholder='Ex.: Digite sua senha'
                    secureTextEntry={!mostrarSenha}
                />
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setMostrarSenha(!mostrarSenha)}
                >
                    <Ionicons
                        name={mostrarSenha ? 'eye' : 'eye-off'}
                        size={20}
                        color="#003f48"
                    />
                </TouchableOpacity>
            </View>
            
        </View>
        </ScrollView>

        <TouchableOpacity style={styles.buttonCreate} >
            <Text style={styles.buttonFont}
            onPress={() => router.push('/lotesAgendados')}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} >
            <Text style={styles.backButtonFont}
            onPress={() => router.push ('/')}  >Back</Text>
        </TouchableOpacity>
        </View>

    )
}