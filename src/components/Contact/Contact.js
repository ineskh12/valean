import React from 'react';
import Footer from '../Footer/Footer';

const Contact = () => {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 style={{color:'#15024f'}}>Contact</h2>
                        </div>
                        <div class="col-12">
                            <a href="">Accueil</a>
                            <a href="">Contact</a>
                        </div>
                    </div>
                </div>
            </div>


            <div className="contact">
                <div className="container">
                    <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
                        <p>Contact</p>
                        <h2>Laisser un message</h2>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-md-4 contact-item wow zoomIn" data-wow-delay="0.2s">
                                    <i className="fa fa-map-marker-alt"></i>
                                    <div className="contact-text">
                                        <h2>Adresse</h2>
                                        <p>Orange Digital Center, Lac1, Tunis, Tunisie</p>
                                    </div>
                                </div>
                                <div className="col-md-4 contact-item wow zoomIn" data-wow-delay="0.4s">
                                    <i className="fa fa-phone-alt"></i>
                                    <div className="contact-text">
                                        <h2>Info Contact</h2>
                                        <p>(+216) 53 081 159</p>
                                    </div>
                                </div>
                                <div className="col-md-4 contact-item wow zoomIn" data-wow-delay="0.6s">
                                    <i className="far fa-envelope"></i>
                                    <div className="contact-text">
                                        <h2>Email</h2>
                                        <p> vallean@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="contact-form">
                                <div id="success"></div>
                                <form name="sentMessage" id="contactForm" novalidate="novalidate">
                                    <div className="control-group">
                                        <input type="text" class="form-control" id="name" 
                                        placeholder="Votre nom" required="required" 
                                        data-validation-required-message="Please enter Votre nom" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <input type="email" class="form-control" id="email" 
                                        placeholder="Votre email" required="required" data-validation-required-message="Please enter Votre email" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <input type="text" class="form-control" id="subject" placeholder="Sujet" required="required" data-validation-required-message="Please enter a sujet" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <textarea className="form-control" id="message" placeholder="Taper votre message . . ." required="required" data-validation-required-message="Taper votre message . . ."></textarea>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div>
                                    <button className='s' style={{marginLeft:'37%'}} >Envoyer</button>    
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <br/>

           

          <Footer />


        </>


    );
};

export default Contact;
