import React from "react";

const Alert = () => {
    return (
      <>
        <div className='top-[60px] absolute w-[230px] text-center font-[Pretendard] text-black bg-white rounded-lg'>
        <ul>
          <li className='m-5 mx-10 rounded-[50px] bg-slate-300'>2024.01.01</li>
          <li className='mt-2 mx-5 text-left '>알림 내용</li>
        </ul>
        <hr />
        <ul>
          <li className='mt-3 mx-10 rounded-[50px] bg-slate-300'>2024.01.02</li>
          <li className='mt-2 mx-5 text-left '>알림 내용</li>
        </ul>
        <hr />
  
        <ul>
          <li className='mt-3 mx-10 rounded-[50px] bg-slate-300'>2024.01.03</li>
          <li className='mt-2 mx-5 text-left '>알림 내용</li>
        </ul>
      </div>
      </>
      
    )
  }