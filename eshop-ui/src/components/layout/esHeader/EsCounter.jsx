import React from 'react';

const EsCounter = (props) => {
  const count = props.count > 99 ? "99+" : props.count;
  return (
    <div className='es-header-counter'>
      {count}
    </div>
  )
}

export default EsCounter;
