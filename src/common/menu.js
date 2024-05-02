import React from 'react';
import { Link } from "react-router-dom";
import './menu.css';

function Menu() {
    function fn_diagnosis() {
        alert("영양 진단");
    }
    function fn_recommendation() {
        alert("음식 추천");
    }
    function fn_community() {
        alert("커뮤니티");
    }

    return (
        <div className="menu_container">
            <nav className='div_menu'>
                <ul>
                    <li><a href="#" className='li_class' onClick={fn_diagnosis}>영양 진단</a></li>
                    <li><Link to="/products" className='li_class'>메뉴 보기</Link></li>
                    <li><a href="#" className='li_class' onClick={fn_recommendation}>음식 추천</a></li>
                    <li><a href="#" className='li_class' onClick={fn_community}>커뮤니티</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Menu;