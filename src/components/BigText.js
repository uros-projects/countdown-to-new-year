import React from 'react';

const BigText = ({ spanText, textClass, textValue }) => (
    <div className={`countdown-el ${textClass}`}>
        <p className='big-text'>{textValue}</p>
        <span>{spanText}</span>
    </div>
)

export default BigText
