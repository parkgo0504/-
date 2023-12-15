package com.jeju.planner.controller;


import com.jeju.planner.dto.QnaDto;
import com.jeju.planner.dto.QnaReadDto;
import com.jeju.planner.entity.QnaEntity;
import com.jeju.planner.service.QnaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/qna")
public class QnaController {

    private final QnaService qnaService;

    public QnaController(QnaService qnaService) {
        this.qnaService = qnaService;
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveQna(@RequestBody QnaDto qnaDto){
        try{
            qnaService.createFavorites(qnaDto);
            return ResponseEntity.ok("저장성공");
        } catch (Exception e){
            return ResponseEntity.ok("저장실패");
        }

    }
    @GetMapping("/select")
    public List<QnaReadDto> selectQna(){
        return qnaService.readQna();
    }
}
