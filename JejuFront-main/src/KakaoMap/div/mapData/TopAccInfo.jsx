// TopAccInfo.jsx

import React from 'react';
import './TopInfo.css';

const TopAccInfo = ({ accommodation, onClose }) => {
  return (
    <div className="modal-overlay" style={{width: '100%', maxWidth: '100%', minWidth: '100%' }} onClick={onClose}>
      <div className="modal-content" 
      style={{width: '750px', maxWidth: '750px', minWidth: '750px', height:'827px', maxHeight: '827px', minHeight: '827px', 
       marginRight: 'auto', marginBottom: 'auto', borderRadius: '10px'}} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>{accommodation.name}</h2>
        <hr />
        <p>주소: {accommodation.addr}</p>
        <img style={{ borderRadius: '5px', width: "750px", height: '510px'}} src={accommodation.img} alt={accommodation.name} />
        <hr />
        <p>{accommodation.intro}</p>
        <hr />
        <p>전화번호: {accommodation.tel}</p>
      </div>
    </div>
  );
};

export default TopAccInfo;
