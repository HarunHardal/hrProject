import { configureStore } from '@reduxjs/toolkit';
import countryReducer from '../redux/slice/slice';


const store = configureStore({
  reducer: {
    countries: countryReducer,
  },
});

export default store;