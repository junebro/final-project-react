import React, { createContext, useContext, useState, useEffect } from 'react';

const ItemContext = createContext({ item: null, error: null });

export const ItemProvider = ({ children }) => {
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8989/api/item')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setItem(data))
            .catch(err => setError(err.message));
    }, []);

    return (
        <ItemContext.Provider value={{ item, error }}>
            {children}
        </ItemContext.Provider>
    );
};

export const useItem = () => useContext(ItemContext);