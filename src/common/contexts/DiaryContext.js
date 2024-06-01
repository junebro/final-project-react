//DiaryContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // 로그인 

const DiaryContext = createContext({ item: null, error: null });

export const ItemProvider = ({ children }) => {
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);
    const { user } = useAuth(); // useAuth 훅에서 user ID 가져오기
    console.log(user);
    useEffect(() => {
        fetch(`http://localhost:8989/diary/diaryList/${user}`)
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
        <DiaryContext.Provider value={{ item, error }}>
            {children}
        </DiaryContext.Provider>
    );
};

export const useItem = () => useContext(DiaryContext);