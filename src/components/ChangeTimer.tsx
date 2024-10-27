import {Box, Button, Center, Input} from "@chakra-ui/react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    changeBreakTime,
    changeWorkTime,
    selectTimer
} from "../features/timer-slice/timerSlice.ts";
import {RootState} from "../store/store.ts";

const ChangeTimer = () => {
    const { propMinutesWork, propMinutesBreak } = useSelector((state: RootState) => selectTimer(state))
    const dispatch = useDispatch()
    const [inputValues, setInputValues] = useState({work: '', break: ''})
    const changeInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const target = ev.currentTarget
        const values = {...inputValues}

        if (target.id === 'work' && target.value !== '') {
            values.work = target.value
            setInputValues({...values})
        }

        if (target.id === 'break' && target.value !== '') {
            values.break = target.value
            setInputValues({...values})
        }
    }

    const handleChangeWorkTime = () => {
        const workTime = Number(inputValues.work);
        dispatch(changeWorkTime({work: workTime}))
        inputValues.work = ''
    }

    const handleChangeBreakTimer = () => {
        const breakTime = Number(inputValues.break);
        dispatch(changeBreakTime({break: breakTime}))
        inputValues.break = ''
    }


    return (
        <Box>
            <Center>
                <Input id="work"
                       type="number"
                       value={inputValues.work}
                       placeholder={`${propMinutesWork}`}
                       width="60px"
                       onChange={changeInput}
                       color='red.100'/>

                <Input id="break"
                       type="number"
                       value={inputValues.break}
                       placeholder={`${propMinutesBreak}`}
                       width="60px"
                       onChange={changeInput}
                       color='red.100'/>
                <Button onClick={handleChangeWorkTime}>Ок</Button>
                <Button onClick={handleChangeBreakTimer}>Ок</Button>
            </Center>
        </Box>
    );
};

export default ChangeTimer;
