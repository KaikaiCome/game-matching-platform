import React, { useState } from 'react';
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation() as any;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login({ username, password });
    setLoading(false);
    const to = location?.state?.from || '/';
    navigate(to, { replace: true });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Paper sx={{ p: 4, width: 400, maxWidth: '100%' }}>
        <Typography variant="h5" mb={2}>登录</Typography>
        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
          <TextField label="用户名" value={username} onChange={e => setUsername(e.target.value)} required />
          <TextField type="password" label="密码" value={password} onChange={e => setPassword(e.target.value)} required />
          <Button type="submit" variant="contained" disabled={loading}>{loading ? '登录中...' : '登录'}</Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default LoginPage; 