import React, { useState } from 'react';
import './mapData/TopInfo.css';

// 모달 컴포넌트
function Modal({ isOpen, onClose, address, name, imageData, tel, intro}) {
  if (!isOpen) {
    return null;
  }
  

  return (
    <div className="modal-overlay" style={{width: '100%', maxWidth: '100%', minWidth: '100%' }} onClick={onClose}>
      <div className="modal-content" 
      style={{width: '750px', maxWidth: '750px', minWidth: '750px', height:'827px', maxHeight: '827px', minHeight: '827px',
       marginRight: 'auto', marginBottom: 'auto', borderRadius: '10px'}} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>{name}</h2>
        <hr />
        <p>주소: {address}</p>
        <img style={{ borderRadius: '5px', width: "750px", height: '510px'}} src={imageData} alt={name} />
        <hr />
        <p>{intro}</p>
        <hr />
        <p>전화번호: {tel}</p>
      </div>
    </div>
  );
}

// 목록 컴포넌트
function Div({ imageData, name, address, data, onAddToCart, tel, intro, index }) {
  const [isStarActive, setStarActive] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  
  const handleStarClick = (e) => {
    setStarActive(!isStarActive);
    onAddToCart({ ...data, isStarActive: true });

    e.stopPropagation();

    if (!isStarActive) {
      onAddToCart({ ...data, isStarActive: true });
    } else {
      console.log("run", data.attr_num);
      onRemoveFromCart(data.attr_num);
    }
  };


  const handleDivClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <>
      <div
        style={{
          cursor: 'pointer',
        }}
        onClick={handleDivClick}
      >
        <div
          style={{
            width: '360px',
            height: '135px',
            display: 'flex',
            flexDirection: 'column',
            margin: '3%',
            border: 'solid 1px',
            borderRadius: '5px',
            padding: '3%',
            marginBottom: '1%',
            marginRight: '2%',
            overflow: 'hidden', // added to prevent content from overflowing depending on address length
            flexGrow: 1, // Part that makes the top row visible
            cursor: 'pointer',
            textAlign: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              style={{
                width: '105px',
                height: '90px',
                marginLeft: '1%',
                marginRight: '4%',
              }}
              src={imageData}
              alt=""
            />

          <div style={{minWidth:'24px', height: '24px', backgroundColor: '#8CBDED', borderRadius: '14px', color: 'white'}}> 
            {/* 배열의 인덱스 자리 */}
            {index + 1}
          </div>

            <div style={{ width: '190px', minWidth: '190px', alignItems: 'center' }}>
              <h3>{name}</h3>
            </div>
            <div
              style={{
                width: '25px',
                minWidth: '25px',
                maxWidth: '25px',
                marginBottom: '60px',
                cursor: 'pointer',
              }}
              onClick={handleStarClick}
            >
              <span
                role="img"
                aria-label="star shape"
                style={{
                  fontSize: '25px',
                  color: isStarActive ? 'yellow' : 'gray',
                }}
              >
                {isStarActive ? '⭐️' : '⭐️'}
              </span>
            </div>
          </div>
          <div style={{ marginLeft: '1%', color: '#676767' }}>
            <div
              style={{
                marginLeft: '1%',
                marginTop: '4%',
                marginBottom: '2%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {address}
            </div>
          </div>
        </div>
      </div>

      {/* 모달창 추가 */}
      <Modal isOpen={isModalOpen} onClose={closeModal} address={address} name={name}
       imageData={imageData} tel={tel} intro={intro}/>
    </>
  );
}

export default Div;