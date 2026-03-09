import React, { useState, useEffect, useRef } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography, Box,
} from '@mui/material';
import ajax, { AjaxHandle } from '../../app/ajax';
import time from '../../app/time';
import { HistoryEntry, isHistoryArray } from '../../types/api';

const DEVICE_ID = '31316536-6633-3939-2d64-6362372d3436';

export default function SmokerHistory(_props: { args: string[] | null }): React.JSX.Element {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const requestRef = useRef<AjaxHandle | null>(null);

  useEffect(() => {
    requestRef.current = ajax.post('/api/smokes/getHistory', { deviceId: DEVICE_ID });
    requestRef.current.promise().then(
      (data: unknown) => {
        if (isHistoryArray(data)) setHistory(data);
      },
      (err: unknown) => console.error('Failed getting history:', err)
    );
    return () => requestRef.current?.abort();
  }, []);

  function rowClicked(hist: HistoryEntry): void {
    window.location.hash = `smokesHistoryEntry/${hist.tableId}`;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
        Smoker Sessions
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Probe</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>End</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">No sessions found</TableCell>
              </TableRow>
            ) : (
              history.map((hist, idx) => (
                <TableRow key={idx} hover onClick={() => rowClicked(hist)} sx={{ cursor: 'pointer' }}>
                  <TableCell>{hist.tableId}</TableCell>
                  <TableCell>{hist.probeId}</TableCell>
                  <TableCell>{hist.name}</TableCell>
                  <TableCell>{time.secondsToDuration((hist.end - hist.start) / 1000)}</TableCell>
                  <TableCell>{new Date(hist.end).toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
