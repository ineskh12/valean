import React from 'react';
import './Carousel.css'
import Slider from "react-slick";
import Map from '../Map/Map';
import MapLeaf from './../Map/Map';
import Footer from './../Footer/Footer';


const Carousel = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    lazyLoad: true,
    autoplaySpeed: 2500,
  };



  //about us plus map localisation orange 

  return (
    <>

      <div className='slider1'>
        <Slider {...settings} >
          <div>
            <img className='parallaxx' src='https://res.cloudinary.com/orange112/image/upload/v1630674467/test/dghjkl_llzeua.jpg' />
          </div>
          <div>
            <img className='parallaxx' src='https://res.cloudinary.com/orange112/image/upload/v1630362859/test/v2r4bwoww31or3faftop.jpg' />
          </div>
          <div>
            <img className='parallaxx' src='https://img.20mn.fr/BOb3fWZuRPaNf1sJN39kXw/768x492_pollution-plastique-marine-80-origine-cotiere.jpg' />
          </div>

        </Slider>
      </div>

      <br />
      <br />

      <div className="about wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-6">
              <div className="about-img">
                <img src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" style={{ height: '450px' }} alt="Image" />
              </div>
            </div>
            <div className="col-lg-7 col-md-6">
              <div className="section-header text-left">
                <p> About Us</p>
                <h2></h2>
              </div>
              <div class="about-text">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id gravida condimentum, viverra quis sem.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id gravida condimentum, viverra quis sem. Curabitur non nisl nec nisi scelerisque maximus.
                </p>
                   
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* <div className="aboutus wow zoomIn" data-wow-delay="0.1s">
        <div className="container">
          <div className="section-header text-center">
            <p>Awesome Discount</p>
            <h2> <span></span> VALEAN TEAM</h2>
          </div>
          <div className="container discount-text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id gravida condimentum, viverra quis sem. Curabitur non nisl nec nisi scelerisque maximus.
            </p>
          </div>
        </div>
      </div> */}
{/* 

      <div className="mapLeaf wow zoomIn" data-wow-delay="0.1s">
        <MapLeaf />

      </div> */}
      <br/>

     
        <Footer />
    


    </>

  );
};

export default Carousel;
