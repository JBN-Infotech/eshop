import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@carbon/react';

const EsContentPageButtons = (props) => {
  const navigate = useNavigate();

  return (
    <>
    {
      props.pageButtons.map((button, index) => (
        <Button
          key={index.toString()}
          renderIcon={button.icon}
          iconDescription={button.title}
          kind='tertiary'
          onClick={()=> navigate(button.url)}>
          {button.label || button.title}
        </Button>
      ))
    }
      
    </>
  )
}

export default EsContentPageButtons
