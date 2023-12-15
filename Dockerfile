# Python 3.8 이미지를 기본 이미지로 사용.
FROM python:3.10

# 환경 변수 설정
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 작업 디렉토리 설정
WORKDIR /app

# 소스 코드를 작업 디렉토리로 복사
COPY . .

# requirements.txt 파일을 작업 디렉토리로 복사
COPY requirements.txt requirements.txt

# 가상 환경 생성 및 활성화
RUN python -m venv venv
RUN /bin/bash -c "source venv/bin/activate"

# pip 업그레이드 및 필요한 종속성 설치
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install python-dotenv
# 어플리케이션 포트 노출
EXPOSE 8088

# 웹 어플리케이션 실행
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8088"]

