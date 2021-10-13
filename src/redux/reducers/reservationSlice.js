import {createSlice, createAsyncThunk, createEntityAdapter, isFulfilled} from '@reduxjs/toolkit';
import axios from 'axios';


//const API = axios.create({ baseURL: process.env.REACT_APP_API });



export const setUrlCloudinary = createAsyncThunk(
    'ekolekti/addTrolley',
    async (  _data,{ dispatch, getState }) => {
        const response = await axios.post(`/api/setPhotoCloudinary/${_data._id}`,_data);
        const data = await response.data;

        console.log('hedhi data delievered:', data);

        //dispatch(getAllTrolley)
        return data;
    }
);
export const getAllReservation = createAsyncThunk(
    'getAllresevation',
    async (  _data,{ dispatch, getState }) => {
        const response = await axios.get(`/api/agencyCollection/getAllReservation`);
        const data = await response.data;

        console.log('hedhi data delievered:', data);
        return data;
    }
);


const ReservationAdapter = createEntityAdapter({
    selectId: reservations => reservations._id
});

export const {
    selectAll: selectReservations,
    selectById: selectReservationByid
} = ReservationAdapter.getSelectors((state) => state.reservations);

const ReservationSlice = createSlice({
    name: 'reservations',
    initialState: ReservationAdapter.getInitialState(),
    reducers: {},
    extraReducers: {
        [getAllReservation.fulfilled]: ReservationAdapter.setAll,
    }
});

export default ReservationSlice.reducer;