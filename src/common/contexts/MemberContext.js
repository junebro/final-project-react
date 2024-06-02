//itemContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const MemberContext = createContext({ item: null, error: null });

export const MemberProvider = ({ children }) => {
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8989/products123/products123/24')
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
        <MemberContext.Provider value={{ item, error }}>
            {children}
        </MemberContext.Provider>
    );
};

export const useItem = () => useContext(MemberContext);