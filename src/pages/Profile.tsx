import React, { useState } from 'react';
import { Box, Button, Chip, Paper, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [bio, setBio] = useState(user?.bio || '');

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start">
      <Paper sx={{ p: 3, width: 560, maxWidth: '100%' }}>
        <Typography variant="h6" mb={2}>个人资料</Typography>
        <Stack spacing={2}>
          <Typography>昵称：{user?.nickname}</Typography>
          <Typography>段位：{user?.rank}</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>常玩游戏：</Typography>
            {(user?.games || []).map(g => <Chip key={g} label={g} size="small" />)}
          </Stack>
          <TextField label="签名" value={bio} onChange={e => setBio(e.target.value)} multiline minRows={3} />
          <Button variant="contained">保存</Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ProfilePage; 