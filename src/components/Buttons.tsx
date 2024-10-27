import {Button, Circle, Flex} from "@chakra-ui/react";
import {
    startStopTimer,
    switchMode
} from "../features/timer-slice/timerSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {KeyboardEvent} from "react";

const Buttons = () => {
    const {isRunning} = useSelector((state: RootState) => state.timer)
    const dispatch = useDispatch()

    const styleWrapperButton = {
        _hover: {opacity: '1'},
        pos: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        left: '50%',
        w: '90%',
        h: '90%',
        fontSize: '32px',
        color: 'red.100',
        opacity: (isRunning) ? '0' : '1',
        backdropFilter: 'auto',
        backdropBlur: '8px',
        transition: 'opacity .5s',
        cursor: 'pointer'
    }

    const handleKeyRunning = (ev: KeyboardEvent<HTMLButtonElement>) => {
        if (ev.code === 'Space') {
            console.log('tes')
            dispatch(startStopTimer())
        }
    }

    const handleRunning = () => {
        dispatch(startStopTimer())
    }

    const handleSwitchMode = () => {
        dispatch(switchMode())
        dispatch(startStopTimer())
    }

    return (
        <Circle sx={styleWrapperButton}>
            <Flex flexDirection='column'
                  gap='4'>
                <Button _hover={{bg: 'blackAlpha.300'}}
                        bg='transparent'
                        color='red.100'
                        onClick={handleRunning}
                        onKeyDown={handleKeyRunning}
                        tabIndex={0}
                >
                    {isRunning ? 'Пауза' : 'Пуск'}
                </Button>
                {!isRunning && <Button _hover={{bg: 'blackAlpha.300'}}
                                       bg='transparent'
                                       color='red.100'
                                       onClick={handleSwitchMode}>Пропустить</Button>}
            </Flex>

        </Circle>
    );
};

export default Buttons;
