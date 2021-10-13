import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Popup from '../Popup/Popup';
import './SignUp.css'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '290px',
        marginLeft: '-2%'
    },
}));


const SignUp = () => {

    const [formData1, setFormData1] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        logo: '',
        role: '',
        address: '',
        phoneNumber: '',
        textChange1: 'Sign Up'

    });



    const { name, email, password, password2, address, phoneNumber, role, logo, textChange1 } = formData1;


    const handleChange1 = text => e => {

        setFormData1({ ...formData1, [text]: e.target.value });

    };





    const handleSubmit = async (e) => {


        e.preventDefault();

        if (name && email && password) {

            if (password === password2) {            // nziid controle de saisie mtaa phone number

                setFormData1({ ...formData1, textChange1: 'Submitting' });


                await axios
                    .post(`https://node-heroku-deployement-test.herokuapp.com/api/agencyCollection/register`, {
                        name,
                        email,
                        password,
                        address,
                        phoneNumber,
                        role,
                        logo
                    })
                    .then(res => {

                        setFormData1({
                            ...formData1,
                            name: '',
                            email: '',
                            address: '',
                            phoneNumber: '',
                            logo: '',
                            role: '',
                            password: '',
                            password2: '',
                            textChange: 'Submitted'
                        });

                        setMessage(res.data.message)
                        setSuccess('Success');

                        const data = new FormData();      // object de javascript  pour mettre notre image et des information qui on va passer

                        //data.append("name", file.name);
                        // data.append('userId',userData._id);
                        data.append('photo', file);

                        console.log('ayarosssss ', file)


                        if (data) {

                            axios.post(`https://node-heroku-deployement-test.herokuapp.com/api/agencyCollection/upload1`, data)
                                .then((res) => {

                                    setUrl(res.data.result.url);
                                    

                                    console.log("ahawa data hachti biih ", res.data.result.url);
                                    console.log(url)
                                    localStorage.setItem('url',res.data.result.url)

                                }).catch((err) => {

                                    console.log(err)
                                })

                        }
                        openModal();
                        console.log(res.data)


                    })
                    .catch(err => {
                        setFormData1({
                            ...formData1,
                            name: '',
                            email: '',
                            address: '',
                            phoneNumber: '',
                            logo: '',
                            role: '',
                            password: '',
                            password2: '',
                            textChange: 'Sign Up'
                        });
                        console.log(err.response.data.errors);


                        if (err.response.data.errors !== '') {

                            setErrors(err.response.data.errors);
                            setSuccess('Failed');
                            openModal();

                        } else setErrors('')

                        console.log(err.response.data.errors);



                    });

            } else {

                setErrors("Password don 't match");
                setSuccess('Failed')
                openModal();
            }

        } else {
            setErrors('Empty fields');
            setSuccess('Failed')

            openModal();
        }
    };


    const [url, setUrl] = useState('');
    const [file, setFile] = useState();

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


    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleChange = (e) => {


        setFormData1({ ...formData1, role: e.target.value });


    };

    useEffect(() => {

        console.log(file)

        if (role) {

            console.log(role);

            console.log(formData1)
        }

        if (file) {

            setFormData1({ ...formData1, logo: file.name });
            console.log(formData1)


        }

    }, [role, file])

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };


    /*const handelPicture = (e) => {

        e.preventDefault()

        const data = new FormData();      // object de javascript  pour mettre notre image et des information qui on va passer

        data.append('photo', file);
        data.append('upload_preset', 'osc');
        data.append('cloud_name', 'orange112');

        axios.post(`https://node-heroku-deployement-test.herokuapp.com/api/agencyCollection/upload1`, data)
            .then((res) => {

                console.log("ahawa data hachti biih ", res)
            }).catch((err) => {

                console.log(err)
            })

    }*/



    return (

        <>

            <form onSubmit={handleSubmit}>
                <div className="form1 sign-up ">
                    <label>
                        <span >Collection Agency Name</span>
                        <input type="text"
                            onChange={handleChange1('name')}
                            value={name} />
                    </label>
                    <label>
                        <span>Email</span>
                        <input type="email" onChange={handleChange1('email')}
                            value={email} />
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="password" onChange={handleChange1('password')}
                            value={password} />
                    </label>
                    <label>
                        <span>Confirm password</span>
                        <input type="password" onChange={handleChange1('password2')}
                            value={password2} />
                    </label>
                    <label>
                        <span>PhoneNumber</span>
                        <input type="text" onChange={handleChange1('phoneNumber')}
                            value={phoneNumber} />
                    </label>
                    <label>
                        <span>Address</span>
                        <input type="text" onChange={handleChange1('address')}
                            value={address} />
                    </label>
                    <label>
                    <span style={{color:'green'}}>Collecting Agency Category</span>
                         <FormControl className={classes.formControl}>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={role}
                                onChange={handleChange}
                             >
                                
                                <MenuItem value='Etatique' style={{color:'green'}}>Etatique</MenuItem>
                                <MenuItem value='Prive' style={{color:'green'}}>Prive</MenuItem>
                            </Select>
                        </FormControl>

                    </label>

                    <label>

                        <label for="file" class="label-file" style={{ marginTop: '12%' }}>

                            <img src='upload.png'
                                style={{ width: '37px', height: '37px', marginTop: '3%' }}
                            />




                            <input id="file" class="input-file"

                                type='file' onChange={async (e) => await setFile(e.target.files[0])} />


                          <p>Logo</p>
                        </label>

                    </label>


                    <button type="submit" className="submit" >{textChange1}</button>
                </div>
            </form>

            <Popup openModal={openModal} closeModal={closeModal} modal={modal}
                errors={errors} message={message} success={success} />
        </>

    );
};

export default SignUp;
