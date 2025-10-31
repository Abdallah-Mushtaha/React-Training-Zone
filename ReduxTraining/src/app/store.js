import { configureStore } from "@reduxjs/toolkit"
import CalcyReducers from "../features/calcSlice"

export const Store = configureStore({
    reducer: {
        calculation: CalcyReducers
    }
})