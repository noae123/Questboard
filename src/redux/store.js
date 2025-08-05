import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import rootReducers from './rootReducers'

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false
    });
    middleware.push(logger);
    return middleware;
  },
});

export default store;
