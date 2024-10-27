import {configureStore} from "@reduxjs/toolkit";
import timerSlice from "../features/timer-slice/timerSlice.ts";

export const store = configureStore({
    reducer: {
        timer: timerSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
