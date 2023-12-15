import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SavedContentBox from "./savedContentBox";
import axios from "axios";
import { apiUrls, webStorages } from "../../constants";

export default function SavedListBox({activeCalender, savedListData, setSavedListData, setCalenderData, onCloseButtonClick}){

    useEffect(() => {
        axios.post(apiUrls.aiApiUrls.favoriteViewById(localStorage.getItem(webStorages.userId)))
            .then((response) => {
                setSavedListData(response.data);
            });
    }, [])

    return (
        <MainSavedListDiv>
            <ListTopContainer>
                <ListTitle
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    
                >
                    {activeCalender.day + " 일차"}
                </ListTitle>
                <ListCloseBtn onClick={onCloseButtonClick}
                    initial={{ opacity: 0.3 }}
                    whileHover={{ opacity: 1}}
                >
                    Close ▶
                </ListCloseBtn>
            </ListTopContainer>
            <hr />
            <ManualTextBox >
                <ManualText>* 여행지 선택시 거리순으로 재정렬됩니다.</ManualText>
            </ManualTextBox>
            {savedListData.map((item, i) => (
                <SavedContentBox 
                    favNum={item.fav_num}
                    key={i}
                    attr={item.attr_num}
                    content={item.name}
                    address={item.addr} 
                    activeCalender={activeCalender}
                    setCalenderData={setCalenderData} 
                    setSavedListData={setSavedListData}
                    tourtype={item.tourtype}
                    imgUrl={item.img}
                />
            ))}
        </MainSavedListDiv>
    )
}

const MainSavedListDiv = motion(styled.div`
    border: none;
    background-color: #B7C093;
    width: 500px;
    height: 100vh;
    padding: 10px;
    max-width: 350px;
    min-width: 350px;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        width: 0px;
    }
`)
const ListTopContainer = motion(styled.div`
    display: flex;
    justify-content: space-between;
`)

const ListTitle = motion(styled.h2`
    margin: 0px 0px 0px 15px;
    font-size: 40px;
    color: white;
`)

const ListCloseBtn = motion(styled.button`
    width: 90px;
    height: 40px;
    margin: 15px 15px 0px 20px;
    background: none;
    border: none;
    font-size: 20px;
`)
const ManualTextBox = motion(styled.div`
    display: flex;
    justify-content: center;
    margin: 0px 0px 0px 0px;
`)

const ManualText = motion(styled.p`
    font-weight: 600;
    color: #00000070;
`)

