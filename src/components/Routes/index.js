import React from 'react';
import {BrowserRouter as Router,Switch,Redirect,Route} from 'react-router-dom'
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Navbar from '../Navbar/Navbar';
import Carousel from './../Carousel/Carousel';
import Login from './../Login/Login';
import Contact from './../Contact/Contact';
import Activate from './../Login/Activate';
import ForgetPassword from './../ForgetPassword/ForgetPassword';
import Reset from './../Reset/Reset';
import Map from '../Map/Map'
import ConfirmReservation from './../Map/ConfirmReservation';


const index = () => {

    
    return (
 
        <Router>

             <Navbar/>

          <Switch>
              
              <Route path='/'         exact component={Home}/>
              <Route path='/about'   exact component={Carousel}/>
              <Route path='/Login' exact  component={Login}/>
              <Route path='/contact' exact  component={Contact}/>


              <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
              <Route path='/users/password/forget' exact render={props => <ForgetPassword {...props} />} />
              <Route path='/users/password/reset/:token' exact render={props => <Reset {...props} />} />
              <Route path='/reservation' exact render={props => <Map {...props} />} />
              <Route path='/reservation/confirm/:token/:idMachine' exact render={props => <ConfirmReservation {...props} />} />






              <Redirect to='/'/>                 

          </Switch>

          
        </Router>

       
    );
};

export default index;