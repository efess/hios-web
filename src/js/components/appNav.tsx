import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Drawer,
  List, ListItemButton, ListItemText, ListSubheader,
  Collapse, Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const locationMap: Record<string, string> = {
  '': 'Home',
  undercabinet: 'Kitchen',
  environment: 'Living Room',
  smokes: 'Smoker',
  smokesHistory: 'Smoker Sessions',
  smokesHistoryEntry: 'Session Details',
};

function currentTitle(): string {
  const hash = window.location.hash.replace('#', '').split('/')[0] ?? '';
  return locationMap[hash] ?? 'HioS';
}

interface AppNavProps {
  navOption?: 'back' | undefined;
}

export default function AppNav({ navOption }: AppNavProps): React.JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [smokerOpen, setSmokerOpen] = useState(false);
  const isBack = navOption === 'back';

  const navigate = (hash: string): void => {
    window.location.hash = hash;
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={isBack ? () => window.history.back() : () => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            {isBack ? <ArrowBackIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentTitle()}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.6 }}>HioS</Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260 }} role="presentation">
          <List
            subheader={
              <ListSubheader component="div" sx={{ bgcolor: 'background.paper', fontWeight: 700 }}>
                HioS Navigation
              </ListSubheader>
            }
          >
            <ListItemButton onClick={() => navigate('#/undercabinet')}>
              <ListItemText primary="Kitchen Lights" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('#/environment')}>
              <ListItemText primary="Living Room" />
            </ListItemButton>
            <ListItemButton onClick={() => setSmokerOpen(!smokerOpen)}>
              <ListItemText primary="Smoker" />
              {smokerOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={smokerOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('#/smokes')}>
                  <ListItemText primary="Current Session" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('#/smokesHistory')}>
                  <ListItemText primary="History" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
