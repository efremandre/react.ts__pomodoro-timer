import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    loadLocalStorage
} from "../../utils/localstorage/setLocalStorage.ts";
import {RootState} from "../../store/store.ts";

export interface TimerState {
    isRunning: boolean,
    isRound: boolean,
    propMinutesWork: number,
    propMinutesBreak: number,
    propMinutesBigBreak: number,
    minutes: number,
    seconds: number,
    round: number,
    roundCounter: number,
    cicleCounter: number,
    mode: 'work' | 'break' | 'bigbreak',
    isOpenSidebar: boolean
}

const initialState: TimerState = {
    isRunning: false,
    isRound: false,
    propMinutesWork: 25,
    propMinutesBreak: 5,
    propMinutesBigBreak: 15,
    minutes: 25,
    seconds: 0,
    round: 4,
    roundCounter: 0,
    cicleCounter: 0,
    mode: 'work',
    isOpenSidebar: false
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
            if (state.mode === 'work') state.minutes = state.propMinutesWork
            state.seconds = 0
        },
        changeBreakTime(state, actions: PayloadAction<{ break: number }>) {
            state.isRunning = false
            state.propMinutesBreak = actions.payload.break
            if (state.mode === 'break') state.minutes = state.propMinutesBreak
            state.seconds = 0
        },
        changeBigBreakTime(state, actions: PayloadAction<{ bigbreak: number }>) {
            state.isRunning = false
            state.propMinutesBigBreak = actions.payload.bigbreak
            if (state.mode === 'bigbreak')state.minutes = actions.payload.bigbreak
            state.seconds = 0
        },
        switchMode(state) {
            state.roundCounter = state.roundCounter + 1
            state.isRunning = false
            if (state.roundCounter % state.round === 0) {
                state.mode = 'bigbreak'
                state.minutes = state.propMinutesBigBreak
                state.cicleCounter = state.cicleCounter + 1
                state.roundCounter = 0
                if (state.cicleCounter === 16) state.cicleCounter = 0
            } else {
                state.mode = state.mode === 'work' ? 'break' : 'work'
                state.minutes = state.mode === 'work' ? state.propMinutesWork : state.propMinutesBreak
            }

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

export const {startStopTimer, changeWorkTime, changeBreakTime, changeBigBreakTime, switchMode, tick} = timerSlice.actions
export const selectTimer = (state: RootState) => state.timer
export default  timerSlice.reducer
