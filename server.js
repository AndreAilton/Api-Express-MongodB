import express from "express";
import { PrismaClient } from '@prisma/client'
import cors from 'cors';
const prisma = new PrismaClient()


const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.post("/usuarios", async (req, res) => {
    await prisma.usuario.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.send("Usuário cadastrado com sucesso!")


})


app.put("/usuarios/:id", async (req, res) => {
    await prisma.usuario.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.send("Usuário Alterado com sucesso!")


})

app.delete("/usuarios/:id", async (req, res) => {
    await prisma.usuario.delete({
        where: {
            id: req.params.id
        }
    })

    res.send("Usuário Deletado com sucesso!")


})

app.get("/usuarios", async (req, res) => {
    if (req.query) {
        const usuarios = await prisma.usuario.findMany({
            where: {
                email: req.query.email,
                name: req.query.name,
                age: req.query.age 
            }
    })
        res.send(usuarios)
    } else {
        const usuarios = await prisma.usuario.findMany()
        res.send(usuarios)
    }
    

});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });