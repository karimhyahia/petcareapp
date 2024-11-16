import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Feeding from './pages/Feeding';
import Gallery from './pages/Gallery';
import Insurance from './pages/Insurance';
import Imprint from './pages/Legal/Imprint';
import Privacy from './pages/Legal/Privacy';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  return user ? <Navigate to="/app" replace /> : <>{children}</>;
}

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/impressum" element={<Imprint />} />
        <Route path="/datenschutz" element={<Privacy />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <Layout>
                <Home />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/app/calendar"
          element={
            <PrivateRoute>
              <Layout>
                <Calendar />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/app/feeding"
          element={
            <PrivateRoute>
              <Layout>
                <Feeding />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/app/gallery"
          element={
            <PrivateRoute>
              <Layout>
                <Gallery />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/app/insurance"
          element={
            <PrivateRoute>
              <Layout>
                <Insurance />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/app/profile"
          element={
            <PrivateRoute>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to={user ? "/app" : "/"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;