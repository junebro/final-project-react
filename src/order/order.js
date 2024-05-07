import React, { useState } from 'react';
import './order.css'

import Navi from './../common/navigation';
import Footer from './../common/footer';

function Order() {

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

 
    return(
        <>
            <Navi />
            <form style={{backgroundColor:'white'}}> 
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
                <div class="form-group">
                    <label>핸드폰 번호:</label>
                    <div>
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
                <input type="radio" id="customer-select" name="customer-select" value="customer-select" />
                <label for="customer-select">주문자 정보와 동일</label>

                <div class="form-group">
                    <label>받는 분:</label>
                    <div>
                        <input className="order-test-text" type="text" id="buyerName" name="buyerName" value={formData.buyerName} onChange={handleChange} />
                    </div>
                </div>

                <div class="form-group">
                    <label>핸드폰 번호:</label>
                    <div>
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
            </form>
            <Footer />
        </>
    )
}

export default Order;