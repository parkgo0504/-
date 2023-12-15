// ProductList.jsx 파일
import React from 'react';
import topAccommodations from '../div/mapData/topAccommodations.json';
import { TopAccommodations } from '../div/TopAccommodations';

function AccommodationsLocation({ onAddToCart }) {


  return (
    <div>
      {topAccommodations.map((product, index) => (
        <div key={index}>
          {/* onAddToCart 함수를 전달 */}
          <TopAccommodations data={product} onAddToCart={onAddToCart} />
        </div>
      ))}
    </div>
  );
}

export default AccommodationsLocation;