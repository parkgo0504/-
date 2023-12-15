// ProductList.jsx 파일
import React from 'react';
import topRestaurant from '../div/mapData/topRestaurant.json';
import { TopRestaurant } from '../div/TopRestaurant';

function RestaurantLocation({ onAddToCart }) {


  return (
    <div>
      {topRestaurant.map((product, index) => (
        <div key={index}>
          {/* onAddToCart 함수를 전달 */}
          <TopRestaurant data={product} onAddToCart={onAddToCart} />
        </div>
      ))}
    </div>
  );
}

export default RestaurantLocation;