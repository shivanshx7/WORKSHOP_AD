const fs = require("fs/promises")
const path = require("path")
const express = require("express")
const PORT = 3000

const app = express()
const filePath = path.join(__dirname,"db.json")

let cache = {
    
}

async function readData() {
    try{
        let data = await fs.readFile(filePath,"utf-8")
        return JSON.parse(data)
    }catch(err){
        console.log(err)
    }
}

async function delayReadData() {
   await  new Promise((resolve,reject)=>{
        setTimeout(resolve,1500)
    })
    return await readData()
}

app.get('/',(req,res)=>{
    res.json({print:"Hello World"})
})

app.get('/products',async (req,res)=>{
    let key = req.url;
    let value = cache[key]
    try{
        if (value){
            return res.json(value)
        }
        let products = await delayReadData()
        cache[key] = products
        res.json(products)
    }catch(err){
        console.log(err)
    }

})

app.get('/products/:id',async (req,res)=>{
    let key = req.url;
    let value = cache[key]

    try{
        if (value){
            return res.json(value)
        }
        let id = Number(req.params.id)
        let products = await readData()
        
        let data = products.find(x=>x.id === id)
        cache[key] = products
        res.json(data)
    }catch(err){
        console.log(err)
    }
})

app.listen(PORT,()=>{
    console.log("listening...")
})

