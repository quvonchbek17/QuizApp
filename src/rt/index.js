import { configureStore } from "@reduxjs/toolkit";
import Slice from "./slice/index.js";


const store = configureStore({
    reducer:{
        date: Slice,
    }
});


export default store