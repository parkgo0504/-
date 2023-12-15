    package com.jeju.planner.entity;


    import com.jeju.planner.dto.SignUpDto;
    import jakarta.persistence.Entity;
    import jakarta.persistence.Id;
    import jakarta.persistence.Table;
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    //해당 클래스를 Entity 클래스로 사용
    // name = "사용할 Entitiy 명
    @Entity(name="User")
    // 데이터 베이스에 있는 해당하는 테이블과 현재 클래스를 매핑 시키겠다.
    // name = " 테이블 명"
    @Table(name = "tb_user")
    public class UserEntity {
        @Id
        private String userId;
        private String userPw;
        private String userName;

        public UserEntity(SignUpDto dto){
            this.userId = dto.getUserId();
            this.userPw = dto.getUserPw();
            this.userName = dto.getUserName();


        }

    }
