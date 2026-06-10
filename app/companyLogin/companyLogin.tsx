// Tela de login do ADMIN

import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, ImageStyle, Alert } from 'react-native';
import { styles } from './companyLogin';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { useState } from 'react'; // importando para utilizar 
import { Ionicons } from '@expo/vector-icons'; // para icons
import api, { setToken } from '../api';


export default function CompanyLogin() {

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
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false);

    return (
        <View style={styles.container}>

            <View style={styles.title}>
                <Text style={styles.titleFont}>Empresa</Text>
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
            placeholder='Ex.:name@company.com'
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            />
        </View>

        <View style={styles.inputGroup}>
            
            <Text style={styles.titleFormInput}>Senha</Text>
            <View style={styles.inputWrapper}>
                <TextInput 
                    style={styles.formInput} 
                    placeholder='Ex.: Digite sua senha'
                    secureTextEntry={!mostrarSenha}
                    value={password}
                    onChangeText={setPassword}
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

        <TouchableOpacity 
            style={styles.buttonCreate}
            onPress={async () => {
                try {
                    setLoading(true);
                    const res: any = await api.login(email, password);
                    if (res.token) {
                        setToken(res.token);
                        router.replace('/dashboard');
                    } else {
                        Alert.alert('Erro', res.message || 'Falha no login');
                    }
                } catch (err: any) {
                    Alert.alert('Erro', err.message || 'Falha no login');
                } finally { setLoading(false); }
            }}
        >
            <Text style={styles.buttonFont}>{loading ? 'Entrando...' : 'Login'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/choice/choice')}>
            <Text style={styles.backButtonFont}>Back</Text>
        </TouchableOpacity>
        </View>

    )
}



