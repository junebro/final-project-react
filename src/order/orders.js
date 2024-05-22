import React, { useState, useEffect, useRef } from 'react';
import './orders.css'

import Navi from '../common/navigation';  
import Footer from '../common/footer';

import PopupDom from '../member/popupDom';
import PopupPostCode from '../member/PopupPostCode';
import { addressData } from '../member/PopupPostCode';

import PaymentModal from './PaymentModal';  
function Order() {

    let [data, setData] = useState('');
    let [data1, setData1] = useState('');

    // 클릭 이벤트에 대한 처리
    const handleClic1k = () => {
        setData('111');
        setData1('222');
    };

    const handleClic2k = () => {
        setData('333');
        setData1('444');
    };

    useEffect(() => {
        if (data == '111' && data1 == '222') {
            setData(addressData);
        } else if (data == '333' && data1 == '444') {
            setData1(addressData);
        }
    }, [addressData]);



    // 팝업창 상태 관리
    const [isBuyerPopupOpen, setBuyerIsPopupOpen] = React.useState(false)
    const [isPopupOpen, setIsPopupOpen] = React.useState(false)

    // 팝업창 열기
    const openByerPostCode = () => {
        handleClic1k();
        setBuyerIsPopupOpen(true);
    }

    // 팝업창 닫기
    const closeByerPostCode = () => {
        setBuyerIsPopupOpen(false)
    }

    // 팝업창 열기
    const openPostCode = () => {
        handleClic2k();
        setIsPopupOpen(true)
    }

    // 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }


    /* 체크 박스 클릭시 데이터 이동 */

    const checkboxRef = useRef();

    const infoBuyer = useRef({
        name: '',
        address: '',
        addressPost: '',
        addressDetail: '',
        phoneFirst: '010',
        phoneSecond: '',
        phoneThird: ''
    });

    const infoReceiver = useRef({
        name: '',
        address: '',
        addressPost: '',
        addressDetail: '',
        phoneFirst: '010',
        phoneSecond: '',
        phoneThird: ''
    });
    const handleCopyInfo = () => {
        
        if (checkboxRef.current.checked) {
            Object.keys(infoBuyer.current).forEach(key => {
                infoReceiver.current[key].value = infoBuyer.current[key].value;
            });
        } else {
            Object.keys(infoReceiver.current).forEach(key => {
                if (key === 'phoneFirst') {
                    infoReceiver.current[key].value = '010';
                } else {
                    infoReceiver.current[key].value = '';
                }
            });
        }
    };
    


    /* 결제 방법 버튼 이벤트 */

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


    /* 모달 */
    const [orderDetails, setOrderDetails] = useState({
        orderId: '4DkCejyErLUyfVJ8iCdRS',
        amount: 100,
        customerName: '김토스',
        orderName: '테스트 결제'
      });
      const [showModal, setShowModal] = useState(false);


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
                        <input className="order-test-text" type="text" ref={(el) => infoBuyer.current.name = el} />
                    </div>
                </div>
                <div className="form-group">
                    <label className='order-customer-label'>주 소:</label>
                    <div>
                        <input className="order-test-text-test" placeholder="우편번호" ref={(el) => infoBuyer.current.addressPost = el} value={data.zonecode} />
                        <button type="button" id="post-btn" className="post-btn"
                            onClick={openByerPostCode}>우편번호 찾기</button>
                        {/* // 팝업 생성 기준 div */}
                        <div id='popupDom' className='order-top-popupDom'>
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
                            <input id="road-name" className="order-adress-text" ref={(el) => infoBuyer.current.address = el} placeholder="도로명주소" value={data.address} />
                        </div>
                        <div style={{marginBottom:'10px'}}>
                            <input id="address-detail" className="order-adress-text" ref={(el) => infoBuyer.current.addressDetail = el} placeholder="상세주소"  /> 
                        </div>
                    </div>
                </div>          

                <div class="phone-box">
                    <label className='order-customer-label'>핸드폰 번호:</label>
                    <div>
                        <select className="order-phone-text" ref={(el) => infoBuyer.current.phoneFirst = el}>
                            <option value="010">010</option>
                            <option value="011">011</option>
                            <option value="016">016</option> 
                        </select>
                        -
                        <input className="order-phone-text" type="text" ref={(el) => infoBuyer.current.phoneSecond = el} />
                        -
                        <input className="order-phone-text" type="text" ref={(el) => infoBuyer.current.phoneThird = el} />
                    </div>
                </div>
                <div style={{marginTop:'30px'}} className='line-bold'></div>
                <h2 className="order-top-h2">받는 사람 정보</h2>
                <div style={{marginBottom:'30px'}} className='line' />

                <div className='order-customer-radio'>
                    <input type="checkbox" id="customer-select" name="customer-select" ref={checkboxRef} onChange={handleCopyInfo} />
                    <label className='order-customer-label' for="customer-select" >주문자 정보와 동일</label>
                </div>

                <div className="form-group">
                    <label className='order-customer-label'>받는 분:</label>
                    <div>
                        <input className="order-test-text" type="text" ref={(el) => infoReceiver.current.name = el}/>
                    </div>
                </div>

                <div className="form-group">
                    <label className='order-customer-label'>주 소:</label>
                    <div>
                        <input className="order-test-text-test" placeholder="우편번호" ref={(el) => infoReceiver.current.addressPost = el} value={data1.zonecode} />
                        <button type="button" id="post-btn" className="post-btn"
                            onClick={openPostCode}>우편번호 찾기</button>
                        {/* // 팝업 생성 기준 div */}
                        <div id='popupDom' className='order-bottom-popupDom'>
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
                            <input id="road-name" className="order-adress-text" ref={(el) => infoReceiver.current.address = el}  placeholder="도로명주소" value={data1.address} />
                        </div>
                        <div style={{marginBottom:'10px'}}>
                            <input id="address-detail" className="order-adress-text" ref={(el) => infoReceiver.current.addressDetail = el}  placeholder="상세주소" /> 
                        </div>
                    </div>
                </div>                      

                <div class="phone-box">
                    <label className='order-customer-label'>핸드폰 번호:</label>
                    <div>
                        <select className="order-phone-text" name="phone1" ref={(el) => infoReceiver.current.phoneFirst = el}>
                            <option value="010">010</option>
                            <option value="011">011</option>
                            <option value="016">016</option> 
                        </select>
                        -    
                        <input className="order-phone-text" type="text" name="phone2" ref={(el) => infoReceiver.current.phoneSecond = el}/>
                        -
                        <input className="order-phone-text" type="text" name="phone3" ref={(el) => infoReceiver.current.phoneThird = el}/>
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
                {/* <div className="form-payment-info">
                    <label className='order-payament-choice'>결제 방법</label>
                    <div className='choice-button' onClick={() => handleClick(1)}>계좌 이체</div>
                    <div className='choice-button' onClick={() => handleClick(2)}>신용/체크카드</div>
                    <div className='choice-button' onClick={() => handleClick(3)}>무통장 입금</div>
                </div>

                {activeTextIndex === 1 && <div style={paymentStyle}>Text for Button 01</div>}
                {activeTextIndex === 2 && <div style={paymentStyle}>Text for Button 02</div>}
                {activeTextIndex === 3 && <div style={paymentStyle}>Text for Button 03</div>}
                 */}
                <div className='payment-button-section'>
                    <button className='payment-button' type="button" onClick={() => setShowModal(true)}>결제 하기1</button>
                </div>
            </form>
            {showModal && (
                <PaymentModal
                orderDetails={orderDetails}
                closeModal={() => setShowModal(false)}
                />
            )}
            <Footer />
        </div>
    )
}

export default Order;