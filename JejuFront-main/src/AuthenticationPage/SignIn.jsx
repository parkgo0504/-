import React, { useState } from "react";
import { signInApi } from "../apis";
import { Link } from "react-router-dom";
import { webStorages } from "../constants";
import { motion } from "framer-motion";
import styled from "styled-components";

function SignIn() {
  const [userId, setId] = useState("");
  const [userPw, setPw] = useState("");

  
  if(localStorage.getItem(webStorages.userId)){
    alert("이미 로그인 하였습니다.");
    location.href = "/"
  }

  const signInHandler = async () => {
    if (userId.length === 0 || userPw.length === 0) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }

    const data = {
      userId,
      userPw,
    };

    const signInResponse = await signInApi(data);

    if (!signInResponse) {
      alert("로그인에 실패했습니다.");
      return;
    }

    if (!signInResponse.result) {
      alert("로그인에 실패했습니다.");
      return;
    }

    alert("로그인에 성공했습니다.");
    const { token, exprTime, user } = signInResponse.data;
    console.log(user);
    const expires = new Date();
    expires.setMilliseconds(expires.getMilliseconds() + exprTime);

    localStorage.setItem(webStorages.token, token);
    localStorage.setItem(webStorages.tokenExpireDate, expires.toISOString());
    localStorage.setItem(webStorages.userId, user.userId);
    localStorage.setItem(webStorages.userName, user.userName);
    return true;
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
                <TopText>Sign in</TopText>
            </TopTextBox>
            <LoginBox>
                <IdPwInput
                    type="text"
                    onChange={(e) => setId(e.target.value)}
                    placeholder="ID 를 입력해주세요."
                />
                <IdPwInput
                    type="password"
                    onChange={(e) => setPw(e.target.value)}
                    placeholder="Passward 를 입력해주세요."
                />
            </LoginBox>
            <LoginBtnBox>
                <LoginBtn
                    onClick={() => {
                    signInHandler()
                    .then((success) => {success ? location.href = "/" : null})
                    }}
                    whileHover={{ scale: 1.1 }}
                >
                    로그인
                </LoginBtn>
            </LoginBtnBox>
            <LinkBox>
                <h2>신규 사용자 이신가요?</h2>
                <Link to="/signup">회원가입</Link>
            </LinkBox>
        </ContentDiv>
    </MainDiv>
  );
}

export default SignIn;

const MainDiv = motion(styled.div`
  display: flex;
  justify-content: center;
  margin-top: 200px;
`)

const ContentDiv = motion(styled.div`
    display: flex;
    flex-direction: column;
    border: solid;
    border-width: 3px;
    padding: 100px;
    width: 500px;
    height: 600px;
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