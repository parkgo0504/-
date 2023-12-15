// ProductList.jsx 파일
import React from 'react';
import topTourist from '../div/mapData/topTourist.json';
import { TopTourist } from '../div/TopTourist';

function TourLoaction({ onAddToCart, onRemoveFromCart }) {


  return (
    <div>
      {topTourist.map((product, index) => (
        <div key={index}>
          {/* onAddToCart 함수를 전달 */}
          <TopTourist data={product} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} />
        </div>
      ))}
    </div>
  );
}

export default TourLoaction;