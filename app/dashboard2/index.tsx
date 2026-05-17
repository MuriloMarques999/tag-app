import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { styles } from './dashboard2';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { SetStateAction, useState } from 'react';

export default function NovoAgendamento() {

  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('Prioridade');

  const priorities = ['Alta', 'Média', 'Baixa'];

  const handlePrioritySelect = (priority: SetStateAction<string>) => {
    setSelectedPriority(priority);
    setShowDropdown(false);
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>{'‹'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Novo agendamento</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>

        <TextInput
          style={styles.input}
          placeholder="Ref. Lote: ETQ123"
          placeholderTextColor="#555"
        />

        <TextInput
          style={styles.input}
          placeholder="Quantidade:"
          placeholderTextColor="#555"
        />

        <TextInput
          style={styles.input}
          placeholder="Tipo:"
          placeholderTextColor="#555"
        />

        <View style={styles.selectContainer}>
          <TouchableOpacity 
            style={styles.select}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={styles.selectText}>{selectedPriority}</Text>
            <Text style={styles.arrow}>⌄</Text>
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdown}>
              {priorities.map((priority) => (
                <TouchableOpacity
                  key={priority}
                  style={styles.dropdownItem}
                  onPress={() => handlePrioritySelect(priority)}
                >
                  <Text style={styles.dropdownText}>{priority}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

      </View>

      {/* Botões */}
      <TouchableOpacity style={styles.buttonPrimary}>
        <Text style={styles.buttonText}
        onPress={() => router.push ('/dashboard3')}>Confirmar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary}>
        <Text style={styles.buttonText}
        onPress={() => router.push ('/dashboard')}>Cancelar</Text>
      </TouchableOpacity>

    </View>
  );
}