import React from 'react';
import Navbar from '../Components/Navbar';
import Content from '../Components/Content';
import News from './News';
import Footer from './Footer';
import Topics from './Topics';

function Home() {
    return(
        <>
        <Navbar />
        <Content />
        <Topics />
        <News />
        <Footer/>
        </>
    )
}

export default Home;
