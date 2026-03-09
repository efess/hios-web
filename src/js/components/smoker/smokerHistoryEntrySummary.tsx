import React from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import { SmokerSession } from '../../types/api';

interface Props {
  session: SmokerSession | null;
}

function epochToDateTime(epoch: number): string {
  return new Date(epoch).toLocaleString();
}

function durationToString(start: number, end: number): string {
  const msDiff = end - start;
  const totalMinutes = Math.floor(msDiff / (1000 * 60));
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);
  return `${hours}:${String(minutes).padStart(2, '0')}`;
}

export default function SmokerHistoryEntrySummary({ session }: Props): React.JSX.Element {
  const s = session ?? ({} as Partial<SmokerSession>);

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h5" color="secondary" sx={{ mb: 1 }}>
        {s.name ?? 'Session Details'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="caption" color="text.secondary">Start</Typography>
          <Typography variant="body1">{s.start ? epochToDateTime(s.start) : '--'}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="caption" color="text.secondary">End</Typography>
          <Typography variant="body1">{s.end ? epochToDateTime(s.end) : '--'}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="caption" color="text.secondary">Duration</Typography>
          <Typography variant="body1">
            {s.start && s.end ? durationToString(s.start, s.end) : '--'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption" color="text.secondary">Notes</Typography>
          <Typography variant="body1">{s.description ?? '--'}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
