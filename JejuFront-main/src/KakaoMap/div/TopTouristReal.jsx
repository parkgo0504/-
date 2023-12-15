import React, { useState, useEffect } from 'react';
import TopTourInfo from '../div/mapData/TopTourInfo';
import topTourist from '../div/mapData/topTourist.json';


function TopTouristReal({ data, onAddToCart, onRemoveFromCart }) {

  const [selectedTourist, setSelectedTourist] = useState(null);
  const [isStarActive, setStarActive] = useState(false);

  const handleTouristClick = (tourist) => {
    setSelectedTourist(tourist);
  };



  useEffect(() => {
    // Call setStarActive when isStarActive changes
    setStarActive(data.isStarActive || false);
  }, [data.isStarActive]);

  const handleStarClick = (e) => {
    e.stopPropagation();

    if (!isStarActive) {
      onAddToCart({ ...data, isStarActive: true });
    } else {
      console.log("run", data.attr_num);
      onRemoveFromCart(data.attr_num);
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
          textAlign: 'center',
        }}
        onClick={() => handleTouristClick(data)}
      >
        {/* A div containing the image and the origin's pig's feet */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
          {/* image at top left */}
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
          
          {/* Store name */}
          <div style={{ width: '190px', minWidth: '190px' }}>
            <h3>{data.name}</h3>
          </div>

          {/* Yellow star emoji button */}
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

        {/* address */}
        <div style={{ marginLeft: '1%', color: '#676767' }}>
          <div style={{ marginLeft: '1%', marginTop: '4%', marginBottom: '2%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {data.addr}
          </div>
        </div>
      </div>
      {selectedTourist && <TopTourInfo tourist={selectedTourist} onClose={() => setSelectedTourist(null)} />}
      </>
    );
  }

function TopTourRealApp() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '30px' }}>
      {topTourist.map((data, index) => (
        <TopTouristReal key={index} data={data} />
      ))}

    </div>
  );
}

export { TopTouristReal, TopTourRealApp };