import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AppBar, Box, Container, IconButton, Toolbar, Typography, Button, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import LobbyPage from './pages/Lobby';
import MatchPage from './pages/Match';
import ChatPage from './pages/Chat';
import ProfilePage from './pages/Profile';
import { useAuth } from './hooks/useAuth';

function TopBar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <AppBar position="sticky" color="primary" enableColorOnDark>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          开黑交友平台
        </Typography>
        <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Button color="inherit" component={Link} to="/">大厅</Button>
          <Button color="inherit" component={Link} to="/match">匹配</Button>
          <Button color="inherit" component={Link} to="/chat">聊天</Button>
          <Button color="inherit" component={Link} to="/profile">我的</Button>
        </Stack>
        {user ? (
          <Stack direction="row" spacing={1} sx={{ ml: 2 }}>
            <Typography variant="body2">{user.nickname}</Typography>
            <Button color="inherit" onClick={logout}>退出</Button>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1} sx={{ ml: 2 }}>
            <Button color="inherit" component={Link} to="/login" state={{ from: location.pathname }}>登录</Button>
            <Button color="inherit" component={Link} to="/register">注册</Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Box>
      <TopBar />
      <Container maxWidth="lg" sx={{ mt: 3, mb: 6 }}>
        <Routes>
          <Route path="/" element={<LobbyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/match" element={<ProtectedRoute><MatchPage /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
