package com.jeju.planner.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Qna")
@Table(name = "tb_qna")
public class QnaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qna_num")
    private int qnaNum;
    @Column(name = "user_id")
    private String userId;
    @Column(name = "qna_title")
    private String qnaTitle;
    @Column(name = "qna_content")
    private String qnaContent;
    @Column(name = "qna_date")
    private LocalDateTime qnaDate;
    @Column(name = "qna_answer",nullable = true)
    private String qnaAnswer;
}
