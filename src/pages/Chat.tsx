import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Api } from '../services/api';
import { Message, Room } from '../types';
import { useAuth } from '../hooks/useAuth';
import { Box, Button, Divider, List, ListItemButton, ListItemText, Paper, Stack, TextField, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState('');
  const [params] = useSearchParams();
  const listBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    Api.listRooms().then(list => {
      setRooms(list);
      const initial = params.get('roomId') || list[0]?.id || '';
      setCurrentRoomId(initial);
    });
  }, [params]);

  useEffect(() => {
    if (!currentRoomId) return;
    Api.listMessages(currentRoomId).then(setMessages);
  }, [currentRoomId]);

  useEffect(() => {
    listBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const room = useMemo(() => rooms.find(r => r.id === currentRoomId), [rooms, currentRoomId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !room || !content.trim()) return;
    const msg = await Api.sendMessage(room.id, user, content.trim());
    setMessages(prev => [...prev, msg]);
    setContent('');
  };

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      <Paper sx={{ p: 2, width: { xs: '100%', md: 260 }, flexShrink: 0 }}>
        <Typography variant="subtitle1" mb={1}>房间</Typography>
        <List dense>
          {rooms.map(r => (
            <ListItemButton key={r.id} selected={r.id === currentRoomId} onClick={() => setCurrentRoomId(r.id)}>
              <ListItemText primary={r.title} secondary={`${r.game} · ${r.members.length}/${r.maxMembers}`} />
            </ListItemButton>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 0, flex: 1, minHeight: 420, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">{room?.title || '选择一个房间'}</Typography>
          <Typography variant="body2" color="text.secondary">{room?.game}</Typography>
        </Box>
        <Divider />
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          {messages.map(m => (
            <Box key={m.id} sx={{ mb: 1.5 }}>
              <Typography variant="caption" color="text.secondary">{m.sender.nickname} · {new Date(m.createdAt).toLocaleTimeString()}</Typography>
              <Typography variant="body1">{m.content}</Typography>
            </Box>
          ))}
          <div ref={listBottomRef} />
        </Box>
        <Divider />
        <Box component="form" onSubmit={handleSend} sx={{ p: 2, display: 'flex', gap: 1 }}>
          <TextField value={content} onChange={e => setContent(e.target.value)} fullWidth placeholder="输入消息..." />
          <Button type="submit" variant="contained">发送</Button>
        </Box>
      </Paper>
    </Stack>
  );
};

export default ChatPage; 