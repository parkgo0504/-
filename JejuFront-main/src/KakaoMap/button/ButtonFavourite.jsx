import React, { useState, useEffect } from 'react';
import axios from 'axios';
import topTourist from '../div/mapData/topTourist.json';
import { apiUrls, webStorages } from "../../constants";

function ButtonFavourite({cartItems}) {
  // 로컬 스토리지에서 사용자 ID 가져오기
  const userId = localStorage.getItem(webStorages.userId);



  // data가 존재하는지 확인
  if (!topTourist || !Array.isArray(topTourist)) {
    // data가 없거나 배열이 아닌 경우, 기본 내용을 렌더링하거나 null을 반환
    console.log("topTourist 안가져옴 ");
    console.log(topTourist);
    return <div>데이터 없음</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(userId);

    //로그인 확인
    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      const result = cartItems.map((item) => ({
        user_id: userId,
        attr_num: item.attr_num
      }))
      axios.post(apiUrls.backEndApiUrls.saveFavorite, result);

      alert('저장 성공했습니다.');
    } catch (error) {
      console.error("저장에 실패했습니다: ", error);
    }
  };

  return (
    // 버튼 전체를 감싸는 틀
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '2%', textAlign: 'center'}}>
    
      {/*Top 버튼과 추천 버튼을 감싸는 틀 */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
    
        <form onSubmit={handleSubmit}>
          <button style={{ backgroundColor: '#f89b00', color: 'white', width: '70px', height: '40px',boxShadow: '2px 2px 2px gray', borderRadius: '7px' }}>저장</button>
        </form>

      </div>
    </div> // 전체 틀 끝
  );
}

export default ButtonFavourite;
