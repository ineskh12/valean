import React, { useState, useEffect } from 'react';
import Footer from './../Footer/Footer';
import { isAuth } from './../../helpers/auth';
import axios from 'axios'

import logo from './acc.jpg';
import vl from './vl.png';
import ines from './all precomp.mp4';
import bou from './resume.jpg';
import ali from './02_Product_Item_2.mp4';
import './Home.css'
import { NotificationContainer, NotificationManager } from 'react-notifications';

const Home = ({ history }) => {


    const [isconnected, setIsConnected] = useState('Active');
    const [colorIsConnected, setcolorIsConnected] = useState('bg-green')


    useEffect(() => {



        const speech = new SpeechSynthesisUtterance();

        //speech.text =
          //  "welcome ines";
       // window.speechSynthesis.speak(speech);


        console.log(isAuth());

        if (isAuth()) {

            axios.patch('http://localhost:5000/api/agencyCollection/updateIsConnected/' + isAuth()._id, {

                isconnected: isconnected,
                colorIsConnected: colorIsConnected

            }).then((res) => {

                console.log(res);


            }).catch((err) => console.log(err))

        }


    }, [isAuth()])




    return (

        <>

            <div className="banner">
            <img src={logo} alt="Logo" width="100%"  height="100%"/>
                



{/* 
                <video src='https://res.cloudinary.com/orange112/video/upload/v1630664643/test/Final_aif2gi.mp4' autoPlay muted loop>


                </video>   */}


              

                {/* <section>
                    <div class="scrolldown">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </section> */}
                <h2 className="c" >Chasseur de plastiques ! </h2>

                <button className='b' onClick={() => {window.location.href='https://www.youtube.com/watch?v=4ibZw3nCvTc&ab_channel=zeinebsahli'}} > <i class="fas fa-play"></i>  &nbsp; &nbsp; Play</button> 

                <NotificationContainer />


            </div>

            <div className="about wow fadeInUp" data-wow-delay="0.1s" style={{ marginTop: '-6%' }}>
                <div className="container">
                    <div className="row align-items-center">
                       
                        <div className="col-lg-6 col-md-6" style={{   marginTop: '10%' }} >
                            <div className="section-header text-left">
                                <h2> Vallean</h2>
                            </div>
                            <div class="about-text">
                                <p>
                                La premi??re solution ??volutive qui intercepte les d??chets plastiques dans les rivi??res et cours d???eau avant qu'ils n'atteignent les oc??ans. 
                                
                                </p>
                                <p>
                                Chaque ann??e, des milliers de tonnes de plastiques sont jet??s dans les rivi??res et les cours d???eau et finissent dans les mers et oc??ans. 
                               VALLEAN est un syst??me de filtrage autonome install?? dans les embouchures pour capturer les d??chets plastiques flottants.  


 

                                </p>
                                <p>
                                
                                Il s???agit d???un tapis roulant qui collecte les particules flottantes sur la surface d???eau, les identifie et les trie gr??ce ?? un syst??me bas?? sur l'Intelligence Artificielle. Les d??chets plastiques seront stock??s dans des r??servoirs et ensuite r??cup??r??s par les centres de collecte. Le reste des mati??res sera remis dans l???eau. 

                                </p><p>
                                
                                Finalement, un r??seau de machines VALLEAN sera disponible via un site web pour suivre l?????tat de remplissage des r??servoirs et afficher les indicateurs des diff??rentes unit??s. 

                                </p>
                                </div>
                        </div>


                        <div className="col-lg-5 col-md-6">
                            <div className="about-img">
                            <img src={vl} alt="vl"  style={{  width: '600px',marginLeft:'10%', marginTop: '30%' }} />
                               
                            </div>
                        </div>

                       
                    </div>
                </div>
            </div>




            {/* <div className="discount wow zoomIn" data-wow-delay="0.1s" style={{ marginTop: "-10%" }}>
                <div className="container">
                    <div className="section-header text-center">
                        <p>Awesome Discount</p>
                        <h2>Get <span>30%</span> Discount for first-time buyers</h2>
                    </div>
                    <div className="container discount-text">
                        <p>
                            Because we are keen on ridding Tunisia of water pollution we are giving you the best offer!
                            Choose today where you want to rent our machines and get a discount of 30% on the first month's rent!
                        </p>
                    </div>
                </div>
            </div> */}




            <div className="service">
                <div className="container">
                <video width="100%"  controls autoPlay loop muted  >
      <source   src={ali} type="video/mp4"/>
     </video>
                    <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
                   
                        <h2>Nos Services</h2>
                        <br/>
                        NOUS D??VELOPPONS???DES SOLUTIONS INNOVANTES POUR R??DUIRE LE PLASTIQUE DANS LES MERS! 

                    </div>
                    <div className="row">
                    <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0.s">
                            <div className="service-item ">
                                <img src='Waste filtring.png'
                                    style={{ width: '80px' }} /> <br /> <br />
                                <h3>Filtrage des d??chets:</h3>
                                <p>
                                La machine assure le tri et le filtrage des d??chets. Gr??ce ?? un syst??me d???Intelligence Artificielle, elle permet d???identifier le plastique</p>
                                <br/>
                                
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0.0s">
                            <div className="service-item">

                                
                                 <img src='Machine maintenance.png'
                                    style={{ width: '70px' }} /> <br /> <br />
                                <h3>Tableau de bord en temps r??el</h3>
                                <p>
                              
                                Vous pouvez suivre les machines ?? distance et avoir des statistiques en temps r??el sur les d??chets collect??s et le taux de remplissage des r??servoirs 
                                </p>
                                <br/>
                            </div>
                        </div>
                       
                        <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="1s">
                            <div className="service-item">
                                <img src='Transporting the collected waste.png'
                                    style={{ width: '150px' }} /> <br /> <br />
                                <h3>Transport des d??chets</h3>
                                <p>  
                                Nous assurons le transport des d??chets vers les centres de collecte et de recyclage

                                </p>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
                            <div class="service-item">
                            <img src='Machine setting.png'
                                    style={{ width: '70px' }} /> 
                                <h3>Maintenance des machines: </h3>
                                <p>
                                Nous assurons la maintenance des machines Vallean 
                                </p>
                                <br/>
                             </div>
                        </div>
                     
                      
                    </div>
                </div>
            </div>







            <div className="price">
                <div className="container">
                    <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
                        <p>Suivi des machines</p>
                        <h2>Dashboard</h2>
                    </div>
                    <div className="row" >
                    <video width="100%"  autoPlay loop muted  >
      <source   src={ines} type="video/mp4"/>
     </video>
                   
                    </div>
                </div>
            </div>




            <div class="team">
                <div class="container">
                    <div class="section-header text-center wow zoomIn" data-wow-delay="0.1s">

                        <h2>VALEAN TEAM</h2>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.0s">
                            <div class="team-item">
                                <div class="team-img">
                                    <img   width="200px"  height="300px" src="https://res.cloudinary.com/orange112/image/upload/v1631710372/test/67305410_2048919532084638_4215733249697120256_n_s2igis.jpg" alt="Image" />
                                    <div class="team-social">
                                        <a href=""><i class="fab fa-twitter"></i></a>
                                        <a href=""><i class="fab fa-facebook-f"></i></a>
                                        <a href=""><i class="fab fa-linkedin-in"></i></a>
                                        <a href=""><i class="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                                <div class="team-text">
                                    <h2>Ayari Youssef</h2>
                                    <p>Web Developer</p>
                                    <br/>
                                </div>
                               
                                
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.4s">
                            <div class="team-item">
                                <div class="team-img">
                                    <img  width="200px"  height="300px" src="https://res.cloudinary.com/orange112/image/upload/v1633074021/test/s_o4iqbt.jpg" alt="Image" />
                                    <div class="team-social">
                                        <a href=""><i class="fab fa-twitter"></i></a>
                                        <a href=""><i class="fab fa-facebook-f"></i></a>
                                        <a href=""><i class="fab fa-linkedin-in"></i></a>
                                        <a href=""><i class="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                                <div class="team-text">
                                    <h2>Sahli Zeineb</h2>
                                    <p> UX/UI Designer</p>
                                    <br/>
                                    
                                </div>
                                
                               
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.0s">
                            <div class="team-item">
                                <div class="team-img">
                                    <img   width="200px"  height="300px"src="https://res.cloudinary.com/orange112/image/upload/v1633073990/test/m_zpfzbd.jpg" alt="Image" />
                                    <div class="team-social">
                                        <a href=""><i class="fab fa-twitter"></i></a>
                                        <a href=""><i class="fab fa-facebook-f"></i></a>
                                        <a href=""><i class="fab fa-linkedin-in"></i></a>
                                        <a href=""><i class="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                                <div class="team-text">
                                    <h2>Kaaniche Marouene</h2>
                                    <p>Embedded systems engineer </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.0s">
                            <div class="team-item">
                                <div class="team-img">
                                    <img width="200px"  height="300px" src={bou} alt="bou" />
                                    <div class="team-social">
                                        <a href=""><i class="fab fa-twitter"></i></a>
                                        <a href=""><i class="fab fa-facebook-f"></i></a>
                                        <a href=""><i class="fab fa-linkedin-in"></i></a>
                                        <a href=""><i class="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                                <div class="team-text">
                                    <h2>Bouthaina diari</h2>
                                    <p>Machine learning engineer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <Footer />


          
        </>
    );
};

export default Home;
