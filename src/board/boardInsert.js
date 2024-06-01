import React from 'react';
import axios from 'axios';
import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';
import { Link } from "react-router-dom";

import './boardInsert.css';

function App() {

    // 폼 제출 핸들러
    const fn_submit = async (event) => {
        event.preventDefault(); // 폼 기본 제출 이벤트 방지

        // FormData 객체를 사용하여 폼 데이터를 관리
        const formData = new FormData(event.target); 

        // 'board' 객체를 JSON 문자열로 변환하여 FormData에 추가
        const boardData = JSON.stringify({
            botitle: event.target.botitle.value,
            bocontent: event.target.bocontent.value
        });
        formData.append('board', new Blob([boardData], {
            type: 'application/json'
        }));

        try {
            // 백엔드로 POST 요청 전송
            const response = await axios.post('http://localhost:3000/board/boardInsert', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // 요청 헤더에 콘텐츠 타입을 multipart/form-data로 설정 // 'application/json' 를 수정함
                }
            });

            // 응답 처리
            if (response.status === 200) {
                alert('게시글이 정상적으로 등록되었습니다.');
                window.location.href = '/board/boardList'; // 성공 후 페이지 리디렉션
                
            } else {
                alert('등록 실패');
            }
        } catch (error) {
            console.error('등록 에러', error);
            alert('등록 중 오류 발생');
        }
    };


    return (
        <>
            <Navi />
            <Menu />
            <section className='section-binsert'>
                <div className='write-box'>
                    <form onSubmit={fn_submit} method='post' className='board-insert'  encType="multipart/form-data">

                        <div className='board-write'>
                            <input className='write-title' name='botitle'
                                placeholder='제목을 입력하세요' required />
                            <div className='board_line'></div>
                            <textarea className='write-content' name='bocontent' placeholder='내용을 입력하세요' required></textarea>
                            <div className='board_line'></div>
                        </div>

                        <div className='img-group'>
                            <div className='img-file'>
                                <input type='file' name='file1' className='img-input' />
                                <label className='img-label' placeholder='사진을 첨부하세요'></label>
                            </div>
                            <div className='board_line'></div>
                            <div className='img-file'>
                                <input type='file' name='file2' className='img-input' />
                                <label className='img-label' placeholder='사진을 첨부하세요'></label>
                            </div>
                            <div className='board_line'></div>
                            <div className='img-file'>
                                <input type='file' name='file3' className='img-input' />
                                <label className='img-label' placeholder='사진을 첨부하세요'></label>
                            </div>
                            <div className='board_line'></div>
                        </div>

                        <div className='submit-btn'>
                            <Link to="/board/boardList">
                                <button className='out' type='button'>나가기</button>
                            </Link>
                            <button className='submit' type='submit' id='submit' >등록하기</button>
                        </div>
                    </form>
                </div>


            </section>
            <Footer />
        </>
    );

}

export default App;