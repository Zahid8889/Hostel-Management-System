import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Navbar from './components/navbar.jsx';
import './bootstrap.css';
// import Intro from './components/homeIntro.jsx'
import Footer from './components/footer.jsx';
// import CollapsibleExample from './components/exam';
import NavBar from './components/navbar.jsx';
// import StaticExample from './components/exam';
import { BrowserRouter } from 'react-router-dom';
// import LoginStudent from './components1/LoginStudent';
import CardImage from './components/Card';
// import Carousel from './components/carousel';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
   <NavBar/>
   </BrowserRouter>
   {/* <CardImage/> */}
   {/* <Carousel/> */}
   <Footer />
   {/* <LoginStudent/> */}
  
   {/* <StaticExample/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

