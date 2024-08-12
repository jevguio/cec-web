// src/App.jsx
import React, { useEffect, useState } from 'react';

function MainBody() {
    const [scrolling, setScrolling] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) { // You can adjust this value based on when you want the background to change
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className='mainBody'>
            <div className="video-container">
                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/ArHHjbdkZPU?autoplay=1&controls=0&mute=1&modestbranding=1&rel=0&loop=1&playlist=ArHHjbdkZPU"
                    title="Trailer"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen>
                </iframe>
                <div className="overlay">
                    <h1>Computer Studies Department</h1>
                    <h2>A Virtual Tour and Interactive Learning Experiences</h2>
                    <button>ENTER</button>
                </div>
            </div>


        </div>
    );
}

export default MainBody;
