import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {
    Box,
    Center,
    Circle,
    Container, CircularProgress, CircularProgressLabel
} from '@chakra-ui/react'
import {
    selectTimer
} from "../features/timer-slice/timerSlice.ts"
import {useEffect, useMemo} from "react"
import Buttons from "./Buttons.tsx"
import {timerWithTitle} from "../utils/timer-counter/timerWithTitle.ts";
import {saveLocalStorage} from "../utils/localstorage/setLocalStorage.ts";
import useTimer from "../hooks/useTimer.tsx";
import {calculateProgress} from "../utils/timer-counter/setRounder.ts";
import ChangeTimer from "./ChangeTimer.tsx";

function App() {
    const stateTimer = useSelector((state: RootState) => selectTimer(state))
    const {
        isRunning,
        propMinutesWork,
        propMinutesBreak,
        minutes,
        seconds,
        mode
    } = stateTimer

    const dispatch = useDispatch()

    useTimer()

    const progress = useMemo(() => {
        return calculateProgress(mode, propMinutesBreak, propMinutesWork, minutes, seconds)
    }, [isRunning, mode, propMinutesBreak, propMinutesWork, minutes, seconds])

    useEffect(() => {
        timerWithTitle(minutes, seconds, mode, progress)
    }, [minutes, seconds, mode, progress])

    useEffect(() => {
        saveLocalStorage(stateTimer)
    }, [stateTimer, dispatch]);

    const formattedSeconds = String(seconds).padStart(2, '0')

    return (
        <>
            <Container maxW='500px'>
                <ChangeTimer />
                <Center>
                    <Box>
                        <Center my='50px'>
                            <CircularProgress value={progress}
                                              size='600px'
                                              color={
                                                  (mode === 'work')
                                                      ? 'red.600'
                                                      : 'green.600'
                                              }
                                              trackColor='gray.800'
                                              thickness='1px'>
                                <CircularProgressLabel>
                                    <Center>
                                        <Circle size='600px'
                                                color='red.100'>
                                            <Box fontSize={64}>
                                                {minutes} : {formattedSeconds}
                                            </Box>
                                        </Circle>
                                    </Center>
                                </CircularProgressLabel>
                                <Buttons/>
                            </CircularProgress>
                        </Center>
                    </Box>
                </Center>
            </Container>
        </>
    )
}

export default App
