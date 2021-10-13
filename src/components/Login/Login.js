import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../../helpers/auth';
import { Link, Redirect, useHistory, NavLink, Route } from 'react-router-dom';
import './Login.css'
import Popup from '../Popup/Popup';
import SignUp from '../Sign Up/SignUp';
import { GoogleLogin } from 'react-google-login';


const Login = (navigation ) => {


  const [click, setClick] = useState(false);

  useEffect(() => {


    if (!click) {

      document.querySelector('.img__btn').addEventListener('click', function () {

        document.querySelector('.cont').classList.toggle('s--signup');
      });

    }
    setClick(true);
  }, [click]);

  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    textChange: 'Sign In'
  });

  const { email, password1, textChange } = formData;

  const handleChange = text => e => {

    //console.log(e.target.value)

    setFormData({ ...formData, [text]: e.target.value });

    console.log(formData)
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (email === 'valean@orange.com' && password1 === 'admin123') {  // admin

      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .post(`https://node-heroku-deployement-test.herokuapp.com/api/agencyCollection/loginAdmin`, {
          email,
          password: password1
        })
        .then(res => {
          console.log(res.data.user)
          setFormData({
            ...formData,
            email: '',
            password1: '',
            textChange: 'Submitted'
          });

          localStorage.setItem('UserAdmin', JSON.stringify(res.data.user));

          console.log(res.data.user.role)

          res.data.user.role !== 'Admin' ?
            history.push('/login')
            :window.location.href='https://ayarinho.github.io/Valean-Dashboard';

          return true;

        })
        .catch(err => {
          console.log(err)
        })

    }

    else if(email && password1){
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .post(`https://node-heroku-deployement-test.herokuapp.com/api/agencyCollection/login`, {
          email,
          password: password1
        })
        .then(res => {
          authenticate(res, () => {  // juste pour passer les donners en cookie et localstorage
            setFormData({
              ...formData,
              email: '',
              password1: '',
              textChange: 'Submitted'
            });

            console.log('isAuth ', isAuth());

            isAuth() && isAuth().role === 'Etatique' || 'Prive'
              ? history.push('/')
              : history.push('/login'); history.go(0);
          });
        })
        .catch(err => {
          setFormData({
            ...formData,
            email: '',
            password1: '',
            textChange: 'Sign In'
          });

          if (err.response.data.errors !== '') {

            setErrors(err.response.data.errors);
            setSuccess('Failed')
            openModal();

          } else setErrors('')

          console.log(err.response.data.errors);

        });
    }

    else   {

      setErrors('Empty fields')
      setSuccess('Failed')


      openModal()
    }



  };

  const history = useHistory();

  const [errors, setErrors] = useState('');

  const [success, setSuccess] = useState('');


  const [modal, setModal] = useState(false);


  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
    setErrors('');
    setSuccess('');

  }

  /**googlellllllllllllllllllllllllllllllllllllllllllllllllllllle */

  const sendGoogleToken = tokenId => {
    axios
      .post(`https://node-heroku-deployement-test.herokuapp.com/api/agencyCollection/googlelogin`, {
        idToken: tokenId
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
      });
  };

  const informParent = response => {
    authenticate(response, () => {
      isAuth() && isAuth().role === 'admin'
        ? history.push('/admin')
        : history.push('/'); history.go(0);
    });
  };

  const responseGoogle = response => {
    console.log('hethyyy reponse google ', response);
    sendGoogleToken(response.tokenId);
  };





  return (

    <>
      <div className="body">
        {isAuth() ? <Redirect to='/' /> : null}


        <div className="cont animated  fadeInLeftBig">

          <form onSubmit={handleSubmit}>
            <div className="form sign-in">
              <label>
                <span>Email</span>
                <input type="email"
                  onChange={handleChange('email')}
                  value={email} />
              </label>
              <label>
                <span>Password</span>
                <input type="password"
                  onChange={handleChange('password1')}
                  value={password1} />
              </label>
              <p className="forgot-pass" onClick={() => history.push('/users/password/forget')} >Forgot password?</p>


              <button className="submit animated fadeInRightBig" style={{backgroundColor:'#035a80'}} >{textChange}</button>

              {/*<a href='http://localhost:3002/dashboard/app'>kkkkkkkkkkkkkk</a>*/}

              <GoogleLogin
                clientId={`1066963125110-5lqsn5cq92l2uepl6sua10tfgn0ueb14.apps.googleusercontent.com`}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="fb-btn animated fadeInRightBig"
                  >

                    <span className='ml-4'>Sign In with Google</span>
                  </button>
                )}
              ></GoogleLogin>


            </div>
          </form>



          <div className="sub-cont">
            <div className="img">
              <div className="img__text m--up">
                <h2>Valean machines</h2>
                <p>Sign up and discover great amount of new opportunities!</p>
              </div>
              <div className="img__text m--in">
                <h2>One of us?</h2>
                <p>If you already has an account, just sign in. We've missed you!</p>
              </div>
              <div className="img__btn">
                <span className="m--up" >Sign Up</span>
                <span className="m--in">Sign In</span>
              </div>
            </div>


            <SignUp />

          </div>
        </div>
      </div>
 

      <Popup openModal={openModal} closeModal={closeModal} modal={modal} errors={errors} success={success} />

    </>
  );
};

export default Login;
