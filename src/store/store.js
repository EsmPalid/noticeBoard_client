import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import { testApi } from "./api/testQuery.js";

const store = configureStore({
    reducer: {
        rootReducer,
        [testApi.reducerPath]: testApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(testApi.middleware),
});

export default store;
