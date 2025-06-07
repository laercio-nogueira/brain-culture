import React from 'react';
import { Link, useLocation } from 'react-router';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #388e3c;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Segoe UI', sans-serif;
`;

const Logo = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    transition: background 0.3s;

    &:hover {
      background-color: #2e7d32;
    }

    &.active {
      background-color: #1b5e20;
    }
  }
`;

const Navbar: React.FC = () => {
  const location = useLocation();
  return (
    <NavbarContainer>
      <Logo>Brain Agriculture</Logo>
      <NavLinks>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Dashboard</Link>
        <Link to="/farmer" className={location.pathname === '/farmer' ? 'active' : ''}>Produtor</Link>
        <Link to="/farm" className={location.pathname === '/farm' ? 'active' : ''}>Fazenda</Link>
        <Link to="/harvest" className={location.pathname === '/harvest' ? 'active' : ''}>Safra</Link>
        <Link to="/crop" className={location.pathname === '/crop' ? 'active' : ''}>Cultura</Link>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
