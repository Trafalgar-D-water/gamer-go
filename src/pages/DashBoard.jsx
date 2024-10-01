import React ,{useState} from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, TextField, Button  ,IconButton} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Sidebar from '../components/dashbaord/SideBar';
import Profile from '../components/dashbaord/Profile';

const DashboardContainer = styled('div')({
  display: 'flex',
  height: '100vh',
  overflow: 'hidden',
});

const MainContent = styled('div')(({ theme }) => ({
  flex: 1,
  marginLeft: '84px', // Adjust for the floating sidebar
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.grey[800],
}));

const Header = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[900],
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const ContentArea = styled('div')(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  overflowY: 'auto',
}));

const TopGroups = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const GroupContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(2),
}));

const GroupBox = styled('div')(({ theme }) => ({
  width: '30%',
  height: '100px',
  backgroundColor: theme.palette.grey[700],
  borderRadius: theme.shape.borderRadius,
}));

const Dashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const handleProfileClick = () => {
    setIsProfileOpen(true);
  };

  const handleProfileClose = () => {
    setIsProfileOpen(false);
  };
  return (
    <DashboardContainer>
      <Sidebar />
      <MainContent>
        <Header>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            sx={{ backgroundColor: 'grey.700', borderRadius: 1 }}
          />
          <IconButton onClick={handleProfileClick} sx={{ color: 'white' }}>
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Header>
        <ContentArea>
          <Typography variant="h4" gutterBottom>
            Welcome to your Dashboard!
          </Typography>
          <Button variant="contained" color="primary">
            Start Video Call
          </Button>
          <TopGroups>
            <Typography variant="h6" gutterBottom>
              Top Group's
            </Typography>
            <GroupContainer>
              <GroupBox />
              <GroupBox />
              <GroupBox />
            </GroupContainer>
          </TopGroups>
        </ContentArea>
      </MainContent>
      {isProfileOpen && <Profile onClose={handleProfileClose} />}
    </DashboardContainer>
  );
};

export default Dashboard;