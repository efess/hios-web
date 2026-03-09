import React, { useState, useEffect } from 'react';
import AppNav from './appNav';
import SmokerStatus from './smoker/smokerStatus';
import SmokerHistory from './smoker/smokerHistory';
import SmokerHistoryEntry from './smoker/smokerHistoryEntry';
import UndercabinetLightControl from './undercabinetLightControl';
import RoomStatus from './environment/roomStatus';

interface RouteConfig {
  component: React.ComponentType<{ args: string[] | null }>;
  options: { nav?: 'back' };
}

interface ParsedRoute {
  component: React.ComponentType<{ args: string[] | null }>;
  options: { nav?: 'back' };
  args: string[] | null;
}

const routes: Record<string, RouteConfig> = {
  smokes: { component: SmokerStatus, options: {} },
  smokesHistory: { component: SmokerHistory, options: {} },
  smokesHistoryEntry: { component: SmokerHistoryEntry, options: { nav: 'back' } },
  undercabinet: { component: UndercabinetLightControl, options: {} },
  environment: { component: RoomStatus, options: {} },
};

function parseRoute(hash: string): ParsedRoute {
  const tokens = hash.replace('#', '').split('/').filter(Boolean);
  const route = routes[tokens[0]] ?? routes['smokes']!;
  return {
    component: route.component,
    options: route.options,
    args: tokens.length > 1 ? tokens.slice(1) : null,
  };
}

export default function Router(): React.JSX.Element {
  const [hash, setHash] = useState<string>(window.location.hash);

  useEffect(() => {
    const handler = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const route = parseRoute(hash);
  const Content = route.component;

  return (
    <div>
      <AppNav navOption={route.options.nav} />
      <Content args={route.args} />
    </div>
  );
}
