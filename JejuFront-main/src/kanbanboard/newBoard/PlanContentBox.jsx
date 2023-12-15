import { motion } from "framer-motion"
import { useState } from "react"
import styled from "styled-components"
import { deletePlan } from "../../apis"
import { webStorages } from "../../constants"

export default function PlanContentBox({title, setPlanList, planDeleteHandler, onClick}){

    return (
        <ContentBoxDiv onClick={onClick}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
        >
            <div>
                {title}
            </div>
            <ContentInBtn onClick={()=>{
                if(confirm('삭제 하시겠습니까?')){
                    deletePlan(localStorage.getItem(webStorages.userId), title);
                    setPlanList((current) => (current.filter((item) => (item.title !== title))));
                }
            }}
                initial={{ opacity: 0.3 }}
                whileHover={{ opacity: 1 }}
            >
                삭제
            </ContentInBtn>

        </ContentBoxDiv>
    )
}

const ContentBoxDiv = motion(styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #fcfdf5;
    border: 2px solid white;
    border-radius: 10px;
    margin: 10px 30px;
    padding: 10px 10px;
    min-width: 315px;
`)

const ContentInBtn = motion(styled.button`
    background: none;
    border: none;
    font-weight: 800;
`)

