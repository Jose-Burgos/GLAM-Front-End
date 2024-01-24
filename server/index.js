import express from 'express';
import cors from 'cors';

import {MercadoPagoConfig, Preference} from 'mercadopago'

const client = new MercadoPagoConfig({
    accessToken: 'TEST-7724859608309433-012412-faebbe301ddb1f8d6e741d5e2cc80722-1650260579',
})

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

app.get('/',(req,res) => {
    res.send("soy el serverga")
})

app.post('/payment',async (req,res) => {
    try{
        const body = {
            items: [
                {
                title: req.body.title,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.price),
                currency_id : "MXN",
                }
            ],
            back_urls: {
                success: 'localhost:3000',
                failure: 'localhost:3000',
                pending: 'localhost:3000'
            },
            auto_return: 'approved',
        }
        const preference = new Preference(client)
        const result = await preference.create({body})
        res.json({
            id: result.id,
        })
    }catch(err){

        res.status(500).json({
            error: "error al crear la preferencia"
        })
    }  
})

app.listen(port,()=>{
    console.log(`El servidor esta corriendo desde el puerto ${port}`)
})