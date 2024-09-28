// app/page.tsx
"use client"; // Добавляем эту строку

import { useState } from 'react';

const HomePage = () => {
    const [link, setLink] = useState('');
    const [response, setResponse] = useState('');
    const [showButton, setShowButton] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value);
        setShowButton(e.target.value.length > 0);
    };

    const handleSubmit = async () => {
        const apiUrl = `https://zaaproject.vercel.app/api/fluxus?url=${encodeURIComponent(link)}`;
        
        try {
            const res = await fetch(apiUrl);
            if (res.ok) {
                const data = await res.json();
                setResponse(data.key || 'Нет данных.');
            } else {
                setResponse('Ошибка при обработке ссылки.');
            }
        } catch (error) {
            setResponse('Ошибка сервера.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Добро пожаловать</h1>
            <input
                type="text"
                placeholder="Введите ссылку"
                value={link}
                onChange={handleInputChange}
                style={{ width: '300px', marginBottom: '10px' }}
            />
            {showButton && (
                <button onClick={handleSubmit}>Отправить</button>
            )}
            <div style={{ marginTop: '20px' }}>
                <h2>Ответ от сервера:</h2>
                <p>{response}</p>
            </div>
        </div>
    );
};

export default HomePage;
