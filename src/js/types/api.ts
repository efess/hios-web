// ─── Temperature / Probe ────────────────────────────────────────────────────

export interface TemperaturePoint {
  timestamp: number;
  temp: number;
}

export interface ProbeHistory {
  data: TemperaturePoint[];
  gran?: number;
}

export interface ProbeDetail {
  current: { temp: number };
  history: ProbeHistory;
}

// ─── Smoker ──────────────────────────────────────────────────────────────────

export interface SmokerSession {
  tableId: number;
  probeId: number;
  name: string;
  target: number;
  start: number;
  end?: number;
  description?: string;
}

export interface SmokerStatusResponse {
  sessions: SmokerSession[];
  probeDetail: ProbeDetail[];
}

export interface HistoryEntry {
  tableId: number;
  probeId: number;
  name: string;
  start: number;
  end: number;
}

export interface SmokerSessionResponse {
  session: SmokerSession;
}

export interface SmokerSessionEventsResponse {
  probeDetail: ProbeDetail[];
}

// ─── Environment ─────────────────────────────────────────────────────────────

export interface EnvironmentHistoryPoint {
  timestamp: number;
  temperature: number;
}

export interface EnvironmentStatusResponse {
  history: EnvironmentHistoryPoint[];
}

// ─── Undercabinet ─────────────────────────────────────────────────────────────

export interface RoomState {
  brightness: number;
  animation: number;
  transition: number;
  color: number;
  pallete?: number[];
}

export interface UndercabinetOptions {
  occupied: RoomState;
  unoccupied: RoomState;
}

export interface UndercabinetStateResponse {
  options: UndercabinetOptions;
  color?: number;
  pallete?: number[];
}

// ─── Type Guards ─────────────────────────────────────────────────────────────

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

export function isSmokerStatusResponse(data: unknown): data is SmokerStatusResponse {
  return (
    isObject(data) &&
    Array.isArray(data['sessions']) &&
    Array.isArray(data['probeDetail'])
  );
}

export function isSmokerSessionResponse(data: unknown): data is SmokerSessionResponse {
  return isObject(data) && isObject(data['session']);
}

export function isSmokerSessionEventsResponse(data: unknown): data is SmokerSessionEventsResponse {
  return isObject(data) && Array.isArray(data['probeDetail']);
}

export function isEnvironmentStatusResponse(data: unknown): data is EnvironmentStatusResponse {
  return isObject(data) && Array.isArray(data['history']);
}

export function isUndercabinetStateResponse(data: unknown): data is UndercabinetStateResponse {
  return isObject(data) && isObject(data['options']);
}

export function isHistoryArray(data: unknown): data is HistoryEntry[] {
  return Array.isArray(data);
}
