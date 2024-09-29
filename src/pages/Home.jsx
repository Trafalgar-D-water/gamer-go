import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Box, Typography, Button, Link } from '@mui/material';
import Page from '../components/Page';

const NavBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginLeft: theme.spacing(2),
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: theme.spacing(4),
  paddingTop: `calc(${theme.spacing(4)} + 64px)`,
}));

const HeroSection = styled(Box)(({ theme }) => ({
  maxWidth: '780px',
  marginBottom: theme.spacing(4),
}));

const CTAButton = styled(Button)(({ theme }) => ({
  borderRadius: '28px',
  padding: '16px 32px',
  fontSize: '20px',
  marginTop: theme.spacing(2),
}));

export default function HomePage() {
  return (
    <Page title='Discord | Your Place to Talk and Hang Out'>
      <NavBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Discord
          </Typography>
          <NavLink href="/download">Download</NavLink>
          <NavLink href="/nitro">Nitro</NavLink>
          <NavLink href="/discover">Discover</NavLink>
          <NavLink href="/safety">Safety</NavLink>
          <NavLink href="/support">Support</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/careers">Careers</NavLink>
          <Button color="primary" variant="contained" sx={{ ml: 2 }}>Login</Button>
        </Toolbar>
      </NavBar>
      <ContentStyle>
        <HeroSection>
          <Typography variant="h1" gutterBottom>
            IMAGINE A PLACE...
          </Typography>
          <Typography variant="h5" paragraph>
            ...where you can belong to a school club, a gaming group, or a worldwide art community. 
            Where just you and a handful of friends can spend time together. A place that makes it easy 
            to talk every day and hang out more often.
          </Typography>
        </HeroSection>
        <Box>
          <CTAButton variant="contained" color="primary">
            Download for Windows
          </CTAButton>
          <CTAButton variant="outlined" color="primary" sx={{ ml: 2 }}>
            Open Discord in your browser
          </CTAButton>
        </Box>
      </ContentStyle>
    </Page>
  );
}