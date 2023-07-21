import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    date:"",
    slot:"",
    price:"",
    turf_id:"",
    order_id:"",
    end_time:"",
    name:"",
    phoneNumber:""

  };

  const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
      bookSlot: (state, action) => {
        state.date = action.payload.date;
        state.price = action.payload.price;
        state.slot= action.payload.slot;
        state.end_time = action.payload.end_time;
        state.turf_id=action.payload.turf_id;
        state.order_id=action.payload.order_id;
        state.name=action.payload.name;

        state.phoneNumber=action.payload.phoneNumber

        
      }
    }
  });

  export const {bookSlot}=bookingSlice.actions
  export default bookingSlice.reducer;