import { createSlice } from "@reduxjs/toolkit"

const initalState = {
    value: 0,
}
export const CalcSlice = createSlice({
    name: "Calculation",
    initialState: initalState,
    reducers: {
        sum: (currentState, action) => {
            const { Fnum, Snum } = action.payload
            currentState.value = Number(Fnum) + Number(Snum);
        },
        Sub: (currentState, action) => {
            const { Fnum, Snum } = action.payload
            currentState.value = Number(Fnum) - Number(Snum);
        },
        mult: (currentState, action) => {
            const { Fnum, Snum } = action.payload
            currentState.value = Number(Fnum) * Number(Snum);
        },
        Divi: (currentState, action) => {
            const { Fnum, Snum } = action.payload
            currentState.value = Number(Fnum) / Number(Snum);
        }
    }

})

export const { mult, Divi, sum, Sub } = CalcSlice.actions
export default CalcSlice.reducer