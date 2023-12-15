import { motion } from "framer-motion"
import styled from "styled-components"

export default function InquiryBulletin(){
    return(
        <MainDiv>
            <input type="text"/>
            <input type="text"/>
        </MainDiv>
    )
}

const MainDiv = motion(styled.div`
    width: 300px;
    height: 300px;
`)