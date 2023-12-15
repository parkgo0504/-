import { motion } from "framer-motion";
import styled from "styled-components";
import { apiUrls, webStorages } from "../../constants";
import axios from "axios";

export default function SavedContentBox({
    content,
    activeCalender,
    setCalenderData,
    attr,
    address,
    setSavedListData,
    tourtype,
    favNum,
    imgUrl,
}){    
    
    return (
        <ContentBoxDiv onClick={() => {
            setCalenderData((current) => {
                const editIndex = current.findIndex((item) => item.id === activeCalender.id);
                current[editIndex].schedules.push({id:Math.random().toString(36), content, attr, address, tourtype});
                return [...current];
            })
            axios.post(apiUrls.aiApiUrls.favoriteSorted(localStorage.getItem(webStorages.userId), favNum))
                .then((response) => {
                    setSavedListData(response.data);
                })
        }}
        whileHover={{ scale:1.05 }}
        >
            <div>
                <FavoriteImg src={imgUrl}
                    whileHover={{ scale: 1.6 }}
                />
            </div>
            <div>
                <ContentText>{content}</ContentText>
                <TourTypeText>({tourtype})</TourTypeText>
            </div>
        </ContentBoxDiv>
    )
}


const ContentBoxDiv = motion(styled.div`
    display: flex;
    background-color: #fcfdf5;
    padding: 6px;
    margin: 10px;
    border: 2px solid white;
    border-radius: 10px;
    height: 70px;
`)


const FavoriteImg = motion(styled.img`
    width: 55px;
    height: 50px;
    margin-right: 20px;
    border: 1px solid #B7C093;
`)

const ContentText = motion(styled.div`
    font-weight: 600;
`)

const TourTypeText = motion(styled.div`
    font-size: 14px;
`)