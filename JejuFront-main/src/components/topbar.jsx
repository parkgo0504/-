import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Buttons from "./buttons"
import { webStorages } from "../constants"

export default function Topbar(){

    return (
        <TopBarContainer>
            <TopDiv>
                <MainTextDiv>
                    <Link to="/">
                        <LogoBtn
                            whileHover={{ scale:1.1 }}
                        >
                            JeJu View
                        </LogoBtn>
                    </Link>
                </MainTextDiv>
                <LoginContaner>
                {localStorage.getItem(webStorages.userId) ?
                        <div style={{display:"flex"}}>
                            <LoginDiv>
                                {}
                            </LoginDiv>

                            <LoginDiv>
                                <Buttons.BigButton onClick={() => {
                                    alert("로그아웃되었습니다.")
                                    localStorage.removeItem(webStorages.userId)
                                    location.href = "/";
                                }}>
                                    로그아웃
                                </Buttons.BigButton>
                            </LoginDiv>
                        </div>
                    :
                        <LoginDiv>
                            <Link to="/signin">
                                <Buttons.BigButton>로그인</Buttons.BigButton>
                            </Link>
                        </LoginDiv>
                    }
                {localStorage.getItem(webStorages.userId) ?
                       
                        <>
                        </>
                    :
                        <LoginDiv>
                            <Link to="/signup">
                                {/* <LoginBtn>회원가입</LoginBtn> */}
                                <Buttons.BigButton>회원가입</Buttons.BigButton>
                            </Link>
                        </LoginDiv>
                }
                                    
                </LoginContaner>
            </TopDiv>
            <Line />
            <BottomDiv>
            {localStorage.getItem(webStorages.userId) ? 
                <div>
                    <Link to="/">
                        <BottomBtn
                            whileHover={{ scale:1.1 }}
                            whileTap={{ scale: 0.9 }}    
                        >
                            메인화면
                        </BottomBtn>
                    </Link>
                    <Link to="/map">
                        <BottomBtn
                            whileHover={{ scale:1.1 }}
                            whileTap={{ scale: 0.9 }}    
                        >
                            지도 Map
                        </BottomBtn>
                    </Link>
                    <Link to="/board">
                        <BottomBtn
                            whileHover={{ scale:1.1 }}
                            whileTap={{ scale: 0.9 }}    
                        >
                            여행 일정 계획
                        </BottomBtn>
                    </Link>
                </div>
            :
                <div>
                    <Link to="/">
                    <BottomBtn
                        whileHover={{ scale:1.1 }}
                        whileTap={{ scale: 0.9 }}    
                    >
                        메인화면
                    </BottomBtn>
                    </Link>
                    <Link to="/map">
                    <BottomBtn
                        whileHover={{ scale:1.1 }}
                        whileTap={{ scale: 0.9 }}    
                    >
                        지도 Map
                    </BottomBtn>
                    </Link>
                </div>
            
            }
                
                {/* <Link to="/inquiry">
                    <BottomBtn
                        whileHover={{ scale:1.1 }}
                        whileTap={{ scale: 0.9 }}    
                    >
                        문의 게시판
                    </BottomBtn>
                </Link> */}
                
            </BottomDiv>
        </TopBarContainer>
    )
}


const TopBarContainer = styled.div`
    width: 100%;
    height: 160px;
    /* background-color: #F26800; */
    background-color: #ebc194;
    position: sticky;
    top: 0;
    z-index:1000;
    /* background-image: url('./public/bgimg4.jpg'); */
    background-position: center;
    border-bottom: solid;
    border-color: mintcream;
    border-width: 2px;
    box-shadow: 0px 0px 30px #00000044;
`
const TopDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

`
const MainTextDiv = styled.div`
    display: flex;
    margin-left: 40px;
    min-width: 500px;

`
const LogoBtn = motion(styled.button`
    font-size: 40px;
    min-width: 250px;
    min-width: 400px;
    border: solid;
    text-align: center;
    color: #F26800;
    -webkit-text-stroke-width: 2px;
    padding: 5px 21px;
    margin-top: 20px;
    margin-bottom: 10px;
    margin-left: 40px;
    background: none;
`)
const LoginContaner = styled.div`
    display: flex;
    margin-right: 50px;
`
const LoginDiv = styled.div`
    padding-top: 20px;
    margin-right: 50px;
`

const BottomDiv = styled.div`
    position : absolute;
    bottom : 0;
    margin-left: 50px;
`
const BottomBtn = motion(styled.button`
    margin-left: 15px;
    margin-right: 15px;
    padding-bottom: 6px;
    min-width: 120px;
    background: none;
    font-weight: 700;
    color: white;
    border-color: #F2CEA2;
    border: none;
    font-size: 15px;
`)

const Line = styled.hr`
 width: 95%;
 border-color: white;
`