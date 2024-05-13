import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';

import './boardInsert.css';

function App() {

    const { postId } = useParams(); // URL에서 postId 추출
    const [post, setPost] = useState(null); // 게시글 데이터 상태

    useEffect(() => {
        // postId를 사용하여 API 호출 또는 상태 관리 시스템에서 게시글 데이터 로드
        fetchPost(postId).then(data => setPost(data));
    }, [postId]);

    function handleOut () {
        alert("나가기");
    }
    function handleSubmit () {
        alert("수정하기"); // 수정 API 호출 또는 상태 관리 시스템을 통해 게시글 수정
    }

    // if (!post) return <div>Loading...</div>;

    return (
        <>
            <Navi />
            <Menu />
            <section className='section-bupdate'>
                <div className='write-box'>
                    <form action='#' method='post' className='board-insert'>
                        <input type='hidden' name='command' value='boardInsert' />

                        <div className='board-write'>
                        <input className='write-title' name='writeTitle' value={post.title} onChange={e => setPost({...post, title: e.target.value})} />
                            <div className='board_line'></div>
                            <textarea className='write-content' name='writeContent' value={post.content} onChange={e => setPost({...post, content: e.target.value})}></textarea>
                            <div className='board_line'></div>
                        </div>

                        <div className='img-group'>
                            <div className='img-file'>
                                <input type='file' name='img01' className='img-input' />
                                <label className='img-label' placeholder='사진을 첨부하세요'></label>
                            </div>
                            <div className='board_line'></div>
                        </div>
                    </form>
                </div>

                <div className='submit-btn'>
                    <button className='out' onClick={handleOut}>나가기</button>
                    <button className='submit' type='button' id='submit' onClick={handleSubmit}>수정하기</button>
                </div>
            </section>
            <Footer />
        </>
    );

}

export default App;