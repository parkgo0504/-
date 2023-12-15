import React, { useState } from "react";
import { signUpApi } from "../apis";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

function SignUp() {
  const [userId, setUserID] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userName, setUserName] = useState("");
  const [userPwCheck, setUserPwCheck] = useState("");


  const signUpHandler = async () => {
    const data = {
      userId,
      userPw,
      userName,
      userPwCheck,
    };




    const signUpResponse = await signUpApi(data);




    if (!signUpResponse) {
      alert("회원가입에 실패했습니다.");
      return;
    }

    if (!signUpResponse.result) {
        if (signUpResponse.message === "존재하는 ID!") {  // 서버에서 반환하는 오류 메시지에 맞게 수정
        alert("아이디가 이미 존재합니다.");
      }else if(userPw != userPwCheck){
        alert("비밀번호가 일치하지 않습니다.");
    } else {
        alert("회원가입에 실패했습니다.");
      }
      return;
    }
    alert("회원가입에 성공했습니다.");
    window.location.href = "/signin";
  };
  return (
    <MainDiv>
        <ContentDiv>
            <Link to="/">
                <LogoBtn>
                    JeJu View
                </LogoBtn>
            </Link>
            <TopTextBox>
                <TopText>Create Account</TopText>
            </TopTextBox>
            <LoginBox>
                <IdPwInput
                    type="text"
                    onChange={(e) => setUserID(e.target.value)}
                    placeholder="ID 를 입력해주세요."
                />
                <IdPwInput
                    type="password"
                    onChange={(e) => setUserPw(e.target.value)}
                    placeholder="Passward 를 입력해주세요."
                />
                <IdPwInput
                    type="password"
                    onChange={(e) => setUserPwCheck(e.target.value)}
                    placeholder="Passward 를 확인해주세요."
                />
                <IdPwInput
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="닉네임 을 입력해주세요."
                />
            </LoginBox>
            <LoginBtnBox>
                <LoginBtn
                    onClick={() => signUpHandler()}
                    whileHover={{ scale: 1.1 }}
                >
                    회원가입
                </LoginBtn>
            </LoginBtnBox>
            <LinkBox>
                <h2>이미 계정이 있으신가요?</h2>
                <Link to="/signin">
                    로그인
                </Link>
            </LinkBox>
        </ContentDiv>
    </MainDiv>
  );
}

export default SignUp;

const MainDiv = motion(styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`)

const LogoBtn = motion(styled.button`
    font-size: 40px;
    min-width: 250px;
    min-width: 400px;
    border: solid;
    text-align: center;
    color: #F26800;
    -webkit-text-stroke-width: 2px;
    padding: 5px 21px;
    margin-bottom: 40px;
    margin-left: 40px;
    background: none;
`)

const ContentDiv = motion(styled.div`
    display: flex;
    flex-direction: column;
    border: solid;
    border-width: 3px;
    padding: 100px;
    width: 500px;
    height: 800px;
`)

const TopTextBox = motion(styled.div`
    display: flex;
    justify-content: center;
`)

const TopText = motion(styled.h1`
    font-size: 40px;
`)

const LoginBox = motion(styled.div`
    display: flex;
    flex-direction: column;
`)

const IdPwInput = motion(styled.input`
    width: 100%;
    height: 40px;
    margin-top: 20px;
    border-radius: 10px;
    font-size: 17px;
`)

const LoginBtnBox = motion(styled.div`
    display: flex;
    justify-content: center;
`)

const LoginBtn = motion(styled.button`
    margin-top: 50px;
    background: none;
    width: 200px;
    height: 50px;
    border-radius: 20px;
    border-color: #F26800;
`)

const LinkBox = motion(styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
`)