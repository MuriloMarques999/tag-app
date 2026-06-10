# Integrador — API de Controle de Etiquetas e Requisições

API REST desenvolvida em Node.js para gerenciamento de etiquetas (tags), requisições de itens e leitura de QR Codes via câmera ou imagem.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [MySQL](https://www.mysql.com/) rodando localmente
- Banco de dados `db_contagem` criado no MySQL

---

## Instalação

1. Clone o repositório e acesse a pasta do projeto:

```bash
git clone <url-do-repositório>
cd Integrador
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o banco de dados em `src/db.js`:

```js
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // seu usuário MySQL
  password: '',       // sua senha MySQL
  database: 'db_contagem'
});
```

> Se necessário, crie o banco antes de iniciar: `CREATE DATABASE db_contagem;`

---

## Iniciando o servidor

```bash
node src/server.js
```

O servidor ficará disponível em: `http://localhost:3000`

---

## Estrutura do projeto

```
Integrador/
├── package.json          # Dependências e metadados do projeto
└── src/
    ├── server.js         # Ponto de entrada — configura Express e registra as rotas
    ├── db.js             # Conexão com o banco de dados MySQL
    ├── controllers/      # Lógica de negócio de cada recurso
    │   ├── reading.controller.js   # Processa leituras de QR Code e atualiza estoque
    │   ├── request.controller.js   # CRUD de requisições e seus itens
    │   ├── scan.controller.js      # Decodifica QR Code a partir de imagem base64
    │   └── tag.controller.js       # CRUD de etiquetas (tags)
    └── routes/           # Definição dos endpoints de cada recurso
        ├── reading.routes.js       # Rotas de leitura de QR Code
        ├── request.routes.js       # Rotas de requisições
        ├── scan.routes.js          # Rotas de scan por imagem
        └── tag.routes.js           # Rotas de etiquetas
```

---

## Descrição dos arquivos

### `src/server.js`
Ponto de entrada da aplicação. Inicializa o Express, habilita CORS e JSON, registra todas as rotas e sobe o servidor na porta **3000**.

### `src/db.js`
Cria e exporta a conexão com o banco de dados MySQL usando a biblioteca `mysql2`.

---

### Controllers (`src/controllers/`)

| Arquivo | Responsabilidade |
|---|---|
| `reading.controller.js` | Recebe dados de um QR Code lido, busca ou cria a tag correspondente no banco e registra a leitura na requisição |
| `request.controller.js` | Cria requisições, lista todas as requisições e busca uma requisição por ID |
| `scan.controller.js` | Recebe uma imagem em base64, decodifica o QR Code usando Jimp + qrcode-reader e repassa para o fluxo de leitura |
| `tag.controller.js` | Cria, lista e atualiza etiquetas (tags) no banco de dados |

---

### Routes (`src/routes/`)

| Arquivo | Prefixo | Endpoints |
|---|---|---|
| `reading.routes.js` | `/leitura-etiqueta` | `POST /leitura-etiqueta/scan` |
| `request.routes.js` | `/requests` | `POST /requests`, `GET /requests`, `GET /requests/:id` |
| `scan.routes.js` | `/scan-image` | `POST /scan-image` |
| `tag.routes.js` | `/tags` | `POST /tags`, `GET /tags`, `PUT /tags/:id` |

---

## Endpoints resumidos

### Etiquetas — `/tags`
- `POST /tags` — Cria uma nova etiqueta
- `GET /tags` — Lista todas as etiquetas
- `PUT /tags/:id` — Atualiza uma etiqueta existente

### Requisições — `/requests`
- `POST /requests` — Cria uma nova requisição (com itens opcionais)
- `GET /requests` — Lista todas as requisições
- `GET /requests/:id` — Busca uma requisição pelo ID

### Leitura de QR Code — `/leitura-etiqueta`
- `POST /leitura-etiqueta/scan` — Registra a leitura de um QR Code (dados em JSON no body)

### Scan por imagem — `/scan-image`
- `POST /scan-image` — Recebe uma imagem em base64, decodifica o QR Code e registra a leitura

---

## Dependências

| Pacote | Uso |
|---|---|
| `express` | Framework HTTP |
| `cors` | Habilita requisições cross-origin |
| `mysql2` | Conexão com o banco MySQL |
| `dotenv` | Carregamento de variáveis de ambiente |
| `jimp` | Processamento de imagens para leitura de QR |
| `qrcode-reader` | Decodificação de QR Code a partir de imagem |
| `pg` | Driver PostgreSQL (disponível como alternativa) |
