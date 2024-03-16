import React from 'react';
import {
  SideNav,SideNavItems, SideNavMenu, SideNavMenuItem, SideNavLink } from '@carbon/react';
import { useNavigate } from "react-router-dom";
import { Fade } from '@carbon/icons-react';
import LocalStorage from '../../../API/LocalStorage';

const isSideNavExpanded = true;
const currentUser = LocalStorage.getCurrentUser();

const EsSideNav = () => {
  const navigate = useNavigate();
  return (
    <SideNav aria-label="Side navigation"
      expanded={isSideNavExpanded}
      onSideNavBlur={() => console.log('asd')} 
      href="#main-content">
      <SideNavItems>
        <SideNavLink renderIcon={Fade} href="/">
          Home
        </SideNavLink>
        {
          currentUser
           ? (
            <>
            <SideNavMenu renderIcon={Fade} title="Category">
              <SideNavMenuItem href="/categories">
                Categories
              </SideNavMenuItem>
        
              <SideNavMenuItem href="/categories/form">
                Add Category
              </SideNavMenuItem>
            </SideNavMenu>
            <SideNavMenu renderIcon={Fade} title="Users" isActive={true}>
              <SideNavMenuItem href="/users">
                Users
              </SideNavMenuItem>
              <SideNavMenuItem aria-current="page" href="https://www.carbondesignsystem.com/">
                Add User
              </SideNavMenuItem>
            </SideNavMenu>
            <SideNavLink renderIcon={Fade} onClick={()=> {
              LocalStorage.deleteCurrentUser();
              navigate('/');
            }}>
              Logout
            </SideNavLink>
            </>
           )
           : (
            <>
              <SideNavLink renderIcon={Fade} href="/signin">
                Signin
              </SideNavLink>
              <SideNavLink renderIcon={Fade} href="/signup">
                Signup
              </SideNavLink>
            </>
           )
        }
        
        
        <SideNavMenu renderIcon={Fade} title="Category title">
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            Link
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            Link
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            Link
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavLink renderIcon={Fade} href="https://www.carbondesignsystem.com/">
          Link
        </SideNavLink>
        <SideNavLink renderIcon={Fade} href="https://www.carbondesignsystem.com/">
          Link
        </SideNavLink>
      </SideNavItems>
    </SideNav>
  )
}

export default EsSideNav;
