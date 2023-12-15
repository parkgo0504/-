import React from 'react';
import { TopTourist } from '../div/TopTourist';
function FavoriteCart({ cartItems, onRemoveFromCart }) {
  window.FavoriteCartHandlers.updateFavorteRecommend(cartItems);
  window.FavoriteCartMapHandlers.updateFavorteMap(cartItems);
  return (
    <div>
      {cartItems.map((item, index) => (
        <div key={index}>
          <TopTourist data={item} onRemoveFromCart={onRemoveFromCart} /> {/* 삭제 함수를 전달 */}
          
        </div>
      ))}
    </div>
  );
}

export default FavoriteCart;