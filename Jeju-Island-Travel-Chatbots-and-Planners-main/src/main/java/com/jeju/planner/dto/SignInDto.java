package com.jeju.planner.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInDto {

    @NotBlank
    private String userId;
    @NotBlank
    private String userPw;
}
