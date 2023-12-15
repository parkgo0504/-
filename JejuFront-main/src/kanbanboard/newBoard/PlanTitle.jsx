import { motion } from "framer-motion"
import { useState } from "react"
import styled from "styled-components"

export default function PlanTitle({setPlanList, setActivePlan}){

    const [planTitle, setPlanTitle] = useState("");

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            setPlanList((current) => ([...current, {
                id:Math.random().toString(36) + Math.random().toString(36),
                title: planTitle
            }]))
            setActivePlan(planTitle);
            setPlanTitle("");
        }
    }
    return(
        <MainDiv>
            <PlanTitleName
                type="text"
                value={planTitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onChange={(e) => {
                    setPlanTitle(e.currentTarget.value);
                }}
                onKeyPress={handleKeyPress}

            />
            <PlanAddButton
                onClick={(e) => {
                    setPlanList((current) => ([...current, {
                        id:Math.random().toString(36) + Math.random().toString(36),
                        title: planTitle
                    }]))
                    setActivePlan(planTitle);
                    setPlanTitle("");
                }}
            >
                추가
            </PlanAddButton>
        </MainDiv>
    )
}

const MainDiv = motion(styled.div`
    margin: 10px 10px 0px 10px;
`)

const PlanTitleName = motion(styled.input`
    background-color: #ffffff;
    border: none;
    margin: 0px 0px 0px 35px;
    padding: 5px 0px 10px;
    font-size: 18px;
    width: 70%;
`)

const PlanAddButton = motion(styled.button`
    background-color: white;
    background: none;
    border: 2px solid white;
    border-radius: 10px;
    margin: 10px 10px 0px 10px;
    padding: 5px 5px;
    color: white;
    font-size: 15px;
`)