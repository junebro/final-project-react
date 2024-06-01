//ProductsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // 로그인 

const MyOListContext = createContext({ item: null, error: null });

export const ItemProvider = ({ children }) => {
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);
    const { user } = useAuth(); // useAuth 훅에서 user ID 가져오기

    useEffect(() => {

        const token = localStorage.getItem('authToken');

        console.log('주문내역 조회 로그인멤버 : ' + user);
        console.log(item);
        fetch(`http://localhost:8989/mypage/myOrderList/${user}`, {
            
            method: 'GET', // HTTP 메소드 지정
            headers: {
                'Content-Type': 'application/json', // 콘텐츠 타입 지정
                'Authorization': `Bearer ${token}` // JWT 토큰을 Bearer 토큰으로 포함
            }
        })
        .then(response => {
            if (!response.ok) {  // 응답 상태 확인
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setItem(data))  // 데이터를 상태에 설정
        .catch(err => setError(err.message));  // 에러를 상태에 설정
    }, []);

    return (
        <MyOListContext.Provider value={{ item, error }}>
            {children}
        </MyOListContext.Provider>
    );
};

export const useItem = () => useContext(MyOListContext);