import express from "express";
import cors from 'cors';
import {
  addTournamnet, 
  getAllTournaments, 
  getTournament, 
  joinTournamnet
} from './db/tournaments';
import { addUser, loginUser } from "./db/users";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get('/tournaments', getAllTournaments);
app.post('/tournaments', addTournamnet);
app.get('/tournament/:id', getTournament);
app.post('/tournament/:id', joinTournamnet);
app.post('/users/signup', addUser);
app.post('/users/login', loginUser)

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});