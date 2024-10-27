import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadLocalStorage} from "../../utils/localstorage/setLocalStorage.ts";
import {RootState} from "../../store/store.ts";

export interface TimerState {
    isRunning: boolean,
    isRound: boolean,
    propMinutesWork: number,
    propMinutesBreak: number,
    minutes: number,
    seconds: number,
    mode: 'work' | 'break'
}

const initialState: TimerState = {
    isRunning: false,
    isRound: false,
    propMinutesWork: 40,
    propMinutesBreak: 10,
    minutes: 40,
    seconds: 0,
    mode: 'work'
}

const timerSlice = createSlice({
    name: 'timer',
    initialState: loadLocalStorage() || initialState,
    reducers: {
        startStopTimer(state) {
            state.isRunning = !state.isRunning
        },
        changeWorkTime(state, actions: PayloadAction<{ work: number }>) {
            state.isRunning = false
            state.propMinutesWork = actions.payload.work
            state.seconds = 0
            state.minutes = state.mode === 'work' ? state.propMinutesWork : state.propMinutesBreak
        },
        changeBreakTime(state, actions: PayloadAction<{ break: number }>) {
            state.isRunning = false
            state.propMinutesBreak = actions.payload.break
            state.seconds = 0
            state.minutes = state.mode === 'work' ? state.propMinutesWork : state.propMinutesBreak
        },
        resetTimer(state) {
            state.isRunning = false
            state.minutes = state.mode === 'work' ? state.propMinutesWork : state.propMinutesBreak
            state.seconds = 0
        },
        switchMode(state) {
            state.isRunning = false
            state.mode = state.mode === 'work' ? 'break' : 'work'
            state.minutes = state.mode === 'work' ? state.propMinutesWork : state.propMinutesBreak
            state.seconds = 0
        },
        tick(state) {
            if (state.seconds > 0) {
                state.seconds -= 1
            } else if (state.minutes > 0) {
                state.minutes -= 1
                state.seconds = 59
            } else {
                state.isRunning = false
                state.minutes = 0
                state.seconds = 0
            }
        }
    }
})

export const {startStopTimer, changeWorkTime, changeBreakTime, switchMode, tick} = timerSlice.actions
export const selectTimer = (state: RootState) => state.timer
export default  timerSlice.reducer
