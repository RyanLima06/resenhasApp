# Caderno de Resenhas

API REST simples para cadastrar, listar, editar e excluir resenhas (filmes, livros, o que quiser), com uma interface web em HTML/CSS/JS puro para consumi-la.

## Stack

- **Backend:** Node.js + Express
- **Banco de dados:** SQLite (via `node:sqlite`, módulo nativo do Node)
- **Frontend:** HTML/CSS/JS puro, sem build step

## Estrutura

```
.
├── index.js          # servidor Express e rotas da API
├── database.js       # conexão e criação da tabela SQLite
├── resenhas.html      # interface web
├── usuarios.db        # arquivo do banco (gerado automaticamente, ignorado no git)
├── package.json
└── .gitignore
```

## Pré-requisitos

- Node.js **v22.5+** (o módulo `node:sqlite` é nativo a partir dessa versão)

## Instalação

```bash
npm install
```

## Como rodar

```bash
node index.js
```

O servidor sobe em `http://localhost:3000`.

Abra o `resenhas.html` no navegador (ex: extensão Live Server do VS Code, geralmente em `http://127.0.0.1:5500`) para usar a interface.

> ⚠️ O CORS no backend está configurado para aceitar requisições vindas de `http://127.0.0.1:5500`. Se você abrir o HTML em outra porta/origem, ajuste o `origin` em `index.js`.

## Endpoints da API

| Método | Rota                | Descrição                              |
|--------|---------------------|-----------------------------------------|
| GET    | `/resenhas`          | Lista todas as resenhas                 |
| POST   | `/resenhas`          | Cria uma nova resenha                   |
| PATCH  | `/resenhas/:reviewId`| Atualiza uma resenha existente          |
| DELETE | `/resenhas/:reviewId`| Remove uma resenha específica           |
| DELETE | `/resenhas/reset`    | Apaga todas as resenhas e zera os IDs   |

### Corpo esperado (POST / PATCH)

```json
{
  "name": "Cidade de Deus",
  "describe": "Um dos melhores filmes brasileiros já feitos.",
  "note": 9.5
}
```

- `name`: texto não vazio
- `describe`: texto (pode ser vazio)
- `note`: número maior ou igual a 0

## Banco de dados

A tabela `list` é criada automaticamente na primeira execução, em `usuarios.db`:

```sql
CREATE TABLE IF NOT EXISTS list (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  describe TEXT,
  note INTEGER
)
```

## Zerando os dados

Use o botão **"Zerar tudo"** na interface, ou chame diretamente:

```bash
curl -X DELETE http://localhost:3000/resenhas/reset
```

Isso apaga todos os registros e reinicia a contagem de IDs a partir de 1.