FROM python:3.12-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir --upgrade /app

RUN playwright install chromium

RUN playwright install-deps chromium  

CMD ["fastapi", "run", "./app.py"]