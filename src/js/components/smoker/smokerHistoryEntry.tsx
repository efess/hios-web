import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ajax from '../../app/ajax';
import { SmokerSession, isSmokerSessionResponse } from '../../types/api';
import SmokerHistoryEntrySummary from './smokerHistoryEntrySummary';
import SmokerHistoryGraph from './smokerHistoryGraph';

const DEVICE_ID = '31316536-6633-3939-2d64-6362372d3436';

export default function SmokerHistoryEntry({ args }: { args: string[] | null }): React.JSX.Element {
  const [session, setSession] = useState<SmokerSession | null>(null);
  const sessionId = args?.[0] ?? null;

  useEffect(() => {
    if (!sessionId) return;
    const req = ajax.post('/api/smokes/getSmokerSession', { deviceId: DEVICE_ID, sessionId });
    req.promise().then(
      (data: unknown) => {
        if (isSmokerSessionResponse(data)) setSession(data.session);
      },
      (err: unknown) => console.error('Failed getting session:', err)
    );
    return () => req.abort();
  }, [sessionId]);

  return (
    <Box sx={{ p: 1 }}>
      <SmokerHistoryEntrySummary session={session} />
      <SmokerHistoryGraph sessionId={sessionId} />
    </Box>
  );
}
