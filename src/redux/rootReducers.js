import { combineReducers } from "@reduxjs/toolkit"; 

import clientReducer from "./clients/clientsSlice";

const rootReducer = combineReducers({
    clientReducer,
});

export default rootReducer;