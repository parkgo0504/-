# Gradle 빌드 스테이지
FROM gradle:7.4.0-jdk17 AS builder

WORKDIR /app

COPY . /app

RUN gradle build

# 최종 이미지
FROM openjdk:17-jdk

WORKDIR /app

# 빌드된 JAR 파일을 복사
COPY --from=builder /app/build/libs/planner-0.0.1-SNAPSHOT.jar /app/app.jar

# 어플리케이션 실행
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
