import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { styles } from './iniciarProcessamento';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

export default function IniciarProcessamento() {

  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  const router = useRouter();

  // estados
  const [tempo, setTempo] = useState(0);
  const [rodando, setRodando] = useState(false);
  const quantidadeTotal = 25;
  const [contador, setContador] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [acertos, setAcertos] = useState(Math.floor(Math.random() * 25));
  const [erros, setErros] = useState(0);

  // cronômetro
  useEffect(() => {
    let interval: any;

    if (rodando) {
      interval = setInterval(() => {
        setTempo(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [rodando]);

  const formatarTempo = (segundos: number) => {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${min}:${seg < 10 ? '0' : ''}${seg}`;
  };

  const handleBotaoPrincipal = () => {
    if (!rodando && !finalizado) {
      // Começar
      setRodando(true);
    } else if (rodando) {
      // Finalizar
      setRodando(false);
      setFinalizado(true);
      setErros(quantidadeTotal - acertos);
    }
  };

  const handleEnviarRelatorio = () => {
    // Aqui você pode implementar a lógica para enviar o relatório
    console.log('Relatório enviado');
    // Após enviar, pode navegar ou mostrar uma mensagem de sucesso
  };

  const handleVoltar = () => {
    router.push('/lotesAgendados');
  };

  if (!fontsLoaded) return null;

  if (finalizado) {
    return (
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.back}>{'‹'}</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Processamento Finalizado</Text>
        </View>

        {/* Mensagem */}
        <View style={styles.messageContainer}>
          <View style={styles.messageCard}>
            <Text style={styles.messageTitle}>Processamento Concluído!</Text>

            {/* Métricas */}
            <View style={styles.metricsContainer}>
              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>Quantidade Total</Text>
                <Text style={styles.metricValue}>{quantidadeTotal}/{quantidadeTotal}</Text>
              </View>

              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>Acertos</Text>
                <Text style={styles.metricValue}>{acertos}</Text>
              </View>

              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>Erros</Text>
                <Text style={styles.metricValue}>{erros}</Text>
              </View>

              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>Taxa de Acerto</Text>
                <Text style={styles.metricValue}>{Math.round((acertos / quantidadeTotal) * 100)}%</Text>
              </View>
            </View>
          </View>

          {/* Botões */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={styles.buttonPrimary}
              onPress={handleEnviarRelatorio}
            >
              <Text style={styles.buttonText}>Enviar Relatório</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.buttonSecondary}
              onPress={handleVoltar}
            >
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>{'‹'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Iniciar processamento</Text>
      </View>

      {/* Subtítulo */}
      <Text style={styles.subtitle}>
        Para iniciar o processo, clique em Começar. O cronômetro irá iniciar a contagem.
      </Text>

      {/* Card verde */}
      <View style={styles.card}>

        <TextInput
          style={styles.input}
          value="Operador: Anne Carlini"
          editable={false}
        />

        <TextInput
          style={styles.input}
          value="ID Lote: ET123"
          editable={false}
        />

        <TextInput
          style={styles.input}
          value="Quantidade total: 25"
          editable={false}
        />

      </View>

      {/* Cronômetro */}
      <Text style={styles.timer}>{formatarTempo(tempo)}</Text>

      {/* Contador */}
      <Text style={styles.counter}>{contador}/{quantidadeTotal}</Text>

      {/* Botão */}
      <TouchableOpacity 
        style={styles.buttonPrimary}
        onPress={handleBotaoPrincipal}
      >
        <Text style={styles.buttonText}>{rodando ? 'Finalizar' : 'Começar'}</Text>
      </TouchableOpacity>

    </View>
  );
}
