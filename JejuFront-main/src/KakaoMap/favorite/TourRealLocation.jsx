// ProductList.jsx 파일
import React from 'react';
import topTourist from '../div/mapData/topTourist.json';
import{ TopTouristReal} from '../div/TopTouristReal'

function TourRealLoaction({ onAddToCart, onRemoveFromCart }) {


  return (
    <div>
      {topTourist.map((product, index) => (
        <div key={index}>
          {/* onAddToCart 함수를 전달 */}
          <TopTouristReal data={product} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} />
        </div>
      ))}
    </div>
  );
}

export default TourRealLoaction;