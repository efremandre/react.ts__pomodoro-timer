import {TimerState} from "../../features/timer-slice/timerSlice.ts";


export const loadLocalStorage  = (): TimerState | undefined => {
    try {
        const stateLs = localStorage.getItem('timer')
        if (stateLs === null) {
            return undefined
        }

        return JSON.parse(stateLs)
    } catch (e) {
        console.warn('Ошибка при загрузке из LocalStorage: ', e)
        return undefined
    }
}

export const saveLocalStorage = (state: TimerState) => {
    try {
        const stateLs = JSON.stringify(state)
        localStorage.setItem('timer', stateLs)
    } catch (e) {
        console.warn('Ошибка при сохранении в LocalStorage: ', e)
    }
}

export const resetLocalStorage = () => {
    localStorage.removeItem('timer');
}
