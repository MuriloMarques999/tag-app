# Tag App Backend

Backend em Node.js/TypeScript para a aplicação Tag App.

## Instalação

```bash
cd backend
npm install
```

## Configuração

Copie `.env.example` para `.env` e ajuste as variáveis de ambiente.

## Execução

- `npm run dev` para rodar em modo de desenvolvimento.
- `npm run build` para gerar o `dist`.
- `npm start` para executar o build.

## Endpoints principais

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/tags`
- `GET /api/requests`
- `POST /api/requests`
- `POST /api/readings`
- `GET /api/devices`

A estrutura do banco segue o SQL enviado pelo usuário.
