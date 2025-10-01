import React, { useEffect, useMemo, useState } from 'react';
import { Api } from '../services/api';
import { Room } from '../types';
import { Box, Button, Card, CardActions, CardContent, Chip, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const LobbyPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [game, setGame] = useState('LOL');
  const { user } = useAuth();

  useEffect(() => {
    Api.listRooms().then(r => { setRooms(r); setLoading(false); });
  }, []);

  const canCreate = useMemo(() => !!user && title.trim().length > 0, [user, title]);

  const handleCreate = async () => {
    if (!user) return;
    const room = await Api.createRoom({ title, game, owner: user });
    setRooms(prev => [room, ...prev]);
    setTitle('');
  };

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3} alignItems="center">
        <TextField label="Room Title" value={title} onChange={e => setTitle(e.target.value)} fullWidth />
        <TextField label="Game" value={game} onChange={e => setGame(e.target.value)} sx={{ width: { xs: '100%', sm: 160 } }} />
        <Button variant="contained" disabled={!canCreate} onClick={handleCreate}>Create Room</Button>
      </Stack>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
          {rooms.map(room => (
            <Card key={room.id}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{room.title}</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip label={room.game} size="small" />
                  <Typography variant="body2" color="text.secondary">
                    {room.members.length}/{room.maxMembers}
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions>
                <Button size="small" href={`/chat?roomId=${room.id}`}>Enter Chat</Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default LobbyPage;
