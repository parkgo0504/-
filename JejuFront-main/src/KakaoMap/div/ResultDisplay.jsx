import React from 'react';
import Div from './div';

function ResultDisplay({ data, onAddToCart }) {
  if (!data || data.length === 0) {
    return null; // 데이터가 없으면 렌더링하지 않음
  }
  console.log("div data",data);

  return (
    <div>
      {data.map((item, index) => (

          <Div
            key={item.attr_num}
            imageData={item.img}
            name={item.name}
            address={item.addr}
            data={item}
            onAddToCart={onAddToCart}
            tel={item.tel}
            intro={item.intro}
            index={index}
          />

      ))}
    </div>
  );
}

export default ResultDisplay;