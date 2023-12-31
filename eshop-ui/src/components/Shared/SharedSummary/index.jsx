import React from 'react';
import { FormLabel } from '@carbon/react';
import EsNotification from '../esNotification';

const SharedSummary = (props) => {

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  const summaryRow = (rowItem, index) => (
    <div className="summary-row" key={index.toString()}>
      <FormLabel>{capitalize(rowItem[0])}</FormLabel>
      <h4>{rowItem[1]}</h4>
    </div>
  );

  return (
    <div className='es-content-page-summary'>
      {
        props.notification && (
          <EsNotification
            kind={props.notification.kind}
            title={props.notification.title}
          />
        )
      }
      {
        props.data && Object.entries(props.data).map((row, index) => (
          summaryRow(row, index)
        ))
      }
    </div>
  )
}

export default SharedSummary
