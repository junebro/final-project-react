import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';

import './boardInsert.css';

function App() {

    const { bono } = useParams(); // URL에서 bono 추출
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 객체
    const [post, setPost] = useState({
        botitle: '',
        bocontent: '',
        boimage01: '',
        boimage02: '',
        boimage03: ''
    }); // 게시글 데이터 상태
    const [files, setFiles] = useState({
        file1: null,
        file2: null,
        file3: null
    }); // 파일 업로드 상태

    useEffect(() => {
        // bono를 사용하여 API 호출
        axios.get(`http://localhost:8989/board/boardDetail/${bono}`)
            .then(response => {
                setPost(response.data);
                console.log("Post data fetched for update:", response.data);
            })
            .catch(error => console.error('Error fetching post', error));
    }, [bono]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPost(prevPost => ({ ...prevPost, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFiles(prevFiles => ({ ...prevFiles, [name]: files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('board', new Blob([JSON.stringify(post)], { type: 'application/json' }));
        if (files.file1) formData.append('file1', files.file1);
        if (files.file2) formData.append('file2', files.file2);
        if (files.file3) formData.append('file3', files.file3);

        console.log("Submitting form data:", post, files);

        try {
            const response = await axios.post('http://localhost:8989/board/boardUpdate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log("Update response data:", response.data);
                alert('게시글이 성공적으로 수정되었습니다.');
                navigate(`/board/boardDetail/${bono}`);
            } else {
                alert('수정 실패');
            }
        } catch (error) {
            console.error('Error updating post', error);
            alert('수정 중 오류가 발생했습니다.');
        }
    };


    const handleOut = () => {
        navigate('/board/boardList');
    };


    return (
        <>
            <Navi />
            <Menu />
            <section className='section-bupdate'>
                <div className='write-box'>
                    <form onSubmit={handleSubmit} className='board-insert' encType="multipart/form-data">

                        <div className='board-write'>
                            <input
                                className='write-title'
                                name='botitle'
                                value={post.botitle}
                                onChange={handleInputChange}
                                placeholder='제목을 입력하세요'
                                required
                            />
                            <div className='board_line'></div>
                            <textarea
                                className='write-content'
                                name='bocontent'
                                value={post.bocontent}
                                onChange={handleInputChange}
                                placeholder='내용을 입력하세요'
                                required
                            ></textarea>
                            <div className='board_line'></div>
                        </div>

                        <div className='img-group'>
                            <div className='img-file'>
                                <input
                                    type='file'
                                    name='file1'
                                    className='img-input'
                                    onChange={handleFileChange}
                                />
                                <label className='img-label' placeholder='사진을 첨부하세요'></label>
                            </div>
                            <div className='board_line'></div>
                            <div className='img-file'>
                                <input
                                    type='file'
                                    name='file2'
                                    className='img-input'
                                    onChange={handleFileChange}
                                />
                                <label className='img-label' placeholder='사진을 첨부하세요'></label>
                            </div>
                            <div className='board_line'></div>
                            <div className='img-file'>
                                <input
                                    type='file'
                                    name='file3'
                                    className='img-input'
                                    onChange={handleFileChange}
                                />
                                <label className='img-label' placeholder='사진을 첨부하세요'></label>
                            </div>
                            <div className='board_line'></div>
                        </div>

                        <div className='submit-btn'>
                            <button className='out' type='button' onClick={handleOut}>나가기</button>
                            <button className='submit' type='submit' id='submit'>수정하기</button>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );

}

export default App;