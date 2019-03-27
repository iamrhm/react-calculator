import React from 'react';
import { Button } from "react-fancy-style-component";
import './Button.css'

const ButtonLists = ({ items, onClick, activeOperator, value }) => {
  return items.map((item, index) => {
    let data = {
      theme: null,
      value: item
    };
    if (value !== '0' && item === 'AC' ) {
      data.value = 'C';
    }
    if ((index + 1) % 4 === 0 || (items.length - 1) === index) {
      if (activeOperator === item) {
        data.theme = 'active';
      } else {
        data.theme = 'orange';
      }
    }
    if (item === '0') {
      data.theme = 'large'
    }
    return (
      <Button
        className={`${data.theme === 'large' ? 'large-num-pad-button' : 'num-pad-button'}`}
        onClick={onClick}
        theme={data.theme}
        key={item}
        value={data.value}
      >
       {data.value}
      </Button>
    );
   });
}

export default ButtonLists;