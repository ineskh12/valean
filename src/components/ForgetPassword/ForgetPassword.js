import React, { useState } from 'react';
import axios from 'axios';
import Popup from '../../components/Popup/Popup'

const ForgetPassword = ({ history }) => {

    const [formData, setFormData] = useState({
        email: '',
        textChange: 'Submit'
    });

    const { email, textChange } = formData;

    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });

        console.log('hetha e.target ', e.target.value)

    };

    const handleSubmit = e => {
        e.preventDefault();
        if (email) {
            setFormData({ ...formData, textChange: 'Submitting' });
            axios
                .put(`https://node-heroku-deployement-test.herokuapp.com/api/agencyCollection/forgotpassword`, {
                    email
                })
                .then(res => {

                    setFormData({
                        ...formData,
                        email: '',
                    });
                    setMessage('Please check your email');
                    setSuccess('Success')
                    openModal();

                })
                .catch(err => {

                    //console.log(err.response)

                    setErrors(err.response);
                    setSuccess('Failed')
                    openModal();

                });
        } else {

            setErrors('Please fill all fields');
            setSuccess('Failed')
            openModal();
        }
    };


    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState('');


    const [errors, setErrors] = useState('');


    const [modal, setModal] = useState(false);


    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
        setErrors('');
        setMessage('')
    }


    return (
        <>



            <div className="body">

                <div className="cont animated  fadeInLeftBig" >

                    <div className="form sign-in" style={{ marginTop: '10%' }}>
                        <h2 className='text-2xl xl:text-3xl font-extrabold' style={{ marginTop: '-10%' }}>
                            Forget Password
                        </h2>
                        <label>
                            <span>Email</span>
                            <input type="email"
                                onChange={handleChange('email')}
                                value={email} />
                        </label>
                        <button type="button" className="submit animated fadeInRightBig"
                            onClick={(e) => handleSubmit(e)}>Submit</button>
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

export default ForgetPassword;
