    const database = require('./database')
    const express = require('express');
    const app = express();
    const port = 3000;
    const cors = require('cors');

    app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
    }));
    app.use(express.json())


    app.get('/resenhas', (req, res)=>{
        
        const completeList = database.prepare('SELECT * FROM list').all()
        res.json(completeList)
    })


    app.post('/resenhas', (req, res)=>{
        const newReview = req.body
        if(typeof(newReview.name) == "string" &&
                newReview.name.trim().length>0 &&
                typeof(newReview.describe) == "string" &&
                newReview.describe.trim().length>=0 &&
                typeof(newReview.note) == "number" &&
                newReview.note >=0){
                    database.prepare('INSERT INTO list (name, describe, note) VALUES (?, ?, ?)').run(newReview.name, newReview.describe, newReview.note)
                    res.status(201).json({
                            mensagem: "resenha criada!", 
                        })
                }else{
                    res.status(400).json(`Erro, parametros invalidos!`)
                }
    })


    app.patch('/resenhas/:reviewId', (req, res)=>{ 
    const {reviewId} = req.params
    const reviewBody = req.body
        const reviewFound = database.prepare('SELECT * FROM list WHERE id = ?').get(reviewId)
        if(reviewFound && typeof(reviewBody.name) == "string" &&
                reviewBody.name.trim().length>0 &&
                typeof(reviewBody.describe) == "string" &&
                reviewBody.describe.trim().length>=0 &&
                typeof(reviewBody.note) == "number" &&
                reviewBody.note >=0){
                    const updatedReview = ({...reviewFound, ...req.body})
                    database.prepare('UPDATE list SET name = ?, describe = ?, note = ? WHERE id = ?').run(updatedReview.name, updatedReview.describe, updatedReview.note, reviewId)
                    res.json({mensagem: "Resenha atualizada!"})
                }else{
                    res.status(404).json({mensagem: "resenha não encontrada OU parâmetros inválidos"})
        }
    })


    app.delete('/resenhas/reset', (req, res) => {
        database.prepare('DELETE FROM list').run();
        database.prepare("DELETE FROM sqlite_sequence WHERE name = 'list'").run();
        res.json({ mensagem: "Todas as resenhas foram apagadas e os IDs foram zerados!" });
    });


    app.delete('/resenhas/:reviewId', (req, res)=>{
        const {reviewId} = req.params
        const foundedReview = database.prepare('SELECT * FROM list WHERE id = ?').get(reviewId)
        if(!foundedReview){
            res.status(404).json({mensagem: "usuario não encontrado!"})
        }else{
            database.prepare('DELETE FROM list WHERE id = ?').run(reviewId)
            res.json(`user removido`)
           }

        
    })

    

    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    });     