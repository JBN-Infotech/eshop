import React from 'react';
import { InlineNotification } from '@carbon/react';


const EsNotification = (props) => (
  <InlineNotification
    className='es-inline-notification'
    aria-label="closes notification"
    kind={props.kind}
    statusIconDescription="notification"
    title={props.title}
  />
)

export default EsNotification;
