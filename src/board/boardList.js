import './boardList.css';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Pagination from 'react-js-pagination';
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8989'; // 기본 URL 설정

function App() {
    return (
        <BoardDisplay />
    );
}

const BoardDisplay = () => {

    const [posts, setPosts] = useState([]); // 게시글을 저장할 상태
    const [totalItemsCount, setTotalItemsCount] = useState(0); // 총 게시물 수
    const [page, setPage] = useState(1); // 현재 페이지 상태
    const [orderBy, setOrderBy] = useState('recent'); // 정렬 기준 상태
    const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드 상태

    console.log(posts);

    // 게시글 데이터를 불러오는 함수
    const fetchPosts = async (page, orderBy = 'recent') => {
        const pageSize = 3; // 페이지당 게시물 수를 3으로 설정
        const url = `/board/boardList/paged?page=${page}&size=${pageSize}&orderBy=${orderBy}`;
        console.log(`Fetching posts for page: ${page}, size: ${pageSize}`);
        // 현재 페이지 확인 로그

        try {
            const response = await axios.get(url);
            if (response.data && Array.isArray(response.data.posts)) {
                setPosts(response.data.posts);  // 페이지 정보가 포함된 경우 .posts 사용
                setTotalItemsCount(response.data.totalCount); // 전체 게시물 수 업데이트
            } else {
                setPosts([]);// 데이터 구조가 예상과 다르면 빈 배열로 초기화
                setTotalItemsCount(0);
            }
        } catch (error) {
            console.error('게시글 로딩 실패', error);
            setPosts([]); // 오류 처리
            setTotalItemsCount(0); // 데이터 구조가 예상과 다르면 빈 배열로 초기화
        }
    }

    // 게시물 카테고리 변경
    const ChangeCategory = (event) => {
        const orderBy = event.target.value;
        setOrderBy(orderBy);
        fetchPosts(1, orderBy);
        setPage(1); // 카테고리 변경 시 페이지를 1로 리셋
    };

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
        fetchPosts(page, orderBy);
    }, [page, orderBy]); // 페이지가 변경될 때마다 데이터를 다시 불러오기

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

    // 검색 함수 구현
    const fetchSearchResults = async (page) => {
        const pageSize = 3; // 페이지당 게시물 수
        const url = `/board/search?keyword=${encodeURIComponent(searchKeyword)}&page=${page}&size=${pageSize}`;

        try {
            const response = await axios.get(url);
            if (response.data && Array.isArray(response.data)) {
                setPosts(response.data); // 검색 결과 설정
                setTotalItemsCount(response.data.length); // 검색 결과 수에 따라 총 수 설정
            } else {
                setPosts([]); // 데이터 구조가 예상과 다르면 빈 배열로 초기화
                setTotalItemsCount(0); // 총 게시물 수 초기화
            }
        } catch (error) {
            console.error('검색 실패', error);
            setPosts([]);
            setTotalItemsCount(0);
        }
    };

    // 검색 양식 핸들러 수정
    const handleSearch = (event) => {
        event.preventDefault(); // 폼 기본 제출 막기
        fetchSearchResults(1); // 첫 페이지로 검색 결과 가져오기
        setPage(1); // 페이지 상태 업데이트
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
                        <form onSubmit={handleSearch}>
                            <div className='search-form'>
                                <input type='hidden' />
                                <div className='post-search'>
                                    <div className='search-container'>
                                        <input className='search-box' type='text' id='keyword' name='keyword' placeholder='Search' value={searchKeyword}
                                            onChange={e => setSearchKeyword(e.target.value)}></input>
                                        <button type='submit' className='search-btn'>
                                            <img src={require('./../images/board/search_icon.png')} className='search-btn-default' />
                                            <img src={require('./../images/board/search_on_icon.png')} className='search-btn-on' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="board_main_wrapper">
                        <div className='board_line'></div>
                        {posts.length === 0 ? (
                            <div className="no-posts">게시글이 없습니다.</div>
                        ) : (
                            posts.map(post => (
                                <React.Fragment key={post.bono}>
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
                                                <div className='board_member_nickname'>닉네임&nbsp; <span className="board_member_nickname2" >{post.memberNick}
                                                   
                                                    </span></div>
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
                                    <div className='board_line'></div>
                                    </React.Fragment>
                                    ))
                        )}
                                   
                                
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
