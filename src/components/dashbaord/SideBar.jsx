import React from 'react';
import { styled } from '@mui/material/styles';
import { List, ListItem, Avatar, Tooltip } from '@mui/material';
import { Add as AddIcon, Explore as ExploreIcon } from '@mui/icons-material';

const SidebarContainer = styled('div')(({ theme }) => ({
  width: '72px',
  height: 'calc(100vh - 24px)', // Slightly shorter than viewport
  backgroundColor: theme.palette.grey[900],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
  overflowY: 'auto',
  position: 'fixed',
  left: '12px',
  top: '12px',
  borderRadius: '16px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
}));

const ServerIcon = styled(Avatar)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  margin: theme.spacing(0.5, 0),
  cursor: 'pointer',
  transition: 'border-radius 0.3s ease',
  '&:hover': {
    borderRadius: '30%',
  },
}));

const Sidebar = () => {
  const servers = ['D', 'S1', 'S2', 'S3', 'S4'];

  return (
    <SidebarContainer>
      <ServerIcon sx={{ backgroundColor: 'primary.main' }}>D</ServerIcon>
      <List>
        {servers.map((server, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'flex', justifyContent: 'center' }}>
            <Tooltip title={`Server ${index + 1}`} placement="right">
              <ServerIcon>{server}</ServerIcon>
            </Tooltip>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip title="Add a Server" placement="right">
            <ServerIcon sx={{ backgroundColor: 'success.main' }}>
              <AddIcon />
            </ServerIcon>
          </Tooltip>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip title="Explore Public Servers" placement="right">
            <ServerIcon sx={{ backgroundColor: 'info.main' }}>
              <ExploreIcon />
            </ServerIcon>
          </Tooltip>
        </ListItem>
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;