import { motion } from "framer-motion";
import Topbar from "../../components/topbar";
import styled from "styled-components";
import Bottombar from "../../components/bottomContainer";
import { useEffect, useState } from "react";
import SavedListBox from "./SavedListBox";
import Board from "./Board";
import { getPlanById, onlyPlans } from "./sampleData/sampleBoardList";
import { sampleSavedData } from "./sampleData/sampleSavedData";
import PlanList from "./PlanList";
import axios from "axios";
import { getPlanApi, getPlanList } from "../../apis";
import { webStorages } from "../../constants";

function randomString() {

    return Math.random().toString(36) + Math.random().toString(36);

}



function dataToPlan(data) {

    const result = {
        id: randomString() + randomString(),
        title: data[0].plan_title,
        boardList: []
    }

    data.map((item) => {
        let targetBoardIndex = result.boardList.findIndex(
            (board) => (board.day === item.day_num)
        );

        if( targetBoardIndex === -1 ){
            targetBoardIndex = result.boardList.push({
                id: randomString() + randomString(),
                title: item.day_num + "일차",
                day: item.day_num,
                schedules: []
            }) - 1;
        }

        result.boardList[targetBoardIndex].schedules.push({
            id: randomString() + randomString(),
            order: item.plan_order,
            address: item.addr,
            content: item.name,
            attr: item.attr_num,
            tourtype: item.tourtype
        })

    })

    result.boardList.map((item) => {
        item.schedules.sort((a, b) => a.order - b.order);
    })

    return result;
}

export default function BoardMain() {

    const [planList, setPlanList] = useState([]);
    const [activePlanTitle, setActivePlanTitle] = useState("");

    const [activeCalender, setActiveCalender] = useState();

    // TODO : calender에서 plan으로 명칭 변경하기
    const [calenderData, setCalenderData] = useState([]);
    const [savedListData, setSavedListData] = useState(sampleSavedData);

    if(!localStorage.getItem(webStorages.userId)){
        alert("로그인 후 이용가능합니다.");
        location.href = "/"
      }


    // 새로고침 막기 창 나가기 막기
const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = "";
    // Chrome에서 동작하도록;
    deprecated
  };
  
  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", handleBeforeUnload);
    })();
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  ///////////////////////////

  

    useEffect(() => {
        async function fetchData(){
            const fetchedPlanList = await getPlanList(localStorage.getItem(webStorages.userId));
            if (fetchedPlanList.length === 0){
                return;
            }
            const planList = fetchedPlanList.map((item) => ({id:randomString(), title:item}));
            setPlanList(planList);
            setActivePlanTitle(planList[0].title);
        }
        fetchData();        
    }, []);

    useEffect(() => {
        if(!activePlanTitle) return;
        async function fetchData(){
            // TODO : 각 여행일정계획의 내용 가져오기
            const fetchedBoardList = await getPlanApi(localStorage.getItem(webStorages.userId), activePlanTitle);
            if (fetchedBoardList.length === 0){
                setCalenderData([]);
                return;
            }
            setCalenderData(dataToPlan(fetchedBoardList).boardList);
        }
        fetchData();
    }, [activePlanTitle])


    return(
        <MainDiv>
            <Topbar />
            <SubDiv>
                <PlanList planList={planList} setActivePlanTitle={setActivePlanTitle} setPlanList={setPlanList}/>
                {activePlanTitle ? 
                    <BoardDiv>
                        <Board 
                            planTitle={activePlanTitle}
                            calenders={calenderData} 
                            setCalenderData={setCalenderData}
                            setActiveCalender={setActiveCalender}
                        />
                    </BoardDiv>
                    : null
                }
                
                {
                    activeCalender && 
                        <SavedListBox 
                            activeCalender={activeCalender} 
                            savedListData={savedListData}
                            setSavedListData={setSavedListData}
                            setCalenderData={setCalenderData}
                            onCloseButtonClick={() => {
                                setActiveCalender("");
                            }}
                        />  
                }
            </SubDiv>
            {/* <Bottombar /> */}
        </MainDiv>
    )
}

const MainDiv = styled.div`
    width: 100%;
    height: 100vh;
`

const SubDiv = motion(styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`)

const BoardDiv = motion(styled.div`
    width: 100%;
    height: 100%;
    padding-right: 30px;
    padding-left: 30px;
    white-space: nowrap;
    overflow-x: scroll;
    ::-webkit-scrollbar{
        width: 0px;
    }
`)