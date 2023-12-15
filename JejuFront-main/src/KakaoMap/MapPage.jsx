<script src="https://kit.fontawesome.com/536492d3e0.js" crossorigin="anonymous"></script>
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import './MapPage.css'
import Map from './Map/Map'
import SearchBar from './search/searchBar'
import Topbar from '../components/topbar'
import ButtonFavourite from './button/ButtonFavourite'

import TopAccInfo from './div/mapData/TopAccInfo'
import TopResInfo from './div/mapData/TopResInfo'
import TopTourInfo from './div/mapData/TopTourInfo'

import FavoriteCart from './favorite/FavoriteCart'
import axios from 'axios'
import { apiUrls, webStorages } from "../constants";
import AiTest from '../AuthenticationPage/AiTest'
import { useNavigate } from 'react-router-dom';

import ResultDisplay from './div/ResultDisplay'
import Div from './div/div'

export const StyledButton = styled.button`
  /* 필요한 스타일 추가 */
`;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;


function MapPage() {

  
  // 챗봇 여는 기능 
  const [isAiTestModalOpenClose, setAiTestModalOpenClose] = useState(false);
  //모달
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  //장바구니
  const [cartItems, setCartItems] = useState([]);
  // 지도 마크
  const [dataFromChild, setDataFromChild] = useState('');


  const handleOpenAiTestModal = () => {
    setAiTestModalOpen(true);
  };


  //챗봇 열고 닫는 함수
  const handleChatModal = () => {
    setAiTestModalOpenClose(!isAiTestModalOpenClose); // 현재의 챗봇 상태를 반대로 설정
  };


  const handleData = (data) => {
    // 자식 컴포넌트로부터 전달된 데이터를 받아 부모 컴포넌트에서 처리.
    setDataFromChild(data);
  };

//장바구니
  const cartItemsData = (item) => {
      // 자식 컴포넌트로부터 전달된 데이터를 받아 부모 컴포넌트에서 처리
    setCartItems(item);
    console.log("장바구니 확인 크기",cartItems.length);
    if(cartItems.length>=0){
      setSidebarVisible(true);
    }
  }

  //장바구니 확인
  useEffect(() => {
    axios.post(apiUrls.backEndApiUrls.getFavoriteById((localStorage.getItem(webStorages.userId))))
      .then((response) => {
        const result = response.data.map( (item) => {
          return {
            ...item,
            isStarActive: true
          }
        })
        setCartItems(result);
      });
  }, [])


// 새로고침 막기 창 나가기 막기
const handleBeforeUnload = (e) => {
  e.preventDefault();
  e.returnValue = "";
  // Chrome에서 동작하도록;
  deprecated
};


useEffect(() => {
  (() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
  })();

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, []);
///////////////////////////


  
  const handleRemoveFromCart = (attrNum) => {
    const result = cartItems.filter((item) => {
      console.log("compare", item.attr_num, attrNum);
      return item.attr_num !== attrNum
    });
    console.log("afterRemove", result);
    setCartItems(result);
  };


  // 모달 닫기 함수
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAccommodation(null);
  };


 
  // 즐겨찾기 창 켜기 닫기
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  

  const handleToggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
    
  };


  return (
    <>
      {/* 상단바 */}
      <Topbar />

      {/* 컨테이너 */}
      <div className="container">
        {/* 왼쪽 박스 */}
        <section className="box">
          <aside className="box-sidebar">
            <div style={{ overflowY: "scroll", height: '1005px', maxHeight: '1005px', minHeight: '1005px' }}>
              {/* 왼쪽 사이드 바 */}
              <div>
                {/* 검색창 공간 */}
                <SearchBar handleData={handleData} cartItemsData={cartItemsData} />
              </div>

              <div style={{marginBottom: '30px' }}>
                {/* 검색 목록 공간 */}
                {/*<ResultDisplay/>*/}
              </div>
            </div>
          </aside>

          <aside className="box-sidebar2" style={{ display: isSidebarVisible ? 'block' : 'none' }} >
            <div style={{ overflowY: "scroll", height: '1005px', maxHeight: '1005px', minHeight: '1005px', position: 'relative' }}>
              {/* 왼쪽 사이드바 옆 즐겨찾기 공간 */}
              {/* <ResultDisplay cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart}/> */}
              <FavoriteCart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} /> {/* 삭제 함수 전달 */}
              <ButtonFavourite cartItems={cartItems} />
            </div>
          </aside>

          <div style={{ marginTop: '370px', display: 'flex', position: 'relative' }}>

      {/* 버튼 클릭에 따라 사이드바 토글 */}
      <button
        onClick={handleToggleSidebar}

        style={{
          position: 'absolute',
          zIndex: '10',
          backgroundColor: 'white',
          color: 'black',
          borderTopRightRadius: '10px',
          borderBottomRightRadius: '10px',
          fontSize: '35px',
          fontWeight: '800',
          marginTop: 'auto',
          marginBottom: 'auto',
          height: '50px',
          width: '30px',
          border: '0px'
        }}
      >
        {isSidebarVisible ? (
          <img
          style={{ width: '25px', height: '29px', marginTop: '8px', marginLeft: '-6px' }}
          src="https://www.aulavirtualpmc.com/course/format/tiles/pix/chevron-left.svg"
          alt=""
        />
        ) : (
          <img
            style={{ width: '25px', height: '29px', marginTop: '8px', marginLeft: '-4px' }}
            src="https://www.aulavirtualpmc.com/course/format/tiles/pix/chevron-right.svg"
            alt=""
          />
        )}
      </button>
    </div>

          {/* 오른쪽 지도 공간 */}
          <div className="box-contents" style={{position: 'relative', borderLeft: '0px'}}>

            {/* 챗봇 공간 */}
            <div className='chat-div'>
              <button className='chat-button' onClick={handleChatModal} style={{cursor: 'pointer'}}>
                🍊
                CHAT
                
              </button>  
            </div>

            {/* 지도 공간 */}
            <div style={{ maxHeight: '1005px', height: '1005px', minHeight: '1005px', width: '100%'}}>
            <Map category={dataFromChild}/>
            </div>


            {/* ai챗봇 채팅 공간 */}
            <div className='chat-div'>
              {/* AiTest 모달 */}
              {isAiTestModalOpenClose && (
                <div className="ai-test-modal">
                  <div className="ai-test-modal-content">
                    <AiTest />
                    <button onClick={handleChatModal} style={{ marginBottom: '44px', backgroundColor: '#3498db', color: 'white' ,height: '32px', borderRadius: '8px',visibility : 'hidden'}}>닫기</button>
                    <div className='chat-div'>
                    <button className='chat-button' onClick={handleChatModal} style={{cursor: 'pointer'}}>
                🍊
                CHAT
                
              </button>  
              </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

 

      {/* 모달 */}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          {/* TopAccInfo 컴포넌트에 선택된 숙소 정보와 닫기 함수 전달 */}
          <TopAccInfo accommodation={selectedAccommodation} onClose={handleCloseModal} />
          <TopResInfo accommodation={selectedRestaurant} onClose={handleCloseModal} />
          <TopTourInfo accommodation={selectedTour} onClose={handleCloseModal} />
        </Modal>
      )}
      
    </>
  );
}

export default MapPage;
