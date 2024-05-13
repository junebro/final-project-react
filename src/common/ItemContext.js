import React, { createContext, useContext, useState, useEffect } from 'react';

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);  // 에러 상태 추가

    useEffect(() => {
        fetch('http://localhost:8989/prodcts/product')
            .then(response => {
                if (!response.ok) {  // 응답 상태 확인
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }),
            fetch('http://localhost:8989/orders').then(res => res.json())
            .then(data => setItem(data))
            .catch(error => {
                console.error('Error fetching data:', error);
                setError("데이터를 불러오는데 실패했습니다.");  // 에러 메시지 설정
            });
    }, []);

    return (
        // 에러도 컨텍스트로 전달
        <ItemContext.Provider value={{ item, error }}>  
            {children}
        </ItemContext.Provider>
    );
};

export const useItem = () => useContext(ItemContext);