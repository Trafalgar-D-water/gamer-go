import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { IconButton, Badge, Typography, Button } from '@mui/material';
import { useNavigate  , useParams} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InboxIcon from '@mui/icons-material/Inbox';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ViewListIcon from '@mui/icons-material/ViewList';
import Sidebar from '../dashbaord/SideBar';
import Profile from '../dashbaord/Profile';

const LayoutContainer = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
});

const MainContent = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.grey[800],
}));

const Header = styled('div')(({ theme }) => ({
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.grey[900],
  display: 'flex',
  alignItems: 'center',
  height: '64px',
  borderBottom: `1px solid ${theme.palette.grey[700]}`,
}));

const AllServersButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  marginLeft: theme.spacing(1),
}));

const DashboardLayout = ({ children, servers=[], onServerSelect, onAddServer, isLoading, selectedServer }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { serverId } = useParams();

  useEffect(() => {
    if (serverId && servers.length > 0) {
      const server = servers.find(s => s._id === serverId);
      if (server) {
        onServerSelect(server);
      }
    }
  }, [serverId, servers, onServerSelect]);

  const handleProfileClick = () => setIsProfileOpen(true);
  const handleProfileClose = () => setIsProfileOpen(false);
  const handleAllServersClick = () => navigate('/all-servers');

  return (
    <LayoutContainer>
      <Sidebar 
        servers={servers} 
        onServerSelect={onServerSelect} 
        onAddServer={onAddServer} 
        isLoading={isLoading}
      />
      <MainContent>
        <Header>
          <Typography variant="h6" sx={{ color: 'white', flexGrow: 1 }}>
            {selectedServer ? selectedServer.name : 'Home'}
          </Typography>
          <IconButton sx={{ color: 'white' }}>
            <Badge badgeContent={3} color="error">
              <InboxIcon />
            </Badge>
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <HelpOutlineIcon />
          </IconButton>
          <AllServersButton onClick={handleAllServersClick} startIcon={<ViewListIcon />}>
            All Servers
          </AllServersButton>
          <IconButton onClick={handleProfileClick} sx={{ color: 'white' }}>
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Header>
        {children}
      </MainContent>
      {isProfileOpen && <Profile onClose={handleProfileClose} />}
    </LayoutContainer>
  );
};

export default DashboardLayout;