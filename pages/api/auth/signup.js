import Users from '../../../model/Schema'
import connectMongo from "../../../dbconn/conn"
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export default async function handler(req, res){
    connectMongo().catch(error => res.json({error: "Connection Failed..."}))


    if(req.method === 'POST'){
        if(!req.body) return res.status(404).json({error: "Don't have form data..."})

        const email  = req.body.email
        const password = req.body.password 

         /// check for duplicate users
         const checkexisting = await Users.findOne({email})
         if(checkexisting) return res.status(422).json({message: "User Already Exists...!"})
       

        // hash password
       
        Users.create({email,  password: await bcrypt.hash (password, 12).catch(e => console.log(e))}, function(err, data) {
            if(err) return res.status(404).json({err});
            res.status(201).json({status: true, user: data})

        })
 
    } else {

        res.status(500).json({message: 'HTTP method not valid only POST accepted'})
    }
}