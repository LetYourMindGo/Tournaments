import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { IUser } from '../types/types';

config();

const hash = async( password: string | Buffer) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

const uri = `mongodb+srv://admin:${process.env.DB_PASSWORD}@tournaments.45gvb.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

export const addUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    user.password = await hash(user.password)
    await client.connect();
    const userExists = await client.db('Platform').collection('Users').findOne({username: user.username})
    if (userExists) {
      await client.close();
      res.status(200).send('User already exists');
    }
    await client.db('Platform').collection('Users').insertOne(user)
    await client.close();
    res.status(200).send();
  } catch (error) {
    await client.close();
    console.log(error);
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const loginUser = req.body
    console.log(loginUser);
    
    await client.connect();
    const user = await client.db('Platform').collection('Users').findOne({ username: loginUser.username });
    console.log(user);
    
    if(!user) {
      return res.status(200).send({id: 0, username: 'No username found.', password: 'No username found.'});
    }
    const validate = await bcrypt.compare(loginUser.password, user?.password);
    if (!validate) {
      return res.status(401).send('Wrong password');
    }
    await client.close();
    res.status(200).send((user?.id).toString());
  } catch (error) {
    await client.close();
    console.log(error);
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body
    await client.connect();
    const user = await client.db('Platform').collection('Users').findOne({ username })
    await client.close();
    res.sendStatus(200).send(user)
  } catch (error) {
    await client.close();
    console.log(error);
  }
}



