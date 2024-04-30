import './menu.css'

function App(){

    function fn_diagnosis(){
        alert("영양 진단");
    }
    function fn_mune(){
        alert("메뉴 보기");
    }
    function fn_recommendation(){
        alert("음식 추천");
    }
    function fn_community(){
        alert("커뮤니티");
    }

    return(
        <div className="menu_container">
            <nav className='div_menu' >
                <ul>
                    <li><div className='li_class' onClick={fn_diagnosis}>영양 진단</div></li>
                    <li><div className='li_class' onClick={fn_mune}>메뉴 보기</div></li>
                    <li><div className='li_class' onClick={fn_recommendation}>음식 추천</div></li>
                    <li><div className='li_class' onClick={fn_community}>커뮤니티</div></li>
                </ul>
            </nav>
        </div>
    );    
}
export default App ;