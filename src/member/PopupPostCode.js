import React from 'react';
import DaumPostcode from "react-daum-postcode";
 
export let addressData;

const PopupPostCode = (props) => {

	// 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)
        addressData = data;
        props.onClose()
    }
 
    const postCodeStyle = {
        display: 'block',
        // position: "absolute",
        border: '1px solid black',
        // right: "30%",
        width: '410px',
        height: '470px',
        
      };

      const xBtnStyle = {
        border: 'none',
        backgroundColor: 'white',
        cursor: 'pointer',
        height: '20px',
        marginBottom: '10px'
      };
 
      const sortStyle = {
        display: "flex"
      };

    return(
        <div style={sortStyle}>
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
            <button type="button" style={xBtnStyle} onClick={() => {props.onClose()}} className='postCode_btn'><img src={require("./../images/member/xBtn.png")} alt="xBtn" /></button>
        </div>
    )
}
 
export default PopupPostCode;