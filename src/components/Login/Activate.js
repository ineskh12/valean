import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { authenticate, isAuth } from '../../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import './Activate.css'
import Popup from '../Popup/Popup'

var url = localStorage.getItem('url');      

const Activate = ({ match }) => {
  const [formData, setFormData] = useState({
    name: '',
    token: '',
    show: true
  });

  useEffect(() => {

    console.log(url)
    let token = match.params.token;

    console.log('hethaa howa match', match.params)

    let { name } = jwt.decode(token);

    console.log('hethaa howa name', name)


    if (token) {



      setFormData({ ...formData, name, token });


      console.log('hethaa howa formdata', formData)

    }

    console.log(token, name);

  }, [match.params, token]);

  const { name, token, show } = formData;

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post(`https://node-heroku-deployement-test.herokuapp.com/api/agencyCollection/activation`, {
        token
      })
      .then(res => {

        console.log(res)    // hethi bech nebni aleha controle de saisie

        setFormData({
          ...formData,
          show: false
        });
        console.log(res.data.message._id)
        console.log(url)

        axios.post('https://node-heroku-deployement-test.herokuapp.com/api/agencyCollection/setPhotoCloudinary/' + res.data.message._id, {
        
          url

        }).then(res => {

          console.log(res);

        }).catch(err => {

           console.log(err)
        })

        setMessage('Success activation ');
        setSuccess('Success')
        openModal();
      })
      .catch(err => {

        setErrors(err.response.data.errors);
        setSuccess('Failed')
        openModal()
      });
  };

  const [success, setSuccess] = useState('');


  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState('');


  const [modal, setModal] = useState(false);


  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
    setMessage('');
    setErrors('')
    setSuccess('')
  }


  return (
    <>
      <div className="body">
        {isAuth() ? <Redirect to='/' /> : null}


        <div className="cont animated  fadeInLeftBig">

          <div className="form sign-in" style={{ marginTop: '15%' }}>

            <h2 className='text-2xl xl:text-3xl font-extrabold' style={{ marginTop: '-10%' }}>
              Activate Account
            </h2>

            <button type="button" className="submit animated fadeInRightBig"
              onClick={(e) => handleSubmit(e)}>Activate Account</button>
          </div>

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

            </div>


          </div>
        </div>


      </div>



      <Popup openModal={openModal} closeModal={closeModal} modal={modal}
        errors={errors} message={message}
        success={success} />



    </>
  );
};

export default Activate;
