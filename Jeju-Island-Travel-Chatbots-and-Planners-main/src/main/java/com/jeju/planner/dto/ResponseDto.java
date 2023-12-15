package com.jeju.planner.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponseDto<D> {
    private boolean result;
    private String message;
    private D data;

    public ResponseDto(boolean result, String message, D data) {
        this.result = result;
        this.message = message;
        this.data = data;
    }

    public static <D> ResponseDto<D> setSuccess(String message, D data){
        return new ResponseDto<>(true, message, data);
    }

    public static <D> ResponseDto<D> setFailed(String message){
        return new ResponseDto<>(false, message, null);
    }
}

/*
package com.jeju.planner.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor(staticName="set")
@NoArgsConstructor
public class ResponseDto<D> {
    private boolean result;
    private String message;
    private D data;

    public static <D> ResponseDto<D> setSuccess(String message, D data){
        return ResponseDto.set(true, message, data);
    }

// return ResponseDto.set(true, message, data);

    public static <D> ResponseDto<D> setFailed(String message){
        return ResponseDto.set(false, message, null);
    }
}

 */
