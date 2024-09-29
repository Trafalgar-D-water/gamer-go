import React, { Suspense, lazy } from 'react';
import { Navigate, useRoutes , Outlet} from 'react-router-dom';
import AuthGuard from '../guards/AuthGuard';
// Components
import LoadingScreen from '../components/LoadingScreen';
import EmailVerification from '../pages/auth/EmailVerification';
import { element } from 'prop-types';
// Lazy load pages for better performance
const HomePage = lazy(() => import('../pages/Home'));
const LoginPage = lazy(() => import('../pages/auth/Login'));
const SignupPage = lazy(() => import('../pages/auth/Signup'));

const Dashboard = lazy(() => import('../pages/DashBoard'));

const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// Create wrapped components
const LoadableHomePage = Loadable(HomePage);
const LoadableLoginPage = Loadable(LoginPage);
const LoadableSignupPage = Loadable(SignupPage);
const LoadableEmailVerification = Loadable(EmailVerification);
const LoadableDashboard = Loadable(Dashboard);

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <LoadableHomePage />
    },
    { path: '*', element: <Navigate to="/" replace /> },
    { path: '/login', element: <LoadableLoginPage /> },
    { path: '/signup', element: <LoadableSignupPage /> },
    { path: '/api/user/verify-email', element: <LoadableEmailVerification /> },
    {
      path: '/',
      element: <AuthGuard><Outlet /></AuthGuard>,
      children: [
        { path: 'dashboard', element: <LoadableDashboard /> },
        // Add other protected routes here
      ]
    },
  ]);
}