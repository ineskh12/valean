import React, { useState, useEffect } from 'react';
import Popup from '../Popup/Popup';
import axios from 'axios';


const Reset = ({ match }) => {

    const [formData, setFormData] = useState({
        password1: '',
        password2: '',
        token: '',
        textChange: 'Submit'
    });

    const { password1, password2, textChange, token } = formData;

    useEffect(() => {

        let token = match.params.token

        if (token) {
            setFormData({ ...formData, token, })

            console.log(token, formData)
        }

    }, [])

    const handleChange = text => e => {

        setFormData({ ...formData, [text]: e.target.value });

        console.log(formData)

    };


    const handleSubmit = e => {

        console.log(password1, password2)

        e.preventDefault();

        if ((password1 === password2) && password1 && password2) {

            setFormData({ ...formData, textChange: 'Submitting' });

            console.log('hetha form data ', formData)

            axios
                .put(`https://node-heroku-deployement-test.herokuapp.com/api/agencyCollection/resetpassword`, {

                    newPassword: password1,
                    resetPasswordLink: token

                })
                .then(res => {
                    console.log(res.data.message)
                    setFormData({
                        ...formData,
                        password1: '',
                        password2: ''
                    });
                    //toast.success(res.data.message);
                    setMessage(res.data.message);
                    setSuccess('Success')
                    openModal();

                })
                .catch(err => {
                    // toast.error('Something is wrong try again');
                    setErrors('Something is wrong try again');
                    setSuccess('Failed')
                    openModal();

                });
        } else {
            // toast.error('Passwords don\'t matches');
            setErrors('Passwords don\'t matches');
            setSuccess('Failed')
            openModal()
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
                            Reset Your Password
                        </h2>

                        <form
                            className='mx-auto max-w-xs relative '
                            onSubmit={handleSubmit}
                        >
                            <label>
                                <span>Password</span>
                                <input type="password"
                                    onChange={handleChange('password1')}
                                    value={password1} />
                            </label>

                            <label>
                                <span>Confirm password</span>
                                <input type="password"
                                    onChange={handleChange('password2')}
                                    value={password2} />
                            </label>
                            <button type="submit" className="submit animated fadeInRightBig"
                            >Submit</button>
                        </form>
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

export default Reset;
