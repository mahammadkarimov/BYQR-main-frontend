
import React from 'react';
import {colors} from '../../../styles/color/colors'

const SmallMealTypes = (props) => {
  const { text, fontSize} = props;
  const backgroundColor = colors[text.toLowerCase()+'_bg'] 
  const textColor = colors[text.toLowerCase()+'_text'] 

  const style = {
    backgroundColor,
    fontSize,
    width:"100px",
    height:"30px",
    borderRadius: '4px',
    color: textColor,
    padding: '4px 8px 4px 8px',
    display:"flex",
    justifyContent: "center", 
    alignItems: "center",
    gap:"4px"
  };

  return (
    <div style={style}>
      <p>{text}</p>
    </div>
  );
};

export default SmallMealTypes;
