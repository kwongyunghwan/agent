const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3000; // 사용할 포트 번호

// 정적 파일 서비스를 위한 미들웨어 설정
app.use(express.static('public'));

// 클라이언트와 상담사 간의 채팅을 위한 소켓 연결
io.on('connection', (socket) => {
    console.log('Client connected');

    // 클라이언트로부터의 메시지를 받음
    socket.on('message', (message) => {
        console.log('Received message:', message);
        // 받은 메시지를 상담사에게 전달
        io.emit('message', message);
    });

    // 연결 해제 시
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// 서버 시작
server.listen(port, () => {
    console.log(`Chat server listening at http://localhost:${port}`);
});
