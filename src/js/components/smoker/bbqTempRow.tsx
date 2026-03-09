import React from 'react';
import { Paper, Grid, Typography, Box } from '@mui/material';
import LabeledValue from './labeledValue';
import TempGraph from './tempGraph';
import SessionOptions from './sessionOptions';
import helperTime from '../../app/helper/time';
import { ProbeHistory } from '../../types/api';

interface CloseSessionPayload {
  tableId: number;
  probeId: number;
  end: number;
  description?: string;
}

interface Props {
  tableId: number;
  name: string;
  target: number;
  start: number;
  probeId: number;
  current: { temp: number };
  history: ProbeHistory;
  closeSession: (payload: CloseSessionPayload) => void;
  targetChange: (probeId: number, target: number) => void;
}

export default function BbqTempRow({
  tableId, name, target, start, probeId, current, history, closeSession, targetChange,
}: Props): React.JSX.Element {
  const graphData = (): [{ timestamp: number; temp: number }[]] => {
    const data = history?.data ?? [];
    return [data.map((d) => ({ timestamp: d.timestamp * 1000, temp: d.temp }))];
  };

  const currentTemp = (): number | string =>
    (current?.temp != null && parseInt(String(current.temp))) || '---';

  const targetTemp = (): number | string =>
    (target != null && parseInt(String(target))) || '---';

  const timeStr = start > 0 ? helperTime.diffString(start, Date.now()) : '';

  return (
    <Paper sx={{ mb: 1, p: 1 }}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
          <TempGraph datasets={graphData()} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h5" color="secondary" fontWeight={700}>{name}</Typography>
            {probeId > 0 && (
              <SessionOptions
                onCloseSession={closeSession}
                probeId={probeId}
                tableId={tableId}
              />
            )}
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography variant="h4" color="primary" fontWeight={700}>{currentTemp()}°</Typography>
              <Typography variant="caption" color="text.secondary">Current</Typography>
            </Grid>
            <Grid item xs={4}>
              <LabeledValue
                color="secondary"
                size="h4"
                value={targetTemp()}
                name="Target"
                change={(v) => targetChange(probeId, Number(v))}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" sx={{ color: '#777' }} fontWeight={700}>{timeStr}</Typography>
              <Typography variant="caption" color="text.secondary">Elapsed</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
