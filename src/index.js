/**
 * Entry point của ứng dụng React.
 * Khởi tạo và render App component vào DOM.
 * 
 * Cách chạy:
 * 1. npm start - Chạy development server
 * 2. npm run build - Build production
 * 3. npm test - Chạy tests
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Theo dõi hiệu suất ứng dụng (Core Web Vitals)
// Có thể gửi dữ liệu đến analytics service
// Xem thêm: https://bit.ly/CRA-vitals
reportWebVitals();
