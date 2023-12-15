package com.jeju.planner.service;

import com.jeju.planner.dto.QnaDto;
import com.jeju.planner.dto.QnaReadDto;
import com.jeju.planner.entity.QnaEntity;
import com.jeju.planner.mapper.QnaMapper;
import com.jeju.planner.repository.QnaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class QnaService {

    private final QnaRepository qnaRepository;
    private final QnaMapper qnaMapper;

    public QnaService(QnaRepository qnaRepository, QnaMapper qnaMapper) {
        this.qnaRepository = qnaRepository;
        this.qnaMapper = qnaMapper;
    }


    // 게시물 저장
    public QnaEntity createFavorites(QnaDto qnaDto){
        QnaEntity qnaEntity = new QnaEntity();
        qnaEntity.setQnaTitle(qnaDto.getQna_title());
        qnaEntity.setUserId(qnaDto.getUser_id());
        qnaEntity.setQnaContent(qnaDto.getQna_content());
        qnaEntity.setQnaDate(LocalDateTime.now());
        return qnaRepository.save(qnaEntity);
    }
    // 게시글 목록 보여주기
    public List<QnaReadDto> readQna(){
       return qnaMapper.QnaRead();
    }
}
