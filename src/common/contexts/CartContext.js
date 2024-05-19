//ProductsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductsContext = createContext({ item: null, error: null });

export const ItemProvider = ({ children }) => {
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8989/cart/cartselect/3')
            .then(response => {
                if (!response.ok) {  // 응답 상태 확인
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setItem(data))  // 데이터를 상태에 설정
            .catch(err => setError(err.message));  // 에러를 상태에 설정
    }, []);

    return (
        <ProductsContext.Provider value={{ item, error }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useItem = () => useContext(ProductsContext);