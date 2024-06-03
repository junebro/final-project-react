import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let isConnected = false;
let stompClient = null;

export const getIsConnected = () => isConnected;

const connect = (onMessageReceived) => {
  const serverUrl = `http://localhost:8989/userchat`;  // WebSocket URL

  console.log("Connecting to WebSocket at", serverUrl);

  stompClient = new Client({
    webSocketFactory: () => new SockJS(serverUrl),
    debug: (str) => {
      console.log(str);
    },
    reconnectDelay: 5000  // 자동 재연결 간격
  });

  stompClient.onConnect = (frame) => {
    isConnected = true;
    console.log("Connected:", frame);
    stompClient.subscribe('/topic/messages', (message) => {
      try {
        console.log("Received message body:", message.body); // 로그 추가
        const parsedMessage = JSON.parse(message.body);
        onMessageReceived(parsedMessage);
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
