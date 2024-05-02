import logo from './../images/logo.svg';
import './../App.css';
import './terms.css';
import Navi from '../common/navigation';
import Footer from '../common/footer';
// import React, { useState } from 'react';
import { useState, useRef } from 'react';

function App() {
// 체크박스 및 전체 동의 상태 관리
const [selectAllChecked, setSelectAllChecked] = useState(false);
const [isChecked1, setIsChecked1] = useState(false);
const [isChecked2, setIsChecked2] = useState(false);

// Ref 생성
const checkboxesRef = useRef([]);

// 체크박스 변경 핸들러
// 첫번째 체크박스
const handleCheckboxChange01 = (e) => {
    const { checked, id } = e.target;
   setIsChecked1(e.target.checked);

   if (e.target.checked && isChecked2) {
    // 두 체크박스가 모두 체크되었을 때 실행할 이벤트
    setSelectAllChecked(true);
  } else {
    setSelectAllChecked(false);
  }

};

// 두번째 체크박스
const handleCheckboxChange02 = (e) => {
    const { checked, id } = e.target;
    setIsChecked2(e.target.checked);
    if (e.target.checked && isChecked1) {
        // 두 체크박스가 모두 체크되었을 때 실행할 이벤트
        setSelectAllChecked(true);
      } else {
        setSelectAllChecked(false);
      }
    
};

// 전체 동의 체크박스 변경 핸들러
const handleSelectAllChange = (e) => {
    const { checked, id } = e.target;
    setSelectAllChecked(e.target.checked);

    if(e.target.checked){
        setIsChecked1(true);
        setIsChecked2(true);
    } else {
        setIsChecked1(false);
        setIsChecked2(false);
    };

};


  // 완료 버튼 클릭 핸들러
  const signUp = () => {
    if (selectAllChecked) {
      // 완료 버튼 클릭 시 처리할 내용
    } else {
      alert('모두 동의해주세요');
    }
  };

    return (
        <div>
            <Navi />
            
                <section>
      <div className="terms-box">
        <form>
          <h1 className="terms-title">약관 동의</h1>
          {/* 전체 동의 체크박스 */}
          <label>
            <input
              type="checkbox"
              id="all"
              value="select-all"
              className='terms-derc'
              checked={selectAllChecked}
              ref={(ref) => (checkboxesRef.current[0] = ref)} // Ref 설정
              onChange={handleSelectAllChange}
              
            />
             ??? 이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
          </label>
          <hr />
          {/* 첫번째 체크박스 및 약관 */}
          <div>
            <label className="terms-derc">
              <input
                type="checkbox"
                id="c1"
                className='terms-derc'
                checked={isChecked1}
                onChange={handleCheckboxChange01}
              />
              ??? 이용약관 동의(필수)
            </label>
            <div>
              <textarea 
            placeholder="제1조(목적)
            본 약관은 ???(이하 '갑'이라 한다)가 운영하는 인터넷 관련 서비스(이하 '서비스')라 한다)를 이용함에 있어 관리자와 이용자(이하 '회원'이라 한다)의 권리, 의무 책임사항을 규정함을 목적으로 한다.
            
            제 2조('갑'의 의무)
            1. '갑'은 계속적, 안정적으로 서비스를 제공할 수 있도록 최선의 노력을 다하여야합니다.
            
            2. '갑'은 항상 회원의 개인신상정보의 보안에 대하여 관리에 만전을 기함으로서 회원의 정보보안에 최선을 다하여야 합니다.
            
            제 3조('회원'의 의무)
            1. 회원은 관계법령, 이 약관의 규정, 이용안내 및 주의사항 등 '갑'이 통지하는 사항을 준수하여야하며, 기타 '갑'의 업무에 방해되는 행위를 하여서는 안됩니다.
            
            2. 회원은 '갑'의 사전 승낙없이 서비스를 이용하여 어떠한 영리 행위도 할 수 없습니다.
            
            3. 회원은 서비스를 이용하여 얻은 정보를 '갑'의 사전 승낙 없이 복사, 복제, 변경, 번역, 출판, 방송 기타의 방법으로 사용하거나 이를 타인에게 제공할 수 없습니다."
              readOnly>
                {/* 첫번쨰 체크박스 및 약관 */}
              </textarea>
            </div>
          </div>
          {/* 두번째 체크박스 및 약관 */}
          <div>
            <label className="terms-derc">
              <input
                type="checkbox"
                id="c2"
                className="terms-derc"
                checked={isChecked2}
                onChange={handleCheckboxChange02}
              />
              개인정보 수집 및 이용에 대한 안내(필수)
            </label>
            <div>
              <textarea 
                placeholder='제1 조 (이용계약 체결)
                1. 이용계약은 회원이 되고자 하는 자(이하 가입신청자)가 약관의 내용에 대하여 동의를 한 다음 회원가입신청을 하고 갑이 이러한 신청에 대하여 승낙함으로써 체결됩니다.
                
                2. 갑은 가입신청자의 신청에 대하여 서비스 이용을 승낙함을 원칙으로 합니다. 다만, 갑은 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.
                
                1) 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 단 갑의 회원 재가입 승낙을 얻은 경우에는 예외로 함.
                
                2) 실명이 아니거나 타인의 명의를 이용한 경우
                
                3) 허위의 정보를 기재하거나, 갑이 제시하는 내용을 기재하지 않은 경우
                
                4) 14세 미만 아동이 법정대리인(부모 등)의 동의를 얻지 아니한 경우
                
                5) 이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우
                
                3. 제1항에 따른 신청에 있어 갑은 회원의 종류에 따라 전문기관을 통한 실명확인 및 본인인증을 요청할 수
                
                4. 갑은 서비스관련설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습
                
                5. 제2항과 제4항에 따라 회원가입신청의 승낙을 하지 아니하거나 유보한 경우, 갑은 원칙적으로 이를 가입
                
                6. 이용계약의 성립 시기는 갑이 가입완료를 신청절차 상에서 표시한 시점으로 합니다.
                
                7. 갑은 회원에 대해 갑정책에 따라 등급별로 구분하여 이용시간, 이용횟수, 서비스 메뉴 등을 세분하여 이용에 차등을 둘 수 있습니다.'
              readOnly>
               
              </textarea>
            </div>
          </div>
          {/* 취소, 완료 버튼 */}
          <div className="btn-group">
            <a id="btn-reset">취소</a>
            <input
              id="btn-next"
              type="button"
              onClick={signUp}
              value="완료"
            />
          </div>
        </form>
      </div>
    </section>
  
            <Footer />
        </div>
    );    
}
export default App;
