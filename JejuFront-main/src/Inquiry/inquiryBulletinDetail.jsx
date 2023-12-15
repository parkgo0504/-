import styled from "styled-components"

export default function InquiryBulletinDetail(){
    return(
        <ContentBox>
            <ContentDetail>쓰발 머리가 하나도 안돌아가네</ContentDetail>
            <ContentDate>2021.12.12</ContentDate>
            <ContentWriter>rladuddnd</ContentWriter>
        </ContentBox>
    )
}

const ContentBox = styled.button`
    display: flex;
    margin: 0px;
    width: 100%;
    height: 50px;
`
const ContentDetail = styled.h2`
    display: flex;
    margin-left: 60px;
    width: 60%;
    font-weight: 500;
`
const ContentDate = styled.h2`
    display: flex;
    margin-left: 30px;
    width: 20%;
    font-weight: 100;
`
const ContentWriter = styled.h2`
    display: flex;
    margin-left: 30px;
    width: 20%;
`