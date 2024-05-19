import React, { createContext, useContext, useState, useEffect } from 'react';

// Context 객체 생성, 초기값으로 null을 할당
const AuthContext = createContext(null);

// 커스텀 훅을 생성하여 컴포넌트 내에서 쉽게 Context에 접근할 수 있도록 함
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider 컴포넌트는 로그인 상태를 관리하고, Context의 값을 제공하는 역할을 함
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // 사용자 정보를 저장할 상태

  // 로그인 함수: 사용자 데이터를 받아서 user 상태를 업데이트함
  const login = (userData) => {
    setUser(userData);
  };

  // 로그아웃 함수: user 상태를 null로 설정하여 로그아웃 처리
  const logout = () => {
    setUser(null);
  };

  // 컴포넌트 마운트 시 자동 로그인 처리
  useEffect(() => {
    // 임의의 사용자 데이터로 자동 로그인 시뮬레이션
    login({ username: "testuser", userId: 3 });
  }, []);

  // Context.Provider를 사용하여 하위 컴포넌트에 로그인 관련 데이터와 함수를 전달
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}