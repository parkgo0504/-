import { motion } from "framer-motion"
import styled from "styled-components"
import Topbar from "../components/topbar"
import { Link } from "react-router-dom"
import Bottombar from "../components/bottomContainer"

export default function MainPage() {
    //부모의 whileHover 이벤트 발생에 대해서
    //자식들에게도 영향을 끼치게 하기 위해
    //미리 작성된 Motion 정의
    const imageInnerParentAnimation = {
        initial: {
            backgroundSize: "auto 100%"
        },
        whileHover: {
            backgroundSize: "auto 120%"
        }
    }
    const imageBlackAnimation = {
        initial: {
            opacity: 0
        },
        whileHover: {
            opacity: 0.5
        }
    }
    const imageInnerAnimation = {
        initial: {
            opacity: 0
        },
        whileHover: {
            opacity: 1
        }
    }
    
    return(
        <MainDiv>
            <Topbar />
                <PageDiv style={{
                    paddingBottom:"45px",
                    backgroundColor:"#BA8E7A"
                }}>
                    <TopImageDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [-60, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{duration: 1 }}
                    >
                        <TopImageTextContainer
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                        >
                            <TopImageInText1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, x: [60, 0] }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 1, duration: 1 }}
                            >
                                Let's
                            </TopImageInText1>
                            <TopImageInText2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, x: [60, 0] }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 1.2, duration: 2 }}
                            >
                                Go 
                            </TopImageInText2>
                            <TopImageInText3
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, x: [60, 0] }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 1.4, duration: 3 }}
                            >
                                JEJU ISLAND
                            </TopImageInText3>
                        </TopImageTextContainer>
                    </TopImageDiv>
                </PageDiv>
                <PageDiv style={{marginTop:"150px"}}>
                <TopPageDiv>
                        <IntroductionTextMainDiv>
                            <IntroductionTextSubDiv>
                                <Link to='/map'>
                                    <IntroductionImages
                                        initial={{ opacity: 0}}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 1 }}
                                    >
                                        <BackgroundImageDiv
                                            initial="initial"
                                            whileHover="whileHover"
                                            transition={{duration: 0.7}}
                                            variants={imageInnerParentAnimation}
                                            imgurl="./map2.jpg"
                                        >
                                            <AbsoluteDiv
                                                transition={{duration: 0.7}}
                                                variants={imageBlackAnimation}
                                            >
                                            </AbsoluteDiv>
                                            <ImageInnerContentDiv
                                                transition={{duration: 0.7}}
                                                variants={imageInnerAnimation}
                                            >
                                                <ImageInnerText>제주 맵 바로가기</ImageInnerText>
                                            </ImageInnerContentDiv>
                                        </BackgroundImageDiv>
                                    </IntroductionImages>
                                </Link>
                            </IntroductionTextSubDiv>
                            <IntroductionTextSubDiv>
                            <Line />
                                    <IntroductionDiv1>
                                        <IntroductionText1Main>
                                            <IntroductionText1
                                                initial={{ opacity: 0}}
                                                whileInView={{ opacity: 1 }}
                                                transition={{ delay: 0.6, duration: 1.2 }}
                                            >
                                                제주도 맞춤형 지도
                                            </IntroductionText1>
                                        </IntroductionText1Main>
                                        <IntroductionText1Sub>
                                            <IntroductionText style={{ fontSize:"25px"}}
                                                initial={{ opacity: 0}}
                                                whileInView={{ opacity: [0, 0.3, 1], x: [60, 0]  }}
                                                transition={{ delay: 1, duration: 1.2 }}
                                            >
                                                지도 서비스로 여행을
                                            </IntroductionText>
                                            <IntroductionText style={{ fontSize:"25px"}}
                                                initial={{ opacity: 0}}
                                                whileInView={{ opacity: [0, 0.3, 1], x: [60, 0]  }}
                                                transition={{ delay: 1, duration: 1.2 }}
                                            >
                                                더욱 편리하고 간편하게 만들어 드립니다.
                                            </IntroductionText>
                                            <Line2 
                                                initial={{ opacity: 0}}
                                                whileInView={{ opacity: 1}}
                                                transition={{ delay: 1.3, duration: 1.2 }}
                                            />
                                            <IntroductionTextBox>
                                                <IntroductionText
                                                    initial={{ opacity: 0}}
                                                    whileInView={{ opacity: [0, 0.3, 1], x: [60, 0]  }}
                                                    transition={{ delay: 1.3, duration: 1.2 }}
                                                >
                                                    제주도의 명소부터 숙박, 식당 등의 정보를 담아내여 여행 일정을 계획하거나 목적지를 찾을 때 도움이 됩니다. 
                                                </IntroductionText>
                                                <IntroductionText
                                                    initial={{ opacity: 0}}
                                                    whileInView={{ opacity: [0, 0.3, 1], x: [60, 0]  }}
                                                    transition={{ delay: 1.6, duration: 1.2 }}
                                                >
                                                    직관적이고 사용하기 쉽게 디자인 된 이 지도를 통해 여러분의 정확한 목적지를 찾을 수 있도록 돕습니다. 
                                                </IntroductionText>
                                            </IntroductionTextBox>
                                        </IntroductionText1Sub>
                                    </IntroductionDiv1>
                            </IntroductionTextSubDiv>
                        </IntroductionTextMainDiv>
                    </TopPageDiv>
                </PageDiv>
                <PageDiv style={{marginTop:"150px"}}>
                <TopPageDiv>
                        <IntroductionTextMainDiv>
                            <IntroductionTextSubDiv>
                                <Link to='/map'>
                                    <IntroductionImages
                                        initial={{ opacity: 0}}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 1 }}
                                    >
                                        <BackgroundImageDiv
                                            initial="initial"
                                            whileHover="whileHover"
                                            transition={{duration: 0.7}}
                                            variants={imageInnerParentAnimation}
                                            imgurl="./chatbot.jpg"
                                        >
                                            <AbsoluteDiv
                                                transition={{duration: 0.7}}
                                                variants={imageBlackAnimation}
                                            >
                                            </AbsoluteDiv>
                                            <ImageInnerContentDiv
                                                transition={{duration: 0.7}}
                                                variants={imageInnerAnimation}
                                            >
                                                <ImageInnerText>제주 맵 바로가기</ImageInnerText>
                                            </ImageInnerContentDiv>
                                        </BackgroundImageDiv>
                                    </IntroductionImages>
                                </Link>
                            </IntroductionTextSubDiv>
                            <IntroductionTextSubDiv>
                            <Line />
                                    <IntroductionDiv1>
                                        <IntroductionText1Main>
                                            <IntroductionText1
                                                initial={{ opacity: 0}}
                                                whileInView={{ opacity: 1 }}
                                                transition={{ delay: 0.6, duration: 1.2 }}
                                            >
                                                AI Chat Bot 서비스
                                            </IntroductionText1>
                                        </IntroductionText1Main>
                                        <IntroductionText1Sub>
                                            <IntroductionText style={{ fontSize:"25px"}}
                                                initial={{ opacity: 0}}
                                                whileInView={{ opacity: [0, 0.3, 1], x: [60, 0]  }}
                                                transition={{ delay: 1, duration: 1.2 }}
                                            >
                                                AI 챗봇 서비스로
                                            </IntroductionText>
                                            <IntroductionText style={{ fontSize:"25px"}}
                                                initial={{ opacity: 0}}
                                                whileInView={{ opacity: [0, 0.3, 1], x: [60, 0]  }}
                                                transition={{ delay: 1, duration: 1.2 }}
                                            >
                                                명소, 식당, 숙박 정보를 간편하게 얻을 수 있습니다.
                                            </IntroductionText>
                                            <Line2 
                                                initial={{ opacity: 0}}
                                                whileInView={{ opacity: 1}}
                                                transition={{ delay: 1.3, duration: 1.2 }}
                                            />
                                            <IntroductionTextBox>
                                                <IntroductionText
                                                    initial={{ opacity: 0}}
                                                    whileInView={{ opacity: [0, 0.3, 1], x: [60, 0]  }}
                                                    transition={{ delay: 1.3, duration: 1.2 }}
                                                >
                                                    지도 서비스를 통한 AI 챗봇 기능은 사용자가 명소, 식당, 숙박 시설에 관한 평점 요약 정보를 편리하게 얻을 수 있는 혁신적인 기능을 제공합니다. 
                                                </IntroductionText>
                                                <IntroductionText
                                                    initial={{ opacity: 0}}
                                                    whileInView={{ opacity: [0, 0.3, 1], x: [60, 0]  }}
                                                    transition={{ delay: 1.6, duration: 1.2 }}
                                                >
                                                    이를 통해 사용자들은 지도 앱 내에서 챗봇과의 상호작용을 통해 명소의 매력, 식당의 맛, 숙소의 편의성 등에 대한 평가를 쉽게 확인할 수 있습니다.
                                                </IntroductionText>
                                            </IntroductionTextBox>
                                        </IntroductionText1Sub>
                                    </IntroductionDiv1>
                            </IntroductionTextSubDiv>
                        </IntroductionTextMainDiv>
                    </TopPageDiv>
                </PageDiv>

                <PageDiv style={{marginTop:"150px"}}>
                <TopPageDiv>
                        <IntroductionTextMainDiv>
                            <IntroductionTextSubDiv>
                            <Line />
                                    <IntroductionDiv1>
                                        <IntroductionText1Main>
                                            <IntroductionText1
                                                initial={{ opacity: 0}}
                                                whileInView={{ opacity: 1 }}
                                                transition={{ delay: 0.6, duration: 1 }}
                                            >
                                                제주 여행 계획
                                            </IntroductionText1>
                                        </IntroductionText1Main>
                                        <IntroductionText1Sub>
                                            <IntroductionText  style={{ fontSize:"25px"}}
                                                initial={{ opacity: 0}}
                                                whileInView={{ opacity: [0, 0.3, 1], x: [-60, 0]  }}
                                                transition={{ delay: 1, duration: 1.2 }}
                                            >
                                                여행 계획 서비스를 통해 
                                            </IntroductionText>
                                            <IntroductionText  style={{ fontSize:"25px"}}
                                                initial={{ opacity: 0}}
                                                whileInView={{ opacity: [0, 0.3, 1], x: [-60, 0]  }}
                                                transition={{ delay: 1, duration: 1.2 }}
                                            >
                                                여행을 더 효율적으로 계획할 수 있습니다. 
                                            </IntroductionText>
                                            <Line2 
                                                initial={{ opacity: 0}}
                                                whileInView={{ opacity: 1}}
                                                transition={{ delay: 1.3, duration: 1.2 }}
                                            />
                                            <IntroductionTextBox>
                                                <IntroductionText
                                                    initial={{ opacity: 0}}
                                                    whileInView={{ opacity: [0, 0.3, 1], x: [-60, 0]  }}
                                                    transition={{ delay: 1.3, duration: 1.2 }}
                                                >
                                                    서비스를 통해 제주도 여행 계획을 세우는 새로운 경험을 제공합니다. 이 서비스는 사용자들이 개인적인 취향과 스타일에 맞게 맞춤형 여행 일정을 만들 수 있도록 돕습니다.
                                                </IntroductionText>
                                                <IntroductionText
                                                    initial={{ opacity: 0}}
                                                    whileInView={{ opacity: [0, 0.3, 1], x: [-60, 0]  }}
                                                    transition={{ delay: 1.6, duration: 1.2 }}
                                                >
                                                    서비스는 지도 기능을 제공하여 사용자가 선택한 여행 일정이 제주도 내에서 어디에 위치해 있는지 쉽게 확인할 수 있습니다. 이를 통해 효율적인 이동 및 일정 관리가 가능합니다. 
                                                </IntroductionText>
                                            </IntroductionTextBox>
                                        </IntroductionText1Sub>
                                    </IntroductionDiv1>
                            </IntroductionTextSubDiv>

                            <IntroductionTextSubDiv>
                                <Link to='/board'>
                                <IntroductionImages
                                    initial={{ opacity: 0}}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 1 }}
                                >
                                        
                                        <BackgroundImageDiv
                                            initial="initial"
                                            whileHover="whileHover"
                                            transition={{duration: 0.7}}
                                            variants={imageInnerParentAnimation}
                                            imgurl="https://images.pexels.com/photos/760710/pexels-photo-760710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                        >
                                            <AbsoluteDiv
                                                transition={{duration: 0.7}}
                                                variants={imageBlackAnimation}
                                            >
                                            </AbsoluteDiv>
                                            <ImageInnerContentDiv
                                                transition={{duration: 0.7}}
                                                variants={imageInnerAnimation}
                                            >
                                                <ImageInnerText>여행일정 만들기</ImageInnerText>
                                            </ImageInnerContentDiv>
                                        </BackgroundImageDiv>
                                    </IntroductionImages>
                                </Link>
                            </IntroductionTextSubDiv>
                        </IntroductionTextMainDiv>
                    </TopPageDiv>
                </PageDiv>
                <PageDiv style={{marginTop:"150px",
                                marginBottom:"300px"}}>
                    <TopPageDiv>
                        <IntroductionTextMainDiv>
                            <IntroductionTextSubDiv>
                                <Line />
                                    <IntroductionDiv1>
                                        <IntroductionText1Main>
                                            <IntroductionText1
                                                initial={{ opacity: 0}}
                                                whileInView={{ opacity: 1 }}
                                                transition={{ delay: 0.6, duration: 1 }}
                                            >
                                                모든 기능 이용하기
                                            </IntroductionText1>
                                        </IntroductionText1Main>
                                        <IntroductionText1Sub>
                                            <IntroductionText style={{ fontSize:"25px"}}
                                                initial={{ opacity: 0}}
                                                whileInView={{ opacity: [0, 0.3, 1], x: [-60, 0]  }}
                                                transition={{ delay: 1, duration: 1.2 }}
                                            >
                                                로그인을 통해 제주 여행을 위한 
                                            </IntroductionText>
                                            <IntroductionText style={{ fontSize:"25px"}}
                                                initial={{ opacity: 0}}
                                                whileInView={{ opacity: [0, 0.3, 1], x: [-60, 0]  }}
                                                transition={{ delay: 1, duration: 1.2 }}
                                            >
                                                다양한 기능을 활용할 수 있습니다.
                                            </IntroductionText>
                                            <Line2 
                                                initial={{ opacity: 0}}
                                                whileInView={{ opacity: 1}}
                                                transition={{ delay: 1.3, duration: 1.2 }}
                                            />
                                            <IntroductionTextBox>
                                                <IntroductionText
                                                    initial={{ opacity: 0}}
                                                    whileInView={{ opacity: [0, 0.3, 1], x: [-60, 0]  }}
                                                    transition={{ delay: 1.3, duration: 1.2 }}
                                                >
                                                    1. 여행 계획 서비스 이용 
                                                </IntroductionText>
                                                {/* <IntroductionText
                                                    initial={{ opacity: 0}}
                                                    whileInView={{ opacity: [0, 0.3, 1], x: [-60, 0]  }}
                                                    transition={{ delay: 1.6, duration: 1.2 }}
                                                >
                                                    2. 문의 게시판 이용
                                                </IntroductionText> */}
                                            </IntroductionTextBox>
                                        </IntroductionText1Sub>
                                    </IntroductionDiv1>
                            </IntroductionTextSubDiv>

                            <IntroductionTextSubDiv>
                                <Link to='/signin'>
                                    <IntroductionImages
                                        initial={{ opacity: 0}}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 1 }}
                                    >
                                        <BackgroundImageDiv
                                            initial="initial"
                                            whileHover="whileHover"
                                            transition={{duration: 0.7}}
                                            variants={imageInnerParentAnimation}
                                            imgurl="./Login.jpg"
                                        >
                                            <AbsoluteDiv
                                                transition={{duration: 0.7}}
                                                variants={imageBlackAnimation}
                                            >
                                            </AbsoluteDiv>
                                            <ImageInnerContentDiv
                                                transition={{duration: 0.7}}
                                                variants={imageInnerAnimation}
                                            >
                                                <ImageInnerText>로그인 바로가기</ImageInnerText>
                                            </ImageInnerContentDiv>
                                        </BackgroundImageDiv>
                                    </IntroductionImages>
                                </Link>
                            </IntroductionTextSubDiv>
                        </IntroductionTextMainDiv>
                    </TopPageDiv>
                </PageDiv>
            {/* <Bottombar /> */}
        </MainDiv>
    )
}

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    background-size: 100%;
`


const PageDiv = motion(styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    // background-color: white;
    margin-top: 10px;
`)

const TopImageDiv = motion(styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 200px;
    height: 200px;
    min-height: 800px;
    max-height: 800px;
    min-width: 1500px;
    max-width: 1500px;
    background-image: url("./tangerine.jpg");
    background-size: cover;
    margin-top: 50px;
`)

const TopImageTextContainer = styled.div`
    margin-top: 490px;
    margin-right: 25px;
    width: 500px;
    height: 450px;
`
const TopImageInText1 = motion(styled.h1`
    text-align: right;
    color: #E5B6BE;
    margin: 20px 50px;
    font-size: 45px;
    -webkit-text-stroke: 0.7px black;
`)
const TopImageInText2 = motion(styled.h1`
    text-align: right;
    color: #E5B6BE;
    margin: 20px 50px;
    font-size: 45px;
    -webkit-text-stroke: 0.7px black;
`)
const TopImageInText3 = motion(styled.h1`
    text-align: right;
    color: #E5B6BE;
    margin: 20px 50px;
    font-size: 60px;
    -webkit-text-stroke: 0.7px black;
`)

const AbsoluteDiv = motion(styled.div`
    position: absolute;
    left: 0;
    top: 0;
    background-color: black;
    height: 100%;
    width: 100%;
    z-index: 1;
`)

const BackgroundImageDiv = motion(styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: url(${(props) => props.imgurl});
    background-size: auto 100%;
    background-position: center;
    z-index: 0;
`)

const ImageInnerContentDiv = motion(styled.div`
    z-index: 2;
`)

const ImageInnerText = styled.h2`
    border: solid;
    border-left: 0px;
    border-top: 0px;
    border-right: 0px;
    font-weight: 600;
    font-size: 3em;
    color: white;
    border-color: #F26800;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`

const TopPageDiv = motion(styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 600px;
    max-height: 600px;
    min-width: 700px;
    max-width: 700px;
`)

const IntroductionTextMainDiv = motion(styled.div`
    display: flex;
    justify-content: center;
`)

const IntroductionTextSubDiv = motion(styled.div`
    overflow: hidden;
    position: relative;
`)

const IntroductionDiv1 = motion(styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-width: 1px;
    margin-left: 50px;
    margin-right: 50px;
    min-height: 600px;
    max-height: 600px;
    min-width: 700px;
    max-width: 700px;
    border-radius: 50px;
`)
const IntroductionText1Main = motion(styled.div`
    display: flex;
    justify-content: space-around;
`)
const  IntroductionText1Sub = motion(styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px 30px 0px 30px;
    margin-top: 90px;
    align-items: center;
`)

const IntroductionTextBox = styled.div`
    margin-top: 30px;
`

const IntroductionText = motion(styled.div`
    align-items: center;
    margin-bottom: 15px;
    font-size: 20px;
`)

const IntroductionText1 = motion(styled.h1`
    text-align: center;
    color: #97A275;
    font-size: 50px;
`)
const IntroductionImages = motion(styled.div`
    position: relative;
    border-width: 5px;
    margin-right: 50px;
    margin-left: 50px;
    min-height: 600px;
    max-height: 600px;
    min-width: 700px;
    max-width: 700px;
    /* background-image: url("https://images.pexels.com/photos/760710/pexels-photo-760710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"); */
`)



const ReMainDiv = motion(styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 600px;
    max-height: 600px;
    min-width: 700px;
    max-width: 700px;
    
`)

const Line = motion(styled.hr`
    background-color: #878787;
    width: 90%;
    height: 0.5px;
    border: none;
`)

const Line2 = motion(styled.hr`
    background-color: gold;
    width: 50%;
    height: 0.5px;
    border: none;
`)