import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Button, Tabs, Tab, Typography ,IconButton } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';
import StoreIcon from '@mui/icons-material/Store';
import DashboardLayout from '../components/layouts/DashboardLayout';
import ServerWelcomeScreen from '../components/server/ServerWelcomeScreen';
import { fetchUSerServers as fetchUserServers } from '../service/serverService';
import Page from '../components/Page';

const DashboardContainer = styled('div')({
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

export const HEADER_HEIGHT = '64px';

const Header = styled('div')(({ theme }) => ({
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.grey[900],
  display: 'flex',
  alignItems: 'center',
  height: HEADER_HEIGHT,
  borderBottom: `1px solid ${theme.palette.grey[700]}`,
}));

const ContentArea = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  overflow: 'hidden',
  width: '100%',
}));

const FriendsSidebar = styled('div')(({ theme }) => ({
  width: '240px',
  backgroundColor: theme.palette.grey[800],
  borderRight: `1px solid ${theme.palette.grey[700]}`,
  display: 'flex',
  flexDirection: 'column',
}));

const FriendsHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.grey[700]}`,
}));

const FriendsList = styled('div')(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
}));

const MainArea = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  alignItems: 'center',
  justifyContent: 'center',
}));

const WumpusImage = styled('img')({
  width: '400px',
  marginBottom: '20px',
});

const SearchBar = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    height: '28px',
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(0, 1),
  },
}));

const HeaderTabs = styled(Tabs)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  '& .MuiTab-root': {
    minWidth: 'auto',
    padding: theme.spacing(1, 2),
    color: theme.palette.grey[400],
    '&.Mui-selected': {
      color: theme.palette.common.white,
    },
  },
}));

const ServerListButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  marginRight: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.grey[700],
  },
}));

const AllServersButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  marginLeft: theme.spacing(1),
}));

const JoinButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

const Dashboard = () => {
  const [servers, setServers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedServer, setSelectedServer] = useState(null);
  const [friendsTab, setFriendsTab] = useState(0);

  useEffect(() => {
    const loadServers = async () => {
      try {
        setIsLoading(true);
        const userServers = await fetchUserServers();
        if (userServers && userServers.length > 0) {
          setServers(userServers);
        }
      } catch (error) {
        console.error('Failed to load servers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadServers();
  }, []);

  const handleAddServer = (newServer) => {
    setServers(prevServers => [...prevServers, {
      id: newServer.guildId,
      name: newServer.data.name,
    }]);
  };

  const handleServerSelect = (server) => {
    setSelectedServer(server);
  };

  const handleFriendsTabChange = (event, newValue) => setFriendsTab(newValue);

  const handleAllServersClick = () => {
    // Implement the logic to show all servers
    console.log('Show all servers');
  };

  return (
    <Page title='Discord | Your Place to Talk and Hang Out'>
      <DashboardLayout 
        servers={servers}
        onServerSelect={handleServerSelect}
        onAddServer={handleAddServer}
        isLoading={isLoading}
        selectedServer={selectedServer}
        onAllServersClick={handleAllServersClick}
      >
        <ContentArea>
          {selectedServer ? (
            <ServerWelcomeScreen server={selectedServer} />
          ) : (
            <>
              <FriendsSidebar>
                <FriendsHeader>
                  <SearchBar
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Search"
                    sx={{ backgroundColor: theme => theme.palette.grey[700] }}
                  />
                  <HeaderTabs
                    value={friendsTab}
                    onChange={handleFriendsTabChange}
                    variant="fullWidth"
                    sx={{ mt: 2 }}
                  >
                    <Tab icon={<PeopleAltIcon />} label="Online" />
                    <Tab icon={<GroupIcon />} label="All" />
                    <Tab icon={<ForumIcon />} label="Pending" />
                    <Tab icon={<StoreIcon />} label="Blocked" />
                  </HeaderTabs>
                </FriendsHeader>
                <FriendsList>
                  {/* Friend list items would go here */}
                </FriendsList>
              </FriendsSidebar>
              <MainArea>
                <WumpusImage src="/path/to/wumpus-image.png" alt="Wumpus" />
                <Typography variant="h5" sx={{ color: 'white', mb: 2 }}>
                  No one's around to play with Wumpus.
                </Typography>
                <Button variant="contained" color="primary">
                  Add Friend
                </Button>
              </MainArea>
            </>
          )}
        </ContentArea>
      </DashboardLayout>
    </Page>
  );
};

export default Dashboard;