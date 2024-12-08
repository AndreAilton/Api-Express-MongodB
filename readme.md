

Aqui está o conteúdo do arquivo `readme.md` com todas as informações em português:

# Documentação da API do Servidor

## Visão Geral

Esta API do servidor é construída utilizando Express.js e Prisma, e fornece endpoints para gerenciar usuários.

## Endpoints

### 1. Criar Usuário

* **POST /usuarios**
	+ Cria um novo usuário com o e-mail, nome e idade fornecidos.
	+ Retorna uma mensagem de sucesso: "Usuário cadastrado com sucesso!"

Exemplo de corpo da requisição:
```json
{
  "email": "exemplo@exemplo.com",
  "nome": "João Doe",
  "idade": 30
}
```

### 2. Atualizar Usuário

* **PUT /usuarios/:id**
	+ Atualiza um usuário existente com o e-mail, nome e idade fornecidos.
	+ Retorna uma mensagem de sucesso: "Usuário alterado com sucesso!"

Exemplo de corpo da requisição:
```json
{
  "email": "atualizado@exemplo.com",
  "nome": "Jane Doe",
  "idade": 31
}
```

### 3. Deletar Usuário

* **DELETE /usuarios/:id**
	+ Deleta um usuário por ID.
	+ Retorna uma mensagem de sucesso: "Usuário deletado com sucesso!"

## Dependências

* Express.js: ^4.21.2
* Prisma: ^6.0.1
* Cors: ^2.8.5

## Esquema do Prisma

O esquema do Prisma é definido em `prisma/schema.prisma` e inclui um modelo único para usuários:
```prisma
model Usuario {
  id      String   @id @default(auto()) @map("_id") @db.ObjectId
  email   String   @unique
  nome    String
  idade   String
}
```

## Variáveis de Ambiente

* `DATABASE_URL`: A URL do banco de dados MongoDB.

## Código do Servidor

```javascript
// server.js
import express from "express";
import { PrismaClient } from '@prisma/client'
import cors from 'cors';
const prisma = new PrismaClient()

const app = express();
app.use(express.json());
app.use(cors());

app.post("/usuarios", async (req, res) => {
    await prisma.usuario.create({
        data: {
            email: req.body.email,
            nome: req.body.nome,
            idade: req.body.idade
        }
    })

    res.send("Usuário cadastrado com sucesso!")
})

app.put("/usuarios/:id", async (req, res) => {
    await prisma.usuario.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            nome: req.body.nome,
            idade: req.body.idade
        }
    })

    res.send("Usuário alterado com sucesso!")
})

app.delete("/usuarios/:id", async (req, res) => {
    await prisma.usuario.delete({
        where: {
            id: req.params.id
        }
    })

    res.send("Usuário deletado com sucesso!")
})
```

## package.json

```json
{
  "type": "module",
  "dependencies": {
    "@prisma/client": "^6.0.1",
    "cors": "^2.8.5",
    "express": "^4.21.2"
  },
  "devDependencies": {
    "prisma": "^6.0.1"
  }
}
```