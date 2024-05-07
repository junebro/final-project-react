import './css/nav.css'
import logo from './../images/logo.svg'; // 이미지 파일을 import
import { Link } from 'react-router-dom';

function App(){

    function fn_login(){
        alert("로그인");
    }
    function fn_join(){
        alert("회원가입");
    }
    function fn_mypage(){
        alert("마이페이지");
    }

    return(
        <div className="nav_container">

            <Link to="/">
              <img className='img_logo' src={logo} alt="로고"></img>
            </Link>
           
            <header className='div_text' style={{ display: 'flex', gap: '10px' }}>
                <ul>
                    <li className='logo_left'><div onClick={fn_login}>로그인</div></li>
                    <li className='logo_left'> <div onClick={fn_join}>회원 가입</div></li>
                    <li className='logo_left'><Link className='link' to="/Cart">장바구니</Link></li>
                    <li className='logo_left'><div onClick={fn_mypage}>마이페이지</div></li>
                </ul>
            </header>
           
    </div>
    );    
}
export default App ;