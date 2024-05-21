import React, { createContext, useContext, useState } from 'react';

// Context 객체 생성
const AuthContext = createContext(null);

// 커스텀 훅
export function useAuth() {
  return useContext(AuthContext);
}
 
// 토큰 디코딩 함수
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// AuthProvider 컴포넌트
export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({ user: null, token: null });

  // 로그인 함수 수정: 토큰에서 사용자 ID를 추출하고 상태 업데이트
  const login = (token) => {
    const decodedToken = parseJwt(token);
    setAuthState({ user: decodedToken.sub, token: token });
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem('authToken'); // 로컬 스토리지에서 토큰 삭제
    setAuthState({ user: null, token: null }); // 상태 초기화
  };

  // Context.Provider를 통해 로그인 관련 데이터와 함수 전달
  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}