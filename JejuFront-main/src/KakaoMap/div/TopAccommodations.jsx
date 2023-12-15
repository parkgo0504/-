import React, { useState, useEffect } from 'react';
import TopAccInfo from './mapData/TopAccInfo';
import topAccommodations from './mapData/topAccommodations.json';

function TopAccommodations({ data, onAddToCart, onRemoveFromCart }) {
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [isStarActive, setStarActive] = useState(false);

  const handleAccommodationClick = (accommodation) => {
    setSelectedAccommodation(accommodation);
  };

  useEffect(() => {
    // data가 유효한 경우에만 setStarActive 호출
    if (data && data.isStarActive !== undefined) {
      setStarActive(data.isStarActive);
    } else {
      setStarActive(false); // data가 유효하지 않으면 기본값으로 false 설정
    }
  }, [data]);

  const handleStarClick = (e) => {
    e.stopPropagation();

    if (data) {
      // setStarActive(!isStarActive);

      if (!isStarActive) {
        onAddToCart({ ...data, isStarActive: true });
      } else {
        onRemoveFromCart(data);
      }
    }
  };


  return (
    <>
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
          onClick={() => handleAccommodationClick(data)}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              style={{
                width: '105px',
                height: '90px',
                marginLeft: '1%',
                marginRight: '4%',
              }}
              src={data.img}
              alt=""
            />

          <div style={{minWidth:'24px', height: '24px', backgroundColor: '#8CBDED', borderRadius: '14px', color: 'white'}}> 
            {/* 배열의 인덱스 자리 */}
            {data.top}
          </div>

          <div style={{ width: '190px', minWidth: '190px' }}>
            <h3>{data.name}</h3>
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
                aria-label="별모양"
                style={{
                  fontSize: '25px',
                  color: isStarActive ? 'yellow' : 'gray',
                }}
              >
                {isStarActive ? '🌟' : '⭐️'}
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
              {data.addr}
            </div>
          </div>
        </div>
      {selectedAccommodation && (
        <TopAccInfo
          accommodation={selectedAccommodation}
          onClose={() => setSelectedAccommodation(null)}
        />
      )}
    </>
  );
}

function TopAccommodationsApp() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '30px' }}>
      {topAccommodations.map((data, index) => (
        <TopAccommodations key={index} data={data} />
      ))}
    </div>
  );
}



export { TopAccommodations, TopAccommodationsApp };