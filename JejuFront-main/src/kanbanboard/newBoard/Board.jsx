import { motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';
import BoardList from './boardList';
import axios from 'axios';
import { apiUrls, webStorages } from '../../constants';

export default function Board({planTitle, calenders, setCalenderData, setActiveCalender}) {

    console.log("planTitle", planTitle);
    function containerDeleteBtn(key){
        return (
            () => {
                setMember(member.filter((item) => (item.id !== key)) )
            }
        )
    }

  return (
    <div>
        <BtnDivContainer>
            <PlusBtn onClick={() => {
                setCalenderData( (current) => {
                        current.push({
                            id: Math.random().toString(36),
                            day: current.length+1,
                            schedules: []
                        });
                    return [...current];
                    })
                }
            }
                whileHover={{ scale:1.1 }}
                whileTap={{ scale:0.9}}
            >
                일차 추가
            </PlusBtn>

            <PlusBtn onClick={()=>{
                const requestData = [];
                calenders.forEach((item) => {
                    item.schedules.forEach((schedule) => {
                        requestData.push({
                            user_id: localStorage.getItem(webStorages.userId),
                            plan_title: planTitle,
                            day_num: item.day,
                            attr_num: schedule.attr,
                            plan_order: schedule.order
                        })
                    })
                })
                axios.post(apiUrls.backEndApiUrls.savePlanList, requestData)
                    .then((response) => {alert("저장을 완료하였습니다!")})
                    .catch((e) => {console.error(e); alert("저장에 실패하였습니다...")});
            }}
                whileHover={{ scale:1.1 }}
                whileTap={{ scale:0.9}}
            
            >
                저장
            </PlusBtn>
            
        </BtnDivContainer>
        <TextDivContainer>
            {calenders.map(item => (
                <BoardList 
                calender={item} 
                key={item.id} 
                setCalenderData={setCalenderData}
                setActiveCalender={setActiveCalender}
            />
            ))}
        </TextDivContainer>
    </div>
  );
}

const BtnDivContainer = motion(styled.div`
    padding: 5px;
`)

const PlusBtn = motion(styled.button`
    margin-right: 30px;
    margin-bottom: 10px;
    margin-top: 15px;
    background-color: #F26800;
    border: none;
    border-radius: 40px;
    border-width: 2px;
    width: 130px;
    height: 40px;
    font-size: 25px;
    font-weight: 800;
    color: white;
`)

const TextDivContainer = motion(styled.div`
    display: flex;
    
`)