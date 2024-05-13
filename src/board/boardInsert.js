import Navi from '../common/navigation';
import Menu from '../common/menu';
import Footer from '../common/footer';
import { Link } from "react-router-dom";

import './boardInsert.css';

function App() {

    function fn_out() {
        // 나가기
    }
    function fn_submit() {
        alert("등록하기");
    }

    return (
        <>
            <Navi />
            <Menu />
            <section className='section-binsert'>
                <div className='write-box'>
                    <form action='#' method='post' className='board-insert'>
                        <input type='hidden' name='command' value='boardInsert' />

                        <div className='board-write'>
                            <input className='write-title' name='writeTitle' placeholder='제목을 입력하세요' />
                            <div className='board_line'></div>
                            <textarea className='write-content' name='writeContent' placeholder='내용을 입력하세요'></textarea>
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
                    <Link to="/board/boardList" className='link'>
                        <button className='out' onClick={fn_out}>나가기</button>
                    </Link>
                    <button className='submit' type='submit' id='submit' onClick={fn_submit}>등록하기</button>
                </div>
            </section>
            <Footer />
        </>
    );

}

export default App;