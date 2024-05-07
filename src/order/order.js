import React, { useState } from 'react';
import './order.css'

import Navi from './../common/navigation';
import Footer from './../common/footer';

import PopupDom from './../member/popupDom';
import PopupPostCode from './../member/PopupPostCode';
import { addressData } from './../member/PopupPostCode';

function Order() {

    // 주소 
    let inputAddress = '';

    if (addressData) {
        inputAddress = addressData;
    }

    // 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = React.useState(false)

    // 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }

    // 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }



    
    const [formData, setFormData] = useState({
        buyerName: '',
        buyerEmail: '',
        buyerPhone: ['', '', ''],
        sameAsBuyer: false,
        recipientName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePhoneChange = (index, value) => {
        const updatedPhones = [...formData.buyerPhone];
        updatedPhones[index] = value;
        setFormData(prevState => ({
            ...prevState,
            buyerPhone: updatedPhones
        }));
    };

    const handleCheckboxChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            sameAsBuyer: !prevState.sameAsBuyer,
            recipientName: !prevState.sameAsBuyer ? prevState.buyerName : ''
        }));
    };

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
                <h2 style={{marginTop:'30px', marginLeft:'60px'}}>구매자 정보</h2>
                <div className='line' style={{marginTop:'10px', marginBottom:'30px'}}/>
                <div class="form-group">
                    <label>이름:</label>
                    <div>
                        <input className="order-test-text" type="text" id="buyerName" name="buyerName" value={formData.buyerName} onChange={handleChange} />
                    </div>
                </div>
                <div class="form-group">
                    <label>이메일:</label>
                    <div>
                        <input className="order-test-text" type="email" id="buyerEmail" name="buyerEmail" value={formData.buyerEmail} onChange={handleChange} />
                    </div>
                </div>
                <div class="phone-box">
                    <div>
                    <label>핸드폰 번호:</label>
                        <select className="order-phone-text" name="phone1" value={formData.buyerPhone[0]} onChange={e => handlePhoneChange(0, e.target.value)}>
                            <option value="010">010</option>
                            <option value="011">011</option>
                            <option value="016">016</option> 
                        </select>
                        -
                        <input className="order-phone-text" type="text" name="phone2" value={formData.buyerPhone[1]} onChange={e => handlePhoneChange(1, e.target.value)} />
                        -
                        <input className="order-phone-text" type="text" name="phone3" value={formData.buyerPhone[2]} onChange={e => handlePhoneChange(2, e.target.value)} />
                    </div>
                </div>
                <div style={{marginTop:'30px'}} className='line-bold'></div>
                <h2 style={{marginTop:'30px', marginBottom:'30px', marginLeft:'60px'}}>받는 사람 정보</h2>
                <div style={{marginBottom:'30px'}} className='line' />

                <div className='order-customer-radio'>
                    <input type="radio" id="customer-select" name="customer-select" value="customer-select" />
                    <label for="customer-select">주문자 정보와 동일</label>
                </div>

                <div class="form-group">
                    <label>받는 분:</label>
                    <div>
                        <input className="order-test-text" type="text" id="buyerName" name="buyerName" value={formData.buyerName} onChange={handleChange} />
                    </div>
                </div>

                <div className="address-box">
                    <label>주 소:</label>
                    <div>
                        <input id="post" className="order-post-text" placeholder="우편번호" value={inputAddress.zonecode} />
                    </div>
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

                <div className="address-box-test">
                    <div style={{marginBottom:'10px'}}>
                        <label>주 소:</label>
                        <input id="road-name" className="order-adress-text" placeholder="도로명주소" value={inputAddress.address} style={{marginRight:'10px'}}/>
                        <input id="address-detail" className="order-adress-text" placeholder="상세주소" />
                    </div>
                </div>

                <div class="phone-box">
                    
                    <div>
                        <label>핸드폰 번호:</label>
                        <select className="order-phone-text" name="phone1" value={formData.buyerPhone[0]} onChange={e => handlePhoneChange(0, e.target.value)}>
                            <option value="010">010</option>
                            <option value="011">011</option>
                            <option value="016">016</option> 
                        </select>
                        -
                        <input className="order-phone-text" type="text" name="phone2" value={formData.buyerPhone[1]} onChange={e => handlePhoneChange(1, e.target.value)} />
                        -
                        <input className="order-phone-text" type="text" name="phone3" value={formData.buyerPhone[2]} onChange={e => handlePhoneChange(2, e.target.value)} />
                    </div>
                </div>
                <div style={{marginTop:'30px'}} className='line-bold'></div>
                <h2 style={{marginTop:'30px', marginBottom:'30px', marginLeft:'60px'}}>상품 정보</h2>
                <div className='line' style={{marginTop:'10px', marginBottom:'30px'}}/>


                <div style={{marginTop:'30px'}} className='line-bold'></div>
                <h2 style={{marginTop:'30px', marginBottom:'30px', marginLeft:'60px'}}>결제 정보</h2>
                <div className='line' style={{marginTop:'10px', marginBottom:'30px'}}/>
                <div className="form-group-bottom">
                    <label>상품 금액</label>
                    <a>187,000원</a>
                </div>
                <div className="form-group-bottom">
                    <label>배송비</label>
                    <a>3,000원</a>
                </div>
                <div className="form-group-bottom">
                    <label>총 금액</label>
                    <a>19,000원</a>
                </div>
                <div className="form-group-bottom">
                    <label>결제 방법</label>
                    <div className='choice-button' onClick={() => handleClick(1)}>계좌 이체</div>
                    <div className='choice-button' onClick={() => handleClick(2)}>신용/체크카드</div>
                    <div className='choice-button' onClick={() => handleClick(3)}>무통장 입금</div>
                </div>

                {activeTextIndex === 1 && <div style={paymentStyle}>Text for Button 01</div>}
                {activeTextIndex === 2 && <div style={paymentStyle}>Text for Button 02</div>}
                {activeTextIndex === 3 && <div style={paymentStyle}>Text for Button 03</div>}

                <div className='payment-button'>결제 하기</div>
            </form>
            <Footer />
        </div>
    )
}

export default Order;