import React from 'react';
import { Button } from '@carbon/react';
import { Add, Subtract } from '@carbon/icons-react';


const ProductCounter = (props) => {
  
  // button size xm || sm

  return (<div className='cart-organizer'>
    <Button
      hasIconOnly
      disabled={props.inCart === props.limit}
      size="x1"
      iconDescription="Icon Description"
      onClick={() => props.updateCart('add')}
      renderIcon={Add}
    />
    <div className='counter'>{props.inCart}</div>
    <Button
      hasIconOnly
      size="x1"
      iconDescription="Icon Description"
      onClick={() => props.updateCart('remove')}
      renderIcon={Subtract} 
    />
  </div>);
}

export default ProductCounter;
