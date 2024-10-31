import {
    Box,
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField, NumberInputStepper,
    Text
} from '@chakra-ui/react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    changeBigBreakTime,
    changeBreakTime,
    changeWorkTime,
    selectTimer
} from '../features/timer-slice/timerSlice.ts';
import {RootState} from '../store/store.ts';

const ChangeTimer = () => {
    const {
        propMinutesWork,
        propMinutesBreak,
        propMinutesBigBreak
    } = useSelector((state: RootState) => selectTimer(state))
    const dispatch = useDispatch()
    const [inputValues, setInputValues] = useState({
        work: propMinutesWork,
        break: propMinutesBreak,
        bigbreak: propMinutesBigBreak
    })
    const changeInput = (valueNumber: number, inputId: 'work' | 'break' | 'bigbreak') => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [inputId]: valueNumber
        }))
    }

    const handleChangeWorkTime = () => {
        const workTime = (inputValues.work > 0) ? inputValues.work  : 25
        dispatch(changeWorkTime({work: workTime}))
    }

    const handleChangeBreakTimer = () => {
        const breakTime = (inputValues.break > 0) ? inputValues.break : 5
        dispatch(changeBreakTime({break: breakTime}))
    }

    const handleChangeBigBreakTimer = () => {
        const breakTime = (inputValues.bigbreak > 0) ? inputValues.bigbreak : 15
        dispatch(changeBigBreakTime({bigbreak: breakTime}))
    }


    return (
        <Box>
            <Flex flexDirection='column' gap={6}>
                <Box>
                    <Text mb='8px' fontSize='12px' color='red.100'>Продолжительность
                        помидора</Text>
                    <NumberInput min={0}
                                 defaultValue={propMinutesWork}
                                 onChange={(_, valueNumber) => changeInput(valueNumber, 'work')}
                                 onBlur={handleChangeWorkTime}>
                        <NumberInputField/>
                        <NumberInputStepper>
                            <NumberIncrementStepper/>
                            <NumberDecrementStepper/>
                        </NumberInputStepper>
                    </NumberInput>
                </Box>

                <Box>
                    <Text mb='8px' fontSize='12px' color='red.100'>Продолжительность
                        короткого перерыва</Text>
                    <NumberInput min={0}
                                 defaultValue={propMinutesBreak}
                                 onChange={(_, valueNumber) => changeInput(valueNumber, 'break')}
                                 onBlur={handleChangeBreakTimer}>
                        <NumberInputField/>
                        <NumberInputStepper>
                            <NumberIncrementStepper/>
                            <NumberDecrementStepper/>
                        </NumberInputStepper>
                    </NumberInput>
                </Box>

                <Box>
                    <Text mb='8px' fontSize='12px' color='red.100'>Продолжительность
                        длинного перерыва</Text>
                    <NumberInput min={0}
                                 defaultValue={propMinutesBigBreak}
                                 onChange={(_, valueNumber) => changeInput(valueNumber, 'bigbreak')}
                                 onBlur={handleChangeBigBreakTimer}>
                        <NumberInputField/>
                        <NumberInputStepper>
                            <NumberIncrementStepper/>
                            <NumberDecrementStepper/>
                        </NumberInputStepper>
                    </NumberInput>
                </Box>
            </Flex>
        </Box>
    );
};

export default ChangeTimer;
