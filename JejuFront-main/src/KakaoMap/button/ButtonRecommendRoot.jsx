  /*
* 작성자 박기원
* 기능 : button.jsx 숙박 타입 FavoriteCate attr_num 받아와서 가까운 거리 추천
* 작성일자 : 12-07
*/


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResultDisplay from '../div/ResultDisplay'

function ButtonRecommendRoot({selectedGroup2,FavoriteCart}) {

  if(FavoriteCart){
    const [data, setData] = useState(null);

    if(selectedGroup2 == "attraction"){
      selectedGroup2 = "관광지";
    }else if(selectedGroup2 =="restaurant"){
      selectedGroup2 = "음식점";
    }else{
      selectedGroup2 = "숙박";
    }
  
  
  
    useEffect(() => {
      if(!FavoriteCart){
        return <div>즐겨찾기가 없습니다.</div>;
      }
      const fetchData = async () => {
        try {
          const response = await axios.post('https://fastapi-service-s26rn5fmbq-du.a.run.app/recommend_root', {
            attr_num: FavoriteCart.attr_num,
            tourtype: selectedGroup2
          });
  
          setData(response.data);
          //button에다가 data 싸주기
          window.RecommendRootHandlers.updateRecommendRoot(response.data);
          // 지도에다가 마크 띄우기
          window.RecommendRootMakerHandlers.updateRecommendRootMaker(response.data);
        } catch (error) { 
          console.error('Server error:', error);
        }
      };
  
      fetchData();
      console.log("FavoriteCart", selectedGroup2 );
      console.log("FavoriteCart", FavoriteCart.attr_num);
    },[FavoriteCart, selectedGroup2]);
  
  
  

    if (!data) {
      return <div>Loading...</div>;
    }

  
  }else{
    return (
      <div style={{ fontSize: 'larger', marginTop: '40px', marginBottom: '40px'}}>
          근처 관광지 추천을 받으려면 ⭐️ 클릭 하세요.
      </div>);
  }
  }


export default ButtonRecommendRoot;
