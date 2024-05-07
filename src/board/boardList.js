import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './boardList.css';
import Pagination from 'react-js-pagination';
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';

function App() {
    const ChangeCategory = (evnet) => {
        console.log()
    }

    // 팝업 열기
    const openPopup = () => {
        const popup = document.getElementById('memberPopup');
        popup.style.display = 'block';
    };

    // 팝업 닫기
    const closePopup = () => {
        const popup = document.getElementById('memberPopup');
        popup.style.display = 'none';
    };

    // 팝업 외부 클릭 시 팝업 닫기
    useEffect(() => {
        function handleClickOutside(event) {
            const popup = document.getElementById('memberPopup');
            if (popup && !popup.contains(event.target)) {
                closePopup();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 페이징
    const [page, setPage] = useState(1);

    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <>
            <Navi />
            <Menu />
            <section>
                <div className='board'>
                    <div className='board_top'>
                        <div className='selectbox'>
                            <select onChange={ChangeCategory} id="sel_range" name="sel_range">
                                <option value="all">전체 검색</option>
                                <option value="recent">최신순</option>
                                <option value="like">좋아요순</option>
                                <option value="comment">댓글순</option>
                            </select>
                        </div>

                        {/* 글쓰기 버튼 */}
                        <Link to="/boardInsert" className='link'>
                            <button type='submit' className='btn btn-primary'>
                                
                                <img src={require('./../images/board/plus_icon.png')} className='plus_icon' />
                                글쓰기
                              
                            </button>
                        </Link>

                        {/* 검색창 */}
                        <form action='#'>
                            <div className='search-form'>
                                <input type='hidden' />
                                <div className='post-search'>
                                    <div className='search-container'>
                                        <input className='search-box' type='text' id='keyword' name='keyword' placeholder='Search'></input>
                                        <button type='submit' className='search-btn'>
                                            <img src={require('./../images/board/search_icon.png')} className='search-btn-default' />
                                            <img src={require('./../images/board/search_on_icon.png')} className='search-btn-on' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        {/* 검색어에 대한 응답 출력 */} 
                        {/* <div id='resultContainer' className='resultContainer'></div> */}
                    </div>

                    <div className='board_line'></div>
                    <div className="board_main_wrapper">
                        <div className='board_main'>
                            <div className='board_left'>
                                <div className='board_top_section'>
                                    <Link to="/boardDetail" className='link'>
                                    <div className='subject'>이번에 진단받은 식단이에요!</div>
                                    </Link>
                                    <div className='comment'>[4]</div>
                                    <div className='new'>
                                        <span >NEW</span>
                                    </div>
                                    <div className='board_date'>2024-04-28 00:00:00</div>
                                </div>
                                <br />
                                <Link to="/boardDetail" className='link'>
                                <div className='board_bottom_section'>
                                    <div className='description'>비타민이 부족해서 어쩌구</div>
                                    <br />
                                    <div className='thumbnail'>
                                        <img src={require('./../images/board/board_test01.png')} alt='test01' />
                                        <img src={require('./../images/board/board_test02.png')} alt='test02'></img>
                                        <img src={require('./../images/board/board_test03.png')} alt='test03'></img>

                                    </div>
                                </div>
                                </Link>
                            </div>
                            <div className='view_center'></div>
                            <div className='board_right'>
                                <div className='board_info'>
                                    <div className='board_member_nickname'>닉네임 <span className="board_member_nickname2" onClick={openPopup}>    ss
                                        {/* 닉네임 클릭시 리스트 팝업 */}
                                        <div className='popup' data-role="popup" id="memberPopup">
                                            <ul data-role="listview" data-inset="true">
                                                <li><a href="#">게시글 보기</a></li>
                                                <li><a href="#">1:1 채팅</a></li>
                                                <li><a href="#">친구 추가</a></li>
                                                <li><a href="#">신고하기</a></li>
                                            </ul>
                                        </div></span></div>
                                    <div className='board_member_views'>조회수 <span className="font_pro">22</span></div>
                                    <div className='board_member_likes'>좋아요 <span className="font_pro">9</span></div>
                                </div>
                            </div>
                        </div>

                        <div className='board_line'></div>

                        <div className='board_main'>
                        <div className='board_left'>
                                <div className='board_top_section'>
                                    <Link to="/boardDetail" className='link'>
                                    <div className='subject'>이번에 진단받은 식단이에요!</div>
                                    </Link>
                                    <div className='comment'>[4]</div>
                                    <div className='new'>
                                        <span >NEW</span>
                                    </div>
                                    <div className='board_date'>2024-04-28 00:00:00</div>
                                </div>
                                <br />
                                <Link to="/boardDetail" className='link'>
                                <div className='board_bottom_section'>
                                    <div className='description'>비타민이 부족해서 어쩌구</div>
                                    <br />
                                    <div className='thumbnail'>
                                        <img src={require('./../images/board/board_test01.png')} alt='test01' />
                                        <img src={require('./../images/board/board_test02.png')} alt='test02'></img>
                                        <img src={require('./../images/board/board_test03.png')} alt='test03'></img>

                                    </div>
                                </div>
                                </Link>
                            </div>
                            <div className='view_center'></div>
                            <div className='board_right'>
                                <div className='board_info'>
                                    <div className='board_member_nickname'>닉네임 <span className="board_member_nickname2" onClick={openPopup}>    ss
                                        {/* 닉네임 클릭시 리스트 팝업 */}
                                        <div className='popup' data-role="popup" id="memberPopup">
                                            <ul data-role="listview" data-inset="true">
                                                <li><a href="#">게시글 보기</a></li>
                                                <li><a href="#">1:1 채팅</a></li>
                                                <li><a href="#">친구 추가</a></li>
                                                <li><a href="#">신고하기</a></li>
                                            </ul>
                                        </div></span></div>
                                    <div className='board_member_views'>조회수 <span className="font_pro">22</span></div>
                                    <div className='board_member_likes'>좋아요 <span className="font_pro">9</span></div>
                                </div>
                            </div>
                        </div>

                        <div className='board_line'></div>

                        <div className='board_main'>
                        <div className='board_left'>
                                <div className='board_top_section'>
                                    <Link to="/boardDetail" className='link'>
                                    <div className='subject'>이번에 진단받은 식단이에요!</div>
                                    </Link>
                                    <div className='comment'>[4]</div>
                                    <div className='new'>
                                        <span >NEW</span>
                                    </div>
                                    <div className='board_date'>2024-04-28 00:00:00</div>
                                </div>
                                <br />
                                <Link to="/boardDetail" className='link'>
                                <div className='board_bottom_section'>
                                    <div className='description'>비타민이 부족해서 어쩌구</div>
                                    <br />
                                    <div className='thumbnail'>
                                        <img src={require('./../images/board/board_test01.png')} alt='test01' />
                                        <img src={require('./../images/board/board_test02.png')} alt='test02'></img>
                                        <img src={require('./../images/board/board_test03.png')} alt='test03'></img>

                                    </div>
                                </div>
                                </Link>
                            </div>

                            <div className='view_center'></div>

                            <div className='board_right'>
                                <div className='board_info'>
                                    <div className='board_member_nickname'>닉네임 <span className="board_member_nickname2" onClick={openPopup}>    ss
                                        {/* 닉네임 클릭시 리스트 팝업 */}
                                        <div className='popup' data-role="popup" id="memberPopup">
                                            <ul data-role="listview" data-inset="true">
                                                <li><a href="#">게시글 보기</a></li>
                                                <li><a href="#">1:1 채팅</a></li>
                                                <li><a href="#">친구 추가</a></li>
                                                <li><a href="#">신고하기</a></li>
                                            </ul>
                                        </div></span></div>
                                    <div className='board_member_views'>조회수 <span className="font_pro">22</span></div>
                                    <div className='board_member_likes'>좋아요 <span className="font_pro">9</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
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
            <Footer />
        </>
    );
}

export default App;
