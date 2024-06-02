import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let isConnected = false;
let stompClient = null;

export const getIsConnected = () => isConnected;

const connect = (onMessageReceived) => {
  const token = localStorage.getItem('authToken');  // 로컬 스토리지에서 토큰 가져오기
  if (!token) {
    console.error("No token found, cannot connect to WebSocket");
    return;
  }

  const serverUrl = `http://localhost:8989/userchat`;  // WebSocket URL

  stompClient = new Client({
    webSocketFactory: () => new SockJS(serverUrl),
    connectHeaders: {
      Authorization: `Bearer ${token}`
    },
    debug: (str) => {
      console.log(str);
    },
    reconnectDelay: 5000  // 자동 재연결 간격
  });

  stompClient.onConnect = (frame) => {
    isConnected = true;
    console.log("Connected:", frame);
    stompClient.subscribe('/topic/messages', (message) => {
      onMessageReceived(JSON.parse(message.body));
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
