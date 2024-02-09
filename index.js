import express from 'express'
import {config} from 'dotenv'
import cors from 'cors'
import {getFriends, getFriend, addFriend ,deleteFriend ,editFriend} from './database.js'
config();

const PORT = process.env.PORT

const app = express();
app.use(cors()) // cross origin resource sharing , use and accept json data from the user
app.use(express.json())
app.use(express.static('public')) // when page loads it must load the index.html

app.get('/friends',async(req,res)=>{
    res.send(await getFriends())
})

app.get('/friends/:id',async(req,res)=> {
    res.send(await getFriend(+req.params.id))
}) // to parse data for a single user

app.post('/friends',async(req,res)=>{
    const {name,age} = req.body //creating 1 variable for name and age
    const post = await addFriend(name,age)
    res.send(await getFriends())
    // const name = required.bode.anme
    // const age = required.bode.age
})// no need for await coz we're not calling a function

app.delete('/friends/delete/:id',async(req,res)=>{ 
    res.send(await deleteFriend(+req.params.id))
})
app.delete('/friends/delete/:id',async(req,res)=>{
    await deleteFriend(+req.params.id)
    res.json(await getFriends())
})

app.patch('/friends/:id',async(req,res)=>{ 
    const [friend] = await getFriend(+req.params.id)
    let {name,age} = req.body
    name? name=name: {name}= friend
    age? age=age: {age}=friend
    console.log(friend);
    await editFriend(name,age,+req.params.id)
    res.json(await getFriends()) //if you want to use just json data thn you have to res.json ,if not stick to res.send
})

    
app.listen(PORT, ()=> {
    console.log('http://localhost:' + PORT);
})



