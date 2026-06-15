import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { styles } from './iniciarProcessamento';
import { useFonts } from 'expo-font';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { getEsp32Status, resetEsp32Counter, updateRequestStatus } from '../api';

export default function IniciarProcessamento() {

  const [fontsLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  const router = useRouter();
  const params = useLocalSearchParams();
  const rawQuantidade = params.quantidade ? Number(params.quantidade) : 0;
  const idLote = params.idLote ? String(params.idLote) : 'Desconhecido';
  const requestId = params.requestId ? Number(params.requestId) : 0;
  const operatorName = params.operatorName ? String(params.operatorName) : 'Não atribuído';

  // estados
  const [tempo, setTempo] = useState(0);
  const [rodando, setRodando] = useState(false);
  const quantidadeTotal = rawQuantidade || 25;
  const [contador, setContador] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [statusError, setStatusError] = useState<string | null>(null);

  // resetar contador do ESP ao iniciar novo lote
  useEffect(() => {
    async function resetLoteCounter() {
      try {
        await resetEsp32Counter();
      } catch (error) {
        console.warn('Não foi possível resetar contador ESP32:', error);
      }
    }

    resetLoteCounter();
  }, [requestId]);

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

  useEffect(() => {
    let statusInterval: any;

    async function fetchEsp32Status() {
      try {
        const data: any = await getEsp32Status();
        if (data && typeof data.contador === 'number') {
          setContador(data.contador);
          setAcertos(Math.min(data.contador, quantidadeTotal));
          setStatusError(null);
        } else {
          setStatusError('Microserviço ESP32 respondendo sem contador');
        }
      } catch (error: any) {
        setStatusError('Microserviço ESP32 inacessível');
      }
    }

    if (rodando) {
      fetchEsp32Status();
      statusInterval = setInterval(fetchEsp32Status, 1000);
    }

    return () => clearInterval(statusInterval);
  }, [rodando]);

  useEffect(() => {
    if (rodando && contador >= quantidadeTotal) {
      setRodando(false);
      setFinalizado(true);
      setErros(Math.max(0, quantidadeTotal - acertos));
    }
  }, [contador, rodando, quantidadeTotal, acertos]);

  const formatarTempo = (segundos: number) => {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${min}:${seg < 10 ? '0' : ''}${seg}`;
  };

  const handleBotaoPrincipal = async () => {
    if (!rodando && !finalizado) {
      // Começar
      setRodando(true);
      if (requestId) {
        try {
          await updateRequestStatus(requestId, 'processing');
        } catch (error) {
          console.error('Erro ao atualizar status:', error);
        }
      }
    } else if (rodando) {
      // Finalizar
      setRodando(false);
      setFinalizado(true);
      setErros(quantidadeTotal - acertos);
    }
  };

  const handleEnviarRelatorio = async () => {
    if (requestId) {
      try {
        await updateRequestStatus(requestId, 'completed');
        Alert.alert('Sucesso', 'Relatório enviado com sucesso!');
        router.push('/lotesAgendados');
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível enviar o relatório.');
      }
    } else {
      Alert.alert('Erro', 'ID do lote não encontrado.');
    }
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
          value={`Operador: ${operatorName}`}
          editable={false}
        />

        <TextInput
          style={styles.input}
          value={`ID Lote: ${idLote}`}
          editable={false}
        />

        <TextInput
          style={styles.input}
          value={`Quantidade total: ${quantidadeTotal}`}
          editable={false}
        />

      </View>

      {/* Cronômetro */}
      <Text style={styles.timer}>{formatarTempo(tempo)}</Text>

      {/* Contador */}
      <Text style={styles.counter}>{contador}/{quantidadeTotal}</Text>

      {statusError ? <Text style={styles.errorText}>{statusError}</Text> : null}

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
