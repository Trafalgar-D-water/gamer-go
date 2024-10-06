import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, IconButton, Typography, Button, Tabs, Tab, Badge, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InboxIcon from '@mui/icons-material/Inbox';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';
import StoreIcon from '@mui/icons-material/Store';
import Sidebar from '../components/dashbaord/SideBar';
import Profile from '../components/dashbaord/Profile';
import Page from '../components/Page';
import ServerWelcomeScreen from '../components/server/ServerWelcomeScreen';
import { fetchUSerServers as fetchUserServers } from '../service/serverService';


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

export const HEADER_HEIGHT = '64px'; // Adjust this value as needed

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

const Dashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [servers , setServers] = useState([])
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
        // Optionally, you can set an error state here to display to the user
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
      // Add other necessary properties
    }]);
  };
//  useEffect(()=>{
//     const loadServers = async () =>{
//       try{
//         const userServers = await fetchUSerServers();
//         setServer(userServers)
//       }
//       catch(error){
//         console.error('failed to load servers ' , error)
//       }
//     }
//     loadServers()
//   },[])


  const handleProfileClick = () => setIsProfileOpen(true);
  const handleProfileClose = () => setIsProfileOpen(false);
  const handleServerSelect = (server) => setSelectedServer(server);
  const handleFriendsTabChange = (event, newValue) => setFriendsTab(newValue);

  return (
    <Page title='Discord | Your Place to Talk and Hang Out'>
      <DashboardContainer>
        <Sidebar servers={servers} onServerSelect={handleServerSelect} onAddServer={handleAddServer}  isLoading={isLoading}/>
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
            <IconButton onClick={handleProfileClick} sx={{ color: 'white' }}>
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          </Header>
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
        </MainContent>
        {isProfileOpen && <Profile onClose={handleProfileClose} />}
      </DashboardContainer>
    </Page>
  );
};

export default Dashboard;