import React,  {useState } from 'react';
import axios from 'axios';
import CreateTournament from '../CreateTournament/CreateTournament';

const NewTournament = () => {
  const [trigger, setTrigger] = useState<boolean>(false)

  const triggerPopup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTrigger(true);
  }

  return (
    <div>
      <h3>Create a tournament</h3>
      <button onClick={triggerPopup}>Create!</button>
      <CreateTournament trigger={trigger}/>
    </div>
  );
};

export default NewTournament;