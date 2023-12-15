package com.jeju.planner.controller;



import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



//CORS (Cross-Origin Resource Sharing) 문제를 해결
//@CrossOrigin(originPatterns = "http://localhost:3000")
// Controller 레이어로 인식하도록 함 rest한 형태
// Controller + @ResponseBody
@RestController
// (URl 패턴) - Request의 URL의 패턴을 보고 해당하는 패턴이 왔을 때 해당 클래스를 실행
@RequestMapping("/")
public class MainController {

    @GetMapping("")
    public String hello(){
        return "Connection Successful!!!!!!!!!!!";
    }
}
