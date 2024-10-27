import {useEffect} from "react";
import {
    selectTimer,
    switchMode,
    tick
} from "../features/timer-slice/timerSlice.ts";
import {playSound} from "../utils/play-sounds/playSound.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";

const useTimer = () => {
    const {isRunning, minutes, seconds} = useSelector((state: RootState)=> selectTimer(state))
    const dispatch = useDispatch()

    return useEffect(() => {
        let counter: ReturnType<typeof setTimeout>
        if (isRunning) {
            counter = setTimeout(() => {
                dispatch(tick())

                if (minutes === 0 && seconds === 0) {
                    dispatch(switchMode())
                    playSound('/beep.mp3')
                }
            }, 1000)
        }

        return () => clearTimeout(counter)
    }, [isRunning, minutes, seconds])
}

export default useTimer
