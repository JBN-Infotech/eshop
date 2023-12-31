import React from 'react';

const EsContentPageTitle = (props) => {
  let title = props.title;
  if (props.moduleName) {
    title = `${title} - ${props.moduleName}`
  }
  return (
    <div className='es-content-page-title'>
      <h2>{title}</h2>
    </div>
)
};

export default EsContentPageTitle
