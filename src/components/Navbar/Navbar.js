import React, { useEffect, useState, useHistory } from 'react';
import WOW from "wowjs"
import jQuery from 'jquery';
import "./Navbar.css"
import { NavLink } from 'react-router-dom'
import { isAuth, removeCookie, removeLocalStorage } from './../../helpers/auth';
import axios from 'axios'

const Navbar = (history) => {



    (function ($) {
        "use strict";

        // Initiate the wowjs
        window.wow = new WOW.WOW({
            live: false
        });

        window.wow.init();

        // Back to top button
        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $('.back-to-top').fadeIn('slow');
            } else {
                $('.back-to-top').fadeOut('slow');
            }
        });
        $('.back-to-top').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
            return false;
        });


        // Sticky Navbar
        $(window).scroll(function () {
            if ($(this).scrollTop() > 0) {
                $('.navbar').addClass('nav-sticky');
            } else {
                $('.navbar').removeClass('nav-sticky');
            }
        });


    })(jQuery);

    const [isconnected, setIsConnected] = useState('Inactive');
    const [idConnectedUser, setidConnectedUser] = useState();
    const [colorIsConnected, setcolorIsConnected] = useState('bg-danger')
    const [logaout, setLogaout] = useState('Login');

    useEffect(() => {
 

        if(isAuth()){

            setLogaout('Sign Out'); 
            setidConnectedUser(isAuth()._id)
        }else{
            setLogaout('Login ') 
        }
      


    }, [isAuth,setLogaout,setidConnectedUser]);


    const handelLogaout = () => {

        console.log(logaout)
        console.log(idConnectedUser)

        if (logaout === 'Sign Out') {

            removeLocalStorage('user');
            removeCookie('token');

            axios.patch('https://node-heroku-deployement-test.herokuapp.com/api/agencyCollection/updateIsConnected/' + idConnectedUser, {

                isconnected: isconnected,
                colorIsConnected: colorIsConnected

            }).then((res) => {

                console.log(res);

               // localStorage.setItem('isConnected', isconnected);
               // localStorage.setItem('colorIsConnected', colorIsConnected);
            }).catch((err) => console.log(err))

        }

        

    }

    return (

        <>
            <div className="top-bar d-none d-md-block" style={{backgroundColor:'#035a80'}}>
                <div className="container-fluid" >
                    <div className="row" >
                        <div className="col-md-8">
                            <div className="top-bar-left">
                                <div className="text">
                                    <i className="far fa-clock"></i>
                                    <h2>8:00 - 18:00</h2>
                                </div>
                                <div className="text">
                                    <i className="fa fa-phone-alt"></i>
                                    <h2>+216 53 081 159</h2>
                                    <p> Appointment</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="top-bar-right">
                                <div className="social">
                                    <a href=""><i class="fab fa-twitter"></i></a>
                                    <a href=""><i class="fab fa-facebook-f"></i></a>
                                    <a href=""><i class="fab fa-linkedin-in"></i></a>
                                    <a href=""><i class="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="navbar navbar-expand-lg  navbar-dark" style={{backgroundColor:'#035a80'}}>
        
                <div className="container-fluid">
     
               
                <img src='https://res.cloudinary.com/orange112/image/upload/v1630672770/test/logo_blanc_of625r.png' 
        style={{width:'120px',marginLeft:'-50px'}}/>
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div className="navbar-nav ml-auto">



                            <NavLink exact to='/' onClick={() =>   window.scrollTo(0, 0)} className="nav-item nav-link active">Accueil


                            </NavLink>
                            {/* <NavLink exact to='/about' className="nav-item nav-link">A propos de nous


                            </NavLink> */}
                            <NavLink exact to='/service'  onClick={() =>   window.scrollTo(500, 2200)} className="nav-item nav-link" >Services


                            </NavLink>

                            <NavLink exact to='/login' className="nav-item nav-link "
                                onClick={handelLogaout}>{logaout}


                            </NavLink>

                            <NavLink exact to='/contact' className="nav-item nav-link">Contact


                            </NavLink>
                        </div>
                    </div>
                </div>

            </div>



        </>
    );
};

export default Navbar;
