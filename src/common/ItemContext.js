import React, { createContext, useContext, useState, useEffect } from 'react';

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
    const [item, setItem] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8989/api/item')
            .then(response => response.json())
            .then(data => setItem(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <ItemContext.Provider value={item}>
            {children}
        </ItemContext.Provider>
    );
};

export const useItem = () => useContext(ItemContext);