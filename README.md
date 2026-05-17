# Tag App 🏷️

Uma aplicação mobile desenvolvida com React Native e Expo para gerenciamento e processamento de tags de empresas.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 16 ou superior) - [Download aqui](https://nodejs.org/)
- **npm** ou **yarn** (gerenciador de pacotes - vem com Node.js)
- **Git** - [Download aqui](https://git-scm.com/)

### Para rodar em dispositivos específicos

- **Android**: Android Studio e Android SDK configurados
- **iOS** (apenas macOS): Xcode instalado
- **Web**: Nenhum requisito adicional

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd tag-app
```

### 2. Instale as dependências

```bash
npm install
```

Ou se usar yarn:

```bash
yarn install
```

### 3. Instale o Expo CLI globalmente (recomendado)

```bash
npm install -g expo-cli
```

## ▶️ Como Rodar o Projeto

### Iniciar o servidor de desenvolvimento

```bash
npm start
```

Ou com yarn:

```bash
yarn start
```

Este comando abrirá um menu no terminal com as seguintes opções:

### Opções de Execução

#### **1. iOS (apenas macOS)**

```bash
i
```

Abre o simulador do iOS automaticamente.

#### **2. Android**

```bash
a
```

Abre o emulador do Android. Certifique-se de que o emulador está rodando ou conecte um dispositivo Android.

#### **3. Web**

```bash
w
```

Abre a aplicação no navegador padrão.

#### **4. Dispositivo Físico**

- Instale o aplicativo **Expo Go** na loja do seu dispositivo
- Escaneie o código QR exibido no terminal com a câmera do seu celular
- Abrirá automaticamente no app Expo Go

## 📦 Scripts Disponíveis

No `package.json` estão disponíveis os seguintes comandos:

```bash
npm start        # Inicia o servidor de desenvolvimento
npm run android  # Executa diretamente no Android
npm run ios      # Executa diretamente no iOS
npm run web      # Executa na web
```

## 🛠️ Tecnologias Utilizadas

- **React Native** (v0.81.5) - Framework para desenvolvimento mobile
- **Expo** (v54.0.33) - Plataforma para desenvolvimento React Native
- **Expo Router** (v6.0.23) - Sistema de roteamento para navegação
- **TypeScript** (v5.9.2) - Linguagem com tipagem estática
- **React** (v19.1.0) - Biblioteca de UI

## 📁 Estrutura do Projeto

```text
tag-app/
├── app/                          # Componentes da aplicação
│   ├── choice/                   # Tela de escolha
│   ├── company/                  # Tela de empresa
│   ├── companyLogin/             # Tela de login da empresa
│   ├── companyRegister/          # Tela de registro da empresa
│   ├── dashboard/                # Dashboard principal
│   ├── dashboard2/               # Dashboard 2
│   ├── dashboard3/               # Dashboard 3
│   ├── enter/                    # Tela de entrada
│   ├── iniciarProcessamento/     # Tela de início de processamento
│   ├── lotesAgendados/           # Tela de lotes agendados
│   ├── operator/                 # Tela do operador
│   └── index.tsx                 # Tela principal da app
├── assets/                       # Recursos estáticos
│   ├── fonts/                    # Fontes customizadas
│   └── images/                   # Imagens
├── src/                          # Código fonte adicional
│   └── images/                   # Imagens do source
├── app.json                      # Configurações do Expo
├── package.json                  # Dependências do projeto
├── tsconfig.json                 # Configuração do TypeScript
├── App.tsx                       # Componente raiz
├── index.ts                      # Entrada da aplicação
└── README.md                     # Este arquivo
```

## ⚠️ Solução de Problemas

### Erro: "Expo CLI não encontrado"

```bash
npm install -g expo-cli
```

### Erro ao instalar dependências

Limpe o cache do npm e tente novamente:

```bash
npm cache clean --force
npm install
```

### Porta 8081 já em uso

O Expo tentará usar outra porta automaticamente, ou você pode especificar uma porta diferente:

```bash
expo start -c
```

### Android/iOS não iniciam

- **Android**: Certifique-se de que o Android Studio está aberto e o emulador está rodando
- **iOS**: Verifique se tem Xcode instalado (apenas macOS)

## 📝 Notas Importantes

- A aplicação usa **Expo Router** para navegação, similar a Next.js
- O projeto está configurado com **TypeScript** para melhor tipagem e desenvolvimento
- As fontes customizadas estão em `assets/fonts/Poppins/`
- O projeto suporta Android, iOS e Web

## 🤝 Contribuindo

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/sua-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/sua-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e faz parte do Projeto Integrador do 3º semestre de ADS.

## 👥 Autores

Desenvolvido como parte do Projeto Integrador da disciplina de Engenharia de Software.

---

**Precisa de ajuda?** Verifique a documentação oficial:

- [Documentação Expo](https://docs.expo.dev/)
- [Documentação React Native](https://reactnative.dev/)
- [Documentação Expo Router](https://expo.github.io/router/)
