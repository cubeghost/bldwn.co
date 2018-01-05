import React from 'react';

import './pointer.scss';

const Pointer = ({ top, left }) => (
  <div className="pointer" style={{
    transform: `translateX(${left}px) translateY(${top}px)`
  }} />
);

export default Pointer;
