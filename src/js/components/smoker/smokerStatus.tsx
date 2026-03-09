import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box } from '@mui/material';
import BbqTempRow from './bbqTempRow';
import TopStuff from './topStuff';
import AddSession from './addSession';
import ajax, { AjaxHandle } from '../../app/ajax';
import {
  SmokerStatusResponse,
  SmokerSession,
  ProbeDetail,
  isSmokerStatusResponse,
} from '../../types/api';

const DEVICE_ID = '31316536-6633-3939-2d64-6362372d3436';

interface NewProbe {
  probeId: number;
  meat: string;
  target: number;
}

interface CloseSessionPayload {
  tableId: number;
  probeId: number;
  end: number;
  description?: string;
}

interface SmokerState {
  granularity: number;
  sessions: SmokerSession[];
  probeDetail: ProbeDetail[];
}

export default function SmokerStatus(_props: { args: string[] | null }): React.JSX.Element {
  const [state, setState] = useState<SmokerState>({
    granularity: 10,
    sessions: [],
    probeDetail: [],
  });
  const refreshRef = useRef(true);
  const requestRef = useRef<AjaxHandle | null>(null);
  const granularityRef = useRef(state.granularity);
  granularityRef.current = state.granularity;

  const loadCurrentState = useCallback((gran?: number) => {
    if (requestRef.current) requestRef.current.abort();
    const g = gran ?? granularityRef.current;

    requestRef.current = ajax.post('/api/smokes/getSmokerStatus', {
      gran: g,
      deviceId: DEVICE_ID,
    });

    requestRef.current.promise().then(
      (data: unknown) => {
        if (isSmokerStatusResponse(data)) {
          setState((prev) => ({ ...prev, ...data }));
        }
      },
      (err: unknown) => console.error('Failed getting smoker status:', err)
    );
  }, []);

  useEffect(() => {
    refreshRef.current = true;
    function refresh(): void {
      loadCurrentState();
      setTimeout(() => {
        if (refreshRef.current) refresh();
      }, 5000);
    }
    refresh();
    return () => {
      refreshRef.current = false;
      requestRef.current?.abort();
    };
  }, [loadCurrentState]);

  function granularityChange(granularity: number): void {
    setState((prev) => ({ ...prev, granularity }));
    loadCurrentState(granularity);
  }

  function newProbe(probe: NewProbe): void {
    ajax.post('/api/smokes/newSession', probe)
      .promise()
      .then(() => loadCurrentState(), (err: unknown) => console.error('Failed creating session:', err));
  }

  function closeSession(session: CloseSessionPayload): void {
    ajax.post('/api/smokes/closeSession', session)
      .promise()
      .then(() => loadCurrentState(), (err: unknown) => console.error('Failed closing session:', err));
  }

  function updateTarget(probeId: number, target: number): void {
    ajax.post('/api/smokes/updateProbeTarget', { probeId, deviceId: DEVICE_ID, target })
      .promise()
      .then(() => loadCurrentState(), (err: unknown) => console.error('Failed updating target:', err));
  }

  const { sessions, probeDetail, granularity } = state;
  const probeIds: number[] = [1, 2, 3];
  const takenProbes = sessions.map((s) => s.probeId);
  const availableProbes = probeIds.filter((id) => !takenProbes.includes(id));
  const probeState = probeDetail.map((d) => ({ temp: d.current.temp }));

  return (
    <Box sx={{ p: 1 }}>
      <TopStuff granularity={granularity} probes={probeState} onGranularityChange={granularityChange} />
      {sessions.map((session, i) => (
        <BbqTempRow
          key={i}
          tableId={session.tableId}
          name={session.name}
          target={session.target}
          start={session.start}
          probeId={session.probeId}
          current={probeDetail[session.probeId]?.current ?? { temp: 0 }}
          history={probeDetail[session.probeId]?.history ?? { data: [] }}
          closeSession={closeSession}
          targetChange={updateTarget}
        />
      ))}
      <AddSession availableProbes={availableProbes} onAddProbe={newProbe} />
    </Box>
  );
}
