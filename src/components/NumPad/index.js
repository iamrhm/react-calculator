
import React from 'react';
import { Div } from "react-fancy-style-component";
import ButtonList from "../ButtonList";
import './NumPad.css';

const NumPad = (props) => {
  return (
    <Div className='num-pad'>
      {ButtonList(props)}
    </Div>
  );
}

export default NumPad;