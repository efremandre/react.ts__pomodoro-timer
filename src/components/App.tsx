import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {
    Box,
    Center,
    Circle,
    CircularProgress,
    CircularProgressLabel,
    Container,
    Text
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
import Sidebar from "./Sidebar.tsx";

function App() {
    const stateTimer = useSelector((state: RootState) => selectTimer(state))
    const {
        isRunning,
        propMinutesWork,
        propMinutesBreak,
        propMinutesBigBreak,
        minutes,
        seconds,
        roundCounter,
        cicleCounter,
        mode
    } = stateTimer

    const dispatch = useDispatch()

    useTimer()

    const progress = useMemo(() => {
        return calculateProgress(mode, propMinutesBreak, propMinutesWork, propMinutesBigBreak, minutes, seconds)
    }, [isRunning, mode, propMinutesWork, propMinutesBreak, propMinutesBigBreak, minutes, seconds])

    useEffect(() => {
        timerWithTitle(minutes, seconds, mode, progress)
    }, [minutes, seconds, mode, progress])

    useEffect(() => {
        saveLocalStorage(stateTimer)
    }, [stateTimer, dispatch]);

    const formattedSeconds = String(seconds).padStart(2, '0')

    return (
        <>
            <Container maxW='600px'>
                <Center mt='24px'><Text fontSize='1rem' color='red.100'>Помидорковый цикл: {cicleCounter}, Помидор: {roundCounter}</Text></Center>
                <Sidebar />
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
