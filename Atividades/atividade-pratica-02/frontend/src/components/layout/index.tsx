import { Button, CircularProgress } from '@mui/material';
import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authContext } from '../../shared/contexts/AuthContext';
import { FunctionalComponentProps } from '../../shared/types/FunctionalComponent';
import {
  LayoutContainer,
  LayoutContentContainer,
  LayoutLoadingContainer,
  LayoutNavbar,
  NavbarContent,
  NavbarListItem,
} from './styles';

const LayoutComponent: React.FC<FunctionalComponentProps> = ({ children }) => {
  const { isFetching } = useContext(authContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <LayoutContainer>
      <LayoutNavbar component='nav'>
        <NavbarContent>
          <NavbarListItem selected={location.pathname === '/'}>
            <Button onClick={handleNavigate.bind(this, '/')} color='inherit'>
              Home
            </Button>
          </NavbarListItem>
          <NavbarListItem selected={location.pathname === '/admin'}>
            <Button
              onClick={handleNavigate.bind(this, '/admin')}
              color='inherit'
            >
              Administrativo
            </Button>
          </NavbarListItem>
        </NavbarContent>
      </LayoutNavbar>
      <LayoutContentContainer component='section'>
        {isFetching ? (
          <LayoutLoadingContainer>
            <CircularProgress />
          </LayoutLoadingContainer>
        ) : (
          children
        )}
      </LayoutContentContainer>
    </LayoutContainer>
  );
};
export default React.memo(LayoutComponent);
