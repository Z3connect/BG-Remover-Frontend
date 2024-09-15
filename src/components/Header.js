import React from 'react';
import './css/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto/400.css';  
import '@fontsource/roboto/700.css';  
const Header = () => {
  return (
    <header className='container '>
        <h2>BG<span className="header-txt">Remover</span></h2>
    </header>
  )
}

export default Header