import { combineSlices } from "@reduxjs/toolkit";
import testSlice from "./slices/testSlice.js";
import categorySlice from "./slices/categorySlice.js";

const rootReducer = combineSlices({
    testSlice,
    categorySlice,
});

export default rootReducer;
