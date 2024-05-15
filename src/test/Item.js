import React, { useState } from 'react';
import axios from 'axios';
import { ItemProvider, useItem } from '../common/contexts/TestContext';  // 경로가 정확한지 확인하세요.

function App() {
    return (
        <ItemProvider>
            <ItemDisplay />
        </ItemProvider> 
    );
}

function ItemDisplay() {
    const { item, error } = useItem();  // useItem에서 반환된 값을 구조 분해 할당
    const [inputData, setInputData] = useState('');

    const handleInputChange = (event) => {
        setInputData(event.target.value);
    };

    const handleSubmit = () => {
        const data = { userInput: inputData };
        axios.post('/api/item', data)
            .then(response => {
                console.log('Server response:', response);
                alert('Data sent successfully');
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    };

    return (
        <div>
            {item ? (
                <div>
                    <input 
                        type='text' 
                        value={inputData} 
                        onChange={handleInputChange} 
                        placeholder='Enter data here'
                    />
                    <button onClick={handleSubmit}>Send Data</button>
                    <h1>{item.name}</h1>
                    <p>{item.description}</p>
                    <p>{item.id}</p>
                </div>
            ) : error ? (
                <p>Error: {error}</p>  // 에러 메시지 추가
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default App;