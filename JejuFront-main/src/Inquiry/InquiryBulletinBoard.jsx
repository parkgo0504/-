import styled from "styled-components"
import Topbar from "../components/topbar"
import { motion } from "framer-motion"
import InquiryBulletinDetail from "./inquiryBulletinDetail"

export default function InquiryBulletinBoard(){
    return(
        <MainDiv>
            <Topbar />
            <MainContentContainer>
                <InquiryContainer>
                    <div>
                        <TopBtn>Inquiry bulletin board</TopBtn>
                    </div>
                    <hr/>
                    <div>
                        <InquiryBulletinDetail />
                    </div>
                </InquiryContainer>
            </MainContentContainer>
        </MainDiv>
    )
}

const MainDiv = styled.div`
    width: 100%;
    height: 100vh;
`  

const MainContentContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`
const InquiryContainer = motion(styled.div`
    border: solid;
    border-width: 3px;
    background: none;
    width: 1400px;
    max-width: 1400px;
    min-width: 1440px;
    height: 950px;
`)

const TopBtn = motion(styled.h3`
    color: #D8B08C;
    margin: 20px 20px 0px 30px;
    background: none;
    border: none;
    font-size: 30px;
`)

