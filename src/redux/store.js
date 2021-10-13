import { configureStore } from '@reduxjs/toolkit'
import reservationReducer from './reducers/reservationSlice'; // Slice mté3ik

export const store = configureStore({
    reducer: { reservations: reservationReducer },
})
