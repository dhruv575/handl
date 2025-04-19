import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GlobalStyle } from './assets/styles';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Friends from './pages/Friends';
import UserProfile from './pages/UserProfile';
import Feed from './pages/Feed';

// Placeholder for pages not yet implemented
const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h1>{title}</h1>
    <p>This page is under construction. Check back soon!</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<Layout><Home /></Layout>} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main app routes */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/calendar" element={<Layout><Calendar /></Layout>} />
          <Route path="/friends" element={<Layout><Friends /></Layout>} />
          <Route path="/profile/:username" element={<Layout><UserProfile /></Layout>} />
          <Route path="/feed" element={<Layout><Feed /></Layout>} />

          {/* 404 route */}
          <Route path="*" element={<PlaceholderPage title="404 - Page Not Found" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
