import 'dotenv/config'
import express from "express"
import prisma from './lib/prisma.js'

const app = express();

app.get("/", (req,res) => {
    res.send("You have reached Diana API");
})

app.listen(process.env.PORT, ()=>{
    console.log(`Diana API running on localhost:${process.env.PORT}`)
})

prisma.user.findMany()
  .then(users => console.log('DB connected. Users:', users))
  .catch(err => console.error('DB connection failed:', err))