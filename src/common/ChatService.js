import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

let stompClient = null;
let isConnected = false;

const connect = (onMessageReceived) => {
  const serverUrl = 'http://localhost:8989/userchat';
  const socket = new SockJS(serverUrl);
  stompClient = Stomp.over(socket);
  stompClient.connect({}, (frame) => {
    isConnected = true; // 연결 성공
    stompClient.subscribe('/topic/messages', (message) => {
      onMessageReceived(message);
    });
  }, error => {
    isConnected = false; // 연결 실패
    console.error('Connection error: ', error);
  });
}

const disconnect = () => {
  if (stompClient !== null && isConnected) {
    stompClient.disconnect(() => {
      isConnected = false; // 연결 해제 상태 업데이트
      console.log('Disconnected');
    });
  }
}

const sendMessage = (messageText) => {
  if (isConnected && stompClient) {
    const messageData = { messageText: messageText };  // 서버의 Message 엔터티 필드와 일치
    console.log("Sending message:", messageData);
    stompClient.send("/app/chat", {}, JSON.stringify(messageData));
  } else {
    console.error("STOMP client is not connected.");
    throw new Error("Socket is not connected.");
  }
}

export { connect, disconnect, sendMessage, isConnected };
