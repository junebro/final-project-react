import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let isConnected = false;
let stompClient = null;

export const getIsConnected = () => isConnected;

const connect = (onMessageReceived) => {
  // 로컬 스토리지에서 토큰 가져오기
  const token = localStorage.getItem('authToken');
  // WebSocket URL에 토큰을 쿼리 파라미터로 추가
  const serverUrl = `http://localhost:8989/userchat?token=${token}`;

  console.log("Connecting to WebSocket at", serverUrl);

  stompClient = new Client({
    webSocketFactory: () => new SockJS(serverUrl),
    debug: (str) => {
      console.log(str);
    },
    reconnectDelay: 5000,  // 자동 재연결 간격
  });

  stompClient.onConnect = (frame) => {
    isConnected = true;
    console.log("Connected:", frame);
    stompClient.subscribe('/topic/messages', (message) => {
      try {
        console.log("Received message body:", message.body); // 로그 추가
        onMessageReceived(JSON.parse(message.body));
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    });
  };

  stompClient.onStompError = (frame) => {
    isConnected = false;
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
  };

  stompClient.onWebSocketClose = () => {
    isConnected = false;
    console.log('WebSocket connection closed');
  };

  stompClient.activate();
};

const disconnect = () => {
  if (stompClient !== null && isConnected) {
    stompClient.deactivate(() => {
      isConnected = false;
      console.log('Disconnected');
      stompClient = null;
    });
  }
};

const sendMessage = (messageText) => {
  if (isConnected && stompClient) {
    const messageData = { messageText: messageText };
    console.log("Sending message:", messageData);
    stompClient.publish({
      destination: "/app/chat",
      body: JSON.stringify(messageData)
    });
  } else {
    console.error("STOMP client is not connected.");
    throw new Error("Socket is not connected.");
  }
};

export { connect, disconnect, sendMessage };