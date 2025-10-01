import React, { useState } from 'react';
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await register({ username, password, nickname });
    setLoading(false);
    navigate('/', { replace: true });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Paper sx={{ p: 4, width: 420, maxWidth: '100%' }}>
        <Typography variant="h5" mb={2}>注册</Typography>
        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
          <TextField label="用户名" value={username} onChange={e => setUsername(e.target.value)} required />
          <TextField type="password" label="密码" value={password} onChange={e => setPassword(e.target.value)} required />
          <TextField label="昵称" value={nickname} onChange={e => setNickname(e.target.value)} required />
          <Button type="submit" variant="contained" disabled={loading}>{loading ? '注册中...' : '注册'}</Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default RegisterPage; 