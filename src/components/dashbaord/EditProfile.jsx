import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {useDispatch , useSelector} from 'react-redux'
import {
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  Box,
  Checkbox,
  FormControlLabel,
  Chip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {updateProfileField} from '../../redux/slices/profileSlice'

const PageContainer = styled(Box)({
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#121212',
  color: '#ffffff',
});

const ProfileContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(4),
  overflowY: 'auto',
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  marginBottom: theme.spacing(2),
}));

const ProfileField = styled(TextField)(({ theme }) => ({
  marginBottom: 16,
  '& .MuiInputBase-input': {
    color: theme.palette.common.white,
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.grey[500],
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.grey[700],
    },
    '&:hover fieldset': {
      borderColor: theme.palette.grey[500],
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const EditProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state)=>state.profile)
//   const [profile, setProfile] = useState({
//     username: '',
//     avatar: '',
//     bio: '',
//     role: { isPlayer: true, isCoach: false },
//     skills: [],
//     gamePreferences: [],
//     rank: '',
//     coachProfile: {
//       experience: '',
//       coachingSpecializations: [],
//       rates: 0,
//       availability: { days: [], times: { start: '', end: '' } },
//     },
//     preferences: { theme: 'dark', notifications: true },
//   });
  const navigate = useNavigate();

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const response = await fetch('/api/profile');
//       const data = await response.json();
//       setProfile(data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };

const handleFieldChange = (field) => (event) => {
    dispatch(updateProfileField({ field, value: event.target.value }));
  };

  const handleRoleChange = (role) => (event) => {
    dispatch(updateProfileField({
      field: 'role',
      value: { ...profile.role, [role]: event.target.checked },
    }));
  };

  const handleSkillsChange = (event) => {
    dispatch(updateProfileField({ field: 'skills', value: event.target.value }));
  };

  const handleCoachProfileChange = (field) => (event) => {
    dispatch(updateProfileField({
      field: 'coachProfile',
      value: { ...profile.coachProfile, [field]: event.target.value },
    }));
  };

  const handlePreferencesChange = (field) => (event) => {
    dispatch(updateProfileField({
      field: 'preferences',
      value: { ...profile.preferences, [field]: event.target.value },
    }));
  };

  const handleSave = async () => {
    try {
    //   await fetch('/api/profile', {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(profile),
    //   });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <PageContainer>
      <ProfileContainer maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Edit Profile
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <ProfileAvatar src={profile.avatar} alt={profile.username} />
          <Button variant="outlined" color="primary">
            Change Avatar
          </Button>
        </Box>
        <ProfileField
          label="Username"
          value={profile.username}
          onChange={handleFieldChange('username')}
          fullWidth
          variant="outlined"
        />
        <ProfileField
          label="Bio"
          value={profile.bio}
          onChange={handleFieldChange('bio')}
          fullWidth
          variant="outlined"
          multiline
          rows={4}
        />
        <Box mb={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={profile.role.isPlayer}
                onChange={handleRoleChange('isPlayer')}
                color="primary"
              />
            }
            label="Player"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={profile.role.isCoach}
                onChange={handleRoleChange('isCoach')}
                color="primary"
              />
            }
            label="Coach"
          />
        </Box>
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel>Skills</InputLabel>
          <Select
            multiple
            value={profile.skills}
            onChange={handleSkillsChange}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {['Skill 1', 'Skill 2', 'Skill 3'].map((skill) => (
              <MenuItem key={skill} value={skill}>
                {skill}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ProfileField
          label="Rank"
          value={profile.rank}
          onChange={handleFieldChange('rank')}
          fullWidth
          variant="outlined"
        />
        {profile.role.isCoach && (
          <>
            <Typography variant="h6" gutterBottom>
              Coach Profile
            </Typography>
            <ProfileField
              label="Experience"
              value={profile.coachProfile.experience}
              onChange={handleCoachProfileChange('experience')}
              fullWidth
              variant="outlined"
              multiline
              rows={3}
            />
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel>Coaching Specializations</InputLabel>
              <Select
                multiple
                value={profile.coachProfile.coachingSpecializations}
                onChange={handleCoachProfileChange('coachingSpecializations')}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {['Specialization 1', 'Specialization 2', 'Specialization 3'].map((spec) => (
                  <MenuItem key={spec} value={spec}>
                    {spec}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <ProfileField
              label="Rates"
              type="number"
              value={profile.coachProfile.rates}
              onChange={handleCoachProfileChange('rates')}
              fullWidth
              variant="outlined"
            />
          </>
        )}
        <Typography variant="h6" gutterBottom>
          Preferences
        </Typography>
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel>Theme</InputLabel>
          <Select
            value={profile.preferences.theme}
            onChange={handlePreferencesChange('theme')}
            label="Theme"
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={profile.preferences.notifications}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  preferences: { ...profile.preferences, notifications: e.target.checked },
                })
              }
              color="primary"
            />
          }
          label="Enable Notifications"
        />
        <Box display="flex" justifyContent="flex-end" mt={4}>
          <Button variant="outlined" onClick={() => navigate('/dashboard')} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      </ProfileContainer>
    </PageContainer>
  );
};

export default EditProfile;