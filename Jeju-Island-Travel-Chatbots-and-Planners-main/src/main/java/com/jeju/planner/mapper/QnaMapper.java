package com.jeju.planner.mapper;

import com.jeju.planner.dto.QnaReadDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface QnaMapper {

    @Select("SELECT user_id, qna_date, qna_title FROM tb_qna")
    List<QnaReadDto> QnaRead();
}
