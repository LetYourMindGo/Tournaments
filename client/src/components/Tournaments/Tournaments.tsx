import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ITournament } from '../../types/types';

const Tournaments = () => {

  const [ tournaments, setTournaments ] = useState<ITournament[]>([])
  const getTournaments = async () => {
    const allTournaments: ITournament[] =  (await axios.get('http://localhost:8080/tournaments')).data
    setTournaments(allTournaments);
  }
  
  useEffect (() => {
    getTournaments();
  }, [])

  return (
    <div>
      {tournaments.map(tournament => {
        return(
          <div>
            <p>tournament.tournamentTitle</p>
            <p>tournament.maxParticipants</p>
          </div>
        ) 
      })}
    </div>
  );
};

export default Tournaments;