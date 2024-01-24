import express from 'express';
import cors from 'cors';

import {MercadoPagoConfig, Preference} from 'mercadopago'

const client = new MercadoPagoConfig({
    accessToken: 'TEST-7817348985886906-112920-1dc2aec458bbbd913436cb47f1718772-1570399463',
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
                success: 'https://www.success.com',
                failure: 'http://www.failure.com',
                pending: 'http://www.pending.com'
            },
            auto_return: 'approved',
        }
        const preference = new Preference(client)
        const result = await preference.create({body})
        res.json({
            id: result.id,
        })
    }catch(err){
        console.log(error)
        res.status(500).json({
            error: "error al crear la preferencia"
        })
    }  
})

app.listen(port,()=>{
    console.log(`El servidor esta corriendo desde el puerto ${port}`)
})