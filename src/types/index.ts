export interface User {
  id: string;
  username: string;
  nickname: string;
  avatarUrl?: string;
  games: string[];
  rank?: string;
  bio?: string;
}

export interface Room {
  id: string;
  title: string;
  game: string;
  ownerId: string;
  members: User[];
  maxMembers: number;
  voiceChannel?: string;
}

export interface Message {
  id: string;
  roomId: string;
  sender: User;
  content: string;
  createdAt: string;
} 