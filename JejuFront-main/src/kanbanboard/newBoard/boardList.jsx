import { motion } from "framer-motion"
import { useState } from "react"
import styled from "styled-components"
import ContentBox from "./contentBox";


export default function BoardList({ calender , setCalenderData, setActiveCalender}) {

    return(
        <div>
            <MainDiv 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
            >
                <div style={{ marginBottom:"0px"}}>
                    <DeleteListBtn 
                        onClick={() => {
                            setCalenderData((current) => {
                                const result = current.filter((item) => (item.id !== calender.id))
                                result.forEach((item, i) => {item.day = i+1});
                                return result;
                            })
                            setActiveCalender("");
                        }}
                        initial={{ opacity: 0.1 }}
                        whileHover={{ opacity: 1 }}
                    >
                        X
                    </DeleteListBtn>
                </div>
                <TopContainer>
                    <NameDiv>{calender.day + " 일차"}</NameDiv>
                    <ScheduleAddBtn 
                        onClick={() => {
                            setActiveCalender(calender);
                        }}
                        whileHover={{ scale: 1.08 }}
                        
                    >
                        일정 추가
                    </ScheduleAddBtn>
                    
                </TopContainer>
                <hr style={{ margin:"15px 10px 8px 10px"}} />
                {calender.schedules.map((item, i) => (
                    <ContentBox 
                        key={item.id} 
                        id={item.id}
                        parentId={calender.id}
                        content={item.content} 
                        dataLength={calender.schedules.length}
                        address={item.address}
                        index={i}
                        setCalenderData={setCalenderData}
                        tourtype={item.tourtype}
                        // deleteButtonHandler={deleteButtonHandlerGenerator(item.id)} 
                        // moveUpButtonHandler={moveButtonHandlerGenerator(i, "up")}
                        // moveDownButtonHandler={moveButtonHandlerGenerator(i, "down")}
                    />
                ))}
            </MainDiv>
            <BottomDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
            >
                <hr style={{ margin:"15px 10px 8px 10px"}} />
            </BottomDiv>
        </div>
    )
} 

const MainDiv = motion(styled.div`
    display: flex;
    flex-direction: column;
    background-color: #97A275;
    width: 300px;
    height: 700px;
    overflow-y: scroll;
    margin-right: 30px;
    border-color: #97A275;
    max-width: 300px;
    min-width: 300px;
    color: white;
`)

const DeleteListBtn = motion(styled.button`
    margin: 10px 10px;
    border-radius: 5px;
    color: white;
    border-radius: 20px;
    border: none;
    width: 33px;
    height: 28px;
    float: right;
    font-size: 30px;
    background: none;
`);

const TopContainer = motion(styled.div`
    display: flex;
`)

const NameDiv = motion(styled.h1`
    width: 100%;
    margin: 0px 0px 0px 15px;
    color: #f9fff4;
`)

const ScheduleAddBtn = motion(styled.button`
    background-color: #F2B950;
    border: none;
    border-radius: 10px;
    padding: 5px;
    margin: 10px 20px 0px 0px;
    color: white;
    font-size: 15px;
    height: 30px;
    width: 150px;
`)

const BottomDiv = motion(styled.div`
    display: flex;
    flex-direction: column;
    background-color: #97A275;
    width: 300px;
    height: 120px;
    margin-right: 30px;
    border-color: #97A275;
    max-width: 300px;
    min-width: 300px;
`)