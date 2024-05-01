import './main.css'
import React from 'react';
import Navi from './../common/navigation';
import Menu from './../common/menu';
import Footer from './../common/footer';
import main from './../images/main/main.png'; 


function App() {
    return (
        <div>
            <Navi />
            <Menu />
            <div className='main_top'>
                <div className='top_div'>
                    <div className="font_top top_1" >EAT</div>
                    <div className="font_top top_2 ">HEALTHY</div>
                    <div className="font_top top_2 ">BE HEALTHY</div>
                    <div className="font_top top_3">고민없는, 나만의 위한 식단</div>
                    <div className="font_top top_4 top_button">영양 진단 받아보기</div>
                </div>
                <img className='img_main' src={main} alt="메인 이미지"></img>
            </div>
            <div className='main_line'></div>
            <div className='main_mid'>
                <div className='font_mid mid_1'>건강 식단</div>
                <div className='font_mid mid_2'>건강한 일상을 지키는 가장 쉬운 관리</div>
                <div className='mid_area_button'>
                    <div className='mid_area_1'>
                        <div className="mid_button">영양 진단 받아보기</div>
                        <div style={{width:"30px"}}></div>
                        <div className="mid_button ">영양 진단 받아보기</div>
                    </div>
                    <div className='mid_area_2'>
                        <div className="mid_button">영양 진단 받아보기</div>
                        <div style={{width:"30px"}}></div>
                        <div className="mid_button ">영양 진단 받아보기</div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );    
}
export default App;