import React, { useState, useEffect } from 'react';
import L from 'leaflet'
import { MapContainer, Popup, TileLayer, Polyline, CircleMarker, Marker, useMapEvents } from "react-leaflet";
import './Map.css'
import Modal from 'react-awesome-modal';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { authenticate, authenticate1, isAuth } from './../../helpers/auth';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import 'react-medium-image-zoom/dist/styles.css'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));



const useStyles1 = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));



const MapLeaf = () => {


    const [allMachine, setAllMachine] = useState([]);


    const classes = useStyles();
    const classes1 = useStyles();



    const [changeColor, setChangeColor] = useState(false);
    const [idMachine, setIdMachine] = useState();

    const handelSubmit = (e, id) => {

        e.preventDefault()

        setIdMachine(id);

        console.log(idMachine);

        if (isAuth()) {



            openModal();


        } else {

            history.push('/login')

        }


    }



    const history = useHistory();
    const [modal, setModal] = useState(false);


    const openModal = () => {
        setModal(true);
        setError('')
        setSucess('')

    }

    const closeModal = () => {
        setModal(false);
        setError('')
        setSucess('')

    }



    const [sucess, setSucess] = useState('');
    const [error, setError] = useState('');


    const [formData, setFormData] = useState({
        name: '',
        city: '',
        startDate:'',
        endDate: '',
        email: '',
        typeOfRenting: '',
        phoneNumber: ''
    });

    const { name, city,  startDate,
        endDate, email, typeOfRenting, phoneNumber } = formData;

    const handleChange = text => e => {

        console.log(e.target.value)

        setFormData({ ...formData, [text]: e.target.value });

        console.log(formData);

        setSucess('')
        setError('')

    };


    const handleChange1 = e => {

        console.log(e.target.value)

        setFormData({ ...formData, typeOfRenting: e.target.value });

        console.log(formData);

        setSucess('')
        setError('')

    };


    const handelReservation = async (e, idMachine) => {

        e.preventDefault();

        console.log('id agency ', isAuth()._id);



        if (name && city && email &&  startDate,endDate && typeOfRenting) {

            console.log(formData)


            await axios
                .post(`https://node-heroku-deployement-test.herokuapp.com/api/agencyCollection/reservation`, {
                    name,
                    city,
                    startDate,
                    endDate,
                    email,
                    idMachine,
                    typeOfRenting,
                    phoneNumber
                })
                .then(res => {
                    setFormData({
                        ...formData,
                        name: '',
                        city: '',
                        email: '',
                        phoneNumber: ''
                    });

                    setChangeColor(true);

                    console.log(res);

                    setSucess(res.data.message);
                })
                .catch(err => {
                    setFormData({
                        ...formData,
                        name: '',
                        city: '',
                        email: '',
                        phoneNumber: ''
                    });

                    console.log(err)

                    setError('Failed reservation')

                });



        } else {

            setError('Failed reservation')
        }

    }



    const [color, setColor] = useState('');


    useEffect(() => {

        console.log(idMachine)
        axios.get(`https://node-heroku-deployement-test.herokuapp.com/api/agencyCollection/getAllMachine/`, {

        })
            .then(res => {
                console.log(res.data);

                setAllMachine(res.data);



            })
            .catch(err => {

                console.log(err)
            })


        console.log(allMachine);

        if (allMachine && changeColor) {

            allMachine.map((data) => {

                data.reservation.map(e => {

                    if (e.reserved == 'Active') {
                        console.log(idMachine)

                        axios({

                            method: 'patch',
                            url: `https://node-heroku-deployement-test.herokuapp.com/api/agencyCollection/putMachineReserved/` + idMachine,
                            data: { color: 'red' }
                        })
                            .then((res) => {

                                console.log(res)
                            })
                            .catch((err) => console.log(err));
                    }
                })
            })

        }

    }, [color, idMachine, changeColor]);



    return (
        <>

            <MapContainer center={[36.8603, 10.608395]} zoom={9} scrollWheelZoom={false}>

                <TileLayer
                    attribution='&copy; '
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {allMachine.map((data, i) => {

                    return (
                        <CircleMarker center={[data.longitude, data.latitude]}
                            key={data._id} pathOptions={{ color: data.color }} radius={20}>

                            <Popup>
                                <InnerImageZoom src="https://res.cloudinary.com/orange112/image/upload/v1630109544/test/ccsctfsr3foybh0on6aw.png"
                                    style={{ width: '200px', height: '100px' }} />



                                <br /><br />

                                {data.color === 'green' && (<text style={{ color: 'green' }}>
                                    Bonjour monsieur La machine est non reserver  </text>)}
                                {data.color === 'red' && (<text style={{ color: 'red' }}>
                                    Bonjour monsieur La machine est   reserver  </text>)} <br /><br />



                                <text>Longitude : {data.longitude}</text> <br />
                                <text>Latitude : {data.latitude}</text><br />
                                <text>Location : {data.location}</text> <br />

                                {data.trash[0] ?
                                    (<> <text>Trash quantity : {data.trash[0].quantity}% </text> <br />
                                        <text>Trash state : {data.trash[0].state}</text> <br /><br /></>)
                                    : null}


                                {data.color === 'green' && (<a style={{ cursor: 'pointer', marginLeft: '38%' }}

                                    onClick={(e) => handelSubmit(e, data._id)}>Reserver</a>)}




                            </Popup>
                        </CircleMarker>)

                })}


                { /* <LocationMarker />*/}
            </MapContainer>



            <Modal
                visible={modal}
                width="500"
                height="380"
                effect="fadeInUp"
                onClickAway={closeModal}
            >
                <div> <br />


                    <div class="container1">
                        <form id="contact" action="" method="post">
                            <h3>Vallean Contact Form</h3>
                            <h4>Contact us for reservation</h4>
                            <fieldset>
                                <input placeholder="Your agencyName" type="text" tabindex="1" required autofocus
                                    onChange={handleChange('name')}
                                    value={name} />
                            </fieldset>
                            <fieldset>
                                <input placeholder="Your Email Address" type="email" tabindex="2" required
                                    onChange={handleChange('email')}
                                    value={email} />
                            </fieldset>
                            <fieldset>
                                <input placeholder="Your Phone Number (optional)" type="tel" tabindex="3" required
                                    onChange={handleChange('phoneNumber')}
                                    value={phoneNumber} />
                            </fieldset>
                            <fieldset>

                                <TextField
                                    style={{ width: '200px', marginLeft: '1%' }}
                                    type="date"
                                    onChange={handleChange('startDate')}
                                    value={startDate}
                                />
                                <TextField
                                    style={{ width: '200px', marginLeft: '10%' }} 
                                    
                                    type="date"
                                    onChange={handleChange('endDate')}
                                    value={endDate}
                                />


                                <text style={{marginLeft:'20%'}}>Start date</text>  
                                <span style={{marginLeft:'40%'}}>End date</span>

                            </fieldset><br />

                            <div class="select">
                                <select onChange={(e) => handleChange1(e)} value={typeOfRenting}  >
                                    <option selected value=''>Renting type</option>
                                    <option value="Basic">Basic</option>
                                    <option value="Standard">Standard</option>
                                    <option value="Premium">Premium</option>
                                </select>
                            </div>
                            {typeOfRenting === 'Basic' ? <text style={{color:'green',marginLeft:'43%'}}>$49/mo</text> : 
                            typeOfRenting === 'Standard' ?<text style={{color:'green',marginLeft:'43%'}}>$99/mo</text> : 
                            typeOfRenting === '' ? <text></text> :
                             <text style={{color:'green',marginLeft:'43%'}}>$149/mo</text>}<br/><br/>
                           

                            <fieldset>
                                <input placeholder="Your location" type="text" tabindex="3" required
                                    onChange={handleChange('city')} value={city} />
                            </fieldset><br />

                            <fieldset>
                                <button name="submit" type="submit" id="contact-submit" data-submit="...Sending"
                                    onClick={(e) => handelReservation(e, idMachine)}>Submit</button>
                            </fieldset>

                            {sucess && <p style={{ color: 'green', marginLeft: '28%', marginTop: '3%' }} >{sucess}</p>}
                            {error && (<p style={{ color: 'red', marginLeft: '35%', marginTop: '4%' }}>{error}</p>)}

                            <p class="copyright">Reservation by <a href="" target="_blank"
                                title="Colorlib">Vallean</a></p>


                        </form>
                    </div>

                    );

                    <a href="" onClick={closeModal}
                    ></a>
                </div>
            </Modal>

        </>

    );
};

export default MapLeaf;
