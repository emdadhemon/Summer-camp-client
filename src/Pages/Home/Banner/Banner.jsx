import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import img1 from "../../../assets/1.jpg"
import img2 from "../../../assets/2.jpg"
import img3 from "../../../assets/3.jpg"


const Banner = () => {
    return (
        <div>
            <AwesomeSlider animation="cubeAnimation">
                <div data-src={img1}/>
                <div data-src={img2}/>
                <div data-src={img3}/>
            </AwesomeSlider>
        </div>
    );
};

export default Banner;