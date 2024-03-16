import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { User } from '@carbon/icons-react';
import { HeaderGlobalAction } from '@carbon/react';
import { RightSideNavItem } from '../../../constants/RightSideNavItems';
import LocalStorage from '../../../API/LocalStorage';

const HeaderUser = (props) => {
  const currentUser = LocalStorage.getCurrentUser();

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(currentUser)
  
  useEffect(() => {
    setLoggedIn(currentUser ? true : false);
  }, [currentUser]);

  const logoutUser = () => {
    LocalStorage.deleteCurrentUser();
    alert('logged out...')
    props.updateGlobalBar();
    navigate('/')
  }

  return (
    <HeaderGlobalAction
      aria-label="User"
      className={props.selected === RightSideNavItem.user ? 'selected-side-nav-item': 'side-nav-item'}
      onClick={() => props.callback(RightSideNavItem.user)}>

      <User size={20}/>

      {
        props.selected === RightSideNavItem.user && (
        <div className='es-app-side-nav-right-section'>
          {
            loggedIn
            ? <div className='user-right-nav'> 
              <Link onClick={()=> logoutUser()}>Logout</Link>
              </div>
            : <div> <Link to="/signin">Sign in</Link> </div>
          }
        </div>
        )
      }
    </HeaderGlobalAction>
    
  )
}

export default HeaderUser;
