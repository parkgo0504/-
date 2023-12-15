/*global kakao */
import React, { useEffect,useState } from "react";
import topRestaurant from "../div/mapData/topRestaurant.json"
import topAccommodations from "../div/mapData/topAccommodations.json"
import topTourist from "../div/mapData/topTourist.json"
function Map(props) {
  const [markers, setMarkers] = useState([]);

  const [FavoriteCart, setFavoriteCart] = useState([]);

  //FavoriteCart 데이터 받아서 출력
  window.FavoriteCartMapHandlers = {
    updateFavorteMap:(data) =>{
      console.log("FavoriteCart 출력1111111",data);
      // 배열의 마지막 요소를 따로 저장      
      const lastItem = data[data.length - 1];
      setFavoriteCart(lastItem);
    }
  }

// 테스트용 선웅씨 이거 참고하고 쓰고 나면 이부분 지워요! FavoriteCart이거 쓰면 됨 요기에 즐겨찾기 최근에 추가한 정보 들어있음!
    useEffect(() => {
      console.log("Updated FavoriteCart:", FavoriteCart);
      mapscript();
    }, [FavoriteCart]);
///////////
      

  window.kakaoMapHandlers = {
    
    updateMarkers : (data) => {
        markers.forEach((marker) => {marker.setMap(null)});
        console.log(data);
        const createdMarkers = data.map((item,idx) => {
          const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
          const imageSize = new kakao.maps.Size(36, 37);
          const imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691),
            spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10),
            offset: new kakao.maps.Point(13, 37)
          };
          const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
          const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(item.lat, item.lng),
            map: window.kakaoMapRef,
            image: markerImage
            
          })
              
        
        const contentInner = `<div style="padding: 10px 15px;
        position: relative; bottom:20px; border-radius: 28px; background-color: rgb(255, 255, 255);
        box-shadow: rgb(0 0 0 / 4%) 0px 0px 0px 1px, rgb(0 0 0 / 18%) 0px 2px 4px;
        color: rgb(34, 34, 34); text-align:center;
        font-size: 14px;
        font-weight: 880;"> ${(item.name)}</div>`;
        const content = document.createElement('div');
        content.innerHTML = contentInner;
        const whiteOverlay = new kakao.maps.CustomOverlay({
          content: content,
          map: null,
          position: new kakao.maps.LatLng(item.lat, item.lng),
        });
         // 마우스 오버시에만 마커 표시
         kakao.maps.event.addListener(marker,'mouseover', () => {
          if (whiteOverlay) {
            whiteOverlay.setMap(window.kakaoMapRef);
          }
        });

        // 마우스 벗어날 때 마커 제거
        content.addEventListener('mouseout', () => {
          if (whiteOverlay) {
            whiteOverlay.setMap(null);
          }
        });
          return marker;
        })
        setMarkers(() => createdMarkers);
      }
  }
  

  window.RecommendRootMakerHandlers= {
    updateRecommendRootMaker : (data) =>{
      markers.forEach((marker) => {marker.setMap(null)});
      console.log("추천데이터 지도",data);
      const createdMarkers = data.map((item,idx) => {
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
        const imageSize = new kakao.maps.Size(36, 37);
        const imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691),
          spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10),
          offset: new kakao.maps.Point(13, 37)
        };
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(item.lat, item.lng),
          map: window.kakaoMapRef,
          image: markerImage
          
        })
        const contentInner = `<div style="padding: 10px 15px;
        position: relative; bottom:20px; border-radius: 28px; background-color: rgb(255, 255, 255);
        box-shadow: rgb(0 0 0 / 4%) 0px 0px 0px 1px, rgb(0 0 0 / 18%) 0px 2px 4px;
        color: rgb(34, 34, 34); text-align:center;
        font-size: 14px;
        font-weight: 880;"> ${(item.name)}</div>`;
        const content = document.createElement('div');
        content.innerHTML = contentInner;
        const whiteOverlay = new kakao.maps.CustomOverlay({
          content: content,
          map: null,
          position: new kakao.maps.LatLng(item.lat, item.lng),
        });
         // 마우스 오버시에만 마커 표시
         kakao.maps.event.addListener(marker,'mouseover', () => {
          if (whiteOverlay) {
            whiteOverlay.setMap(window.kakaoMapRef);
          }
        });

        // 마우스 벗어날 때 마커 제거
        content.addEventListener('mouseout', () => {
          if (whiteOverlay) {
            whiteOverlay.setMap(null);
          }
        });

        return marker;
      })
      setMarkers((current) => [...current, ...createdMarkers]);
    }
}


  useEffect(() => {
    mapscript();
  }, [props.category]);
  // console.log(props.category);
  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(33.36243443116018, 126.5334771583528),
      level: 9,
    };

    const map = new kakao.maps.Map(container, options);
    window.kakaoMapRef = map;

    ////////////////////////////////////// 마커찍기
    // 마커 찍기 함수
    const addMarkersToMap = (accommodations, map) => {

      
      // 기존 마커 및 오버레이 제거
      markers.forEach(marker => {
        kakao.maps.event.removeListener(marker, 'mouseover');
        marker.setMap(null);
      });
      // 새로운 마커 추가
      const newMarkers = accommodations.map((accommodation) => {
        const markerPosition = new kakao.maps.LatLng(accommodation.lat, accommodation.lng);
        const newMarker = new kakao.maps.Marker({
          position: markerPosition,
          map: map,
        });
        // 마커 위치에 오버레이 추가
 
        const contentInner = `<div style="padding: 10px 15px;
          position: relative; bottom:20px; border-radius: 28px; background-color: rgb(255, 255, 255);
          box-shadow: rgb(0 0 0 / 4%) 0px 0px 0px 1px, rgb(0 0 0 / 18%) 0px 2px 4px;
          color: rgb(34, 34, 34); text-align:center;
          font-size: 14px;
          font-weight: 880;"> ${(accommodation.name)}</div>`;
        
        const content = document.createElement('div');
        content.innerHTML = contentInner;
        // 마커 위치에 오버레이 추가 (초기에는 지도에 표시하지 않음)
          const whiteOverlay = new kakao.maps.CustomOverlay({
            content: content,
            map: null,
            position: markerPosition,
          });

          // 마우스 오버시에만 마커 표시
          kakao.maps.event.addListener(newMarker, 'mouseover', () => {
            if (whiteOverlay) {
              whiteOverlay.setMap(map);
            }
          });

          // 마우스 벗어날 때 마커 제거
          content.addEventListener('mouseout', () => {
            if (whiteOverlay) {
              whiteOverlay.setMap(null);
            }
          });

    
        return newMarker;
      });
    
      // 마커 배열 업데이트
      setMarkers(newMarkers);
    };

    let markers = []; // 함수 외부에서 변수로 선언
    
    const MarkerTest = (accommodation, map) => {
      // 기존 마커 제거
      removeMarker();
      for (var i = 0; i < accommodation.length; i++) {
        const position = new kakao.maps.LatLng(accommodation[i].lat, accommodation[i].lng);
        const idx = i;
        addMarker(position, idx, accommodation[i].name);
      }
    
      function addMarker(position, idx, name) {
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
        const imageSize = new kakao.maps.Size(36, 37);
        const imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691),
          spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10),
          offset: new kakao.maps.Point(13, 37)
        };
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
        const marker = new kakao.maps.Marker({
          position: position,
          image: markerImage,
          map: map
        });
        markers.push(marker);
    
        // 마커 위치에 오버레이 추가
        const contentInner = `<div style="padding: 10px 15px;
          position: relative; bottom:20px; border-radius: 28px; background-color: rgb(255, 255, 255);
          box-shadow: rgb(0 0 0 / 4%) 0px 0px 0px 1px, rgb(0 0 0 / 18%) 0px 2px 4px;
          color: rgb(34, 34, 34); text-align:center;
          font-size: 14px;
          font-weight: 880;"> ${name}</div>`;
    
        const content = document.createElement('div');
        content.innerHTML = contentInner;
    
        // 마커 위치에 오버레이 추가 (초기에는 지도에 표시하지 않음)
        const whiteOverlay = new kakao.maps.CustomOverlay({
          content: content,
          map: null,
          position: position,
        });
    
        // 마우스 오버시에만 마커 표시
        kakao.maps.event.addListener(marker, 'mouseover', () => {
          if (whiteOverlay) {
            whiteOverlay.setMap(map);
          }
        });
    
        // 마우스 벗어날 때 마커 제거
        content.addEventListener('mouseout', () => {
          if (whiteOverlay) {
            whiteOverlay.setMap(null);
          }
        });
      }
    
      function removeMarker() {
        for (var i = 0; i < markers.length; i++) {
          // 마커와 연관된 이벤트 제거
          kakao.maps.event.removeListener(markers[i], 'mouseover');
          markers[i].setMap(null);
        }
        markers = [];
      }
      setMarkers(markers);
    };


    //////////////////////리스트
       // top 20 음식점
       const foodlist = [];
       const restaurantData = topRestaurant;
       restaurantData.forEach((item) => {
         const restaurantItem = {
           name: item.name,
           lat: item.lat,
           lng: item.lng
         };
         foodlist.push(restaurantItem);
       });
      //  console.log(foodlist);
        // top 20 관광지
       const tourlist = [];
       const tourData = topTourist;
       tourData.forEach((item) => {
         const tourItem ={
           name : item.name,
           lat: item.lat,
           lng: item.lng
         };
         tourlist.push(tourItem);
       })
      //  console.log(tourlist);
       // top 20 숙소
       const sleeplist = [];
       const sleepData = topAccommodations;
       sleepData.forEach((item) => {
         const sleepItem ={
           name : item.name,
           lat: item.lat,
           lng: item.lng
         };
         sleeplist.push(sleepItem);
       })
      //  console.log(sleeplist);
       
      function panTo(star) {
        // 이동할 위도 경도 위치를 생성합니다 
        var moveLatLon = new kakao.maps.LatLng(star.lat, star.lng);
        // 지도 중심을 부드럽게 이동시킵니다
        // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
        map.panTo(moveLatLon);            
    }        
    
    // 카테고리별 마크 표시
    if(props.category=='attraction'){
      MarkerTest(tourlist,map)
    }else if(props.category=='restaurant'){
      MarkerTest(foodlist,map)
    }else if(props.category == 'accommodation'){
      MarkerTest(sleeplist,map)
    }else{
      // console.log(props.category)
    }


  };
  return <div id="map" style={{ width: "100%", height: "100vh" }}>


  </div>;
  
}

export default Map;
