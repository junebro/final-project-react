import React from "react";
import { Routes, Route } from "react-router-dom";

import Board from "../board/boardList";
import BoardList from "../board/boardList";
import BoardInsert from "../board/boardInsert";
import BoardDetail from "../board/boardDetail";

const MainRoutes = () => {
  return (
    <Routes> {/* Route 컴포넌트를 Routes 컴포넌트로 감싸주어야 합니다 */}
        <Route path="/board" element={<Board />} />
        <Route path="/boardList" element={<BoardList />} />
        <Route path="/boardInsert" element={<BoardInsert />} />  
        <Route path="/boardDetail" element={<BoardDetail />} />
    </Routes>
  );
};

export default MainRoutes;