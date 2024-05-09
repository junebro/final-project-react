import React from 'react';
import { Link } from "react-router-dom";
import './css/menu.css';

function Menu() {
    function fn_diagnosis() {
        alert("영양 진단");
    }
    function fn_community() {
        alert("커뮤니티");
    }

    return (
        <>
            <div className="menu_container">
                <nav className='div_menu'>
                    <ul>
                        <li><a href="#" className='link' onClick={fn_diagnosis}>영양진단</a></li>
                        <li><Link to="/products/products" className='link'>메뉴보기</Link></li>
                        <li><Link to="/diet/diet" className='link'>음식 추천</Link></li>
                        <li><a href="#" className='link' onClick={fn_community}>커뮤니티</a></li>
                    </ul>
                </nav>
            </div>
            <div className='line'></div>
        </>
    );
}

export default Menu;