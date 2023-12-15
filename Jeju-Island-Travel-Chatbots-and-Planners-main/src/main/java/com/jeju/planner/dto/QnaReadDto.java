package com.jeju.planner.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QnaReadDto {
    private String user_id;
    private String qna_title;
    private String qna_date;
}
