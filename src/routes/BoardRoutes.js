import React from "react";
import { Routes, Route } from "react-router-dom";

import Board from "../board/boardList"; // Board와 BoardList가 중복되는 것 같으니 확인 필요
import BoardList from "../board/boardList";
import BoardInsert from "../board/boardInsert";
import BoardDetail from "../board/boardDetail";
import BoardUpdate from "../board/boardUpdate";

const MainRoutes = () => {
  return (
    <Routes> {/* Route 컴포넌트를 Routes 컴포넌트로 감싸주어야 합니다 */}
        <Route path="/board" element={<Board />} />
        <Route path="/boardList" element={<BoardList />} />
        <Route path="/boardInsert" element={<BoardInsert />} />  
        <Route path="/boardDetail/:bono" element={<BoardDetail />} />
        <Route path="/boardUpdate/:bono" element={<BoardUpdate />} />
    </Routes>
  );
};

export default MainRoutes;