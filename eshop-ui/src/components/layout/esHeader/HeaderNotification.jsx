import React from 'react';
import { Notification } from '@carbon/icons-react';
import { HeaderGlobalAction } from '@carbon/react';
import { RightSideNavItem } from '../../../constants/RightSideNavItems';
import EsCounter from './EsCounter';

const HeaderNotification = (props) => {
  const count = 0;
  return (
    <HeaderGlobalAction
      aria-label="Notifications"
      className={props.selected === RightSideNavItem.notification ? 'selected-side-nav-item': 'side-nav-item'}
      onClick={() => props.callback(RightSideNavItem.notification)}>

      <Notification size={20} />

      {count > 0 && <EsCounter count={count} />}

      {
        props.selected === RightSideNavItem.notification && (
          <div className='es-app-side-nav-right-section' id='header-cart'>
            notifications
          </div>
        )
      }

    </HeaderGlobalAction>
    
  )
}

export default HeaderNotification;
