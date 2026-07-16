import React from 'react'
import Home from './pages/Home'
import Gallery from './components/Gallery'
import Navbar from './components/Navbar'
import About from './components/About'
import Footer from './components/Footer'
// import Projects from './components/Projects' // Commented out to hide for now
import Contact from './components/Contact'

export default function App() {
  return (
    <div className='font-sora scroll-smooth overflow-x-hidden'>
      <Navbar />
      <Home />
      
      {/* 
        This wrapper is the missing link! 
        Giving it the ID "gallery" lets the navbar scroll directly here.
      */}
      <div id="gallery" className="pt-20">
        <Gallery />
      </div>
      
      <About />
      
      {/* <Projects /> */} {/* Commented out to hide for now */}
      
      <Contact />

      <Footer />
    </div>
  )
}