const fs = require("fs/promises")
const path = require("path")
const express = require("express")
const PORT = 3000

const app = express()
const filePath = path.join(__dirname,"db.json")

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
    let products = await readData()
    res.json(products)

})

app.get('/products/:id',async (req,res)=>{
    try{
        let id = Number(req.params.id)
        let products = await readData()
        let data = products.find(x=>x.id === id)
        res.json(data)
    }catch(err){
        console.log(err)
    }
})

app.listen(PORT,()=>{
    console.log("listening...")
})