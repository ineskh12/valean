import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import './ConfirmReservation.css'
import Popup from '../Popup/Popup'
import { isAuth } from '../../helpers/auth';

const ConfirmReservation = ({ match }) => {

  const [formData, setFormData] = useState({
    messag: '',
    token: '',
    show: true
  });


  const [idMachine, setIdMachine] = useState('');

  useEffect(() => {

    //console.log('aaaaaa ', match.params)

    let token = match.params.token;

    // console.log('hethaa howa match', match.params);

    setIdMachine(match.params.idMachine);

    //console.log(idMachine)

    let { name, duration, typeOfRenting, phoneNumber, city, email } = jwt.decode(token);

    console.log('hethaa howa name', typeOfRenting)


    if (token) {

      setFormData({ ...formData, name, token, duration, typeOfRenting, phoneNumber, city, email });


      console.log('hethaa howa formdata', formData)

    }

    //console.log(token, name);

  }, [match.params, idMachine]);



  const { name, token, show } = formData;



  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`https://node-heroku-deployement-test.herokuapp.com/api/agencyCollection/confirmReservation`, {
        token
      })
      .then(res => {

        console.log(res)

        setFormData({
          ...formData,
          show: false
        });

        axios({

          method: 'patch',
          url: `https://node-heroku-deployement-test.herokuapp.com/api/agencyCollection/addReservationToMachine/` + idMachine,
          data: {
            id: res.data.message._id, name: res.data.message.name, reserved: res.data.message.reserved,

          }
        })
          .then((res) => {

            console.log(res)
          })
          .catch((err) => console.log(err));


        axios({

          method: 'patch',
          url: `https://node-heroku-deployement-test.herokuapp.com/api/agencyCollection/addTrashToMachine/` + idMachine,
          data: { id: "612566d0f614d84a4427bc14", location: "", state: "Empty", quantity: 0 }
        })
          .then((res) => {

            console.log(res)
          })
          .catch((err) => console.log(err));

        console.log(isAuth()._id)
        console.log(idMachine);

        axios({

          method: 'patch',
          url: `https://node-heroku-deployement-test.herokuapp.com/api/agencyCollection/addMachineToAgency/` + isAuth()._id,
          data: { idMachine }
        })
          .then((res) => {

            console.log(res)
          })
          .catch((err) => console.log(err));


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


        <div className="cont animated  fadeInLeftBig">

          <div className="form sign-in" style={{ marginTop: '15%' }}>

            <h2 className='text-2xl xl:text-3xl font-extrabold' style={{ marginTop: '-10%' }}>
              Confirm reservation
            </h2>

            <button type="button" className="submit animated fadeInRightBig"
              onClick={(e) => handleSubmit(e)}>Confirm reservation</button>
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

export default ConfirmReservation;
