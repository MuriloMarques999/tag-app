import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, ImageStyle, Alert } from 'react-native';
import { styles } from './companyRegister';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { useState } from 'react'; // importando para utilizar 
import { Ionicons } from '@expo/vector-icons'; // para icons
import api from '../api';


export default function CompanyRegister() {

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
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [company, setCompany] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false);

    return (
        <View style={styles.container}>

            <View style={styles.title}>
                <Text style={styles.titleFont}>Sou empresa</Text>
            </View>

            <Text style={styles.subTitle}>Criar conta</Text>

            <Text style={styles.texParagraph}>Preencha as informações da sua empresa abaixo</Text>


        {/* ---- formulário para preenchimento ---- */}
        <ScrollView style={styles.formContainer}>

        <View style={styles.inputGroup}>
            <Text style={styles.titleFormInput}>Nome</Text>
            <TextInput 
            style={styles.formInput} 
            placeholder='Digite seu nome completo'
            value={name}
            onChangeText={setName}
            />
        </View>
        
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
            <Text style={styles.titleFormInput}>Empresa</Text>
            <TextInput 
            style={styles.formInput} 
            placeholder='Nome da empresa'
            value={company}
            onChangeText={setCompany}
            />
        </View>

        <View style={styles.inputGroup}>
            
            <Text style={styles.titleFormInput}>Senha</Text>
            <View style={styles.inputWrapper}>
                <TextInput 
                    style={styles.formInput} 
                    placeholder='Digite uma senha'
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
                    const res: any = await api.register(name, email, password, 'admin');
                    if (res.user_id) {
                        Alert.alert('Sucesso', 'Conta criada. Faça login.');
                        router.replace('/companyLogin/companyLogin');
                    } else {
                        Alert.alert('Erro', res.message || 'Falha ao criar conta');
                    }
                } catch (err: any) {
                    Alert.alert('Erro', err.message || 'Falha ao criar conta');
                } finally { setLoading(false); }
            }}
        >
            <Text style={styles.buttonFont}>{loading ? 'Criando...' : 'Criar conta da empresa'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/') }>
            <Text style={styles.backButtonFont}>Back</Text>
        </TouchableOpacity>
        </View>

    )
}