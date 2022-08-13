export interface ITournament {
  id: number;
  tournamentTitle: string;
  owner: string;
  maxParticipants: number;
  tournamentDesc: string;
  participants: string[];
  status: string;
}

export interface IUser {
  id: number;
  username: string;
  password: string;
};