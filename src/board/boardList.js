import './boardList.css';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Pagination from 'react-js-pagination';
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';
import axios from 'axios';

function App() {
    return (
        <BoardDisplay />
    );
}

const BoardDisplay = () => {

    const [posts, setPosts] = useState([]); // 게시글을 저장할 상태
    const [totalItemsCount, setTotalItemsCount] = useState(0); // 총 게시물 수
    const [page, setPage] = useState(1); // 현재 페이지 상태

    console.log(posts);

    // 게시글 데이터를 불러오는 함수
    const fetchPosts = async (page) => { //category = 'all' 나중에 넣기
        const pageSize = 3; // 페이지당 게시물 수를 3으로 설정
        const url = `http://localhost:8989/board/boardList/paged?page=${page}&size=${pageSize}`; // 뒤에 pageSize 지워
        console.log(`Fetching posts for page: ${page}, size: ${pageSize}`); // 현재 페이지 확인 로그
        // 'category' 파라미터를 활용하는 로직이 백엔드에 구현되어 있어야 함 

        try {
            const response = await axios.get(url);
            // console.log("응답 데이터:", response.data); //로그 추가ㅠㅠ 지워
            if (response.data && Array.isArray(response.data.posts)) {
                setPosts(response.data.posts);  // 페이지 정보가 포함된 경우 .posts 사용
                setTotalItemsCount(response.data.totalCount); // 전체 게시물 수 업데이트
            } else {
                setPosts([]); // 데이터 구조가 예상과 다르면 빈 배열로 초기화
            }

        } catch (error) {
            console.error('게시글 로딩 실패', error);
            setPosts([]); // 오류 처리
        }

    }

    const ChangeCategory = (event) => {
        const newCategory = event.target.value;
        fetchPosts(1, newCategory);
        setPage(1); // 카테고리 변경 시 페이지를 1로 리셋
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

    // 컴포넌트 마운트 시 게시글 데이터 불러오기
    useEffect(() => {
        fetchPosts(page);
    }, [page]); // 페이지가 변경될 때마다 데이터를 다시 불러오기


    const handlePageChange = (page) => {
        console.log("페이지 업데이트 중:", page);
        setPage(page);
        fetchPosts(page);
    };

    // 2일 이내 글 new 표시
    const isNew = (dateString) => {
        const postDate = new Date(dateString);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - postDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 차이를 일 단위로 변환
        return diffDays <= 2; // 2일 이내인지 확인
    };

    return (
        <>
            <Navi />
            <Menu />
            <section className='section-blist'>

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
                        <Link to="/board/boardInsert">
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

                    <div className="board_main_wrapper">
                        <div className='board_line'></div>

                        {posts && posts.map(post => (
                            <div className='board_post' key={post.bono}>
                                <div className='board_left'>
                                    <div className='board_top_section'>
                                        <Link to={`/board/boardDetail/${post.bono}`} >
                                            <div className='subject'>{post.botitle}</div>
                                        </Link>
                                        {/* 동적으로 댓글 수 표시 */}
                                        <div className='comment-count'>[{post.commentCount}]</div>
                                        {/* 게시판 이틀동안 NEW */}
                                        {isNew(post.bo_CREATE_AT) && (
                                            <div className='new'>
                                                <span >NEW</span>
                                            </div>
                                        )}
                                        <div className='board_date'>
                                            {post.bo_CREATE_AT}
                                        </div>
                                    </div>
                                    <br />
                                    <Link to={`/board/boardDetail/${post.bono}`}>
                                        <div className='board_bottom_section'>
                                            <div className='description'>{post.bocontent}</div>
                                            <br />
                                            <div className='thumbnail'>
                                                {post.thumb_boimage01 && <img src={`http://localhost:8989/uploads/${post.thumb_boimage01}`} alt='Thumbnail 1' />}
                                                {post.thumb_boimage02 && <img src={`http://localhost:8989/uploads/${post.thumb_boimage02}`} alt='Thumbnail 2' />}
                                                {post.thumb_boimage03 && <img src={`http://localhost:8989/uploads/${post.thumb_boimage03}`} alt='Thumbnail 3' />}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className='view_center'></div>
                                <div className='board_right'>
                                    <div className='board_info'>
                                        <div className='board_member_nickname'>닉네임 <span className="board_member_nickname2" onClick={openPopup}>    ss
                                            {/* 닉네임 클릭시 리스트 팝업 */}
                                            <div className='popup-list' data-role="popup" id="memberPopup">
                                                <ul data-role="listview" data-inset="true">
                                                    <li><a href="#">게시글 보기</a></li>
                                                    <li><a href="#">1:1 채팅</a></li>
                                                    <li><a href="#">친구 추가</a></li>
                                                    <li><a href="#">신고하기</a></li>
                                                </ul>
                                            </div></span></div>
                                        <div className='board_member_views'>
                                            조회수  &nbsp; 
                                            <span>{post.viewCount}</span>
                                            </div>
                                        <div className='board_member_likes'>
                                            좋아요  &nbsp;
                                            <span>{post.likeCount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='board_line'></div>
                    </div>
                </div>

                <div className='paging'>
                    <Pagination
                        activePage={page} // 현재 페이지
                        itemsCountPerPage={3} // 한 페이지랑 보여줄 아이템 갯수
                        totalItemsCount={totalItemsCount} // 총 아이템 갯수
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
};
export default App;
