import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap.css';
import Footer from './components/design/footer.jsx';
import NavBar from './components/navbar/navbar.jsx';
import { BrowserRouter } from 'react-router-dom';
import Admin from './components/admin/admin.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
   <BrowserRouter>
   <NavBar/>
   

   <Footer /> 
   </BrowserRouter>
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

