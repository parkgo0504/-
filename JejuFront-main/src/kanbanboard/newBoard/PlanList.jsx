import { motion } from "framer-motion"
import styled from "styled-components"
import PlanContentBox from "./PlanContentBox"
import { useState } from "react"
import PlanTitle from "./PlanTitle";

export default function PlanList({planList, setPlanList, setActivePlanTitle}) {

    const [ visible, setVisible ] = useState(false);

    return (
        <PlanListDiv>
            <TitleDiv>
                <TitleText>저장한 여행</TitleText>
            </TitleDiv>
            <hr style={{ margin:"1px 15px 1px 15px" }}/>

            <TitleInput onClick={()=>{
                setVisible(!visible)
            }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {visible ? "취 소" : "계획 추가하기" }
            </TitleInput>
            {visible && <PlanTitle setActivePlan={setActivePlanTitle} setPlanList={setPlanList}/>}

            {planList.map(item => (
                <PlanContentBox
                    key={item.id}
                    title={item.title}
                    setPlanList={setPlanList}
                    onClick={(e) => {
                        setActivePlanTitle(item.title);
                    }}
                />
            ))}
        </PlanListDiv>
    )
}

const PlanListDiv = motion(styled.div`
    background-color: #B7C093;
    max-width: 380px;
    min-width: 380px;
`)

const TitleDiv = motion(styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 0px;
`)

const TitleText = motion(styled.h1`
    margin: 12px 0px 12px 0px;
    color: white;
`)

const TitleInput = motion(styled.button`
    background-color: white;
    background: none;
    border: 2px solid white;
    border-radius: 10px;
    margin: 10px 30px 0px 42px;
    padding: 5px 5px;
    min-width: 315px;
    color: white;
    font-size: 15px;
    
`)
