import express from 'express'
import {config} from 'dotenv'
import cors from 'cors'
import {getFriends, getFriend, addFriend} from './database.js'
config()

const PORT = process.env.PORT || 9000

const app = express();
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.get('/friends',async(req,res)=>{
    res.send(await getFriends())
})

app.listen(PORT, ()=> {
    console.log('http://localhost:' + PORT);
})
