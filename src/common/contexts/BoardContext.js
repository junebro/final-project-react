//BoardContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// 컨텍스트 생성, 초기값 설정 (null 대신 실제 기본값과 일치하도록)
const BoardContext = createContext({ boardData: null, error: null });

export const BoardProvider = ({ children }) => {
    const [boardData, setBoardData] = useState(null);
    const [error, setError] = useState(null);

    // 게시판 데이터를 불러오는 효과
    useEffect(() => {
        fetch('http://localhost:8989/board/boardList')
            .then(response => {
                if (!response.ok) {  // 응답 상태 확인
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setBoardData(data))  // 데이터를 상태에 설정
            .catch(err => setError(err.message));  // 에러를 상태에 설정
    }, []);

    // 컨텍스트 제공자 반환
    return (
        <BoardContext.Provider value={{ boardData, error }}>
            {children}
        </BoardContext.Provider>
    );
};

// 컨텍스트 훅
export const useBoard = () => useContext(BoardContext);