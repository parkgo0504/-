package com.jeju.planner.controller;


import com.jeju.planner.dto.ResponseDto;
import com.jeju.planner.dto.SignInDto;
import com.jeju.planner.dto.SignInResponseDto;
import com.jeju.planner.dto.SignUpDto;
import com.jeju.planner.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

//POST / api/auth/signUp


//@CrossOrigin(originPatterns = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthService authService;


    //private Password passwordEncoder = new B;

    @PostMapping("/signUp")
    public ResponseDto<?> signUp(@RequestBody SignUpDto requestBody){
        // react 에서 회원가입할때 값 확인 코드
        // System.out.println(requestBody.toString());

        ResponseDto<?> result = authService.signUp(requestBody);

        return result;
    }

    @PostMapping("/signIn")
    public ResponseDto<SignInResponseDto> signIn(@RequestBody SignInDto requestBody)    {
        ResponseDto<SignInResponseDto> result = authService.signIn(requestBody);
        return result;
    }
}
