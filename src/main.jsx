import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // veya Routes tanımı
import '../index.css';     // Tailwind / global stiller

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />  // Uygulamanın tamamını başlatır
    </React.StrictMode>
);

