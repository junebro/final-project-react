import React, { createContext, useContext } from 'react';
import useFetchData from './useFetchData';  // 가정한 파일 경로, 실제 경로에 맞게 조정 필요

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
    const { data: product, error: productError, loading: productLoading } = useFetchData('http://localhost:8989/products/product');
    const { data: order, error: orderError, loading: orderLoading } = useFetchData('http://localhost:8989/order');

    // Error 상태와 Loading 상태를 합쳐서 관리
    const error = productError || orderError;
    const loading = productLoading || orderLoading;

    // Context 값을 제공하는 Provider 컴포넌트
    return (
        <ItemContext.Provider value={{ product, order, error, loading }}>
            {children}
        </ItemContext.Provider>
    );
};

export const useItem = () => useContext(ItemContext);