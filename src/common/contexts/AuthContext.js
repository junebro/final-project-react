import React, { createContext, useContext, useState, useEffect } from 'react';

// Context 객체 생성
const AuthContext = createContext(null);

// 커스텀 훅
export function useAuth() {
  return useContext(AuthContext);
}

// 토큰 디코딩 함수
function parseJwt(token) {
  if (!token || token.split('.').length !== 3) {
    console.error("Invalid or empty token provided.");
    return null;
  }
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error decoding JWT:", e);
    return null;
  }
}

// AuthProvider 컴포넌트
export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({ user: null, token: null });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      login(token); // 앱 로드 시 로컬 스토리지에서 토큰을 가져와 로그인
    }
  }, []);

  const login = (token) => {
    const decodedToken = parseJwt(token);
    if (decodedToken) {
    }
    if (decodedToken && decodedToken.sub) {
      setAuthState({ user: decodedToken.sub, token: token }); // decodedToken이 유효할 때만 상태 업데이트
    } else {
      console.error("Failed to decode token or token does not contain 'sub' field.");
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken'); // 로컬 스토리지에서 토큰 삭제
    localStorage.clear();
    setAuthState({ user: null, token: null }); // 상태 초기화
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}