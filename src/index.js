import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Ensure you import Provider
import { store } from './app/store'; // Import your Redux store
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css'; // Or your global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
