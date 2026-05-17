import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { styles } from './stylesCompany';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function Company() {
  const [fontsLoaded] = useFonts({
    Notable: require('../../assets/fonts/Notable-Regular.ttf'),
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  const router = useRouter();
  const [mostrarSenha, setMostrarSenha] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#DDD7C9' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleFont}>Empresa</Text>
          </View>

          <Text style={styles.subTitle}>Criar conta</Text>
          <Text style={styles.ctaInfo}>
            Preencha as informações da sua empresa abaixo.
          </Text>

          {/* ---- formulário para preenchimento ---- */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.titleFormInput}>Nome</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Ex.: Anne Carlini de Oliveira"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.titleFormInput}>Email</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Ex.: name@company.com"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.titleFormInput}>Nome da empresa</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Ex.: Company LTDA"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.titleFormInput}>Senha</Text>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.formInput}
                  placeholder="Ex.: Digite sua senha"
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
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.buttonCreate}>
              <Text style={styles.buttonFont}>Criar conta da empresa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.push('/')}
            >
              <Text style={styles.backButtonFont}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}