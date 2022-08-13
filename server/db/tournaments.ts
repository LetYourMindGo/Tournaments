import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { Request, Response } from 'express';
import { ITournament } from '../types/types';

config();

const uri = `mongodb+srv://admin:${process.env.DB_PASSWORD}@tournaments.45gvb.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

export const addTournamnet = async (req: Request, res: Response) => {
  try {
    const tournament: ITournament = req.body;
    await client.connect();
    await client.db('Platform').collection('Tournaments').insertOne(tournament)
    await client.close();
    res.status(200)
  } catch (error) {
    await client.close();
    console.log(error);
  }
}

export const getAllTournaments = async (_: Request, res: Response) => {
  try {
    await client.connect();
    const tournaments = await client.db('Platform').collection('Tournaments').find().toArray();
    await client.close();
    res.status(200).send(tournaments);
  } catch (error) {
    await client.close();
    console.log(error);
  }
}

export const getTournament = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await client.connect();
    const tournament = await client.db('Platform').collection('Tournaments').findOne({ id });
    await client.close();
    res.status(200).send(tournament)
  } catch (error) {
    await client.close();
    console.log(error);
  }
}

export const getTournamentsByOwner = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    await client.connect();
    const tournaments = await client.db('Platform').collection('Tournaments').find({ owner: username }).toArray();
    await client.close();
    res.status(200).send(tournaments)
  } catch (error) {
    await client.close();
    console.log(error);
  }
}

export const getTournamentsByParticipant = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    await client.connect();
    const tournaments = await client.db('Platform').collection('Tournaments').find({ participants: username }).toArray();
    await client.close();
    res.status(200).send(tournaments)
  } catch (error) {
    await client.close();
    console.log(error);
  }
}

export const joinTournamnet = async (req: Request, res: Response) => {
  try {
    const { tournamentId } = req.params
    const { username } = req.body
    await client.connect();
    await client.db('Platform').collection('Tournaments').updateOne({ id: parseInt(tournamentId, 10) }, { $push: { participants: username } })
    await client.close();
  } catch (error) {
    await client.close();
    console.log(error);
  }
}