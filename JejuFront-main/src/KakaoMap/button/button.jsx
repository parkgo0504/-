import React, { useState } from 'react';

import TourRealLoaction from '../favorite/TourRealLocation';
import RestaurantLocation from '../favorite/RestaurantLocation';
import AccommodationsLocation from '../favorite/AccommodationsLocation';
import ResultDisplay from '../div/ResultDisplay';
import ButtonRecommendRoot from './ButtonRecommendRoot';


function Button({onItems, onData, searchResultData, selectedGroup1, setSelectedGroup1, setSearchTerm}) {
  // 선택된 그룹과 하위 그룹을 관리하는 상태
  
  const [selectedGroup2, setSelectedGroup2] = useState('attraction');
  const [recommendRoot, setrecommendRoot] = useState([]);
  const [FavoriteCart, setFavoriteCart] = useState([]);

  //Recommend 데이터 받아서 출력
  window.RecommendRootHandlers = {
    updateRecommendRoot:(data) => {
      console.log("recommed 출력",data);
      setrecommendRoot(data);
    }
  }

  //FavoriteCart 데이터 받아서 출력
  window.FavoriteCartHandlers = {
    updateFavorteRecommend:(data) =>{
      console.log("FavoriteCart 출력",data);
      // 배열의 마지막 요소를 따로 저장      
      const lastItem = data[data.length - 1];
      setFavoriteCart(lastItem);
    }
  }



  const handleAddToCart = (item) => {
    onItems((current) => {
      if(current.find((currentItem) => currentItem.attr_num === item.attr_num)){
        return current
      }
      return [...current, item]
    });
  };



  // 그룹1이 변경될 때 호출되는 함수
  const handleGroup1Change = (event) => {
    setSelectedGroup1(event.target.value);
    if(event.target.value === "top") {
      setSearchTerm("");
    }
  };

  // 그룹2가 변경될 때 호출되는 함수
  const handleGroup2Change = (event) => {
    setSelectedGroup2(event.target.value);
  };

  // onItems(cartItems);

  // 선택된 그룹과 하위 그룹에 따라 적절한 컴포넌트 반환
  const getSelectedComponent = () => {

    if (selectedGroup1 === 'top') {
      if (selectedGroup2 === 'attraction') {
        onData("attraction");
        //attraction
        return <TourRealLoaction onAddToCart={handleAddToCart}  />;
      } else if (selectedGroup2 === 'restaurant') {

        onData("restaurant");
        return <RestaurantLocation onAddToCart={handleAddToCart}/>;
      } else if (selectedGroup2 === 'accommodation') {

        onData("accommodation");
        return <AccommodationsLocation onAddToCart={handleAddToCart}/>;
      }
    }
    if (selectedGroup1 === 'search') {
      // TODO : 부모로부터 props 담아오기 -> data
      return <ResultDisplay data={searchResultData} onAddToCart={handleAddToCart} />
    }
    // 추천 버튼을 누르고 나머지 버튼들을 눌렀을 때 로직
    if (selectedGroup1 === 'recommend') {
      if (selectedGroup2 === 'attraction') {
        return (
          <div>
            <ButtonRecommendRoot  selectedGroup2 = {selectedGroup2} FavoriteCart ={FavoriteCart}/>
            <ResultDisplay data={recommendRoot} onAddToCart={handleAddToCart} />
          </div>
        );
      
    
      }else if (selectedGroup2 === "restaurant") {
        return (
          <div>
            <ButtonRecommendRoot  selectedGroup2 = {selectedGroup2} FavoriteCart ={FavoriteCart}/>
            <ResultDisplay data={recommendRoot} onAddToCart={handleAddToCart} />
          </div>
        );
      }else if (selectedGroup2 === 'accommodation') {
        return (
          <div>
            <ButtonRecommendRoot  selectedGroup2 = {selectedGroup2} FavoriteCart ={FavoriteCart}/>
            <ResultDisplay data={recommendRoot} onAddToCart={handleAddToCart} />
          </div>
        );
      }

      {/*<h1>일단 추천</h1>*/};
    }
    // 기본적으로 아무 컴포넌트도 렌더링하지 않음
    return null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '2%', textAlign: 'center' }}>
      {/* 그룹1을 선택하는 버튼 그룹 */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        {/* Top 버튼 */}
        <label style={{
          padding: '5px 10px',
          backgroundColor: selectedGroup1 === 'top' ? '#f89b00' : 'white',
          color: selectedGroup1 === 'top' ? 'white' : '#A2A2A2',
          cursor: 'pointer',
          fontSize: '14px',
          border: selectedGroup1 === 'top' ? 'none' : '1px solid #A2A2A2',
          borderRadius: '5px'
        }}>
          <input style={{ display: 'none' }}
            type="radio"
            value="top"
            checked={selectedGroup1 === 'top'}
            onChange={handleGroup1Change}
            name="group1"
          />
          Top
        </label>

        {/* 추천 버튼 */}
        <label style={{
          padding: '5px 10px',
          backgroundColor: selectedGroup1 === 'recommend' ? '#f89b00' : 'white',
          color: selectedGroup1 === 'recommend' ? 'white' : '#A2A2A2',
          cursor: 'pointer',
          fontSize: '14px',
          border: selectedGroup1 === 'recommend' ? 'none' : '1px solid #A2A2A2',
          borderRadius: '5px'
        }}>
          <input style={{ display: 'none' }}
            type="radio"
            value="recommend"
            checked={selectedGroup1 === 'recommend'}
            onChange={handleGroup1Change}
            name="group1"
          />
          근처 추천
        </label>

        {/* 검색버튼 */}
        <label style={{
          padding: '5px 10px',
          backgroundColor: selectedGroup1 === 'search' ? '#f89b00' : 'white',
          color: selectedGroup1 === 'search' ? 'white' : '#A2A2A2',
          cursor: 'pointer',
          fontSize: '14px',
          border: selectedGroup1 === 'search' ? 'none' : '1px solid #A2A2A2',
          borderRadius: '5px'
        }}>
          <input style={{ display: 'none' }}
            type="radio"
            value="search"
            checked={selectedGroup1 === 'result'}
            onChange={handleGroup1Change}
            name="group1"
          />
          검색
        </label>
      </div>

      {/* 그룹2를 선택하는 버튼 그룹 */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        {/* 명소 버튼 */}
        <label style={{
          padding: '5px 10px',
          backgroundColor: selectedGroup2 === 'attraction' ? 'green' : 'white',
          color: selectedGroup2 === 'attraction' ? 'white' : '#A2A2A2',
          cursor: 'pointer',
          fontSize: '14px',
          border: selectedGroup2 === 'attraction' ? 'none' : '1px solid #A2A2A2',
          borderRadius: '5px'
        }}>
          <input style={{ display: 'none' }}
            type="radio"
            value="attraction"
            checked={selectedGroup2 === 'attraction'}
            onChange={handleGroup2Change}
            name="group2"
          />
          관광지
        </label>

        {/* 식당&카페 버튼 */}
        <label style={{
          padding: '5px 10px',
          backgroundColor: selectedGroup2 === 'restaurant' ? 'green' : 'white',
          color: selectedGroup2 === 'restaurant' ? 'white' : '#A2A2A2',
          cursor: 'pointer',
          fontSize: '14px',
          border: selectedGroup2 === 'restaurant' ? 'none' : '1px solid #A2A2A2',
          borderRadius: '5px'
        }}>
          <input style={{ display: 'none' }}
            type="radio"
            value="restaurant"
            checked={selectedGroup2 === 'restaurant'}
            onChange={handleGroup2Change}
            name="group2"
          />
          식당&카페
        </label>

        {/* 숙박 버튼 */}
        <label style={{
          padding: '5px 10px',
          backgroundColor: selectedGroup2 === 'accommodation' ? 'green' : 'white',
          color: selectedGroup2 === 'accommodation' ? 'white' : '#A2A2A2',
          cursor: 'pointer',
          fontSize: '14px',
          border: selectedGroup2 === 'accommodation' ? 'none' : '1px solid #A2A2A2',
          borderRadius: '5px'
        }}>
          <input style={{ display: 'none', backgroundColor: "#0069D9" }}
            type="radio"
            value="accommodation"
            checked={selectedGroup2 === 'accommodation'}
            onChange={handleGroup2Change}
            name="group2"
          />
          숙소
        </label>
      </div>

      {/* 선택된 그룹에 따라 동적으로 렌더링되는 컴포넌트 */}
      {getSelectedComponent()}

    </div>
  );
}

export default Button;
