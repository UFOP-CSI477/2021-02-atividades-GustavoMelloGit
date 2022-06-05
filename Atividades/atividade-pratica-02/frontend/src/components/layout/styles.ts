import { styled, Box, List, ListItem, css } from '@mui/material';

export const LayoutContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
`;
export const LayoutNavbar = styled(Box)`
  width: 100%;
  height: fit-content;
  background-color: #006d77;
`;

export const NavbarContent = styled(List)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  height: 100%;
  color: #fff;

  li {
    list-style: none;
  }
`;

export const NavbarListItem = styled(ListItem)`
  width: fit-content;

  ${({ selected }) =>
    selected &&
    css`
      background-color: transparent !important;
      color: #e29578;
      button {
        position: relative;
      }
      button::before {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: #e29578;
      }
    `}
`;

export const LayoutContentContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #edf6f9;
  padding: 1rem max(15px, min(400px, 10%));
`;

export const LayoutLoadingContainer = styled(Box)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
