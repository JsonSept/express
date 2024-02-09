import mysql from 'mysql2'
import {config} from 'dotenv'
config()
//creates a connection to your data base
//must also end the connection after every function
// const pool = mysql.createConnection

//pool stores the connection
const pool = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
}).promise()
//.promise allows us to use asyncronise functions

const getFriends = async()=> {
    const [result] = await pool.query(`
        SELECT *
        FROM buds
    `)
    return result
}

// prepared statements
const getFriend = async(id) =>{
    const [result] = await pool.query(`
    SELECT *
    FROM buds
    WHERE id = ?
    `,[id])
    return result
}
const addFriend = async(name, age) => {
    const [friend] = await pool.query(`
    INSERT INTO buds (name,age) VALUES (?,?)
    `,[name, age])
    return getFriend(friend.insertId)
}
const deleteFriend = async(id) => {
    const [result] = await pool.query(`
    DELETE FROM buds where (id) = (?)
    `,[id])
    return result
}

const editFriend = async(name,age,id) => {
    const [friend] = await pool.query(`
    UPdate buds set name = ? ,age = ?
    WHERE (id = ?)  
    `,[name,age,id])
    return friend
}
// console.log(await addFriend('Darren',52));

export {getFriends, getFriend, addFriend , deleteFriend ,editFriend}
