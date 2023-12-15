package com.jeju.planner.service;


import com.jeju.planner.dto.ResponseDto;
import com.jeju.planner.dto.SignInDto;
import com.jeju.planner.dto.SignInResponseDto;
import com.jeju.planner.dto.SignUpDto;
import com.jeju.planner.entity.UserEntity;
import com.jeju.planner.repository.UserRepository;
import com.jeju.planner.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TokenProvider tokenProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseDto<?> signUp(SignUpDto dto){
        String userId = dto.getUserId();
        String userPw = dto.getUserPw();
        String userPwCheck = dto.getUserPwCheck();

        try{
            if(userRepository.existsById(userId))
                return ResponseDto.setFailed("존재하는 ID!");
        }catch (Exception error){
            return ResponseDto.setFailed("데이터베이스 오류");

        }
        // Id 중복 확인

        //비밀번호가 서로 다르면 failed response 변환!
        if (!userPw.equals(userPwCheck)) {
            return ResponseDto.setFailed("Password does not matched");
        }

        //UserEntity 생성
        UserEntity userEntity = new UserEntity(dto);


        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(userPw);
        userEntity.setUserPw(passwordEncoder.encode(userPw));


        try{
            userRepository.save(userEntity);
        } catch(Exception error) {
            return ResponseDto.setFailed("데이터베이스 오류");
        }

        //UserRepository를 이용해서 데이터베이스 Entitiy에 저장
        userRepository.save(userEntity);

        return ResponseDto.setSuccess("가입 완료",null);
    }

    public ResponseDto<SignInResponseDto> signIn(SignInDto dto){

        String userId = dto.getUserId();
        String userPw = dto.getUserPw();

        /*
        try {
            boolean existed = userRepository.existsByUserIdAndUserPw(userId, userPw);
            if(!existed) return ResponseDto.setFailed("Sign In INforamtion does not Match");
        } catch(Exception error){
            return ResponseDto.setFailed("데이터베이스 오류");
        }
*/
        UserEntity userEntity = null;
        /*
        try {
            userEntity = userRepository.findById(userId).get();
        } catch(Exception error){
            return ResponseDto.setFailed("데이터베이스 오류");
        }

         */
        try {
            userEntity = userRepository.findByUserId(userId);
            // 잘못된 이메일
            if (userEntity == null) return ResponseDto.setFailed("로그인 실패");
            // 잘못된 패스워드
            if (!passwordEncoder.matches(userPw, userEntity.getUserPw()))
                return ResponseDto.setFailed("로그인 실패");

        } catch(Exception error){
            return ResponseDto.setFailed("데이터베이스 오류");
        }
        userEntity.setUserPw("");

        String token = tokenProvider.create(userId);
        int exprTime = 3600000;

        SignInResponseDto signInResponseDto = new SignInResponseDto(token, exprTime, userEntity);

        return ResponseDto.setSuccess("Sign In success", signInResponseDto);
    }
}