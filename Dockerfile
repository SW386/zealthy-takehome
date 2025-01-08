FROM ubuntu:22.04

# Arg can be supplied for AWS deployment
ARG BACKEND_URL='http://localhost:5001' 

WORKDIR /app

COPY ./frontend ./frontend

COPY ./backend .

# Install Dependencies
SHELL ["/bin/bash", "--login", "-i", "-c"]
RUN apt update && apt install -y curl python3 python3-pip sqlite3
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
RUN pip install -r requirements.txt

# Build Frontend
RUN touch ./frontend/.env
RUN echo "VITE_BACKEND_URL=${BACKEND_URL}" >> ./frontend/.env
RUN source /root/.bashrc && cd frontend && nvm install && npm install && npm run build
RUN cp -r ./frontend/dist/ ./
RUN rm -r ./frontend/

# Build Backend Database
RUN mkdir ./instance/
RUN sqlite3 ./instance/signup.db "VACUUM;"

EXPOSE 5001
CMD [ "python3", "app.py"]