import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

export default function ContentBox({
    id,
    parentId,
    content, 
    index,
    dataLength,
    address,
    setCalenderData,
    tourtype
}){
    function deleteButtonHandler(){
        setCalenderData((current) => {
            const editIndex = current.findIndex((item) => (item.id === parentId));
            const editedSchedules = current[editIndex].schedules.filter((item) => (item.id !== id));
            current[editIndex].schedules = editedSchedules;
            return [...current];
        })
    }

    function moveUpButtonHandler(){
        setCalenderData((current) => {
            const editIndex = current.findIndex((item) => (item.id === parentId));
            const [spliced] = current[editIndex].schedules.splice(index, 1);
            current[editIndex].schedules.splice(index-1, 0, spliced);
            return [...current]
        })
    }
    function moveDownButtonHandler(){
        setCalenderData((current) => {
            const editIndex = current.findIndex((item) => (item.id === parentId));
            const [spliced] = current[editIndex].schedules.splice(index, 1);
            current[editIndex].schedules.splice(index+1, 0, spliced);
            return [...current]
        })
    }

    const upButtonDisabled = {
        disabled : index === 0 ? true : false
    }
    const downButtonDisabled = {
        disabled : index === dataLength - 1 ? true : false
    }

    
    const [open, setOpen] = useState(false);
    const toggleSwitch = () => setOpen(!open);

    return (
        <ContentBoxDiv
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0}}
        >
            <ContentBoxSubDov>
                <ContentTitle>
                    <div>
                        {content}
                    </div>
                    <ContentTourTypeText>
                        ({tourtype})
                    </ContentTourTypeText>
                </ContentTitle>
                <ContentDetail>
                    <div>
                        (주소)  
                    </div>
                    {address}
                </ContentDetail>
            </ContentBoxSubDov>

            <ButtonContainer>
                <MoveBtn {...upButtonDisabled} onClick={moveUpButtonHandler}
                    whileHover={{ opacity: 1, scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0.2 }}
                >
                    ▲
                </MoveBtn> 
                <DeleteBtn onClick={deleteButtonHandler}
                    initial={{ opacity: 0.1 }}
                    whileHover={{ opacity:1 }}
                >
                    X
                </DeleteBtn>
                <MoveBtn {...downButtonDisabled} onClick={moveDownButtonHandler}
                    whileHover={{ opacity: 1, scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0.2 }}
                >
                    ▼
                </MoveBtn>
            </ButtonContainer>
        </ContentBoxDiv>
    )
}

const ContentBoxDiv = motion(styled.div`
    display: flex;
    white-space: initial;
    height: 150px;
    max-height: 150px;
    min-height: 150px;
    justify-content: space-between;
    padding: 6px;
    margin: 10px 10px 5px 10px;
    border-radius: 10px;
    background-color: #fcfdf5;
    color: #804d00;
`)

const ContentBoxSubDov = motion(styled.div`
    display: flex;
    flex-direction: column ;
    justify-content: space-between;
`)

const ContentTitle = motion(styled.div`
    font-size: 20px;
    margin-top: 2px;
    margin-left: 4px; 
    font-weight: 900;
`)
const ContentDetail = motion(styled.div`
    font-size: 14px;
`)

const ContentTourTypeText = motion(styled.div`
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 300;
`)


const MoveBtn = motion(styled.button`
    background: none;
    border: none;
    color: ${ (props) => (props.disabled ? "#FFFFFF33" : "#3F858C")};
    font-size: 15px;
`)

const ButtonContainer = motion(styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`)

const DeleteBtn = motion(styled.button`
    font-weight: 800;
    background: none;
    border: none;
`)
