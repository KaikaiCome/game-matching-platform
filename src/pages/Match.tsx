import React, { useState } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

const MatchPage: React.FC = () => {
  const [matching, setMatching] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const startMatch = async () => {
    setMatching(true);
    setResult(null);
    await new Promise(r => setTimeout(r, 1500));
    setMatching(false);
    setResult('匹配成功，已为你找到 4 名队友！');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
      <Paper sx={{ p: 4, width: 480, maxWidth: '100%', textAlign: 'center' }}>
        <Typography variant="h6" mb={2}>快速匹配</Typography>
        <Stack spacing={2} alignItems="center">
          <Button variant="contained" size="large" onClick={startMatch} disabled={matching}>
            {matching ? '匹配中...' : '开始匹配'}
          </Button>
          {result && <Typography color="success.main">{result}</Typography>}
        </Stack>
      </Paper>
    </Box>
  );
};

export default MatchPage; 