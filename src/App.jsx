import { useEffect, useState } from 'react';

import { io } from 'socket.io-client';

const socket = io('http://192.168.0.119:8080'); // Подключаемся к серверу

import './App.css'

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages((prev) => [...prev, msg]); // Добавляем новые сообщения в список
        });

        return () => socket.off('message'); // Очищаем слушатель при размонтировании
    }, []);

    const sendMessage = () => {
        if (input.trim()) {
            socket.emit('message', input); // Отправляем сообщение на сервер
            setInput('');
        }
    };

  return (
    <div className='wrapper'>
      <div className='chat-wrapper'>
        <div className='chat-messages'>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
        </div>
      </div>
      <div className='chat-textarea-block'>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  )
}

export default App
