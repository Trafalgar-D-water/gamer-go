import { AppBar, Toolbar, Box, Typography, Button, Link, Grid, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Page from '../components/Page';

const NavBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  margin: '0 16px',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  borderRadius: '28px',
  padding: '16px 32px',
  fontSize: '20px',
}));

export default function HomePage() {
  return (
    <Page title='Discord | Your Place to Talk and Hang Out'>
      <NavBar position="static">
        <Toolbar>
          <Box component="img" src="https://placekitten.com/40/40" alt="Discord Logo" sx={{ height: 40, mr: 2 }} />
          
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            {['Download', 'Nitro', 'Discover', 'Safety', 'Support', 'Blog', 'Careers'].map((item) => (
              <NavLink key={item} href={`/${item.toLowerCase()}`}>{item}</NavLink>
            ))}
          </Box>

          <Button color="primary" variant="contained" href="/login">Login</Button>
        </Toolbar>
      </NavBar>
      <Container maxWidth="lg" sx={{ mt: 8, textAlign: 'center' }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h1" gutterBottom>IMAGINE A PLACE...</Typography>
            <Typography variant="h5" paragraph>
              ...where you can belong to a school club, a gaming group, or a worldwide art community. 
              Where just you and a handful of friends can spend time together. A place that makes it easy 
              to talk every day and hang out more often.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CTAButton variant="contained" color="primary">Download for Windows</CTAButton>
            <CTAButton variant="outlined" color="primary" sx={{ ml: 2 }}>Open Discord in your browser</CTAButton>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}