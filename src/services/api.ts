import { Message, Room, User } from '../types';

let rooms: Room[] = [
  {
    id: 'r1',
    title: '今晚上分，来打 LOL 排位',
    game: 'LOL',
    ownerId: 'u_admin',
    members: [
      { id: 'u_admin', username: 'admin', nickname: '队长', games: ['LOL'], rank: 'Platinum' }
    ],
    maxMembers: 5
  },
  {
    id: 'r2',
    title: 'Valorant 无畏契约 组排',
    game: 'Valorant',
    ownerId: 'u_v',
    members: [
      { id: 'u_v', username: 'vuser', nickname: '无畏先锋', games: ['Valorant'], rank: 'Gold' }
    ],
    maxMembers: 5
  }
];

let messages: Message[] = [];

export const Api = {
  async listRooms(params?: { game?: string }) {
    await delay(200);
    if (!params?.game) return rooms;
    return rooms.filter(r => r.game === params.game);
  },
  async createRoom(payload: { title: string; game: string; owner: User }) {
    await delay(200);
    const room: Room = {
      id: 'r_' + Math.random().toString(36).slice(2, 8),
      title: payload.title,
      game: payload.game,
      ownerId: payload.owner.id,
      members: [payload.owner],
      maxMembers: 5
    };
    rooms = [room, ...rooms];
    return room;
  },
  async joinRoom(roomId: string, user: User) {
    await delay(150);
    const room = rooms.find(r => r.id === roomId);
    if (!room) throw new Error('房间不存在');
    if (room.members.find(m => m.id === user.id)) return room;
    if (room.members.length >= room.maxMembers) throw new Error('房间已满');
    room.members.push(user);
    return room;
  },
  async sendMessage(roomId: string, sender: User, content: string) {
    await delay(80);
    const msg: Message = {
      id: 'm_' + Math.random().toString(36).slice(2, 8),
      roomId,
      sender,
      content,
      createdAt: new Date().toISOString()
    };
    messages.push(msg);
    return msg;
  },
  async listMessages(roomId: string) {
    await delay(120);
    return messages.filter(m => m.roomId === roomId).slice(-100);
  }
};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
} 