import React, { useState, useEffect } from 'react';
import './order.css'

import Navi from './../common/navigation';
import Footer from './../common/footer';

import PopupDom from './../member/popupDom';
import PopupPostCode from './../member/PopupPostCode';
import { addressData } from './../member/PopupPostCode';

function Order() {

    // 체크박스 상태
    const [isChecked, setIsChecked] = useState(false);

    const [buyerInfo, setBuyerInfo] =  useState({
        name: '',
        phone: ''
    });

    // 팝업창 상태 관리
    const [isBuyerPopupOpen, setBuyerIsPopupOpen] = React.useState(false)
    const [isPopupOpen, setIsPopupOpen] = React.useState(false)

    const [isToggle1, setIsToggle1] = useState(false);
    const [isToggle2, setIsToggle2] = useState(false);

     // 주소
     let inputBuyerAddress = '';
     let inputRecipientAddress = '';

    // 팝업창 열기
    const openByerPostCode = () => {
        setIsToggle1(true);
        setIsToggle2(false);
        setBuyerIsPopupOpen(true);
    }

    // 팝업창 닫기
    const closeByerPostCode = () => {
        setBuyerIsPopupOpen(false)
    }

    // 팝업창 열기
    const openPostCode = () => {
        setIsToggle1(false);
        setIsToggle2(true);
        setIsPopupOpen(true)
    }

    // 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }

    // if (addressData) {
    //     if (isToggle1 && !isToggle2) {
    //         inputBuyerAddress = addressData;
    //         inputRecipientAddress = '';
    //     } else if (!isToggle1 && isToggle2 ) {
    //         inputRecipientAddress = addressData;
    //         inputBuyerAddress = '';
    //     }
    // }
    
    // 표시할 텍스트의 인덱스를 저장하는 state
    const [activeTextIndex, setActiveTextIndex] = useState(null);

    // 공통 클릭 핸들러: 인덱스에 따라 상태를 업데이트
    const handleClick = (index) => {
        // 이미 활성화된 버튼을 다시 클릭하면 모든 텍스트 숨기기
        if (activeTextIndex === index) {
            setActiveTextIndex(null);
        } else {
            setActiveTextIndex(index);
        }
    };

    const paymentStyle = {
        cursor: 'pointer',
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 120px',
        textAlign: 'center',
        borderRadius: '5px',
        margin: '20px 250px'
    };

    return(
        <div style={{backgroundColor:'white'}}>
            <Navi />
            <form className='order-form'> 
                <h1 style={{marginTop:'30px'}}>주문 결제</h1>
                <h2 className="order-top-h2">구매자 정보</h2>
                <div className='line' style={{marginBottom:'30px'}}/>
                <div class="form-group">
                    <label className='order-customer-label'>이름:</label>
                    <div>
                        <input className="order-test-text" type="text" />
                    </div>
                </div>
                <div className="form-group">
                    <label className='order-customer-label'>주 소:</label>
                    <div>
                        <input className="order-test-text-test" placeholder="우편번호" value={inputBuyerAddress.zonecode} />
                        <button type="button" id="post-btn" className="post-btn"
                            onClick={openByerPostCode}>우편번호 찾기</button>
                        {/* // 팝업 생성 기준 div */}
                        <div id='popupDom'>
                            {isBuyerPopupOpen && (
                                <PopupDom>
                                    <PopupPostCode onClose={closeByerPostCode} />
                                </PopupDom>
                            )}
                        </div>
                    </div>
                </div>

                <div className="order-adress">
                    <label className='order-adress-label'></label>
                    <div className='order-address-box'>
                        <div style={{marginBottom:'10px'}}>
                            <input id="road-name" className="order-adress-text" placeholder="도로명주소" value={inputBuyerAddress.address} />
                        </div>
                        <div style={{marginBottom:'10px'}}>
                            <input id="address-detail" className="order-adress-text" placeholder="상세주소" /> 
                        </div>
                    </div>
                </div>          

                <div class="phone-box">
                    <label className='order-customer-label'>핸드폰 번호:</label>
                    <div>
                        <select className="order-phone-text" >
                            <option value="010">010</option>
                            <option value="011">011</option>
                            <option value="016">016</option> 
                        </select>
                        -
                        <input className="order-phone-text" type="text" />
                        -
                        <input className="order-phone-text" type="text" />
                    </div>
                </div>
                <div style={{marginTop:'30px'}} className='line-bold'></div>
                <h2 className="order-top-h2">받는 사람 정보</h2>
                <div style={{marginBottom:'30px'}} className='line' />

                <div className='order-customer-radio'>
                    <input type="checkbox" id="customer-select" name="customer-select" checked={isChecked} />
                    <label className='order-customer-label' for="customer-select">주문자 정보와 동일</label>
                </div>

                <div className="form-group">
                    <label className='order-customer-label'>받는 분:</label>
                    <div>
                        <input className="order-test-text" type="text"/>
                    </div>
                </div>

                <div className="form-group">
                    <label className='order-customer-label'>주 소:</label>
                    <div>
                        <input className="order-test-text-test" placeholder="우편번호" value={inputRecipientAddress.zonecode} />
                        <button type="button" id="post-btn" className="post-btn"
                            onClick={openPostCode}>우편번호 찾기</button>
                        {/* // 팝업 생성 기준 div */}
                        <div id='popupDom'>
                            {isPopupOpen && (
                                <PopupDom>
                                    <PopupPostCode onClose={closePostCode} />
                                </PopupDom>
                            )}
                        </div>
                    </div>
                </div>

                <div className="order-adress">
                    <label className='order-adress-label'></label>
                    <div className='order-address-box'>
                        <div style={{marginBottom:'10px'}}>
                            <input id="road-name" className="order-adress-text" placeholder="도로명주소" value={inputRecipientAddress.address} />
                        </div>
                        <div style={{marginBottom:'10px'}}>
                            <input id="address-detail" className="order-adress-text" placeholder="상세주소" /> 
                        </div>
                    </div>
                </div>                      

                <div class="phone-box">
                    <label className='order-customer-label'>핸드폰 번호:</label>
                    <div>
                        <select className="order-phone-text" name="phone1">
                            <option value="010">010</option>
                            <option value="011">011</option>
                            <option value="016">016</option> 
                        </select>
                        -
                        <input className="order-phone-text" type="text" name="phone2" />
                        -
                        <input className="order-phone-text" type="text" name="phone3" />
                    </div>
                </div>
                <div style={{marginTop:'30px'}} className='line-bold'></div>
                <h2 className="order-top-h2">상품 정보</h2>
                <div className='line' style={{marginTop:'10px', marginBottom:'30px'}}/>


                <div style={{marginTop:'30px'}} className='line-bold'></div>
                <h2 className="order-top-h2">결제 정보</h2>
                <div className='line' style={{marginTop:'10px', marginBottom:'30px'}}/>
                <div className="form-group-bottom">
                    <label className='order-payament-label'>상품 금액</label>
                    <a>187,000원</a>
                </div>
                <div className="form-group-bottom">
                    <label className='order-payament-label'>배송비</label>
                    <a>3,000원</a>
                </div>
                <div className="form-group-bottom">
                    <label className='order-payament-label'>총 금액</label>
                    <a>19,000원</a>
                </div>
                <div className="form-payment-info">
                    <label className='order-payament-choice'>결제 방법</label>
                    <div className='choice-button' onClick={() => handleClick(1)}>계좌 이체</div>
                    <div className='choice-button' onClick={() => handleClick(2)}>신용/체크카드</div>
                    <div className='choice-button' onClick={() => handleClick(3)}>무통장 입금</div>
                </div>

                {activeTextIndex === 1 && <div style={paymentStyle}>Text for Button 01</div>}
                {activeTextIndex === 2 && <div style={paymentStyle}>Text for Button 02</div>}
                {activeTextIndex === 3 && <div style={paymentStyle}>Text for Button 03</div>}
                
                <div className='payment-button-section'>
                    <div className='payment-button'>결제 하기</div>
                </div>
            </form>
            <Footer />
        </div>
    )
}

export default Order;