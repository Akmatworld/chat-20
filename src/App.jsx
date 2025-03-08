import { useEffect, useState, useRef } from 'react';

import { io } from 'socket.io-client';


const socket = io('http://192.168.0.105:8080'); // Подключаемся к серверу

import './App.css'

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [name, setName] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages((prev) => [...prev, msg]); // Добавляем новые сообщения в список
        });

        return () => socket.off('message'); // Очищаем слушатель при размонтировании
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (input.trim() && name.trim()) {
            socket.emit('message', { msg: input, name }); // Отправляем сообщение на сервер
            setInput('');
        }
    };

  return (
    <div className='wrapper'>
      <div className='chat-wrapper'>
        <div className='chat-messages'>
            <div className='message-text'>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                    >
                        <p className='author'>{msg.name}</p>
                        <p className='message-p'>{msg.msg}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div>
      </div>
    <div>
        <input
            className='name-input'
            type="text"
            placeholder='Your name'
            value={name} onChange={(e) => setName(e.target.value)}
        />
    </div>
      <div className='chat-textarea-block'>
          <input
              className='message-input'
              placeholder='Enter message...'
              type="text"
              value={input} onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  )
}

export default App
