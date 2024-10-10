import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { List, ListItem, Avatar, Tooltip, CircularProgress , Typography} from '@mui/material';
import { Add as AddIcon, Explore as ExploreIcon } from '@mui/icons-material';
import AddServerDialog from './AddServerDialog';
import { useNavigate } from 'react-router-dom';

const SidebarContainer = styled('div')(({ theme }) => ({
  width: '72px',
  height: '100vh',
  backgroundColor: theme.palette.grey[900],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
  overflowY: 'auto',
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

const Sidebar = ({ servers, onServerSelect, onAddServer, isLoading }) => {
  const [isAddServerDialogOpen, setIsAddServerDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddServer = (newServer) => {
    console.log('New server added:', newServer);
    onAddServer(newServer);
  };

  const handleServerClick = (server) => {
    onServerSelect(server);
    navigate(`/server/${server._id}`);
  }

  return (
    <SidebarContainer>
      <List>
        {isLoading ? (
          <ListItem sx={{ justifyContent: 'center' }}>
            <CircularProgress />
          </ListItem>
        ) : (
          <>
            {servers && servers.length > 0 && servers.map((server) => (
              <ListItem key={server._id} disablePadding sx={{ display: 'flex', justifyContent: 'center' }}>
                <Tooltip title={server.name} placement="right">
                  <ServerIcon onClick={() => handleServerClick(server)}>
                    {server.icon ? (
                      <img src={server.icon} alt={server.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      (server.name && server.name.charAt(0).toUpperCase()) || '?'
                    )}
                  </ServerIcon>
                </Tooltip>
              </ListItem>
            ))}
            <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'center' }}>
              <Tooltip title="Add a Server" placement="right">
                <ServerIcon
                  sx={{ backgroundColor: 'success.main' }}
                  onClick={() => setIsAddServerDialogOpen(true)}
                >
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
          </>
        )}
      </List>
      <AddServerDialog
        open={isAddServerDialogOpen}
        onClose={() => setIsAddServerDialogOpen(false)}
        onAddServer={handleAddServer}
      />
    </SidebarContainer>
  );
};

export default Sidebar;