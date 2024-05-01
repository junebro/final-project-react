import React, { useState } from 'react';
import './board.css'
import Pagination from 'react-js-pagination';


function App() {
    // 가짜 데이터 예시
    // const dataList = [
    //     { writer: "작성자1", subject: "제목1", description: "내용1" },
    //     { writer: "작성자2", subject: "제목2", description: "내용2" },
    // ];

    // 페이징
    const [page, setPage] = useState(1);

    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <>
            <section>
                <div className='board'>
                    <div className='board_top'>
                        <div className='selectbox'>
                            <select id="sel_range" name="sel_range">
                                <option value="all">전체 검색</option>
                                <option value="recent">최신순</option>
                                <option value="like">좋아요순</option>
                                <option value="comment">댓글순</option>
                            </select>
                        </div>

                        {/* 글쓰기 버튼 */}
                        <a>
                            <button type='button' className='btn btn-primary'>글쓰기</button>
                        </a>

                        {/* 검색창 + 검색버튼 */}
                        <form action='#' method='get'>
                            <input type='text' />
                            <button type='submit'>
                                <img></img>
                            </button>
                        </form>
                    </div>

                    <div class='board_line'></div>

                    <div className='board_main'>
                        <div className='board_left'>
                            <div className='border_top'>
                                <div className='subject'>제목</div>
                                <div className='comment'>[4]</div>
                                <div>
                                    <span>NEW</span>
                                </div>
                                <div className='boarder_date'>2024-04-28 00:00:00</div>
                            </div>
                            <br />
                            <div className='description'></div>
                            <br />
                            <div className='thumbnail'></div>
                        </div>

                        <div className='view_center'></div>

                        <div className='board_right'>
                            <div className='board_info'>
                                <div className='board_member_nickname'>닉네임 <span className="font_pro"></span></div>
                                <div className='board_member_views'>조회수 <span className="font_pro"></span></div>
                                <div className='board_member_likes'>좋아요 <span className="font_pro"></span></div>
                            </div>
                        </div>
                    </div>
                    <div class='board_line'></div>
                </div>

                <div className='paging'>
                    <Pagination
                        activePage={page} // 현재 페이지
                        itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
                        totalItemsCount={450} // 총 아이템 갯수
                        pageRangeDisplayed={5} // paginator의 페이지 범위
                        prevPageText={"‹"} // "이전"을 나타낼 텍스트
                        nextPageText={"›"} // "다음"을 나타낼 텍스트
                        onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
                    />
                </div>
            </section>
        </>
    );
}

export default App;