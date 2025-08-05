import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentClient: {
        id: null,
        name: null,
        password: null,
        email: null,
    }
};


const clientsSlice = createSlice({
  name: 'clientsSlice',
    initialState,
    reducers: {
        setCurrentClient: (state, {payload}) => {
            state.currentClient = payload;
        }
    },
});

export const { setCurrentClient } = clientsSlice.actions;
export default clientsSlice.reducer;
