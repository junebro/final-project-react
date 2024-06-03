import React, { useState, useEffect, useRef } from 'react';
import './orders.css'

import Navi from '../common/navigation';  
import Footer from '../common/footer';

import PopupDom from '../member/popupDom';
import PopupDom01 from '../member/popupDom';

import PopupPostCode from '../member/PopupPostCode'; 
import PopupPostCode01 from '../member/PopupPostCode'; 

import { addressData } from '../member/PopupPostCode';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../common/contexts/AuthContext'; // 로그인 
import { ItemProvider, useItem } from '../common/contexts/OrderContext';

import PaymentModal from './PaymentModal';  


function App() {
    return (
        <ItemProvider>
            <Order/>
        </ItemProvider>
    );
  }

function Order() {

    const memberItem = useItem().item; // 전체 카트 목록을 가져옵니다.
    console.log(memberItem);
    const { user } = useAuth(); // useAuth 훅에서 user ID 가져오기
    const location = useLocation();
    const { cartItems } = location.state || {}; // state가 undefined일 경우를 대비한 기본값 설정
    // propr 값 합계 계산
    const totalPropr = cartItems ? cartItems.reduce((total, item) => total + item.propr * item.crtqt, 0) : 0;
    // 총 금액에 3000원 추가
    const finalAmount = totalPropr + 3000;
    let [data, setData] = useState('');
    let [data1, setData1] = useState('');

    // 클릭 이벤트에 대한 처리
    const handleClic1k = () => {
        setData('111');
        setData1('222');
    };

    const handleClic2k = () => {
        setData1('444');
    };

    useEffect(() => {
        if (data == '111' && data1 == '222') {
            setData(addressData);
        } else if (data1 == '444') {
            setData1(addressData);
        }
    }, [addressData]);

    // 팝업창 상태 관리
    const [isBuyerPopupOpen, setBuyerIsPopupOpen] = React.useState(false)
    const [isPopupOpen, setIsPopupOpen] = React.useState(false)

    // 팝업창 열기
    const openByerPostCode = () => {
        infoBuyer.current.addressPost.value = "";
        infoBuyer.current.address.value = "";
        infoBuyer.current.addressDetail.value = "";
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
    

    useEffect(() => {
        
        if (infoBuyer.current) {
            infoBuyer.current.addressPost.value = memberItem?.zonecode || "";
            infoBuyer.current.address.value = memberItem?.memAddress || "";
            infoBuyer.current.addressDetail.value = memberItem?.detailAddress || "";
        }
      }, [memberItem]); // memberItem.memAddress가 변경될 때마다 실행

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
    /* 모달 */
    const [orderDetails, setOrderDetails] = useState({
        memno: user,    // 고객 ID (고객 테이블과의 Foreign Key)
        totalAmount: finalAmount,   // 주문 총액
    });
    
    // 상품 정보를 모달에 보내기 위해
    const [cartDetails, setCartDetails] = useState(cartItems);
    const [orderData, setorderData] = useState({
        memno: user,            // 고객 ID (고객 테이블과의 Foreign Key)
        ordpr: finalAmount,     // 주문 총액
        ordst: '01'             // 주문 상태 01 : 결제 전, 02 : 결제 완료
    });

    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem('authToken');


    // 결제 버튼 클릭시 주문 테이블에 컬럼 생성
    const handlePaymentClick = () => {

        // if ( infoBuyer.current.name.value == "" || infoBuyer.current.addressPost.value == "" || infoBuyer.current.address.value == "" || infoBuyer.current.addressDetail.value == "" ) {
        //     alert("구매자 정보를 입력해 주세요.");
        //     return;
        // }

        // if ( infoReceiver.current.name.value == "" || infoReceiver.current.addressPost.value == "" || infoReceiver.current.address.value == "" || infoReceiver.current.addressDetail.value == "" ) {
        //     alert("받는사람 정보를 입력해 주세요.");
        //     return;
        // }
        
        // if (infoReceiver.current.phoneSecond.value == "" || infoReceiver.current.phoneThird.value == "") {
        //     alert("받는사람 핸드폰 번호를 입력해 주세요.")
        //     return;
        // }
           
        setorderData({
            ...orderData, // 이전 상태를 먼저 spread 연산자로 가져옵니다.
            ordnm: infoBuyer.current.name.value,
            ordzc: infoBuyer.current.addressPost.value,
            ordar: infoBuyer.current.address.value,
            orddar: infoBuyer.current.addressDetail.value,
            ordph: infoBuyer.current.phoneFirst.value + infoBuyer.current.phoneSecond.value + infoBuyer.current.phoneThird.value,
            ordbynm: infoReceiver.current.name.value,
            ordbyzc: infoReceiver.current.addressPost.value,
            ordbyar: infoReceiver.current.address.value,
            ordbydar: infoReceiver.current.addressDetail.value,
            ordbyph: infoReceiver.current.phoneFirst.value + infoReceiver.current.phoneSecond.value + infoReceiver.current.phoneThird.value
        });
       
        fetch('/orders/insertorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
            body: JSON.stringify(orderData)
            }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to create order');
            }
            }).then(order => {
                const loadedCartDetails = JSON.parse(localStorage.getItem('cartDetails'));
                //const loadedOrderDetails = JSON.parse(localStorage.getItem(order));
                localStorage.setItem('orderDetails', JSON.stringify(order)); 
                localStorage.setItem('cartDetails', JSON.stringify(cartDetails)); 

                // localStorage.setItem('cartDetails', JSON.stringify(cartDetails));
                // localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
                // 주문 생성이 완료되면 결제 시도
                setCartDetails(loadedCartDetails);
                setOrderDetails(order);
                setShowModal(true);
            }).catch(error => {
            console.error('Error creating order:', error);
        });
    }
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
                        <input className="order-test-text-test" placeholder="우편번호" ref={(el) => infoBuyer.current.addressPost = el}value={data.zonecode} />
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
                        <div style={{marginBottom:'10px', marginRight:'10px'}}>
                            <input id="road-name" className="order-adress-text" ref={(el) => infoBuyer.current.address = el} placeholder="도로명주소" value={data.address} />
                        </div>
                        <div style={{marginBottom:'10px'}}>
                            <input id="address-detail" className="order-adress-text" ref={(el) => infoBuyer.current.addressDetail = el} placeholder="상세주소" /> 
                        </div>
                    </div>
                </div>          

                <div className="phone-box">
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
                    <label className='order-customer-ck' for="customer-select" >주문자 정보와 동일</label>
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
                        <input className="order-test-text-test" placeholder="우편번호" ref={(el1) => infoReceiver.current.addressPost = el1} value={data1.zonecode} />
                        <button type="button" id="post-btn" className="post-btn"
                            onClick={openPostCode}>우편번호 찾기</button>
                        {/* // 팝업 생성 기준 div */}
                        <div id='PopupDom01' className='order-bottom-popupDom01'>
                            {isPopupOpen && (
                                <PopupDom01>
                                    <PopupPostCode01 onClose={closePostCode} />
                                </PopupDom01>
                            )}
                        </div>
                    </div>
                </div>

                <div className="order-adress">
                    <label className='order-adress-label'></label>
                    <div className='order-address-box'>
                        <div style={{marginBottom:'10px', marginRight:'10px'}}>
                            <input id="road-name" className="order-adress-text" ref={(el) => infoReceiver.current.address = el}  placeholder="도로명주소" value={data1.address} />
                        </div>
                        <div style={{marginBottom:'10px'}}>
                            <input id="address-detail" className="order-adress-text" ref={(el) => infoReceiver.current.addressDetail = el}  placeholder="상세주소" /> 
                        </div>
                    </div>
                </div>

                <div className="phone-box">
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
                
                {cartItems.map(product =>(
                    <div style={{textAlign:'center'}}>
                    <ul className="order-product-item">
                      <li><img className='order-product-image' src={require(`../images/products/${product.proimg}.jpg`)} alt={product.proimg}/></li>
                      <li>  
                        <div className='order-item-name'>
                          <div className='order-product-name'>{product.pronm}</div>
                          <div className='order-product-price'>{product.propr.toLocaleString()}원</div>
                        </div>
                      </li>
                      <li>
                        <div className='order-button'>
                          <span className='order-count-button'>{product.crtqt}</span>
                        </div>
                      </li>
                      <li>
                        <div className='order-calculate'>
                          <div className=''>{(product.propr * product.crtqt).toLocaleString()} 원</div>
                        </div>
                      </li>
                    </ul>
                    <div className='line'></div>
                  </div>
                ))}
                
                <div style={{marginTop:'30px'}} className='line-bold'></div>
                <h2 className="order-top-h2">결제 정보</h2>
                <div className='line' style={{marginTop:'10px', marginBottom:'30px'}}/>
                <div className="form-group-bottom">
                    <label className='order-payament-label'>상품 금액</label>
                    <a>{totalPropr.toLocaleString()}원</a>
                </div>
                <div className="form-group-bottom">
                    <label className='order-payament-label'>배송비</label>
                    <a>3,000원</a>
                </div>
                <div className="form-group-bottom">
                    <label className='order-payament-label'>총 금액</label>
                    <a>{finalAmount.toLocaleString()}원</a>
                </div>
              
                 <div style={{marginTop:'30px'}} className='line-bold'></div>
                <div className='payment-button-section'>
                    <button className='payment-button' type="button" onClick={handlePaymentClick}>결제 하기</button>
                </div>
            </form>
            {showModal && (
                <PaymentModal
                // orderDetails={orderDetails} cartDetails={cartDetails}
                closeModal={() => setShowModal(false)}
              />
            )}
            <Footer />
        </div>
    )
}

export default App;