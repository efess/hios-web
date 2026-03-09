import React, { useState, useEffect, useRef } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import ajax, { AjaxHandle } from '../app/ajax';
import RoomStateSettings from './roomStateSettings';
import { RoomState, isUndercabinetStateResponse } from '../types/api';

export default function UndercabinetLightControl(_props: { args: string[] | null }): React.JSX.Element {
  const [tabValue, setTabValue] = useState(0);
  const [occupied, setOccupied] = useState<RoomState | null>(null);
  const [unoccupied, setUnoccupied] = useState<RoomState | null>(null);
  const requestRef = useRef<AjaxHandle | null>(null);

  function sendUpdate(occ: RoomState | null, unocc: RoomState | null): void {
    const payload = {
      color: occ?.color ?? 0,
      options: { occupied: occ, unoccupied: unocc },
    };
    ajax.post('/api/undercabinet/changeOptions', JSON.stringify(payload), {
      contentType: 'application/json; charset=utf-8',
    });
  }

  useEffect(() => {
    requestRef.current = ajax.post('/api/undercabinet/getState', '');
    requestRef.current.promise().then(
      (data: unknown) => {
        if (isUndercabinetStateResponse(data)) {
          setOccupied(data.options.occupied);
          setUnoccupied(data.options.unoccupied);
        }
      },
      (err: unknown) => console.error('Failed getting undercabinet state:', err)
    );
    return () => requestRef.current?.abort();
  }, []);

  function updateOccupied(key: keyof RoomState, value: RoomState[keyof RoomState]): void {
    const next: RoomState = { ...(occupied ?? defaultRoomState()), [key]: value };
    setOccupied(next);
    sendUpdate(next, unoccupied);
  }

  function updateUnoccupied(key: keyof RoomState, value: RoomState[keyof RoomState]): void {
    const next: RoomState = { ...(unoccupied ?? defaultRoomState()), [key]: value };
    setUnoccupied(next);
    sendUpdate(occupied, next);
  }

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={(_, v: number) => setTabValue(v)}>
          <Tab label="Occupied" />
          <Tab label="Unoccupied" />
        </Tabs>
      </Box>
      <Box sx={{ mt: 2 }}>
        {tabValue === 0 && <RoomStateSettings data={occupied} updateValue={updateOccupied} />}
        {tabValue === 1 && <RoomStateSettings data={unoccupied} updateValue={updateUnoccupied} />}
      </Box>
    </Box>
  );
}

function defaultRoomState(): RoomState {
  return { brightness: 4, animation: 0, transition: 0, color: 0 };
}
