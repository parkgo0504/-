import React, { useState } from 'react';
import axios from 'axios';
import ResultDisplay from '../div/ResultDisplay'; // 이 부분을 추가
import Button from '../button/button';
  


function SearchBar( {handleData, cartItemsData} ) {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [selectedGroup1, setSelectedGroup1] = useState('top');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const SerchData = async () => {
    const result = await axios.get(

      `https://deploytest-s26rn5fmbq-du.a.run.app/api/input?name=${searchTerm}`

    );
    window.kakaoMapHandlers.updateMarkers(result.data);
    setData(result.data);
    setSelectedGroup1("search");
    setSearchTerm('');  // 검색 후에 입력 필드 초기화
  };

  return (

    <div>
      <div style={{ display: 'flex', alignItems: 'center', margin: '4%', textOverflow: 'ellipsis', overflow: ''}}>

        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              SerchData();
              e.preventDefault(); // Enter 키를 눌렀을 때 새로고침 방지
              setSearchTerm(''); 
            }
          }}

          style={{
            width: '80%',
            height: '50px',
            fontSize: '17px',
            borderRadius: '10px',
            marginRight: '14px',
          }}
        />
        
        <button style={{ width: '50px', height: '50px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#f89b00', color: 'white' }} onClick={SerchData}>
          검색
        </button >
        
      </div>
      <div>
        <Button 
          onData={handleData} 
          onItems={cartItemsData} 
          searchResultData={data} 
          selectedGroup1={selectedGroup1} 
          setSelectedGroup1={setSelectedGroup1} 
          setSearchTerm={setSearchTerm}
        />
      </div>
    </div>
  );
}

export default SearchBar;