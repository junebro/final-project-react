import ReactDom from 'react-dom';
 
const PopupDom = ({ children }) => {

    let el = document.getElementById('popupDom'); // 초기 값을 설정
    
    return ReactDom.createPortal(children, el);

};
 
export default PopupDom;