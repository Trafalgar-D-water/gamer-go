import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Avatar,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../redux/trunk/profileTrunk';

const ProfileDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    minWidth: 400,
  },
}));

const ProfileHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 16,
});

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  marginRight: 16,
}));


//-------------------------------------------------------------------------------------------
const Profile = ({ onClose ,onEditProfile }) => {
    const dispatch = useDispatch();
//   const [profile, setProfile] = useState({
//     username: '',
//     email: '',
//     bio: '',
//   });
    const profile = useSelector((state)=>state.profile)
    // console.log(profile)
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);



  const handleEditProfile = () => {
    onClose();
    navigate('/edit-profile');
  };

  return (
    <ProfileDialog open={true} onClose={onClose}>
      <DialogTitle>
        My Profile
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}
        >
          <CloseIcon />
        </IconButton>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleEditProfile}
          sx={{ position: 'absolute', right: 48, top: 8 }}
        >
          Edit Profile
        </Button>
      </DialogTitle>
      <DialogContent>
        <ProfileHeader>
          <ProfileAvatar src={profile.avatar || "/path/to/default/avatar.jpg"} alt={profile.username} />
          <Typography variant="h6">{profile.username}</Typography>
        </ProfileHeader>
        <Typography variant="body1" gutterBottom>
          <strong>Name:</strong> {profile.username}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Bio:</strong> {profile.bio}
        </Typography>
      </DialogContent>
    </ProfileDialog>
  );
};

export default Profile;