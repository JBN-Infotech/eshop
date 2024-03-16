import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  Header,
  HeaderGlobalBar,
  HeaderName,
  HeaderGlobalAction,
} from '@carbon/react';
import { Search, Switcher as SwitcherIcon } from '@carbon/icons-react';
import { RightSideNavItem } from '../../../constants/RightSideNavItems';
import allActions from '../../../redux/actions';
import HeaderNotification from './HeaderNotification';
import HeaderCart from './HeaderCart';
import HeaderUser from './HeaderUser';

const EsHeader = () => {

  const dispatch = useDispatch();
  const sideBarVisibility = useSelector(state => state.sideBar.visible);
  
  /** Show hide left side nav bar. */
  const toggleSideBar = () => {
    dispatch(allActions.sideBarActions.setVisibility(!sideBarVisibility))
  }

  const [data, setData] = useState({
    rightNav: undefined,
  });

  /** show hide right side nav bar. */
  const changeRightNav = (selected) => {
    setData({
      ...data,
      rightNav: data.rightNav === selected ? undefined : selected,
    });
  }

  return (
    <Header aria-label="eShop">
      <SwitcherIcon size={20} onClick={() => toggleSideBar()}/>
      <HeaderName href="#" prefix=''>
        eShop
      </HeaderName>
      
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Search" onClick={() => changeRightNav(RightSideNavItem.search)}>
          <Search size={20} />
        </HeaderGlobalAction>
        
        <HeaderNotification selected={data.rightNav} callback={(selected) => changeRightNav(selected)}/>
        <HeaderCart selected={data.rightNav} callback={(selected) => changeRightNav(selected)}/>
        <HeaderUser selected={data.rightNav} callback={(selected) => changeRightNav(selected)}/>
        
      </HeaderGlobalBar>
    </Header>
  )
}

export default EsHeader;
