import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
  height: 10vh;
  min-width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  position: sticky;
  top: 0px;
  z-index: 1;
  background-color: #e7e7d0;
  opacity: 0.9;
  padding: 0 0.2rem;
`;

export const LogoContainer = styled(Link)`
  height: auto;
  max-width: 100%;
  padding: 1.1rem;
  transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    &:hover {
    transform: scale(1.05);
  }
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLink = styled(Link)`
  padding: 15px;
  cursor: pointer;

span {
    line-height: 2;
    white-space: nowrap;
    position: relative;
    font-size: 120%;

    &::before {
    background-color: black;
    border-radius: 0px 0px 4px 4px;
    bottom: -6px;
    content: "";
    height: 2px;
    left: 0px;
    /* opacity: 0; */
    position: absolute;
    right: 0px;
    transform-origin: left center;
    transform: scale(0, 0);
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    /* visibility: hidden; */
    width: auto;
  }
}
  &:hover {
      span:before {
      transform: scale(1, 1);
      visibility: visible;
      }
    }
  `;

