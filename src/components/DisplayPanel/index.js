import React from 'react';
import { Div } from "react-fancy-style-component";

import './DisplayPanel.css';

const Display = ({ children }) => {
  return (
    <Div className='display-panel'>
      {children}
    </Div>
  );
}

export default Display;