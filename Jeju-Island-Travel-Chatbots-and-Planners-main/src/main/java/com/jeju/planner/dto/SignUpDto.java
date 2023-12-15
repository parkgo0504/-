package com.jeju.planner.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDto {

    private String userId;
    private String userPw;
    private String userName;
    private String userPwCheck;
}
