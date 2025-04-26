

import React from 'react';
import { Box, Typography, Button, Tooltip, IconButton } from '@mui/material';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Home, Search, AutoGraph, BookmarkBorder, Person,
  RocketLaunch, Menu, Close, Add
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import LaptopIcon from '@mui/icons-material/Laptop';
import AddPostModal from "../AddPostModal";

export default function Leftsidebar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [addPostOpen, setAddPostOpen] = useState(false);


  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { icon: <Home />, text: "Home", path: "/home" },
    { icon: <AutoGraph />, text: "Learning Paths", path: "/learning-plans" },
    { icon: <Person />, text: "Profile", path: "/profile" },
  ];

  const renderNavItems = () => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.path}
          component={Link}
          to={item.path}
          startIcon={item.icon}
          sx={{
            textTransform: 'none',
            color: isActive(item.path) ? '#A324ED' : '#555',
            fontWeight: isActive(item.path) ? '600' : '500',
            backgroundColor: isActive(item.path) ? 'rgba(33, 150, 243, 0.1)' : 'transparent',
            borderRadius: '8px',
            py: 1.2,
            px: 2,
            justifyContent: { xs: 'center', md: 'flex-start' },
            width: '100%',
            '&:hover': {
              backgroundColor: 'rgba(33, 150, 243, 0.08)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <Box sx={{ display: { xs: 'none', md: 'block' }, ml: 1 }}>
            {item.text}
          </Box>
        </Button>
      ))}
    </>
  );

  // Mobile menu toggle button
  const mobileMenuToggle = (
    <Box 
      sx={{ 
        display: { xs: 'flex', md: 'none' }, 
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1100,
      }}
    >
      <IconButton 
        onClick={toggleMobileMenu}
        sx={{ 
          backgroundColor: '#2196f3',
          color: 'white',
          boxShadow: '0 2px 10px rgba(33, 150, 243, 0.3)',
          '&:hover': {
            backgroundColor: '#1976d2',
            transform: 'scale(1.05)'
          },
          transition: 'all 0.2s ease',
        }}
      >
        {mobileOpen ? <Close /> : <Menu />}
      </IconButton>
    </Box>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        sx={{
          width: { xs: 0, md: 240 },
          flexShrink: 0,
          height: '100vh',
          position: 'sticky',
          top: 0,
          borderRight: '1px solid rgba(0, 0, 0, 0.08)',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          bgcolor: '#FFFFFF',
          px: 2,
          py: 3,
          gap: 2,
          overflow: 'hidden',
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, px: 1 }}>
          <LaptopIcon sx={{ 
            color: '#A324ED', 
            mr: 1, 
            fontSize: 28,
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            borderRadius: '8px',
            p: 0.5
          }} />
          <Typography
            variant="h5"
            component={Link}
            to="/home"
            sx={{
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
              color: '#A324ED',
              fontWeight: '600',
            }}
          >
            SmartScholars
          </Typography>
        </Box>

        {/* Navigation Items */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {renderNavItems()}
        </Box>

        {/* Create New Post Button */}
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setAddPostOpen(true)}

          sx={{
            mt: 'auto',
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            py: 1.2,
            backgroundColor: '#A324ED',
            '&:hover': {
              backgroundColor: '#A324ED',
            },
            transition: 'all 0.2s ease',
          }}
        >
          New Post
        </Button>
      </Box>

      {/* Mobile Bottom Navigation */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 60,
          backgroundColor: 'white',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          zIndex: 1000,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        {navItems.map((item) => (
          <Tooltip key={item.path} title={item.text} placement="top">
            <IconButton
              component={Link}
              to={item.path}
              sx={{
                color: isActive(item.path) ? '#00d982' : '#555',
                '&:hover': {
                  backgroundColor: 'rgba(33, 150, 243, 0.1)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {item.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      {/* Mobile Side Menu */}
      <Box
        sx={{
          display: { xs: mobileOpen ? 'block' : 'none', md: 'none' },
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1050,
        }}
        onClick={toggleMobileMenu}
      />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 280,
          height: '100%',
          backgroundColor: 'white',
          zIndex: 1100,
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          p: 3,
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: '600' }}>Menu</Typography>
          <IconButton onClick={toggleMobileMenu}>
            <Close />
          </IconButton>
        </Box>
        
        {/* Full navigation items for mobile side menu */}
        {navItems.map((item) => (
          <Button
            key={item.path}
            component={Link}
            to={item.path}
            startIcon={item.icon}
            onClick={toggleMobileMenu}
            sx={{
              textTransform: 'none',
              color: isActive(item.path) ? '#A324ED' : '#555',
              fontWeight: isActive(item.path) ? '600' : '500',
              backgroundColor: isActive(item.path) ? 'rgba(33, 150, 243, 0.1)' : 'transparent',
              borderRadius: '8px',
              py: 1.2,
              px: 2,
              justifyContent: 'flex-start',
              width: '100%',
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.08)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            {item.text}
          </Button>
        ))}
        
        {/* Create Post Button in mobile menu */}
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setAddPostOpen(true);
            toggleMobileMenu(); // close the side menu
          }}
          sx={{
            mt: 'auto',
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            py: 1.2,
            backgroundColor: '#A324ED',
            '&:hover': {
              backgroundColor: '#A324ED',
            },
            transition: 'all 0.2s ease',
          }}
        >
          New Post
        </Button>
      </Box>

      {mobileMenuToggle}
      <AddPostModal
  open={addPostOpen}
  handleClose={() => setAddPostOpen(false)}
  refreshPosts={null} // or pass fetchPosts if available
/>

    </>
  );
}